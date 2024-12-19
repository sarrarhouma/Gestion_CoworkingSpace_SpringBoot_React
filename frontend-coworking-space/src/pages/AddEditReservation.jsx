import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    getReservationById,
    getMeetingRooms,
    getMembers,
    addReservation,
    updateReservation,
        } from "../services/api";

        const AddEditReservation = () => {
            const [reservation, setReservation] = useState({
                meetingRoomId: "",
                memberId: "",
                startTime: "",
                endTime: "",
            });
            const [rooms, setRooms] = useState([]);
            const [members, setMembers] = useState([]);
            const { id } = useParams(); // Retrieve reservation ID if editing
            const navigate = useNavigate();

            useEffect(() => {
                const fetchData = async () => {
                    try {
                        // Récupérer les salles et membres pour les listes déroulantes
                        const roomsData = await getMeetingRooms();
                        const membersData = await getMembers();
                        setRooms(roomsData);
                        setMembers(membersData);
            
                        // Récupérer uniquement la réservation par ID si on est en mode édition
                        if (id) {
                            const data = await getReservationById(id);
                            console.log("Réservation récupérée :", data); // DEBUG
            
                            setReservation({
                                meetingRoomId: data.meetingRoom?.id || "", // ID de la salle
                                memberId: data.member?.id || "", // ID du membre
                                startTime: data.startTime ? data.startTime.slice(0, 16) : "",
                                endTime: data.endTime ? data.endTime.slice(0, 16) : "",
                            });
                        }
                    } catch (error) {
                        console.error("Erreur lors du chargement des données :", error);
                        alert("Impossible de charger les données de la réservation.");
                    }
                };
            
                fetchData();
            }, [id]);
            
    
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setReservation({
            ...reservation,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Format correct attendu par le backend
        const formattedReservation = {
            meetingRoom: { id: reservation.meetingRoomId }, // salle avec ID
            member: { id: reservation.memberId }, // membre avec ID
            startTime: reservation.startTime,
            endTime: reservation.endTime,
        };
    
        try {
            if (id) {
                // Mettre à jour la réservation existante
                await updateReservation(id, formattedReservation);
                console.log("Réservation mise à jour avec succès");
            } else {
                // Ajouter une nouvelle réservation
                await addReservation(formattedReservation);
                console.log("Réservation ajoutée avec succès");
            }
            navigate("/reservations"); // Redirige vers la page des réservations
        } catch (error) {
            console.error("Erreur lors de l'enregistrement de la réservation :", error);
            alert("Erreur : impossible d'enregistrer la réservation.");
        }
    };
    

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">
                {id ? "Modifier la réservation" : "Ajouter une réservation"}
            </h1>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow">
            <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Salle</label>
                    <select
                        name="meetingRoomId"
                        value={reservation.meetingRoomId}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                        required
                    >
                        <option value="">Sélectionnez une salle</option>
                        {rooms.map((room) => (
                            <option key={room.id} value={room.id}>
                                {room.name}
                            </option>
                        ))}
                    </select>
                </div>

            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Membre</label>
                <select
                    name="memberId"
                    value={reservation.memberId}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                    required
                >
                    <option value="">Sélectionnez un membre</option>
                    {members.map((member) => (
                        <option key={member.id} value={member.id}>
                            {member.fullName}
                        </option>
                    ))}
                </select>
            </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Début</label>
                    <input
                        type="datetime-local"
                        name="startTime"
                        value={reservation.startTime}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Fin</label>
                    <input
                        type="datetime-local"
                        name="endTime"
                        value={reservation.endTime}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                        required
                    />
                </div>
                <div className="flex justify-between items-center">
                    {/* Bouton Retour à la liste */}
                    <button
                        type="button"
                        onClick={() => navigate("/subscriptions")}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        Retour à la liste
                    </button>
                <div className="text-right">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        {id ? "Mettre à jour" : "Ajouter"}
                    </button>
                </div>
                </div>
            </form>
        </div>
    );
};

export default AddEditReservation;
