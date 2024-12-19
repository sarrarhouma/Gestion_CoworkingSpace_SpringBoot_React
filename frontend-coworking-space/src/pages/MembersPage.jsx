import React, { useEffect, useState } from "react";
import { getMembers, deleteMember } from "../services/api";
import { useNavigate } from "react-router-dom";

const MembersPage = () => {
    const [members, setMembers] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false); // Simulated admin check
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const membersData = await getMembers();
                console.log("Données des membres :", membersData); // Vérifie ici
                setMembers(membersData);
            } catch (error) {
                console.error("Erreur lors du chargement des membres :", error);
            }
        };
        fetchMembers();

        // Simulate admin check
        setIsAdmin(true); // Replace with real authentication logic
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Voulez-vous vraiment supprimer ce membre ?")) {
            try {
                await deleteMember(id);
                setMembers(members.filter((member) => member.id !== id));
                console.log("Membre supprimé avec succès");
            } catch (error) {
                console.error("Erreur lors de la suppression :", error);
            }
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Listes des Membres</h1>
            {isAdmin && (
                <div className="mb-4 text-right">
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        onClick={() => navigate("/members/add")}
                    >
                        Ajouter un membre
                    </button>
                </div>
            )}
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 bg-white rounded-lg shadow-lg">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="text-left py-2 px-4 border-b">Nom</th>
                            <th className="text-left py-2 px-4 border-b">Email</th>
                            <th className="text-left py-2 px-4 border-b">Téléphone</th>
                            <th className="text-left py-2 px-4 border-b">Abonnement</th>
                            <th className="text-left py-2 px-4 border-b">Salles réservées</th>
                            {isAdmin && <th className="text-left py-2 px-4 border-b">Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {members.map((member) => (
                            <tr key={member.id} className="hover:bg-gray-50">
                                <td className="py-2 px-4 border-b font-medium">{member.fullName}</td>
                                <td className="py-2 px-4 border-b">{member.email}</td>
                                <td className="py-2 px-4 border-b">{member.phoneNumber}</td>
                                <td className="py-2 px-4 border-b">
                                            {member.subscription ? member.subscription.type : "Non spécifié"}
                                        </td>


                                <td className="py-2 px-4 border-b">
                                    {member.reservedRooms && member.reservedRooms.length > 0
                                        ? member.reservedRooms.map((room) => room.name).join(", ")
                                        : "Aucune"}
                                </td>
                                {isAdmin && (
                                    <td className="py-2 px-4 border-b space-x-2">
                                        <button
                                            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                                            onClick={() => navigate(`/members/edit/${member.id}`)}
                                        >
                                            Modifier
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                            onClick={() => handleDelete(member.id)}
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

export default MembersPage;
