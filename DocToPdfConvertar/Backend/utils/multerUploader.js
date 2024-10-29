import multer from "multer";

const storage = multer.diskStorage({
  /* The `destination` and `filename` functions are part of the configuration for storing uploaded
  files using the `multer` middleware in a Node.js application. Here's what each function does: */
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage: storage });
