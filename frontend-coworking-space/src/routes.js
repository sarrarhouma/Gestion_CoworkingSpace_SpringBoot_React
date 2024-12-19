import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MeetingRoomsPage from "./pages/MeetingRoomsPage";
import AddEditRoom from "./pages/AddEditRoom";
import AddEditReservation from "./pages/AddEditReservation";
import MembersPage from "./pages/MembersPage";
import ReservationsPage from "./pages/ReservationsPage";
import SubscriptionsPage from "./pages/SubscriptionsPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AddEditMember from "./pages/AddEditMember";
import AddEditSubscription from "./pages/AddEditSubscription";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/home" element={<HomePage />} />
                <Route path="/rooms" element={<MeetingRoomsPage />} />
                <Route path="/rooms/add" element={<AddEditRoom />} />
                <Route path="/rooms/edit/:id" element={<AddEditRoom />} />
                <Route path="/members" element={<MembersPage />} />
                <Route path="/members/add" element={<AddEditMember />} />
                <Route path="/members/edit/:id" element={<AddEditMember />} />
                <Route path="/reservations" element={<ReservationsPage />} />
                <Route path="/reservations/add" element={<AddEditReservation />} />
                <Route path="/reservations/edit/:id" element={<AddEditReservation />} />
                <Route path="/subscriptions" element={<SubscriptionsPage />} />
                <Route path="/subscriptions/add" element={<AddEditSubscription />} />
                <Route path="/subscriptions/edit/:id" element={<AddEditSubscription />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
