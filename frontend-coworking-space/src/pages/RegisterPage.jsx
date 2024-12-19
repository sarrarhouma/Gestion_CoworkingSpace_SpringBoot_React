import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        // Check if passwords match
        if (formData.password !== formData.confirmPassword) {
            setErrorMessage("Les mots de passe ne correspondent pas.");
            return;
        }

        try {
            // Simulate user registration logic
            console.log("Registering user with:", formData);
            alert("Inscription réussie !");
            navigate("/login"); // Redirect to login page after successful registration
        } catch (error) {
            console.error("Erreur lors de l'inscription :", error);
            setErrorMessage("Une erreur s'est produite. Veuillez réessayer.");
        }
    };

    return (
        <div
            className="h-screen flex items-center justify-center"
            style={{ backgroundColor: "#1a202c" }}
        >
            <form
                className="bg-white p-6 rounded-lg shadow-md w-96"
                onSubmit={handleRegister}
            >
                <h2 className="text-2xl font-bold text-center mb-4">
                    Inscription
                </h2>
                {errorMessage && (
                    <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
                )}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                        Nom d'utilisateur
                    </label>
                    <input
                        type="text"
                        name="username"
                        className="w-full border rounded p-2 focus:ring focus:ring-blue-500"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Entrez votre nom d'utilisateur"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        className="w-full border rounded p-2 focus:ring focus:ring-blue-500"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Entrez votre email"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                        Mot de passe
                    </label>
                    <input
                        type="password"
                        name="password"
                        className="w-full border rounded p-2 focus:ring focus:ring-blue-500"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Entrez votre mot de passe"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                        Confirmez le mot de passe
                    </label>
                    <input
                        type="password"
                        name="confirmPassword"
                        className="w-full border rounded p-2 focus:ring focus:ring-blue-500"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirmez votre mot de passe"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full font-medium"
                >
                    S'inscrire
                </button>
                <p className="mt-4 text-sm text-center">
                    Déjà un compte?{" "}
                    <span
                        className="text-blue-500 hover:underline cursor-pointer"
                        onClick={() => navigate("/login")}
                    >
                        Connectez-vous ici
                    </span>
                </p>
            </form>
        </div>
    );
};

export default RegisterPage;
