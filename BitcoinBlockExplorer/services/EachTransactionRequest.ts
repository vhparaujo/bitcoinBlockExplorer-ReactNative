import { Transactions } from "./TransactionsBlockRequest";

const getTransactions = async (
    txidTransaction?: string
  ): Promise<Transactions> => {
    const API_URL = `https://mempool.space/api/tx/${txidTransaction}`;
  
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching fee data:", error);
      throw error;
    }
  };
  
  export { getTransactions };
  