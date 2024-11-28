import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // Importa os estilos
import App from './App';  // Importa o componente principal da aplicação
import reportWebVitals from './reportWebVitals';  // Importa a funcionalidade para medir a performance

const root = ReactDOM.createRoot(document.getElementById('root'));  // Encontra o elemento "root" no HTML
root.render(
  <React.StrictMode>
    <App />  // Renderiza o componente App dentro do StrictMode
  </React.StrictMode>
);

// Medindo a performance do app
reportWebVitals();
