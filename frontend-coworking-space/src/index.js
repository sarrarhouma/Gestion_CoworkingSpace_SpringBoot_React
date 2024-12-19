import React from 'react';
import ReactDOM from 'react-dom/client'; // Importez `react-dom/client`
import App from './App';
import './index.css'; // Si vous avez un fichier de style global

// Sélectionnez l'élément root de votre application
const rootElement = document.getElementById('root');

// Créez la racine pour React 18
const root = ReactDOM.createRoot(rootElement);

// Rendre le composant principal (App)
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
