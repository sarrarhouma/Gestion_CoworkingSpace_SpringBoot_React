import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8081", // URL de votre backend
    headers: { "Content-Type": "application/json" },
});

// Fonction pour encoder en Base64
const encodeBasicAuth = (username, password) => {
    return "Basic " + btoa(`${username}:${password}`);
};

// Ajouter les en-têtes d'authentification
const getAuthHeaders = () => {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");

    if (username && password) {
        return { Authorization: encodeBasicAuth(username, password) };
    }
    return {};
};

// Intercepteur pour chaque requête
api.interceptors.request.use(
    (config) => {
        config.headers = { ...config.headers, ...getAuthHeaders() };
        console.log("Request Headers:", config.headers); // Debug
        return config;
    },
    (error) => Promise.reject(error)
);

// -------- API pour les Meeting Rooms --------
export const getMeetingRooms = async () => {
    const response = await api.get('/rooms');
    return response.data;
};

export const getMeetingRoomById = async (id) => {
    console.log("Fetching room ID:", id); // Debug
    const response = await api.get(`/rooms/${id}`);
    return response.data;
};

export const addMeetingRoom = async (room) => {
    const response = await api.post('/rooms/add', room);
    return response.data;
};

export const updateMeetingRoom = async (id, room) => {
    const response = await api.put(`/rooms/edit/${id}`, room);
    return response.data;
};

export const deleteMeetingRoom = async (id) => {
    const response = await api.delete(`/rooms/delete/${id}`);
    return response.status;
};


// -------- API pour les Members --------
export const getMembers = async () => {
    const response = await api.get("/members");
    return response.data;
};

export const searchMembers = async (keyword, page = 1, size = 5) => {
    const response = await api.get("/members/search", {
        params: { mc: keyword, page, size },
    });
    return response.data;
};

export const addMember = async (member) => {
    const response = await api.post("/members/add", member);
    return response.data;
};

export const editMember = async (id, member) => {
    const response = await api.put(`/members/edit/${id}`, member);
    return response.data;
};

export const deleteMember = async (id) => {
    const response = await api.delete(`/members/delete/${id}`);
    return response.status;
};

// -------- API pour les réservations --------
export const getReservations = async () => {
    const response = await api.get("/reservations");
    return response.data;
};

export const getReservationById = async (id) => {
    const response = await api.get(`/reservations/${id}`);
    return response.data;
};

export const addReservation = async (reservation) => {
    const response = await api.post("/reservations/add", reservation);
    return response.data;
};

export const updateReservation = async (id, reservation) => {
    const response = await api.put(`/reservations/edit/${id}`, reservation);
    return response.data;
};

export const deleteReservation = async (id) => {
    const response = await api.delete(`/reservations/delete/${id}`);
    return response.status;
};
// -------- API pour les Subscriptions --------
export const getSubscriptions = async () => {
    const response = await api.get('/subscriptions');
    return response.data;
};

export const searchSubscriptions = async (keyword, page = 1, size = 5) => {
    const response = await api.get('/subscriptions/search', {
        params: { mc: keyword, page, size },
    });
    return response.data;
};

export const addSubscription = async (subscription) => {
    const response = await api.post('/subscriptions/add', subscription);
    return response.data;
};

export const editSubscription = async (id, subscription) => {
    const response = await api.put(`/subscriptions/edit/${id}`, subscription);
    return response.data;
};

export const deleteSubscription = async (id) => {
    const response = await api.delete(`/subscriptions/delete/${id}`);
    return response.status;
};
