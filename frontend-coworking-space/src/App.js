import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ReservationsPage from "./pages/ReservationsPage";
import MembersPage from "./pages/MembersPage";
import SubscriptionsPage from "./pages/SubscriptionsPage";
import MeetingRoomsPage from "./pages/MeetingRoomsPage";
import AddEditRoom from "./pages/AddEditRoom";
import AddEditMember from "./pages/AddEditMember";
import AddEditReservation from "./pages/AddEditReservation";
import AddEditSubscription from "./pages/AddEditSubscription";
import Navbar from "./components/Navbar";

const AppContent = () => {
    const location = useLocation(); // Get the current route

    // Define routes where the Navbar should not appear
    const noNavbarRoutes = ["/login"];

    return (
        <div>
            {/* Conditionally render Navbar */}
            {!noNavbarRoutes.includes(location.pathname) && <Navbar />}
            <Routes>
                <Route path="/home" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/rooms" element={<MeetingRoomsPage />} />
                <Route path="/rooms/add" element={<AddEditRoom />} />
                <Route path="/rooms/edit/:id" element={<AddEditRoom />} />
                <Route path="/reservations" element={<ReservationsPage />} />
                <Route path="/reservations/add" element={<AddEditReservation />} />
                <Route path="/reservations/edit/:id" element={<AddEditReservation />} />
                <Route path="/members" element={<MembersPage />} />
                <Route path="/members/add" element={<AddEditMember />} />
                <Route path="/members/edit/:id" element={<AddEditMember />} />
                <Route path="/subscriptions" element={<SubscriptionsPage />} />
                <Route path="/subscriptions/add" element={<AddEditSubscription />} />
                <Route path="/subscriptions/edit/:id" element={<AddEditSubscription />} />
            </Routes>
        </div>
    );
};

const App = () => {
    return (
        <Router>
            <AppContent />
        </Router>
    );
};

export default App;
