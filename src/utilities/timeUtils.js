export const getDiffinDays = (startDate, endDate) => {
  const start = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate()
  );
  const end = new Date(
    endDate.getFullYear(),
    endDate.getMonth(),
    endDate.getDate()
  );
  return Math.ceil(Math.abs(end - start) / (1000 * 60 * 60 * 24));
};
