import { Router } from "express";
import { uploader } from "../../../middlewares";
import { STAGED_MEDIA_URL } from "../../../utils";
import { uploadSingeFile } from "../domain";

const router = Router();

router.post(
  "/upload/single",
  uploader.diskFile({ dest: STAGED_MEDIA_URL }).single("file"),
  uploadSingeFile
);
// router.post("/upload/multiple");

export default router;
