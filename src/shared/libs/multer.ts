import multer from "multer";
import { v1 as uuidv1 } from "uuid";
import path from "path";

//Toma desde el directorio temporal, desde el principio
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, uuidv1() + path.extname(file.originalname));
  },
});

export default multer({ storage });
