import  { useState } from "react";

const Map = () => {
  const [score, setScore] = useState(0);

  const handleClick = () => {
    setScore(score + 10);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-blue-600">
        Score: {score}
      </h1>

      <svg width="300" height="500" className="bg-white rounded-lg shadow-lg">
        <polyline
          points="50,50 150,100 50,150 150,200 50,250 150,300 50,350 150,400 50,450"
          fill="none"
          stroke="black"
          strokeWidth="2"
        />

        {[
          { x: 150, y: 100 },
          { x: 150, y: 200 },
          { x: 150, y: 300 },
          { x: 150, y: 400 },
          { x: 50, y: 150 },
          { x: 50, y: 250 },
          { x: 50, y: 350 },
          { x: 50, y: 450 },
        ].map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="10"
            fill="red"
            className="cursor-pointer hover:fill-green-500 transition"
            onClick={handleClick}
          />
        ))}
      </svg>
    </div>
  );
};

export default Map;
