import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sessionStorage.setItem("user", JSON.stringify(formData));
    alert("🎉 Registration successful!");
    navigate("/map");
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
          UNLOCK YOUR PASS!
        </h2>
        <p className="text-[#B4C1D9] text-md mt-1">
          Fill in your details to join the Tech Café experience.
        </p>
      </div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-xs">
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-[#E0E0E0]">Full Name:</label>
            <input
              type="text"
              name="name"
              placeholder="e.g., Sara Ahmed"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-[#DFE5F22E] text-white placeholder-gray-300 px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-white/70 text-sm"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-[#E0E0E0]">Department:</label>
            <input
              type="text"
              name="department"
              placeholder="e.g., R&D"
              value={formData.department}
              onChange={handleChange}
              required
              className="w-full bg-[#DFE5F22E] text-white placeholder-gray-300 px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-white/70 text-sm"
            />
          </div>

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
            <label className="text-xs text-[#E0E0E0]">Phone:</label>
            <input
              type="text"
              name="phone"
              placeholder="e.g., +20 1XXXXXXXXX"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-[#DFE5F22E] text-white placeholder-gray-300 px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-white/70 text-sm"
            />
          </div>

   <label className="flex items-center text-xs text-[#E0E0E0] mt-1">
     <input 
     type="checkbox"
      className="mr-2 bg-[#A0A0A01A]" 
      /> 
     Receive event updates (email) 
     </label>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-2.5 rounded-lg font-semibold shadow-md hover:opacity-90 transition mt-2 text-sm"
          >
            Register
          </button>
        </form>

        <p className="text-center text-[#E0E0E0] mt-3 text-xs">
          Already have a pass?{" "}
          <span
            onClick={() => navigate("/signin")}
            className="underline cursor-pointer hover:text-white"
          >
            Sign in
          </span>
        </p>
      </div>

      <div className="absolute bottom-0 z-10">
        <img src="/logo.png" alt="Logo" className="h-24 opacity-100" />
      </div>
    </div>
  );
};

export default Registration;
