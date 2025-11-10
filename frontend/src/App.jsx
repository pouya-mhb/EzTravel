import React, { useState } from "react";
import { Plane, Search } from "lucide-react";
import FlightSearchForm from "./components/FlightSearchForm";
import FlightList from "./components/FlightList";

const App = () => {
  const [flights, setFlights] = useState([]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-gray-100 flex flex-col items-center py-10 px-4">
      {/* Header */}
      <div className="flex items-center mb-10 gap-3">
        <Plane className="w-10 h-10 text-blue-400" />
        <h1 className="text-4xl font-extrabold tracking-tight text-white drop-shadow">
          EzTravel
        </h1>
      </div>

      {/* Main container */}
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-10">
        {/* Search Panel */}
        <div className="bg-gray-900/70 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-gray-800">
          <div className="flex items-center gap-2 mb-6">
            <Search className="w-5 h-5 text-blue-400" />
            <h2 className="text-xl font-semibold text-gray-200">
              Search Flights
            </h2>
          </div>

          <FlightSearchForm onResults={setFlights} />
        </div>

        {/* Results Panel */}
        <div className="bg-gray-900/70 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-gray-800 overflow-y-auto">
          <FlightList flights={flights} />
        </div>
      </div>
    </div>
  );
};

export default App;
