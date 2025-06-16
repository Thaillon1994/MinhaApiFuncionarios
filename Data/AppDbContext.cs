using Microsoft.EntityFrameworkCore;
using MinhaApiFuncionarios.Models;


namespace MinhaApiFuncionarios.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Funcionario> Funcionarios { get; set; }
    }
}
