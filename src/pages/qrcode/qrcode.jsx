import QRCode from "react-qr-code";

const QrCode = () => {
  // Keep the same URL (works locally and online)
  const registrationURL = "http://localhost:5173/registration";
  // const registrationURL = "https://qrcode-fun-app.vercel.app/registration";

  return (
    <div
      className="relative min-h-screen flex flex-col justify-center items-center text-white px-4 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #224E61 0%, #18354E 50%, #0D1B3A 100%)",
      }}
    >
      {/* Subtle background texture */}
      <img
        src="/vectors.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-10 pointer-events-none"
      />

      {/* Heading */}
      <div className="relative z-10 mb-6 text-center">
        <h2 className="text-2xl font-bold tracking-wide">SCAN TO REGISTER</h2>
        <p className="text-[#B4C1D9] text-md mt-1">
          Unlock your Tech Café experience by scanning below.
        </p>
      </div>

      {/* QR Code Box (Original design kept) */}
      <div className="relative z-10 bg-white p-6 rounded-2xl shadow-lg">
        <QRCode value={registrationURL} size={200} />
      </div>

      {/* Instructions */}
      <p className="mt-4 text-[#E0E0E0] text-sm text-center max-w-[260px] relative z-10">
        Scan this QR code with your mobile device to open the registration page.
      </p>

      {/* Logo */}
      <div className="absolute bottom-0 z-10">
        <img src="/logo.png" alt="Logo" className="h-24 opacity-100" />
      </div>
    </div>
  );
};

export default QrCode;
