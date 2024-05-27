import React, { useEffect, useState } from "react";
import { getGasPrices } from "../services/api";

interface GasPrices {
  SafeGasPrice: string;
  ProposeGasPrice: string;
  FastGasPrice: string;
}

const GasPrice: React.FC = () => {
  const [gasPrices, setGasPrices] = useState<GasPrices | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGasPrices = async () => {
      try {
        const prices = await getGasPrices();
        setGasPrices(prices);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchGasPrices();
    const interval = setInterval(fetchGasPrices, 10000);

    return () => clearInterval(interval);
  }, []);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!gasPrices) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 bg-gray-100 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Ethereum Gas Prices</h1>
      <ul>
        <li>Safe Gas Price: {gasPrices.SafeGasPrice} Gwei</li>
        <li>Proposed Gas Price: {gasPrices.ProposeGasPrice} Gwei</li>
        <li>Fast Gas Price: {gasPrices.FastGasPrice} Gwei</li>
      </ul>
    </div>
  );
};

export default GasPrice;
