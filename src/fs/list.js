import { promises as fsPromises, constants } from "fs";
import { fileURLToPath } from "url";
import { join, dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const list = async () => {
  try {
    const folderPath = join(__dirname, "files");

    await fsPromises.access(folderPath, constants.R_OK);

    const files = await fsPromises.readdir(folderPath);
    console.log('Files in the "files" folder:');
    files.forEach((file) => {
      console.log(file);
    });
  } catch (err) {
    if (err.code === "ENOENT") {
      console.error("FS operation failed: Folder does not exist");
    } else {
      console.error(err.message);
    }
  }
};

await list();
