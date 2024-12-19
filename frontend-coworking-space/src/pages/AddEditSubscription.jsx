import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSubscriptions, addSubscription, editSubscription } from "../services/api";

const AddEditSubscription = () => {
    const [subscription, setSubscription] = useState({
        type: "",
        price: "",
        startDate: "",
        endDate: "",
    });
    const { id } = useParams(); // Retrieve subscription ID if editing
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            // Fetch the subscription details if editing
            const fetchSubscription = async () => {
                try {
                    const data = await getSubscriptions();
                    const selectedSubscription = data.find((sub) => sub.id === parseInt(id));
                    if (selectedSubscription) {
                        setSubscription({
                            type: selectedSubscription.type || "",
                            price: selectedSubscription.price || "",
                            startDate: selectedSubscription.startDate || "",
                            endDate: selectedSubscription.endDate || "",
                        });
                    }
                } catch (error) {
                    console.error("Erreur lors du chargement de l'abonnement :", error);
                }
            };
            fetchSubscription();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSubscription({
            ...subscription,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                // Update subscription if ID exists
                await editSubscription(id, subscription);
                console.log("Abonnement mis à jour avec succès");
            } else {
                // Add new subscription otherwise
                await addSubscription(subscription);
                console.log("Abonnement ajouté avec succès");
            }
            navigate("/subscriptions"); // Redirect to subscriptions page
        } catch (error) {
            console.error("Erreur lors de l'enregistrement de l'abonnement :", error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">
                {id ? "Modifier l'abonnement" : "Ajouter un abonnement"}
            </h1>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow">
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Type</label>
                    <select
                        name="type"
                        value={subscription.type}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                        required
                    >
                        <option value="">Sélectionnez un type</option>
                        <option value="hebdomadaire">hebdomadaire</option>
                        <option value="mensuel">Mensuel</option>
                        <option value="annuel">Annuel</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Prix (€)</label>
                    <input
                        type="number"
                        name="price"
                        value={subscription.price}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Date de début</label>
                    <input
                        type="date"
                        name="startDate"
                        value={subscription.startDate}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Date de fin</label>
                    <input
                        type="date"
                        name="endDate"
                        value={subscription.endDate}
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

export default AddEditSubscription;
