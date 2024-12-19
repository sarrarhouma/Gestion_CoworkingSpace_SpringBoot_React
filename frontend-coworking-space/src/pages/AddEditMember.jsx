import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    getMembers,
    addMember,
    editMember,
    getMeetingRooms,
    getSubscriptions, // Nouvelle fonction pour récupérer les abonnements existants
} from "../services/api";

const AddEditMember = () => {
    const [member, setMember] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        subscriptionId: "", // Stocke l'ID de l'abonnement existant
        reservedRoomId: "", // Stocke l'ID de la salle sélectionnée
    });
    const [rooms, setRooms] = useState([]); // Liste des salles disponibles
    const [subscriptions, setSubscriptions] = useState([]); // Liste des abonnements existants
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const roomsData = await getMeetingRooms();
                const subscriptionsData = await getSubscriptions(); // Récupère les abonnements existants
                setRooms(roomsData);
                setSubscriptions(subscriptionsData);

                if (id) {
                    const membersData = await getMembers();
                    const selectedMember = membersData.find((m) => m.id === parseInt(id));
                    if (selectedMember) {
                        console.log("Membre récupéré :", selectedMember);
                        setMember({
                            fullName: selectedMember.fullName || "",
                            email: selectedMember.email || "",
                            phoneNumber: selectedMember.phoneNumber || "",
                            subscriptionId: selectedMember.subscription?.id || "", // Récupère l'ID de l'abonnement existant
                            reservedRoomId: selectedMember.reservedRooms?.[0]?.id?.toString() || "",
                        });
                    }
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des données :", error);
            }
        };

        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMember({
            ...member,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formattedMember = {
                fullName: member.fullName,
                email: member.email,
                phoneNumber: member.phoneNumber,
                subscription: member.subscriptionId
                    ? { id: parseInt(member.subscriptionId) } // Utilise l'ID de l'abonnement sélectionné
                    : null,
                reservedRooms: member.reservedRoomId
                    ? [{ id: parseInt(member.reservedRoomId) }]
                    : [],
            };

            if (id) {
                await editMember(id, formattedMember);
                console.log("Membre mis à jour avec succès");
            } else {
                await addMember(formattedMember);
                console.log("Membre ajouté avec succès");
            }

            navigate("/members");
        } catch (error) {
            console.error("Erreur lors de l'enregistrement :", error);
            alert("Erreur : Impossible d'enregistrer le membre.");
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">
                {id ? "Modifier un membre" : "Ajouter un membre"}
            </h1>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow">
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Nom complet</label>
                    <input
                        type="text"
                        name="fullName"
                        value={member.fullName}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={member.email}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Téléphone</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={member.phoneNumber}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Abonnement</label>
                    <select
                        name="subscriptionId"
                        value={member.subscriptionId}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                    >
                        <option value="">Sélectionnez un abonnement</option>
                        {subscriptions.map((subscription) => (
                            <option key={subscription.id} value={subscription.id}>
                                {subscription.type} - {subscription.price} €
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Salle réservée</label>
                    <select
                        name="reservedRoomId"
                        value={member.reservedRoomId}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                    >
                        <option value="">Sélectionnez une salle</option>
                        {rooms.map((room) => (
                            <option key={room.id} value={room.id}>
                                {room.name}
                            </option>
                        ))}
                    </select>
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

export default AddEditMember;
