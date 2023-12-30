import { Express } from "express";
import { has } from "lodash";

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

// Suport object with files objects too
export const _objectToFormData = (
  data: { [key: string]: any },
  formData: FormData = new FormData(),
  parentKey?: string
): FormData => {
  for (const key in data) {
    if (has(data, key)) {
      const value = data[key];

      const formKey = parentKey ? `${parentKey}[${key}]` : key;

      if (value !== null && value !== undefined) {
        if (value instanceof Array) {
          value.forEach((val, index) => {
            const nestedFormKey = `${formKey}[${index}]`;

            if (typeof val === "object" && !(val instanceof File)) {
              // Recursively handle nested objects in arrays
              objectToFormData(val, formData, nestedFormKey);
            } else {
              // Handle File instances in arrays
              if (val instanceof File) {
                formData.append(nestedFormKey, val, val.name);
              } else {
                formData.append(nestedFormKey, val);
              }
            }
          });
        } else if (typeof value === "object" && !(value instanceof File)) {
          // Recursively handle nested objects
          objectToFormData(value, formData, formKey);
        } else if (value instanceof File) {
          // Handle top-level File instances
          formData.append(formKey, value, value.name);
        } else {
          formData.append(formKey, value as string);
        }
      }
    }
  }
  return formData;
};
