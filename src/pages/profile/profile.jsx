import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaTrophy,
  FaRocket,
  FaSmile,
  FaUser,
  FaMap,
  FaCamera,
} from "react-icons/fa";

const Profile = () => {
  const navigate = useNavigate();

  // load user and score from sessionStorage, fallback to demo values
  const [user, setUser] = useState(() => {
    const raw = sessionStorage.getItem("user");
    if (raw) return JSON.parse(raw);
    // fallback demo user
    return {
      name: "Sara Ahmed",
      department: "Design",
      email: "sara.ahmed@example.com",
      phone: "0300-0000000",
      id: "#201-0087",
    };
  });

  const [score, setScore] = useState(() => {
    const s = sessionStorage.getItem("score");
    return s ? Number(s) : 125; // fallback 125 as in screenshot
  });

  // static demo activities (3 items as requested)
  const activities = [
    {
      id: 1,
      title: "AI Challenges",
      subtitle: "Completed 2 tasks → +60 pts",
      icon: <FaRocket className="text-white" />,
      progress: 2,
      total: 2,
      points: 60,
      bg: "bg-gradient-to-br from-indigo-700 to-indigo-800",
    },
    {
      id: 2,
      title: "XR/Metaverse Corner",
      subtitle: "Joined 1 session → +30 pts",
      icon: <FaTrophy className="text-white" />,
      progress: 1,
      total: 1,
      points: 30,
      bg: "bg-gradient-to-br from-yellow-700 to-yellow-800",
    },
    {
      id: 3,
      title: "Tech Circles",
      subtitle: "Attended 1 circle → +35 pts",
      icon: <FaSmile className="text-white" />,
      progress: 1,
      total: 1,
      points: 35,
      bg: "bg-gradient-to-br from-cyan-700 to-cyan-800",
    },
  ];

  // badges demo (4 badges)
  const badges = [
    { id: "b1", icon: <FaTrophy />, label: "Winner" },
    { id: "b2", icon: <FaRocket />, label: "Explorer" },
    { id: "b3", icon: <FaSmile />, label: "Community" },
    { id: "b4", icon: <FaUserCircle />, label: "Member" },
  ];

  // compute participation progress: example 3/5
  const completed = 3;
  const totalActivities = 5;
  const progressPct = Math.min(100, Math.round((completed / totalActivities) * 100));

  useEffect(() => {
    // sync to sessionStorage so other pages can read
    sessionStorage.setItem("user", JSON.stringify(user));
    sessionStorage.setItem("score", String(score));
  }, [user, score]);

  return (
    <div
      className="min-h-screen flex flex-col justify-between"
      style={{
        background:
          "radial-gradient(circle at 10% 10%, rgba(12,44,74,0.6), transparent 20%), linear-gradient(180deg,#071429 0%, #0f2b45 100%)",
      }}
    >
      {/* Header */}
      <header className="pt-8 pb-4">
        <h2 className="text-center text-sm font-semibold text-white/90 tracking-widest">
          MY PROFILE
        </h2>
      </header>

      {/* Content */}
      <main className="px-6 pb-6 flex-1 overflow-auto">
        {/* Profile Card */}
        <div className="mx-auto max-w-md">
          <div className="bg-gradient-to-br from-[#0b2d46] to-[#102d45] border border-white/6 rounded-2xl p-5 shadow-xl">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                {/* <FaUserCircle size={54} className="text-white/90" /> */}
                <div>
                  <div className="text-white font-semibold text-lg">
                    {user.name}
                  </div>
                  <div className="text-sm text-white/60 mt-1">{user.id ?? "#201-0087"}</div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-sm text-white/60">Total</div>
                <div className="text-xl font-bold text-white mt-1">{score} pts</div>

                {/* small icons */}
                <div className="flex gap-2 mt-3 items-center justify-end">
                  <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                    <FaTrophy className="text-yellow-400" />
                  </div>
                  <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                    <FaRocket className="text-pink-400" />
                  </div>
                  <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                    <FaSmile className="text-cyan-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Participation Progress */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm text-white font-semibold">Participation Progress</h3>
              <div className="text-xs text-white/60">{completed} / {totalActivities} Activities Completed</div>
            </div>

            <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
              <div
                className="h-3 bg-gradient-to-r from-[#2dd4bf] to-[#1e90ff]"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          {/* Activities list */}
          <div className="mt-6 space-y-4">
            {activities.map((a) => (
              <div key={a.id} className="bg-[#071b2a] border border-white/6 rounded-xl p-4 flex items-center justify-between shadow-md">
                <div className="flex items-center gap-4">
                  <div className={`${a.bg} w-12 h-12 rounded-lg flex items-center justify-center shadow-inner`}>
                    <div className="text-white text-lg">{a.icon}</div>
                  </div>
                  <div>
                    <div className="text-white font-semibold">{a.title}</div>
                    <div className="text-sm text-white/60 mt-1">{a.subtitle}</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm text-white/80">+{a.points} pts</div>
                </div>
              </div>
            ))}
          </div>

          {/* Badges */}
          <div className="mt-6">
            <h4 className="text-white/90 font-semibold mb-3">My Badges</h4>
            <div className="flex gap-4">
              {badges.map((b) => (
                <div key={b.id} className="w-14 h-14 bg-white/6 rounded-xl flex items-center justify-center shadow-lg">
                  <div className="text-white text-xl">{b.icon}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-[#071630] border-t border-white/5 py-3">
        <div className="max-w-md mx-auto flex justify-between items-center px-6">
          <button onClick={() => navigate("/leaderboard")} className="flex flex-col items-center text-white/60 hover:text-white transition">
            <FaUser size={18} />
            <span className="text-xs mt-1">Leaderboard</span>
          </button>

          <button onClick={() => navigate("/map")} className="flex flex-col items-center text-white/60 hover:text-white transition">
            <FaMap size={18} />
            <span className="text-xs mt-1">Map</span>
          </button>

          <button onClick={() => navigate("/profile")} className="flex flex-col items-center text-[#61a8ff] transition">
            <FaCamera size={18} />
            <span className="text-xs mt-1 text-[#61a8ff]">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Profile;
