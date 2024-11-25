export const randomNumber = (): number => {
  const timestamp = Date.now();
  const randomPart = Math.random() * timestamp;
  return Math.floor(randomPart);
};

export const calculateValuePerSatvB = (value: number) => {
  return (value * 140) / 100000000;
};
