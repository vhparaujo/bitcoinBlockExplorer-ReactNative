const API_URL = "https://mempool.space/api/mempool/recent";

type TransactionHeader = {
  txid: string;
  fee: number;
  value: number;
};

const getTransactionData = async (): Promise<TransactionHeader> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching fee data:', error);
    throw error;
  }
};

export { TransactionHeader, getTransactionData };