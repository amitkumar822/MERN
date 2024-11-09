import multer from "multer";

const storage = multer.diskStorage({
  // Setting the destination where the uploaded files will be stored
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  // Setting the filename for the uploaded file
  filename: function (req, file, cb) {
    // Using the original name of the file for the filename
    cb(null, file.originalname);
    
  },
});

export const upload = multer({ storage });
