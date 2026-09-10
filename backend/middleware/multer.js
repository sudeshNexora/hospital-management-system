import multer from "multer";

const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    // Prefix with a timestamp so two uploads with the same original
    // filename never overwrite each other
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    callback(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage });

export default upload;
