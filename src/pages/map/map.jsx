import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaCamera, FaMap, FaPlay, FaFlagCheckered } from "react-icons/fa";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

const Map = () => {
  const [score, setScore] = useState(() => {
    const stored = sessionStorage.getItem("score");
    return stored ? Number(stored) : 0;
  });

  const [showScanner, setShowScanner] = useState(false);
  const [scanned, setScanned] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleBeforeUnload = () => sessionStorage.removeItem("score");
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  useEffect(() => {
    sessionStorage.setItem("score", score);
  }, [score]);

  const handleScanned = (data) => {
    if (data && !scanned) {
      const newScore = score + 10;
      setScore(newScore);
      sessionStorage.setItem("score", newScore);
      setScanned(true);
      alert("QR Code Scanned! You earned 10 points.");

      setTimeout(() => {
        setShowScanner(false);
        setScanned(false);
      }, 1000);
    }
  };

  // Checkpoints except start and end
  const checkpoints = [
    { id: 2, label: "Registration" },
    { id: 3, label: "Workshop" },
    { id: 4, label: "Exhibition" },
    { id: 5, label: "Gaming Zone" },
    { id: 6, label: "Auditorium" },
    { id: 7, label: "Food Court" },
  ];

  // Map point positions
  const positions = [
    { left: "95%", top: "85%" }, // START (old 1)
    { left: "65%", top: "88%" }, // 2
    { left: "80%", top: "65%" }, // 3
    { left: "50%", top: "60%" }, // 4
    { left: "65%", top: "40%" }, // 5
    { left: "25%", top: "35%" }, // 6
    { left: "50%", top: "20%" }, // 7
    { left: "35%", top: "2%" },  // END (old 8)
  ];

  const BottomNav = () => (
    <div className="w-full flex justify-center items-center bg-[#0B1C33] py-3 mt-6 rounded-t-2xl shadow-inner">
      <div className="flex justify-around items-center w-1/2 min-w-[250px]">
        <button
          onClick={() => {
            setShowScanner(false);
            navigate("/profile");
          }}
          className="flex flex-col items-center text-gray-300 hover:text-white transition"
        >
          <FaUser size={22} />
          <span className="text-xs mt-1">Leaderboard</span>
        </button>

        <button
          onClick={() => {
            setShowScanner(false);
            navigate("/map");
          }}
          className="flex flex-col items-center text-[#1E9BFF] font-semibold transition"
        >
          <FaMap size={22} />
          <span className="text-xs mt-1">Map</span>
        </button>

        <button
          onClick={() => {
            setShowScanner(true);
            setScanned(false);
          }}
          className="flex flex-col items-center text-gray-300 hover:text-white transition"
        >
          <FaCamera size={22} />
          <span className="text-xs mt-1">Scan</span>
        </button>
      </div>
    </div>
  );

  return (
    <div
      className="relative flex flex-col items-center min-h-screen text-white overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #224E61 0%, #18354E 50%, #0D1B3A 100%)",
      }}
    >
      {/* Header */}
      <div className="relative z-10 text-center mt-8">
        <h2 className="text-lg font-bold">YOUR EVENT JOURNEY AWAITS!</h2>
        <p className="text-[#B4C1D9] text-sm">
          Track your stops, earn points, and complete the roadmap!
        </p>
      </div>

      {/* Map */}
      <div className="relative flex flex-col items-center mt-12 z-10 w-full px-4">
        <div className="relative w-full max-w-sm" style={{ height: "420px" }}>
          {/* White path */}
          <svg
            className="absolute top-0 left-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              d={positions
                .map((pos, index, arr) => {
                  const x = parseFloat(pos.left);
                  const y = parseFloat(pos.top);
                  if (index === 0) return `M ${x} ${y}`;
                  const prev = arr[index - 1];
                  const prevX = parseFloat(prev.left);
                  const prevY = parseFloat(prev.top);
                  const cx = (prevX + x) / 2 + (index % 2 === 0 ? 5 : -5);
                  const cy = (prevY + y) / 2 + (index % 2 === 0 ? -5 : 5);
                  return `Q ${cx} ${cy}, ${x} ${y}`;
                })
                .join(" ")}
              fill="none"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.9"
            />
          </svg>

          {/* START POINT */}
          <div
            className="absolute flex flex-col items-center"
            style={{
              left: positions[0].left,
              top: positions[0].top,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center shadow-lg">
              <FaPlay className="text-white text-lg" />
            </div>
            {/* <p className="text-xs mt-2 text-yellow-300 font-semibold">Start</p> */}
          </div>

          {/* CHECKPOINTS */}
          {checkpoints.map((point, index) => {
            const posIndex = index + 1; // since start used index 0
            const pos = positions[posIndex];
            const isLeft = [1, 3, 5].includes(posIndex); // points 2,4,6 (index 1,3,5)
            const bgColor = isLeft ? "bg-red-500" : "bg-yellow-400";
            const labelSide = isLeft ? "left-[-90px]" : "left-[60px]";
            const textAlign = isLeft ? "text-right" : "text-left";

            return (
              <div
                key={point.id}
                className="absolute"
                style={{
                  left: pos.left,
                  top: pos.top,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="flex flex-col items-center relative">
                  <div
                    className={`absolute ${labelSide} top-1/2 -translate-y-1/2 ${textAlign} w-20`}
                  >
                    <p className="text-xs text-white font-medium">{point.label}</p>
                  </div>
                  <div
                    onClick={() =>
                      alert(`You clicked on ${point.label}! +10 points 🎯`)
                    }
                    className={`w-9 h-9 ${bgColor} border-[2px] border-white rounded-full cursor-pointer hover:scale-110 transition-transform flex items-center justify-center shadow-md`}
                  >
                    <span className="text-white font-bold text-xs">
                      {String(point.id).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* END POINT */}
          <div
            className="absolute flex flex-col items-center"
            style={{
              left: positions[7].left,
              top: positions[7].top,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shadow-lg">
              <FaFlagCheckered className="text-white text-lg" />
            </div>
            {/* <p className="text-xs mt-2 text-blue-300 font-semibold">End</p> */}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 w-full z-10">
        <BottomNav />
      </div>

      {/* QR Scanner Popup */}
      {showScanner && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-[90%] max-w-md flex flex-col items-center">
            <h2 className="text-lg font-bold mb-4 text-center text-blue-600">
              Scan a QR Code
            </h2>
            <BarcodeScannerComponent
              width={350}
              height={250}
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
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;
