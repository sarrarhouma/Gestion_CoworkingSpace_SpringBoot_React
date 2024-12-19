import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMeetingRoomById, addMeetingRoom, updateMeetingRoom } from "../services/api";

const AddEditRoom = () => {
    const [room, setRoom] = useState({
        name: "",
        capacity: "",
        isAvailable: false,
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false); // Indicateur de succès
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            const fetchRoom = async () => {
                try {
                    const data = await getMeetingRoomById(id);
                    console.log("Fetched Room Data:", data); // Debugging
                    setRoom({
                        name: data.name || "",
                        capacity: data.capacity || "",
                        isAvailable: data.available || false, // Fix de la clé pour `available`
                    });
                } catch (err) {
                    console.error("Erreur lors de la récupération des données :", err);
                    setError("Impossible de charger les détails de la salle.");
                }
            };
            fetchRoom();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setRoom({ ...room, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedRoom = {
                ...room,
                available: room.isAvailable, // Assurez que l'état est correct
            };

            if (id) {
                await updateMeetingRoom(id, updatedRoom);
                setSuccess(true);
                console.log("Salle mise à jour avec succès.");
            } else {
                await addMeetingRoom(updatedRoom);
                setSuccess(true);
                console.log("Salle ajoutée avec succès.");
            }
            setTimeout(() => navigate("/rooms"), 2000); // Redirige après 2s
        } catch (err) {
            console.error("Erreur lors de l'enregistrement :", err);
            setError("Erreur lors de l'enregistrement de la salle.");
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">
                {id ? "Modifier la salle" : "Ajouter une salle"}
            </h1>
            {success && (
                <p className="text-green-500 text-center mb-4">
                    {id ? "Salle mise à jour avec succès !" : "Salle ajoutée avec succès !"}
                </p>
            )}
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow">
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Nom de la salle</label>
                    <input
                        type="text"
                        name="name"
                        value={room.name}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Capacité</label>
                    <input
                        type="number"
                        name="capacity"
                        value={room.capacity}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            name="isAvailable"
                            checked={room.isAvailable}
                            onChange={handleChange}
                            className="mr-2"
                        />
                        Disponible
                    </label>
                </div>
                <div className="flex justify-between items-center">
                    {/* Bouton Retour à la liste */}
                    <button
                        type="button"
                        onClick={() => navigate("/rooms")}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        Retour à la liste
                    </button>

                    {/* Bouton de soumission */}
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        {id ? "Mettre à jour" : "Ajouter"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddEditRoom;
