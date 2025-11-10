import axios from "axios";

const API_BASE = "http://127.0.0.1:8000/api/flights";

export const searchFlights = async (params) => {
    const response = await axios.get(`${API_BASE}/search/`, { params });
    return response.data;
};
