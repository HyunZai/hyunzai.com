import { AppDataSource } from "./data-source";

export { AppDataSource };

export const initializeDataSource = async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  return AppDataSource;
};
