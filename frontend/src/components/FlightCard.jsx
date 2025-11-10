import React from "react";

const FlightCard = ({ flight, onBook }) => {
    return (
        <div className="border border-gray-700 rounded-2xl p-6 shadow-lg bg-gray-800/60 mb-5 hover:shadow-blue-600/20 hover:scale-[1.02] transition-all duration-200">
            <div className="flex justify-between items-center mb-3">
                <div>
                    <h2 className="text-lg font-semibold text-gray-100">
                        {flight.airline} {flight.flight_number}
                    </h2>
                    <p className="text-sm text-gray-400">
                        {flight.origin} → {flight.destination}
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-2xl font-bold text-blue-400">
                        {flight.price} {flight.currency}
                    </p>
                    <p className="text-sm text-gray-500">per adult</p>
                </div>
            </div>

            <div className="flex justify-between text-gray-300 mb-3">
                <div>
                    <p className="font-medium text-gray-200">Departure</p>
                    <p>{new Date(flight.departure_time).toLocaleString()}</p>
                </div>
                <div>
                    <p className="font-medium text-gray-200">Arrival</p>
                    <p>{new Date(flight.arrival_time).toLocaleString()}</p>
                </div>
            </div>

            {flight.duration && (
                <p className="text-sm text-gray-400 mb-3">
                    Duration: {flight.duration.replace("PT", "").toLowerCase()}
                </p>
            )}

            <div className="flex justify-end">
                <button
                    onClick={() => onBook(flight)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg transition-colors"
                >
                    Book (Test)
                </button>
            </div>
        </div>
    );
};

export default FlightCard;
