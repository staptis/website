import { GoogleStorageServiceConfig, IStorageRegistry } from "types/service";
import { MockStorageService } from "services/storageService/mockStorageService";
import { GoogleStorageService } from "services/storageService/googleStorageService";
import * as constants from "utils/constants";

export const storageRegistry: IStorageRegistry = {
  [constants.MOCK_STORAGE_SERVICE]: () => new MockStorageService(),
  [constants.GOOGLE_STORAGE_SERVICE]: (config: GoogleStorageServiceConfig) =>
    new GoogleStorageService(config),
};
