import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QrCode from "./pages/qrcode/qrcode.jsx";
import Registration from "./pages/registration/registration.jsx";
import Map from "./pages/map/map.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QrCode />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </Router>
  );
}

export default App;
