// src/api/flights.js

const API_BASE =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:8000"; // change if needed

export async function searchFlights(params) {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE}/api/flights/search/?${query}`);

    if (!response.ok) throw new Error("Failed to fetch flights");
    return await response.json();
}

export async function bookFlight(bookingData) {
    const response = await fetch(`${API_BASE}/api/flights/book/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Booking failed");
    }

    return await response.json();
}
