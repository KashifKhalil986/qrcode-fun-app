import { FaUser, FaMap } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Leaderboard = () => {
  const navigate = useNavigate();

  // Static Data (Top 3 + Others)
  const topThree = [
    { name: "Ahmed", points: 160, img: "/pic3.png", medal: "/2nd.png", color: "#F97316" },
    { name: "Sara", points: 180, img: "/pic3.png", medal: "/1st.png", color: "#0EA5E9" },
    { name: "Omer", points: 150, img: "/pic3.png", medal: "/3rd.png", color: "#F43F5E" },
  ];

  const others = [
    { rank: 4, name: "Laila Khan", points: 120 },
    { rank: 5, name: "Dani Elmas", points: 115 },
    { rank: 6, name: "Amr Hassan", points: 110 },
  ];

  const BottomNav = () => (
    <div className="w-full flex justify-center items-center bg-[#0B1C33] py-3 rounded-t-2xl shadow-inner">
      <div className="flex justify-around items-center w-1/2 min-w-[250px]">
        <button
          onClick={() => navigate("/leaderboard")}
          className="flex flex-col items-center text-[#1E9BFF] font-semibold"
        >
          <FaUser size={20} />
          <span className="text-xs mt-1">Leaderboard</span>
        </button>
        <button
          onClick={() => navigate("/map")}
          className="flex flex-col items-center text-gray-300 hover:text-white transition"
        >
          <FaMap size={20} />
          <span className="text-xs mt-1">Map</span>
        </button>
        <button
          onClick={() => navigate("/profile")}
          className="flex flex-col items-center text-gray-300 hover:text-white transition"
        >
          <FaUser size={20} />
          <span className="text-xs mt-1">Profile</span>
        </button>
      </div>
    </div>
  );

  return (
    <div
      className="flex flex-col items-center min-h-screen text-white relative pb-20"
      style={{
        background:
          "linear-gradient(180deg, #224E61 0%, #18354E 50%, #0D1B3A 100%)",
      }}
    >
      {/* Header */}
      <div className="text-center mt-8">
        <h2 className="text-lg font-bold">LEADERBOARD</h2>
        <p className="text-[#B4C1D9] text-sm mt-1">
          Who's leading the Tech Café challenge?
        </p>
      </div>

      {/* Top 3 Podium */}
      <div className="flex items-end justify-center gap-6 mt-10">
        {topThree.map((user, index) => (
          <div key={index} className="flex flex-col items-center">
            {/* Image (Clean Circle, No Border, No BG) */}
            <img
              src={user.img}
              alt={user.name}
              className={`rounded-full object-cover ${
                index === 1 ? "w-20 h-20" : "w-16 h-16"
              }`}
            />
            <p className="mt-2 text-sm">{user.name}</p>

            {/* Points Box with Medal */}
            <div
              className={`mt-5 rounded-t-2xl flex flex-col items-center justify-center ${
                index === 1 ? "w-24 py-6" : "w-20 py-4"
              }`}
              style={{ backgroundColor: user.color }}
            >
              <img src={user.medal} alt="medal" className="w-5 h-5 mb-1" />
              <span className="text-white text-sm font-semibold">
                {user.points} pts
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Other Ranks */}
      <div className="w-11/12 max-w-sm mt-10 space-y-3">
        {others.map((user) => (
          <div
            key={user.rank}
            className="flex justify-between items-center bg-[#0F1930] px-4 py-3 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <span className="text-white font-bold">{user.rank}</span>
              <span className="text-white">{user.name}</span>
            </div>
            <span className="text-[#B4C1D9]">{user.points} pts</span>
          </div>
        ))}
      </div>

      {/* Bottom Nav */}
      <div className="absolute bottom-0 left-0 w-full">
        <BottomNav />
      </div>
    </div>
  );
};

export default Leaderboard;
