import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaMap,
  FaPlay,
  FaFlagCheckered,
  FaClock,
} from "react-icons/fa";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

const Map = () => {
  const [score, setScore] = useState(() => {
    const s = sessionStorage.getItem("score");
    return s ? Number(s) : 0;
  });

  const [showScanner, setShowScanner] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [activePoint, setActivePoint] = useState(null); 
  const navigate = useNavigate();

  const pointsData = [
    { id: "start", title: "Welcome Desk", subtitle: "Start Point", description: "Check in here to begin your event journey. Collect your kit and map.", time: "Day 1 — 10:00 AM onward", type: "start" },
    { id: 1, no:1, title: "Futuristic Welcome", subtitle: "Onboarding", description: "Register and collect your event badge. Our volunteers will guide you.", time: "Day 1 — 11:00 AM onward", type: "left" },
    { id: 2, no:2, title: "Event Passport", subtitle: "Hands-on Session", description: "Interactive workshop on the latest tools and workflows. Seats limited.", time: "Day 1 — 2:00 PM onward", type: "right" },
    { id: 3, no: 3, title: "AI Challenges", subtitle: "Interactive Experience", description: "Step into the Metaverse! Experience VR games and interactive tech worlds.", time: "Day 1 — 4:00 PM onward", type: "left" },
    { id: 4, no:4, title: "XR/Metaverse Corner", subtitle: "Competitive Play", description: "Compete in quick matches and mini-tournaments. Win goodies and coupons.", time: "Day 1 — 5:30 PM onward", type: "right" },
    { id: 5, no: 5, title: "Tech Circles", subtitle: "Talks & Panels", description: "Keynotes and panels from industry leaders. Bring your questions.", time: "Day 1 — 7:00 PM onward", type: "left" },
    { id: 6, no: 6, title: "Prizes & Giveaways", subtitle: "Refreshments", description: "Taste local and international food options. Vegan-friendly stalls available.", time: "Day 1 — 8:30 PM onward", type: "right" },
    { id: "end", title: "Closing Ceremony", subtitle: "End Point", description: "Wrap up, awards and thank you session. Don't miss the final announcements.", time: "Day 1 — 9:30 PM onward", type: "end" },
  ];

  const positions = [
    { left: "95%", top: "85%" },
    { left: "65%", top: "88%" },
    { left: "80%", top: "65%" },
    { left: "50%", top: "60%" },
    { left: "65%", top: "40%" },
    { left: "25%", top: "35%" },
    { left: "50%", top: "20%" },
    { left: "35%", top: "2%" },
  ];

  useEffect(() => {
    sessionStorage.setItem("score", score);
  }, [score]);

  const openScanner = () => {
    setScanned(false);
    setShowScanner(true);
  };

  const handleScanned = (data) => {
    if (data && !scanned) {
      const newScore = score + 10; // increment points only after scanning
      setScore(newScore);
      sessionStorage.setItem("score", newScore);
      setScanned(true);
      alert("🎉 QR Code Scanned! Congrats — you earned 10 points.");
      setTimeout(() => {
        setShowScanner(false);
        setScanned(false);
      }, 800);
    }
  };

  const openPointModal = (index) => {
    setActivePoint({ ...pointsData[index], pos: positions[index] });
  };

  // Updated: Clicking "Mark as Participated" only opens scanner
  const markParticipated = (point) => {
    alert(`"${point.title}" — please scan the QR code to earn points!`);
    setActivePoint(null);
    openScanner();
  };

  const BottomNav = () => (
    <div className="w-full flex justify-center items-center bg-[#0B1C33] py-3 mt-4 rounded-t-2xl shadow-inner">
      <div className="flex justify-around items-center w-1/2 min-w-[250px]">
        <button
          onClick={() => {
            setShowScanner(false);
            navigate("/leaderboard");
          }}
          className="flex flex-col items-center text-gray-300 hover:text-white transition"
        >
          <FaUser size={20} />
          <span className="text-xs mt-1">Leaderboard</span>
        </button>

        <button
          onClick={() => {
            setShowScanner(false);
            navigate("/map");
          }}
          className="flex flex-col items-center text-[#1E9BFF] font-semibold transition"
        >
          <FaMap size={20} />
          <span className="text-xs mt-1">Map</span>
        </button>

        <button
          onClick={() => {
            setShowScanner(false);
            navigate("/profile");
          }}
          className="flex flex-col items-center text-gray-300 hover:text-white transition"
        >
          <FaUser size={20} />
          <span className="text-xs mt-1">Profile</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="relative flex flex-col items-center min-h-screen text-white overflow-hidden" style={{ background: "linear-gradient(180deg, #224E61 0%, #18354E 50%, #0D1B3A 100%)" }}>
      {/* Header */}
      <div className="relative z-10 text-center mt-8">
        <h2 className="text-lg font-bold">YOUR EVENT JOURNEY AWAITS!</h2>
        <p className="text-[#B4C1D9] text-sm">Track your stops, earn points, and complete the roadmap!</p>
      </div>

      {/* Score display */}
      <div className="mt-4 mb-2">
        <div className="bg-white/10 px-4 py-2 rounded-full shadow-sm inline-flex items-center gap-3">
          <span className="text-sm text-[#B4C1D9]">Score</span>
          <span className="bg-[#1E9BFF] px-3 py-1 rounded-full font-semibold">{score}</span>
        </div>
      </div>

      {/* Map container */}
      <div className="relative flex flex-col items-center mt-6 z-10 w-full px-4">
        <div className="relative w-full max-w-sm" style={{ height: "420px" }}>
          <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path
              d={positions.map((pos, index, arr) => {
                const x = parseFloat(pos.left);
                const y = parseFloat(pos.top);
                if (index === 0) return `M ${x} ${y}`;
                const prev = arr[index - 1];
                const prevX = parseFloat(prev.left);
                const prevY = parseFloat(prev.top);
                const cx = (prevX + x) / 2 + (index % 2 === 0 ? 5 : -5);
                const cy = (prevY + y) / 2 + (index % 2 === 0 ? -5 : 5);
                return `Q ${cx} ${cy}, ${x} ${y}`;
              }).join(" ")}
              fill="none"
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* START */}
          <div className="absolute flex flex-col items-center" style={{ left: positions[0].left, top: positions[0].top, transform: "translate(-50%, -50%)" }}>
            <div onClick={() => openPointModal(0)} className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center shadow-lg border-2 border-white cursor-pointer" title="Start">
              <FaPlay className="text-white" />
            </div>
          </div>

          {/* Checkpoints 2..7 */}
          {pointsData.slice(1, 7).map((p, idx) => {
            const posIndex = idx + 1;
            const pos = positions[posIndex];
            const isLeft = [1, 3, 5].includes(posIndex);
            const bgClass = isLeft ? "bg-red-500" : "bg-yellow-400";
            const labelOffset = isLeft ? { left: "-130px" } : { left: "60px" };
            const textAlign = isLeft ? "text-right" : "text-left";

            return (
              <div key={p.no} className="absolute" style={{ left: pos.left, top: pos.top, transform: "translate(-50%, -50%)" }}>
                <div className="flex items-center relative">
                  <div style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", ...labelOffset, width: "120px" }}>
                    <p className={`text-sm text-white font-medium ${textAlign}`} style={{ textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}>{p.title}</p>
                  </div>
                  <div onClick={() => openPointModal(posIndex)} className={`${bgClass} w-10 h-10 border-2 border-white rounded-full flex items-center justify-center shadow-md cursor-pointer transform hover:scale-105 transition`} title={p.title}>
                    <span className="text-white font-bold text-xs">{String(p.no).padStart(2, "0")}</span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* END */}
          <div className="absolute flex flex-col items-center" style={{ left: positions[7].left, top: positions[7].top, transform: "translate(-50%, -50%)" }}>
            <div onClick={() => openPointModal(7)} className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shadow-lg border-2 border-white cursor-pointer" title="End">
              <FaFlagCheckered className="text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full z-10"><BottomNav /></div>

      {/* Modal */}
      {activePoint && (
        <div className="fixed inset-0 z-40 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setActivePoint(null)} />
          <div className="relative z-50 w-[90%] max-w-md bg-[#0F1930] rounded-2xl shadow-2xl p-6 border-2 border-dotted border-[#00E0FF]" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-md border-4 border-white`} style={{ background: activePoint.type === "start" ? "#f59e0b" : activePoint.type === "end" ? "#2563EB" : activePoint.type === "left" ? "#ef4444" : "#FBBF24" }}>
                {activePoint.type === "start" ? <FaPlay /> : activePoint.type === "end" ? <FaFlagCheckered /> : <span className="text-sm">{String(activePoint.no).padStart(2, "0")}</span>}
              </div>
            </div>

            <div className="mt-8 text-center">
              <h3 className="text-lg font-bold text-white">{activePoint.title}</h3>
              <p className="text-sm text-white mt-1">{activePoint.subtitle}</p>
              <div className="mt-4 text-left">
                <p className="text-white">{activePoint.description}</p>
                <div className="flex items-center gap-2 mt-4 text-sm text-white">
                  <FaClock className="text-white" />
                  <span>{activePoint.time}</span>
                </div>
                <div className="mt-5 flex flex-col gap-3">
                  <button onClick={() => markParticipated(activePoint)} className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg font-semibold transition">Mark as Participated</button>
                  <button onClick={() => setActivePoint(null)} className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scanner */}
      {showScanner && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-[90%] max-w-md flex flex-col items-center">
            <h2 className="text-lg font-bold mb-4 text-center text-blue-600">Scan a QR Code</h2>
            <BarcodeScannerComponent width={350} height={250} onUpdate={(err, result) => { if (result) handleScanned(result.text); }} />
            <button className="mt-6 w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition shadow-md" onClick={() => setShowScanner(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;
