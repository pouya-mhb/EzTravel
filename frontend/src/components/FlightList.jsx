import FlightCard from "./FlightCard";

const FlightList = ({ flights, onSelect }) => {
    if (!flights.length)
        return <p className="text-center text-gray-500 mt-6">No flights found.</p>;

    return (
        <div className="mt-6 grid gap-4">
            {flights.map((f) => (
                <FlightCard key={f.offer_id} flight={f} onSelect={onSelect} />
            ))}
        </div>
    );
};

export default FlightList;
