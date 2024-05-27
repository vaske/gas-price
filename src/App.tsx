import React from "react";
import GasPrice from "./components/GasPrice";
import "./index.css";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-200">
      <h1 className="flex justify-center text-2xl p-1">Sample Gas Price App</h1>
      <div className="flex items-center justify-center">
        <GasPrice />
      </div>
    </div>
  );
};

export default App;
