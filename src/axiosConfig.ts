import { BASE_PATH } from "../src/api/minanamanila-api-client/base";
const LOCAL_PATH = "http://localhost:8080".replace(/\/+$/, "");

export const config = {
  basePath:
    !process.env.NODE_ENV || process.env.NODE_ENV === "development"
      ? LOCAL_PATH
      : BASE_PATH,
};
