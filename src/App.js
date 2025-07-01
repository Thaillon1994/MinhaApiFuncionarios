import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/funcionarios/Login';
import Home from './pages/funcionarios/Home';
import CadastrarFuncionario from './pages/funcionarios/CadastrarFuncionario';

import PrivateRoute from './PrivateRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/cadastrar"
          element={
            <PrivateRoute>
              <CadastrarFuncionario />
            </PrivateRoute>
          }
        />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
