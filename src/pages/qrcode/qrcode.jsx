import QRCode from "react-qr-code";

const QrCode = () => {
  const registrationURL = "https://qrcode-fun-app.vercel.app/registration";
  // const registrationURL = "http://localhost:5173/registration";
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md flex flex-col items-center">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">
          Scan to Register
        </h2>

        <div className="bg-gray-100 p-4 rounded-xl shadow-inner">
          <QRCode value={registrationURL} size={200} />
        </div>

        <p className="mt-6 text-gray-600 text-center">
          Use your phone camera to scan the QR code and open the registration page.
        </p>

     
      </div>
    </div>
  );
};

export default QrCode;
