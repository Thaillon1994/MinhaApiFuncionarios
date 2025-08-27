import React from 'react';

export default function Input({ label, valor, onChange, tipo = 'text' }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label>{label}</label>
      <input
        type={tipo}
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: '100%', padding: '0.5rem' }}
      />
    </div>
  );
}


