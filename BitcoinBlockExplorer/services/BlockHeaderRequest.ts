const API_URL = "https://mempool.space/api/v1/blocks/";

type BlockHeader = {
  id: string;
  height: number;
  size: number;
  tx_count: number;
  timestamp: number;
  extras: Extras;
};

type Extras = {
  medianFee: number;
  pool: Pool;
};

type Pool = {
  name: string;
};

const getBlockHeaderData = async (): Promise<BlockHeader> => {
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

export { BlockHeader, getBlockHeaderData };
