import React, { useEffect, useState } from "react";
import { getMeetingRooms, deleteMeetingRoom } from "../services/api";
import { useNavigate } from "react-router-dom";

const MeetingRoomsPage = () => {
    const [rooms, setRooms] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false); // Vérifie si l'utilisateur est admin
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const data = await getMeetingRooms();
                const mappedData = data.map((room) => ({
                    ...room,
                    isAvailable: room.available, // Map backend field to frontend field
                }));
                console.log("Mapped meeting rooms data:", mappedData);
                setRooms(mappedData);
            } catch (error) {
                console.error("Erreur lors du chargement des salles :", error);
            }
        };
        fetchRooms();

        // Vérifie si l'utilisateur est admin
        const role = localStorage.getItem("role"); // Récupère le rôle de l'utilisateur
        setIsAdmin(role === "admin");
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Voulez-vous vraiment supprimer cette salle ?")) {
            try {
                await deleteMeetingRoom(id);
                setRooms(rooms.filter((room) => room.id !== id));
                console.log("Salle supprimée avec succès");
            } catch (error) {
                console.error("Erreur lors de la suppression de la salle :", error);
            }
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Liste des Salles de réunions </h1>

            {isAdmin && (
                <div className="mb-4 text-right">
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        onClick={() => navigate("/rooms/add")}
                    >
                        Ajouter une salle
                    </button>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 bg-white rounded-lg shadow-lg">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="text-left py-2 px-4 border-b">Nom</th>
                            <th className="text-left py-2 px-4 border-b">Capacité</th>
                            <th className="text-left py-2 px-4 border-b">Disponibilité</th>
                            {isAdmin && <th className="text-left py-2 px-4 border-b">Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {rooms.map((room) => (
                            <tr key={room.id} className="hover:bg-gray-50">
                                <td className="py-2 px-4 border-b font-medium">{room.name}</td>
                                <td className="py-2 px-4 border-b">{room.capacity}</td>
                                <td
                                    className={`py-2 px-4 border-b font-medium ${
                                        room.isAvailable ? "text-green-500" : "text-red-500"
                                    }`}
                                >
                                    {room.isAvailable ? "Oui" : "Non"}
                                </td>
                                {isAdmin && (
                                    <td className="py-2 px-4 border-b space-x-2">
                                       <button
                                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                                    onClick={() => navigate(`/rooms/edit/${room.id}`)}
                                >
                                    Modifier
                                </button>

                                        <button
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                            onClick={() => handleDelete(room.id)}
                                        >
                                            Supprimer
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MeetingRoomsPage;
