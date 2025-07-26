import { IProspect, IStorageService } from "@/types";

export class LogStorageService implements IStorageService {
  name = "LogStorageService";
  constructor() {
    console.info("initializing " + this.name);
  }
  async storeProspect(data: IProspect): Promise<void> {
    console.log("Storing form data:", data);
  }
}
