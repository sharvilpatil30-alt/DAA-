export const generateRandomArray = (length = 8, min = 1, max = 99) => {
  return Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1)) + min);
};
