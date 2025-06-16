using MinhaApiFuncionarios.Models;
using MinhaApiFuncionarios.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Configura DbContext para SQL Server
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=MinhaApiFuncionariosDb;Trusted_Connection=True;"));

// Swagger para documentação da API
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configura chave secreta para JWT
var key = Encoding.ASCII.GetBytes("sua_chave_super_secreta_aqui");

// Configura autenticação JWT
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false,
        ClockSkew = TimeSpan.Zero
    };
});

// Adicione isso para ativar autorização
builder.Services.AddAuthorization();


var app = builder.Build();

// Middleware para autenticação e autorização
app.UseAuthentication();
app.UseAuthorization();

// Swagger UI
app.UseSwagger();
app.UseSwaggerUI();

// Endpoint para login (a implementar)
app.MapPost("/login", ([FromBody] Usuario login, AppDbContext db) =>
{
    return Results.Ok("Login endpoint - implemente aqui");
});

app.MapGet("/Funcionarios", async (AppDbContext db) =>
    await db.Funcionarios.ToListAsync()
).RequireAuthorization();

app.MapGet("/Funcionarios/{id}", async (int id, AppDbContext db) =>
{
    var funcionario = await db.Funcionarios.FindAsync(id);
    return funcionario is not null ? Results.Ok(funcionario) : Results.NotFound();
}).RequireAuthorization();

app.MapPost("/Funcionarios", async (Funcionario funcionario, AppDbContext db) =>
{
    db.Funcionarios.Add(funcionario);
    await db.SaveChangesAsync();
    return Results.Created($"/Funcionarios/{funcionario.Id}", funcionario);
}).RequireAuthorization();

app.MapPut("/Funcionarios/{id}", async (int id, Funcionario input, AppDbContext db) =>
{
    var funcionario = await db.Funcionarios.FindAsync(id);
    if (funcionario is null) return Results.NotFound();

    funcionario.Nome = input.Nome;
    funcionario.CPF = input.CPF;
    funcionario.Email = input.Email;

    await db.SaveChangesAsync();
    return Results.Ok(funcionario);
}).RequireAuthorization();

app.MapDelete("/Funcionarios/{id}", async (int id, AppDbContext db) =>
{
    var funcionario = await db.Funcionarios.FindAsync(id);
    if (funcionario is null) return Results.NotFound();

    db.Funcionarios.Remove(funcionario);
    await db.SaveChangesAsync();
    return Results.NoContent();
}).RequireAuthorization();

app.Run();


