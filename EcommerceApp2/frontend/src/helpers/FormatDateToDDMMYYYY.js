export const formatDateToDDMMYYYY = (dateInput) => {
  const createdAt = new Date(dateInput);
  const day = String(createdAt.getDate()).padStart(2, "0");
  const month = String(createdAt.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = createdAt.getFullYear();
  return `${day}-${month}-${year}`;
};
