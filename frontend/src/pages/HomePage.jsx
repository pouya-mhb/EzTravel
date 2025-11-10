import { useState } from "react";
import { searchFlights } from "../api/flights";
import FlightSearchForm from "../components/FlightSearchForm";
import FlightList from "../components/FlightList";

const HomePage = () => {
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (form) => {
        try {
            setLoading(true);
            const data = await searchFlights(form);
            setFlights(data);
        } catch (error) {
            console.error(error);
            alert("Error fetching flights");
        } finally {
            setLoading(false);
        }
    };

    const handleSelect = (flight) => {
        alert(`Selected flight: ${flight.airline} ${flight.flight_number}`);
        // TODO: redirect to booking page later
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-center mb-6">✈️ EzTravel</h1>
            <FlightSearchForm onSearch={handleSearch} />
            {loading ? (
                <p className="text-center mt-6">Loading flights...</p>
            ) : (
                <FlightList flights={flights} onSelect={handleSelect} />
            )}
        </div>
    );
};

export default HomePage;
