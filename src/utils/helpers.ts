import { Express } from "express";

export const expressMulterFileToFile = (
  expressMulterFie: Express.Multer.File
): File => {
  const uint8Array = Uint8Array.from(expressMulterFie.buffer);
  const blob = new Blob([uint8Array], { type: expressMulterFie.mimetype });
  const file = new File([blob], expressMulterFie.originalname, {
    type: blob.type,
  });
  return file;
};

export const objectToFormData = (
  data: { [key: string]: any },
  formData: FormData = new FormData(),
  parentKey?: string
): FormData => {
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const value = data[key];

      const formKey = parentKey ? `${parentKey}[${key}]` : key;

      if (value !== null && value !== undefined) {
        if (value instanceof Array) {
          value.forEach((val, index) => {
            if (typeof val === "object" && !(val instanceof File)) {
              // Recursively handle nested objects in arrays
              objectToFormData(val, formData, `${formKey}[${index}]`);
            } else {
              formData.append(`${formKey}[${index}]`, val);
            }
          });
        } else if (typeof value === "object" && !(value instanceof File)) {
          // Recursively handle nested objects
          objectToFormData(value, formData, formKey);
        } else {
          formData.append(formKey, value as string);
        }
      }
    }
  }
  return formData;
};
