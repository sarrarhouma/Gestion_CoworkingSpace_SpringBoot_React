import React, { useEffect, useState } from "react";
import { getReservations, deleteReservation } from "../services/api";
import { useNavigate } from "react-router-dom";

const ReservationsPage = () => {
    const [reservations, setReservations] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false); // Simulate admin authentication
    const [loading, setLoading] = useState(true); // Loading state for better UX
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const data = await getReservations();
                // Map data if meetingRoom uses a different key
                const mappedData = data.map((reservation) => ({
                    ...reservation,
                    meetingRoom: reservation.room || reservation.meetingRoom, // Ensure correct field
                }));
                console.log("Mapped reservations data:", mappedData);
                setReservations(mappedData);
            } catch (error) {
                console.error("Error fetching reservations:", error);
                alert("Failed to fetch reservations. Please try again later.");
            } finally {
                setLoading(false); // Ensure loading state is turned off
            }
        };
        fetchReservations();

        // Simulate admin check
        setIsAdmin(true); // Replace with actual authentication logic
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this reservation?")) {
            try {
                await deleteReservation(id);
                setReservations((prevReservations) =>
                    prevReservations.filter((reservation) => reservation.id !== id)
                );
                console.log("Reservation successfully deleted");
            } catch (error) {
                console.error("Error deleting reservation:", error);
                alert("Failed to delete reservation. Please try again later.");
            }
        }
    };

    if (loading) {
        return <p className="text-center py-6">Loading reservations...</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">  Liste des Reservations </h1>

            {isAdmin && (
                <div className="mb-4 text-right">
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        onClick={() => navigate("/reservations/add")}
                    >
                        Ajouter une réservation
                    </button>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 bg-white rounded-lg shadow-lg">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="text-left py-2 px-4 border-b">Salle</th>
                            <th className="text-left py-2 px-4 border-b">Réservé par</th>
                            <th className="text-left py-2 px-4 border-b">Début</th>
                            <th className="text-left py-2 px-4 border-b">Fin</th>
                            {isAdmin && <th className="text-left py-2 px-4 border-b">Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map((reservation) => (
                                    <tr key={reservation.id} className="hover:bg-gray-50">
                                        <td className="py-2 px-4 border-b">
                                        {reservation.member?.reservedRooms?.[0]?.name || "Non spécifiée"}
                                    </td>
                                <td className="py-2 px-4 border-b">
                                    {reservation.member?.fullName || "Anonyme"}
                                </td>
                                <td className="py-2 px-4 border-b">
                                    {reservation.startTime
                                        ? new Date(reservation.startTime).toLocaleString()
                                        : "Non spécifié"}
                                </td>
                                <td className="py-2 px-4 border-b">
                                    {reservation.endTime
                                        ? new Date(reservation.endTime).toLocaleString()
                                        : "Non spécifié"}
                                </td>
                                {isAdmin && (
                                    <td className="py-2 px-4 border-b space-x-2">
                                        <button
                                            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                                            onClick={() => navigate(`/reservations/edit/${reservation.id}`)}
                                        >
                                            Modifier
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                            onClick={() => handleDelete(reservation.id)}
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

export default ReservationsPage;
