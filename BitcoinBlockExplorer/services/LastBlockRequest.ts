import { useEffect, useState } from "react";

const API_URL = "https://mempool.space/api/blocks/tip/height";

type LastHeight = {
  lastHeight: number;
};

const getLastHeight = async (): Promise<LastHeight> => {
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



export { LastHeight, getLastHeight};
