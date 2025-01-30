import axios from "axios";
import { useState } from "react";

const Incident = () => {
  const [location, setLocation] = useState("");

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported in your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const googleMapsLink = `https://www.google.com/maps?q=${position.coords.latitude},${position.coords.longitude}`;
        setLocation(googleMapsLink);
      },
      () => alert("Failed to retrieve location.")
    );
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#1d232a]">
      <div className="bg-gray-600 p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Report an Incident
        </h2>

        <form className="space-y-4">
          {/* Incident Type */}
          <div>
            <label className="block text-sm font-medium text-white">
              Type of Incident
            </label>
            <select className="w-full mt-1 p-2 border rounded-lg">
              <option>Fire</option>
              <option>Earthquake</option>
              <option>Flood</option>
              <option>Accident</option>
              <option>Other</option>
            </select>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white">
                Date
              </label>
              <input
                type="date"
                className="w-full mt-1 p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white">
                Time
              </label>
              <input
                type="time"
                className="w-full mt-1 p-2 border rounded-lg"
              />
            </div>
          </div>

          {/* Location with Get Location Button */}
          <div>
            <label className="block text-sm font-medium text-white">
              Location
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location or use GPS"
                className="w-full mt-1 p-2 border rounded-lg text-white"
              />
              <button
                type="button"
                onClick={getLocation}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Get Location
              </button>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-white">
              Description
            </label>
            <textarea
              rows="4"
              className="w-full mt-1 p-2 border rounded-lg"
              placeholder="Provide more details..."
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              onClick={SeneSoS}
            >
              Send SOS
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const SeneSoS = async (event) => {
  event.preventDefault();
  const response = await axios.post("http://localhost:3000/send-sms", {
    location: location,
  });
  console.log(response.data);
  alert("SOS Sent!");
};
export default Incident;
