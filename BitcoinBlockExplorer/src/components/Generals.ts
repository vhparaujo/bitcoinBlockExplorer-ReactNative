export const randomNumber = (): number => {
  const timestamp = Date.now();
  const randomPart = Math.random() * timestamp;
  return Math.floor(randomPart);
};

export const calculateValuePerSatvB = (value: number) => {
  return (value * 140) / 100000000;
};

export const convertDate = (date: number) => {
  return new Date(date * 1000).toLocaleString();
};

export const convertDateToHoursAndMinute = (date: number): string => {
  const convertedDate = new Date(date * 1000); // Converte de segundos para milissegundos
  const hours = convertedDate.getHours().toString().padStart(2, '0'); // Garante dois dígitos
  const minutes = convertedDate.getMinutes().toString().padStart(2, '0'); // Garante dois dígitos
  return `${hours}:${minutes}`; // Retorna somente a hora no formato HH:mm
};
