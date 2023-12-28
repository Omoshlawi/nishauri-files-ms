import config from "config";
import path from "path";
export const BASE_DIR = process.cwd();
export const MEDIA_ROOT = path.join(BASE_DIR, "media");
export const MEDIA_URL = "media";
export const PROFILE_URL = "uploads";
export const STAGED_MEDIA_URL = "staged";
export const configuration = {
  version: require("./../../package.json").version,
  name: require("./../../package.json").name,
  nameAliase: config.get("name"),
  port: config.get("port") as string | undefined | null,
  db: config.get("db") as string | undefined | null,
  registry: {
    url: config.get("registry.url") as string,
    version: config.get("registry.version") as string,
  },
};
