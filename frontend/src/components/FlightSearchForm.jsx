import { useState } from "react";

const FlightSearchForm = ({ onSearch }) => {
    const [form, setForm] = useState({
        origin: "",
        destination: "",
        departure_date: "",
        return_date: "",
        adults: 1,
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(form);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-2xl shadow-md grid gap-4 sm:grid-cols-2 md:grid-cols-3"
        >
            <input
                type="text"
                name="origin"
                placeholder="Origin (e.g. LAX)"
                value={form.origin}
                onChange={handleChange}
                className="border p-2 rounded"
                required
            />
            <input
                type="text"
                name="destination"
                placeholder="Destination (e.g. JFK)"
                value={form.destination}
                onChange={handleChange}
                className="border p-2 rounded"
                required
            />
            <input
                type="date"
                name="departure_date"
                value={form.departure_date}
                onChange={handleChange}
                className="border p-2 rounded"
                required
            />
            <input
                type="date"
                name="return_date"
                value={form.return_date}
                onChange={handleChange}
                className="border p-2 rounded"
            />
            <input
                type="number"
                name="adults"
                min="1"
                value={form.adults}
                onChange={handleChange}
                className="border p-2 rounded"
            />
            <button
                type="submit"
                className="col-span-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
                Search Flights
            </button>
        </form>
    );
};

export default FlightSearchForm;
