type Transactions = {
  txid: string;
  size: number; // Int32 -> number
  fee: number; // Double -> number
  vin: Vin[];
  vout: Vout[];
  status: Status;
}

type Vin = {
  prevout?: Prevout; // Propriedade opcional
}

type Prevout = {
  scriptpubkey_address: string;
  value: number; // Double -> number
}

type Vout = {
  scriptpubkey_address?: string; // Propriedade opcional
  value: number; // Double -> number
}

type Status = {
  confirmed: boolean;
  block_height?: number; // Int64? -> number | undefined
  block_hash?: string; // String? -> string | undefined
  block_time?: number; // TimeInterval? -> number | undefined
}

const getTransactionsBlockData = async (
  hashBlock?: string
): Promise<Transactions> => {
  const API_URL = `https://mempool.space/api/block/${hashBlock}/txs`;

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

export { Transactions, getTransactionsBlockData };
