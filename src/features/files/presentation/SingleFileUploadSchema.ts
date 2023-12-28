import { z } from "zod";

const SingleFileUploadSchema = z.object({
  file: z.string(),
  path: z.string().optional(),
});
export default SingleFileUploadSchema;
