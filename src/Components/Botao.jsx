// src/components/Botao.jsx
import React from 'react';

export default function Botao({ texto, onClick, type = 'button' }) {
  return (
    <button type={type} onClick={onClick} style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>
      {texto}
    </button>
  );
}
