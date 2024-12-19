import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    // Récupérer le rôle depuis localStorage
    const role = localStorage.getItem("role");

    const handleLogout = () => {
        // Supprimer les informations de connexion
        localStorage.removeItem("username");
        localStorage.removeItem("password");
        localStorage.removeItem("role");

        // Rediriger vers la page de connexion
        navigate("/login");
    };

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    {/* Logo */}
                    <img
                        src="/OIP.png" // Chemin vers ton logo
                        alt="Logo"
                        className="h-8 w-8 mr-2"
                    />
                    <Link to="/home" className="text-white text-xl font-bold">
                        SR Coworking Space
                    </Link>
                </div>

                <ul className="flex space-x-4 items-center">
                    <li>
                        <Link to="/home" className="text-gray-300 hover:text-white">
                            Accueil
                        </Link>
                    </li>
                    <li>
                        <Link to="/rooms" className="text-gray-300 hover:text-white">
                            Salles
                        </Link>
                    </li>
                    {role === "admin" && (
                        <>
                            <li>
                                <Link
                                    to="/reservations"
                                    className="text-gray-300 hover:text-white"
                                >
                                    Réservations
                                </Link>
                            </li>
                            <li>
                                <Link to="/members" className="text-gray-300 hover:text-white">
                                    Membres
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/subscriptions"
                                    className="text-gray-300 hover:text-white"
                                >
                                    Abonnements
                                </Link>
                            </li>
                        </>
                    )}
                   
                    <li>
                        <button
                            className="text-white font-bold hover:text-gray-300"
                            onClick={handleLogout}
                        >
                            Déconnexion
                        </button>
                    </li>
                    <li className="text-white font-bold">
                        {role === "admin" && "Admin"}
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
