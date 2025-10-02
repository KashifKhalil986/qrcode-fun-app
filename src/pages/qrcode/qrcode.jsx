import React from "react";
import QRCode from "react-qr-code";

const QrCode = () => {
  const registrationURL = "http://localhost:5173/registration";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">
        Scan to Register
      </h2>
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <QRCode value={registrationURL} size={200} />
      </div>
      <p className="mt-4 text-gray-600">
        Scan this QR code to open the registration page
      </p>
    </div>
  );
};

export default QrCode;
