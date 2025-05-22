import { IFormContact } from "@/services/serviceTypes";

export function parseFormData(formData: FormData): IFormContact {
  const name = formData.get("name").toString() || "";
  const email = formData.get("email").toString() || "";
  const companyName = formData.get("companyName").toString() || "";

  return {
    name,
    email,
    companyName,
  };
}
