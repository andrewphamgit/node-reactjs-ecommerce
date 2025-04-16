import multer from "multer";
import * as path from "path";

const __dirname = path.resolve();

const storage = multer.diskStorage({
  destination: function (req, file, callbackFunc) {
    callbackFunc(null, path.join(__dirname, '/images/'));
  },
  filename: function (req, file, callbackFunc) {
    const splitOriginals = file.originalname.split('.');
    let name = '';
    if (splitOriginals) {
      name = splitOriginals[0];
    }
    callbackFunc(null, name + '-' + Date.now() + file.originalname.match(/\..*$/)[0]);
  }
});

const multerUpload = multer({storage});

export default multerUpload;