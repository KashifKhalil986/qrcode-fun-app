import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QrCode from "./pages/qrcode/qrcode.jsx";
import Registration from "./pages/registration/registration.jsx";
import Map from "./pages/map/map.jsx";
import Profile from "./pages/profile/profile.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QrCode />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/map" element={<Map />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
