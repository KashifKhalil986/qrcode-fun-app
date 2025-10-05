import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaCamera, FaMap } from "react-icons/fa";
import QRCode from "react-qr-code";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

const Map = () => {
  const [score, setScore] = useState(0);
  const [showQr, setShowQr] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [popupPoint, setPopupPoint] = useState(null);
  const [scanned, setScanned] = useState(false);
  const navigate = useNavigate();

  const mapURL = "http://localhost:5173/map";
  // const mapURL = "https://qrcode-fun-app.vercel.app/map";

  useEffect(() => {
    localStorage.setItem("score", score);
  }, [score]);

  const handleScanned = (data) => {
    if (data && !scanned) {
      console.log("Scanned QR Code:", data);
      setScore((prev) => prev + 10);
      setScanned(true);
      alert("QR Code Scanned! Congrats, you earned 10 points.");

      setTimeout(() => {
        setShowScanner(false);
        setScanned(false);
      }, 800);
    }
  };

  const handlePointClick = (point) => {
    setPopupPoint(point);
  };

  const BottomNav = () => (
    <div className="w-full flex justify-around items-center bg-gray-50 py-3 mt-6 rounded-xl shadow-inner">
      {/* Profile */}
      <button
        onClick={() => {
          setShowScanner(false);
          navigate("/profile");
        }}
        className="flex flex-col items-center text-blue-600 hover:text-blue-800 transition"
      >
        <FaUser size={26} />
        <span className="text-xs mt-1">Profile</span>
      </button>

      <button
        onClick={() => {
          setShowScanner(false); 
          navigate("/map");
        }}
        className="flex flex-col items-center text-blue-800 font-bold transition"
      >
        <FaMap size={26} />
        <span className="text-xs mt-1">Map</span>
      </button>

      <button
        onClick={() => {
          setShowScanner(true);
          setScanned(false);
        }}
        className="flex flex-col items-center text-blue-600 hover:text-blue-800 transition"
      >
        <FaCamera size={26} />
        <span className="text-xs mt-1">Camera</span>
      </button>
    </div>
  );

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 py-6 px-4">
      <div className="bg-white rounded-2xl shadow-xl flex flex-col items-center p-6 w-full max-w-lg relative">
        <h1 className="text-xl font-bold mb-6">
          <span className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-md">
            Score: {score}
          </span>
        </h1>

        <div className="relative">
          <svg
            width="300"
            height="500"
            className="bg-gray-50 rounded-xl shadow-lg border border-gray-200"
          >
            <polyline
              points="50,50 150,100 50,150 150,200 50,250 150,300 50,350 150,400 50,450"
              fill="none"
              stroke="#2563eb"
              strokeWidth="3"
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
                r="12"
                fill="#ef4444"
                className="cursor-pointer hover:fill-green-500 transition-colors"
                onClick={() => handlePointClick(point)}
              />
            ))}
          </svg>

          {popupPoint && (
            <div
              className="absolute bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-sm animate-fade-in"
              style={{
                top: popupPoint.y - 40,
                left: popupPoint.x + 20,
              }}
            >
              <h3 className="font-semibold text-blue-600">🎯 Point Clicked</h3>
              <p className="text-gray-600">You clicked a map point!</p>
              <button
                className="mt-2 px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                onClick={() => setPopupPoint(null)}
              >
                Close
              </button>
            </div>
          )}
        </div>

        <BottomNav />
      </div>

      {showQr && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-80 flex flex-col items-center">
            <h2 className="text-lg font-bold mb-4 text-blue-600">
              Scan QR Code
            </h2>
            <QRCode value={mapURL} size={200} />
            <button
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md"
              onClick={() => setShowQr(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showScanner && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-[90%] max-w-md flex flex-col items-center">
            <h2 className="text-lg font-bold mb-4 text-center text-blue-600">
              Scan a QR Code
            </h2>
            <BarcodeScannerComponent
              width={400}
              height={300}
              onUpdate={(err, result) => {
                if (result) handleScanned(result.text);
              }}
            />
            <button
              className="mt-6 w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition shadow-md"
              onClick={() => setShowScanner(false)}
            >
              Cancel
            </button>

            <BottomNav />
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;
