import React, { useState } from 'react';
import FlightCard from './FlightCard';
import BookingModal from './BookingModal';

const FlightList = ({ flights }) => {
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');

    const handleBook = (flight) => {
        setSelectedFlight(flight);
        setIsModalOpen(true);
        setSuccessMsg('');
    };

    const handleConfirmBooking = async (formData) => {
        setLoading(true);
        try {
            const res = await fetch('http://localhost:8000/api/flights/book/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    flight_id: selectedFlight.id,
                    full_name: formData.full_name,
                    email: formData.email,
                }),
            });

            const data = await res.json();
            if (res.ok) {
                setSuccessMsg(`✅ Test booking created for ${formData.full_name}!`);
            } else {
                setSuccessMsg(`❌ Booking failed: ${data.error || 'Unknown error'}`);
            }
        } catch (err) {
            setSuccessMsg(`❌ Booking failed: ${err.message}`);
        } finally {
            setLoading(false);
            setIsModalOpen(false);
            setTimeout(() => setSuccessMsg(''), 4000); // hide after 4s
        }
    };

    return (
        <div className="relative">
            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <div className="w-12 h-12 border-4 border-white border-t-blue-500 rounded-full animate-spin"></div>
                </div>
            )}

            {successMsg && (
                <div className="fixed top-5 right-5 bg-white border border-gray-300 shadow-lg rounded-lg px-4 py-2 text-gray-800 font-medium z-50 animate-fade-in">
                    {successMsg}
                </div>
            )}

            {flights.length > 0 ? (
                flights.map((f) => (
                    <FlightCard key={f.id} flight={f} onBook={() => handleBook(f)} />
                ))
            ) : (
                <p className="text-gray-600">No flights found.</p>
            )}

            <BookingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                flight={selectedFlight}
                onConfirm={handleConfirmBooking}
            />
        </div>
    );
};

export default FlightList;
