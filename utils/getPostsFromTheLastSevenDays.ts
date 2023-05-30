export const calculatePastDate = (daysAgo: number) => {
  const currentDate = new Date();
  return new Date(currentDate.getTime() - daysAgo * 24 * 60 * 60 * 1000);
};
