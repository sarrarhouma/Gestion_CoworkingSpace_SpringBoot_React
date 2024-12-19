import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage] = useState(""); 
    const navigate = useNavigate();

    // Fonction pour gérer la connexion
    const handleLogin = (e) => {
        e.preventDefault();
        if (username === "admin" && password === "admin123") {
            localStorage.setItem("username", username);
            localStorage.setItem("password", password);
            localStorage.setItem("role", "admin");
            navigate("/home");
        } else if (username === "user" && password === "user123") {
            localStorage.setItem("username", username);
            localStorage.setItem("password", password);
            localStorage.setItem("role", "user");
            navigate("/home");
        } else {
            alert("Identifiants incorrects !");
        }
    };
    
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-800">
            {/* Message d'accueil */}
            <div className="text-white text-3xl font-bold mb-6 text-center">
                Welcome to our SR Coworking Space 
            </div>

            {/* Formulaire de connexion */}
            <form
                className="bg-white p-6 rounded-lg shadow-md w-96"
                onSubmit={handleLogin}
            >
                <h2 className="text-2xl font-bold text-center mb-4">Connexion</h2>
                
                {/* Affichage de l'erreur */}
                {errorMessage && (
                    <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
                )}

                {/* Champ pour le nom d'utilisateur */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                        Nom d'utilisateur
                    </label>
                    <input
                        type="text"
                        className="w-full border rounded p-2 focus:ring focus:ring-blue-500"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Entrez votre nom d'utilisateur"
                        required
                    />
                </div>

                {/* Champ pour le mot de passe */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                        Mot de passe
                    </label>
                    <input
                        type="password"
                        className="w-full border rounded p-2 focus:ring focus:ring-blue-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Entrez votre mot de passe"
                        required
                    />
                </div>

                {/* Bouton de connexion */}
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full font-medium"
                >
                    Se connecter
                </button>
            </form>

            {/* Lien vers la page d'inscription */}
            <div className="text-white mt-4">
                <span>Pas encore inscrit ? </span>
                <button
                    className="text-blue-400 underline hover:text-blue-300"
                    onClick={() => navigate("/register")}
                >
                    Créer un compte
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
