import React, { useEffect, useState } from "react";
import { getSubscriptions, deleteSubscription } from "../services/api";
import { useNavigate } from "react-router-dom";

const SubscriptionsPage = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false); // Simulated admin check
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSubscriptions = async () => {
            try {
                const data = await getSubscriptions();
                setSubscriptions(data);
            } catch (error) {
                console.error("Erreur lors du chargement des abonnements :", error);
            }
        };
        fetchSubscriptions();

        // Simulate admin check
        setIsAdmin(true); // Replace with real authentication logic
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Voulez-vous vraiment supprimer cet abonnement ?")) {
            try {
                await deleteSubscription(id);
                setSubscriptions(subscriptions.filter((sub) => sub.id !== id));
                console.log("Abonnement supprimé avec succès");
            } catch (error) {
                console.error("Erreur lors de la suppression :", error);
            }
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center"> Liste des Abonnements</h1>
            {isAdmin && (
                <div className="mb-4 text-right">
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        onClick={() => navigate("/subscriptions/add")}
                    >
                        Ajouter un abonnement
                    </button>
                </div>
            )}
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 bg-white rounded-lg shadow-lg">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="text-left py-2 px-4 border-b">Type</th>
                            <th className="text-left py-2 px-4 border-b">Prix</th>
                            <th className="text-left py-2 px-4 border-b">Début</th>
                            <th className="text-left py-2 px-4 border-b">Fin</th>
                            {isAdmin && <th className="text-left py-2 px-4 border-b">Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {subscriptions.map((subscription) => (
                            <tr key={subscription.id} className="hover:bg-gray-50">
                                <td className="py-2 px-4 border-b font-medium">{subscription.type}</td>
                                <td className="py-2 px-4 border-b">{subscription.price} €</td>
                                <td className="py-2 px-4 border-b">{subscription.startDate}</td>
                                <td className="py-2 px-4 border-b">{subscription.endDate}</td>
                               
                                {isAdmin && (
                                    <td className="py-2 px-4 border-b space-x-2">
                                        <button
                                            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                                            onClick={() => navigate(`/subscriptions/edit/${subscription.id}`)}
                                        >
                                            Modifier
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                            onClick={() => handleDelete(subscription.id)}
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

export default SubscriptionsPage;
