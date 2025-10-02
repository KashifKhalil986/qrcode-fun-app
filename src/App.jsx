import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QrCode from "./pages/qrcode/qrcode";
import Registration from "./pages/registration/registration";
import Map from "./pages/map/map";

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
