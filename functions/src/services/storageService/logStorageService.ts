import { IFormContact, IStorageService } from "@/services/serviceTypes";

export class LogStorageService implements IStorageService {
  constructor() {
    console.log("LogStorageService initialized");
  }
  async storeContact(data: IFormContact): Promise<boolean> {
    console.log("Storing form data:", data);
    return true;
  }
}
