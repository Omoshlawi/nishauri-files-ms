import { NextFunction, Request, Response } from "express";
import path from "path";
import { STAGED_MEDIA_URL } from "../../../../utils";
import { SingleFileUploadSchema } from "../../presentation";
import { APIException } from "../../../../shared/exceprions";
export const uploadSingeFile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const { originalname, filename, path } = req.file ?? {};
    const file = req.file
      ? path.join(`/${STAGED_MEDIA_URL}`, req.file.originalname)
      : undefined;
    const body = { ...req.body, file };
    const validation = await SingleFileUploadSchema.safeParseAsync(body);
    if (!validation.success)
      throw new APIException(400, validation.error.format());
    return res.json(body);
  } catch (error) {
    console.error(error);
    next(error);
  }
};


