import React from "react";
import QRCode from "react-qr-code";

const QrCode = () => {
  // Use your live Vercel URL for registration
  const registrationURL = "https://qrcode-fun-app-pkls.vercel.app/registration";

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

      {/* <a
        href={registrationURL}
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Go to Registration
      </a> */}
    </div>
  );
};

export default QrCode;
