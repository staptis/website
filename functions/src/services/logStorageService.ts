import { IFormContact, IStorageService } from "@/services/serviceTypes";
export class LogStorageService implements IStorageService {
  async storeContact(data: IFormContact): Promise<void> {
    console.log("Storing form data:", data);
  }
}
