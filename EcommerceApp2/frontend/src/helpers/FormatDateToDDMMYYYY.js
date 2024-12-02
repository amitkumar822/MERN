export const formatDateToDDMMYYYY = (dateInput) => {
  const createdAt = new Date(dateInput);
  const today = new Date();

  // Normalize times to only consider the date part
  const todayDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const yesterdayDate = new Date(todayDate);
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);

  const inputDate = new Date(
    createdAt.getFullYear(),
    createdAt.getMonth(),
    createdAt.getDate()
  );

  if (inputDate.getTime() === todayDate.getTime()) {
    return "Today";
  } else if (inputDate.getTime() === yesterdayDate.getTime()) {
    return "Yesterday";
  }

  // If not today, yesterday, or tomorrow, format as DD-MM-YYYY
  const day = String(createdAt.getDate()).padStart(2, "0");
  const month = String(createdAt.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = createdAt.getFullYear();
  return `${day}-${month}-${year}`;
};

// export const formatDateToDDMMYYYY = (dateInput) => {
//   const createdAt = new Date(dateInput);
//   const day = String(createdAt.getDate()).padStart(2, "0");
//   const month = String(createdAt.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
//   const year = createdAt.getFullYear();
//   return `${day}-${month}-${year}`;
// };
