import { useState, useEffect } from "react";
import { FaUser, FaCamera } from "react-icons/fa";
import QRCode from "react-qr-code";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

const Map = () => {
  const [score, setScore] = useState(0);
  const [showProfile, setShowProfile] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [user, setUser] = useState(null); 

  // const mapURL = "http://localhost:5173/map";
  const mapURL = "https://qrcode-fun-app-pkls.vercel.app/map";

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleScanned = (data) => {
    if (data) {
      console.log("Scanned QR Code:", data);
      setScore((prev) => prev + 10);
      setShowScanner(false);
    }
  };

  const handlePointClick = () => {
    setShowPopup(true);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-6">
      {/* Main Map Block */}
      <div className="bg-white rounded-lg shadow-lg flex flex-col items-center p-4">
        {/* Score */}
        <h1 className="text-2xl font-bold mb-4 text-blue-600">Score: {score}</h1>

        {/* SVG Map */}
        <svg width="300" height="500" className="bg-gray-50 rounded-lg shadow">
          <polyline
            points="50,50 150,100 50,150 150,200 50,250 150,300 50,350 150,400 50,450"
            fill="none"
            stroke="black"
            strokeWidth="2"
          />
          {[
            { x: 150, y: 100 },
            { x: 150, y: 200 },
            { x: 150, y: 300 },
            { x: 150, y: 400 },
            { x: 50, y: 150 },
            { x: 50, y: 250 },
            { x: 50, y: 350 },
            { x: 50, y: 450 },
          ].map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r="10"
              fill="red"
              className="cursor-pointer hover:fill-green-500 transition"
              onClick={handlePointClick}
            />
          ))}
        </svg>

        {/* Bottom Nav (directly under the map) */}
        <div className="w-full flex justify-around items-center bg-gray-100 py-3 mt-4 rounded-lg">
          <button
            onClick={() => setShowProfile(true)}
            className="flex flex-col items-center text-blue-600"
          >
            <FaUser size={24} />
            <span className="text-xs">Profile</span>
          </button>

          <button
            onClick={() => setShowScanner(true)}
            className="flex flex-col items-center text-blue-600"
          >
            <FaCamera size={24} />
            <span className="text-xs">Camera</span>
          </button>
        </div>
      </div>

      {showProfile && user && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-80">
            <h2 className="text-lg font-bold mb-4">Profile</h2>
            <p>
              <span className="font-semibold">Name:</span> {user.name}
            </p>
            <p>
              <span className="font-semibold">Department:</span> {user.department}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {user.email}
            </p>
            {user.phone && (
              <p>
                <span className="font-semibold">Phone:</span> {user.phone}
              </p>
            )}
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
              onClick={() => setShowProfile(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showQr && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-80 flex flex-col items-center">
            <h2 className="text-lg font-bold mb-4">Scan QR Code</h2>
            <QRCode value={mapURL} size={200} />
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
              onClick={() => setShowQr(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showScanner && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-white p-4 rounded-lg shadow-lg w-[90%] max-w-md">
            <h2 className="text-lg font-bold mb-4 text-center">Scan a QR Code</h2>
            <BarcodeScannerComponent
              width={400}
              height={300}
              onUpdate={(err, result) => {
                if (result) {
                  handleScanned(result.text);
                }
              }}
            />
            <button
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg w-full"
              onClick={() => setShowScanner(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-80">
            <h2 className="text-lg font-bold mb-4">Point Clicked</h2>
            <p>You clicked on a red point!</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;
