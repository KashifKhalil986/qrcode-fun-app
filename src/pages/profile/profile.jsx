import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaCamera, FaMap, FaUserCircle } from "react-icons/fa";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const storedScore = localStorage.getItem("score");
    if (storedScore) {
      setScore(Number(storedScore));
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-r from-blue-100 to-blue-200 px-4">
      <div className="flex items-center justify-center py-8">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md text-center">
          <FaUserCircle className="mx-auto text-blue-600 mb-4" size={80} />

          <h1 className="text-3xl font-bold mb-6 text-blue-700">Profile</h1>

          {user ? (
            <div className="space-y-3 text-gray-700 text-left">
              <p className="flex justify-between border-b pb-2">
                <span className="font-semibold">Name:</span> {user.name}
              </p>
              <p className="flex justify-between border-b pb-2">
                <span className="font-semibold">Department:</span> {user.department}
              </p>
              <p className="flex justify-between border-b pb-2">
                <span className="font-semibold">Email:</span> {user.email}
              </p>
              {user.phone && (
                <p className="flex justify-between border-b pb-2">
                  <span className="font-semibold">Phone:</span> {user.phone}
                </p>
              )}
              <p className="flex justify-between text-lg font-bold text-blue-600">
                <span>Score:</span> {score}
              </p>
              <div className="w-full flex justify-around items-center bg-gray-50 py-3 rounded-t-xl shadow-inner">
        <button
          onClick={() => navigate("/profile")}
          className="flex flex-col items-center text-blue-800 font-bold transition"
        >
          <FaUser size={26} />
          <span className="text-xs mt-1">Profile</span>
        </button>

        <button
          onClick={() => navigate("/map")}
          className="flex flex-col items-center text-blue-600 hover:text-blue-800 transition"
        >
          <FaMap size={26} />
          <span className="text-xs mt-1">Map</span>
        </button>

        <button
          onClick={() => navigate("/map")} 
          className="flex flex-col items-center text-blue-600 hover:text-blue-800 transition"
        >
          <FaCamera size={26} />
          <span className="text-xs mt-1">Camera</span>
        </button>
      </div>
            </div>
            
          ) : (
            <p className="text-gray-500">No user data found.</p>
          )}
        </div>
        
      </div>

      
    </div>
  );
};

export default Profile;
