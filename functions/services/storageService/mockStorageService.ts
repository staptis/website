import { IProspect } from "types/prospect";
import { IStorageService } from "types/service";

export class MockStorageService implements IStorageService {
  async storeProspect(data: IProspect): Promise<void> {
    console.log("Storing form data:", data);
  }
}
