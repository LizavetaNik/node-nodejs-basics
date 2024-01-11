import { promises as fsPromises, constants } from "fs";
import { fileURLToPath } from "url";
import { join, dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const remove = async () => {
  try {
    const filePath = join(__dirname, "files", "fileToRemove.txt");

    try {
      await fsPromises.access(filePath, constants.F_OK);
    } catch (error) {
      if (error.code === "ENOENT") {
        throw new Error("FS operation failed: File does not exist");
      } else {
        throw error;
      }
    }

    await fsPromises.unlink(filePath);
    console.log("File removed successfully.");
  } catch (err) {
    console.error(err.message);
  }
};

await remove();
