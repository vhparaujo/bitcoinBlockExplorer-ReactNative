import { useEffect, useState } from "react";

const API_URL = "https://mempool.space/api/v1/fees/recommended";

type Fee = {
  fastestFee: number;
  halfHourFee: number;
  hourFee: number;
};

const getFeeData = async (): Promise<Fee> => {
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

export { Fee, getFeeData };