import express from "express";
import docxToPdf from "docx-pdf";
import path from "path";
import { fileURLToPath } from "url";
import { upload } from "./utils/multerUploader.js";

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Obtain __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Endpoint to convert DOCX to PDF
app.post("/convertFile", upload.single("file"), (req, res) => {
  try {
    // Check if file is uploaded
    if (!req.file) {
      return res.status(400).json({ message: "File must be required." });
    }

    // Define output path for PDF file
    const outputPath = path.join(__dirname, "files", `${req.file.originalname}.pdf`);

    // Convert DOCX to PDF
    docxToPdf(req.file.path, outputPath, (err) => {
      if (err) {
        return res.status(500).json({ message: "Error converting DOCX to PDF." });
      }

      // Send PDF file for download after conversion
      res.download(outputPath, (err) => {
        if (err) {
          console.log("Error in downloading file:", err);
          res.status(500).json({ message: "Error in downloading the file." });
        }
      });
    });
  } catch (error) {
    console.log("Internal server error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Server setup
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
