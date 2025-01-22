import ExcelJS from "exceljs";

export const generateExcel = async (attendanceData) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Attendance Report");

  // Add header row
  worksheet.columns = [
    { header: "Full Name", key: "fullName", width: 20 },
    { header: "Father Name", key: "fatherName", width: 20 },
    { header: "Class", key: "className", width: 10 },
    { header: "Date", key: "date", width: 15 },
    { header: "Status", key: "status", width: 10 },
  ];

  // Add attendance records
  attendanceData.forEach((record) => {
    const { fullName, fatherName, className } = record.studentId;
    const date = `${record.day}/${record.month}/${record.year}`;
    const status = record.status ? "Present" : "Absent";

    worksheet.addRow({ fullName, fatherName, className, date, status });
  });

  // Save the workbook to a file
  await workbook.xlsx.writeFile("Attendance.xlsx");
};
