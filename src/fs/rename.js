import { promises as fsPromises, constants } from "fs";
import { fileURLToPath } from "url";
import { join, dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rename = async () => {
  try {
    const sourceFilePath = join(__dirname, "files", "wrongFilename.txt");
    const destinationFilePath = join(__dirname, "files", "properFilename.md");

    try {
      await fsPromises.access(destinationFilePath, constants.F_OK);
      throw new Error("FS operation failed: Destination file already exists");
    } catch (error) {
      if (error.code === "ENOENT") {
        await fsPromises.access(sourceFilePath, constants.R_OK);

        await fsPromises.rename(sourceFilePath, destinationFilePath);
        console.log("File renamed successfully.");
      } else {
        throw error;
      }
    }
  } catch (err) {
    console.error(err.message);
  }
};

await rename();
