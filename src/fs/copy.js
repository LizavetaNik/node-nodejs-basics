import { promises as fsPromises, constants } from "fs";
import { fileURLToPath } from "url";
import { join, dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const copy = async () => {
  try {
    const sourceFolderPath = join(__dirname, "files");

    const destinationFolderPath = join(__dirname, "files_copy");

    await fsPromises.access(sourceFolderPath, constants.R_OK);

    try {
      await fsPromises.access(destinationFolderPath, constants.F_OK);
      throw new Error("FS operation failed: Destination folder already exists");
    } catch (error) {
      if (error.code === "ENOENT") {
        await fsPromises.mkdir(destinationFolderPath);

        const files = await fsPromises.readdir(sourceFolderPath);

        for (const file of files) {
          const sourceFilePath = join(sourceFolderPath, file);
          const destinationFilePath = join(destinationFolderPath, file);
          await fsPromises.copyFile(sourceFilePath, destinationFilePath);
        }

        console.log("Files copied successfully.");
      } else {
        throw error;
      }
    }
  } catch (err) {
    console.error(err.message);
  }
};

await copy();
