const FlightCard = ({ flight, onSelect }) => {
    return (
        <div className="bg-white shadow-lg rounded-xl p-4 flex justify-between items-center hover:shadow-xl transition">
            <div>
                <h3 className="font-semibold text-lg">
                    {flight.airline} {flight.flight_number}
                </h3>
                <p className="text-gray-600">
                    {flight.origin} → {flight.destination}
                </p>
                <p className="text-sm text-gray-500">
                    {new Date(flight.departure_time).toLocaleString()} →{" "}
                    {new Date(flight.arrival_time).toLocaleString()}
                </p>
            </div>
            <div className="text-right">
                <p className="text-xl font-bold">
                    {flight.price} {flight.currency}
                </p>
                <button
                    onClick={() => onSelect(flight)}
                    className="mt-2 bg-green-600 text-white px-4 py-1 rounded-lg hover:bg-green-700"
                >
                    Book
                </button>
            </div>
        </div>
    );
};

export default FlightCard;
