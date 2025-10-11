import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(sessionStorage.getItem("user"));

    if (
      storedUser &&
      storedUser.email === formData.email &&
      storedUser.password === formData.password
    ) {
      alert("✅ Sign in successful!");
      navigate("/map");
    } else {
      alert("❌ Invalid email or password!");
    }
  };

  return (
    <div
      className="relative min-h-screen flex flex-col justify-center items-center text-white px-4 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #224E61 0%, #18354E 50%, #0D1B3A 100%)",
      }}
    >
      <img
        src="/vectors.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-10 pointer-events-none"
        style={{ objectPosition: "center" }}
      />

      <div className="relative z-10 mb-6 text-center">
        <h2 className="text-2xl font-bold tracking-wide">
          ACCESS YOUR PASS!
        </h2>
        <p className="text-[#B4C1D9] text-md mt-1">
          Sign in to continue your Tech Café journey.
        </p>
      </div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-xs">
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-[#E0E0E0]">Email:</label>
            <input
              type="email"
              name="email"
              placeholder="e.g., sara@novartis.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-[#DFE5F22E] text-white placeholder-gray-300 px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-white/70 text-sm"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-[#E0E0E0]">Password:</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full bg-[#DFE5F22E] text-white placeholder-gray-300 px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-white/70 text-sm"
            />
          </div>

            <label className="flex items-center text-xs text-[#E0E0E0] mt-1">
     <input 
     type="checkbox"
      className="mr-2 bg-[#A0A0A01A]" 
      /> 
            Remember me
          </label>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-2.5 rounded-lg font-semibold shadow-md hover:opacity-90 transition mt-2 text-sm"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-[#E0E0E0] mt-3 text-xs">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/registration")}
            className="underline cursor-pointer hover:text-white"
          >
            Register
          </span>
        </p>
      </div>

      <div className="absolute bottom-0 z-10">
        <img src="/logo.png" alt="Logo" className="h-24 opacity-100" />
      </div>
    </div>
  );
};

export default SignIn;
