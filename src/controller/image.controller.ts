import { Response, Request } from "express";
import multer from "multer";
import { extname } from "path/posix";
export const imageUplaod = async (req: Request, res: Response) => {
  const storage = multer.diskStorage({
    destination: "./public",
    filename: (req, file, cb) => {
      const ranName = Math.random().toString(20).substring(2, 10);
      return cb(null, `${ranName}${extname(file.originalname)}`);
    },
  });

  const upload = multer({ storage }).single("image");

  upload(req, res, (err) => {
    if (err) return res.sendStatus(500);

    res.send({ upload: `http://localhost:8000/upload/${req.file.filename}` });
  });
};
