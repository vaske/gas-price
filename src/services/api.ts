import axios from "axios";

const API_KEY = process.env.REACT_APP_ETHERSCAN_API_KEY;
const BASE_URL = "https://api.etherscan.io/api";

interface GasPrices {
  SafeGasPrice: string;
  ProposeGasPrice: string;
  FastGasPrice: string;
}

export const getGasPrices = async (): Promise<GasPrices> => {
  try {
    const response = await axios.get(
      `${BASE_URL}?module=gastracker&action=gasoracle&apikey=${API_KEY}`
    );
    return response.data.result;
  } catch (error) {
    throw new Error("Failed to fetch gas prices");
  }
};
