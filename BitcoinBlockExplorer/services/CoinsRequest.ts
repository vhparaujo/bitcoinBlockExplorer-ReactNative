type Last = {
  last: number;
};

type Coins2 = {
  BRL: Last;
  CNY: Last;
};

type Coins = {
  USD: number;
  EUR: number;
  GBP: number;
  CAD: number;
  CHF: number;
  AUD: number;
  JPY: number;
  BRL: number;
  CNY: number;
};

const API_URL = "https://mempool.space/api/v1/prices";

const getCoins = async (): Promise<Coins> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching coins data:", error);
    throw error;
  }
};

const API_URL2 = "https://blockchain.info/ticker";

const getCoins2 = async (): Promise<Coins2> => {
  try {
    const response = await fetch(API_URL2);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching coins2 data:", error);
    throw error;
  }
};

export { Coins, Coins2, getCoins, getCoins2 };
