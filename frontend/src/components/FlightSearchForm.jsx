import React, { useState } from "react";

const FlightSearchForm = ({ onResults }) => {
    const [tripType, setTripType] = useState("oneway"); // oneway | roundtrip
    const [formData, setFormData] = useState({
        origin: "",
        destination: "",
        departure_date: "",
        returnDate: "",
        adults: 1,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Simple validation
        if (
            !formData.origin ||
            !formData.destination ||
            !formData.departure_date ||
            !formData.adults
        ) {
            alert("Please fill in all required fields.");
            return;
        }

        // Build URL params dynamically
        const params = new URLSearchParams({
            origin: formData.origin,
            destination: formData.destination,
            departure_date: formData.departure_date,
            adults: formData.adults,
        });

        if (tripType === "roundtrip" && formData.returnDate)
            params.append("returnDate", formData.returnDate);

        try {
            const response = await fetch(
                `http://127.0.0.1:8000/api/flights/search/?${params.toString()}`
            );

            if (!response.ok) throw new Error("Failed to fetch flights");

            const data = await response.json();
            onResults(data);
        } catch (error) {
            console.error("Error:", error);
            onResults([]);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6 animate-fade-in text-gray-100"
        >
            {/* Trip Type Toggle */}
            <div className="flex justify-center gap-4 mb-6">
                <button
                    type="button"
                    onClick={() => setTripType("oneway")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${tripType === "oneway"
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                        }`}
                >
                    One-way
                </button>
                <button
                    type="button"
                    onClick={() => setTripType("roundtrip")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${tripType === "roundtrip"
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                        }`}
                >
                    Round-trip
                </button>
            </div>

            {/* Origin / Destination */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                        Origin
                    </label>
                    <input
                        type="text"
                        name="origin"
                        value={formData.origin}
                        onChange={handleChange}
                        placeholder="e.g. LAX"
                        className="w-full px-4 py-2 rounded-xl bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                        Destination
                    </label>
                    <input
                        type="text"
                        name="destination"
                        value={formData.destination}
                        onChange={handleChange}
                        placeholder="e.g. JFK"
                        className="w-full px-4 py-2 rounded-xl bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        required
                    />
                </div>
            </div>

            {/* Departure / Return Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                        Departure Date
                    </label>
                    <input
                        type="date"
                        name="departure_date"
                        value={formData.departure_date}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-xl bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        required
                    />
                </div>

                {tripType === "roundtrip" && (
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Return Date
                        </label>
                        <input
                            type="date"
                            name="returnDate"
                            value={formData.returnDate}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-xl bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            required={tripType === "roundtrip"}
                        />
                    </div>
                )}
            </div>

            {/* Adults */}
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                    Adults
                </label>
                <input
                    type="number"
                    name="adults"
                    min="1"
                    value={formData.adults}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-xl bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    required
                />
            </div>

            {/* Submit Button */}
            <div className="pt-3">
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl shadow-md hover:shadow-blue-600/30 transition-all duration-200"
                >
                    Search Flights
                </button>
            </div>
        </form>
    );
};

export default FlightSearchForm;
