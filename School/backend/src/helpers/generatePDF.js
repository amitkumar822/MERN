import PDFDocument from 'pdfkit';
import fs from 'fs';

export const generatePDF = (attendanceData) => {
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream('Attendance.pdf'));

  // Add a title
  doc.fontSize(18).text('Attendance Report', { align: 'center' });

  // Add a table header
  const tableTop = 100;
  const rowHeight = 20;
  const colWidths = {
    fullName: 150,
    fatherName: 150,
    className: 80,
    date: 100,
    status: 80,
  };

  let y = tableTop;

  doc.fontSize(12).text('Full Name', 50, y, { width: colWidths.fullName, align: 'left' });
  doc.text('Father Name', 50 + colWidths.fullName, y, { width: colWidths.fatherName, align: 'left' });
  doc.text('Class', 50 + colWidths.fullName + colWidths.fatherName, y, { width: colWidths.className, align: 'left' });
  doc.text('Date', 50 + colWidths.fullName + colWidths.fatherName + colWidths.className, y, { width: colWidths.date, align: 'left' });
  doc.text('Status', 50 + colWidths.fullName + colWidths.fatherName + colWidths.className + colWidths.date, y, { width: colWidths.status, align: 'left' });
  
  y += rowHeight;

  // Add attendance records
  attendanceData.forEach(record => {
    const { fullName, fatherName, className } = record.studentId;
    const date = `${record.day}/${record.month}/${record.year}`;
    const status = record.status ? 'Present' : 'Absent';

    doc.text(fullName, 50, y, { width: colWidths.fullName, align: 'left' });
    doc.text(fatherName, 50 + colWidths.fullName, y, { width: colWidths.fatherName, align: 'left' });
    doc.text(className, 50 + colWidths.fullName + colWidths.fatherName, y, { width: colWidths.className, align: 'left' });
    doc.text(date, 50 + colWidths.fullName + colWidths.fatherName + colWidths.className, y, { width: colWidths.date, align: 'left' });
    doc.text(status, 50 + colWidths.fullName + colWidths.fatherName + colWidths.className + colWidths.date, y, { width: colWidths.status, align: 'left' });

    y += rowHeight;

    // Add a page break if the content reaches the bottom of the page
    if (y > doc.page.height - 50) {
      doc.addPage();
      y = tableTop;
    }
  });

  // Finalize the PDF file
  doc.end();
};
