import { promises as fsPromises, constants } from "fs";
import { fileURLToPath } from "url";
import { join, dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const copy = async () => {
  try {
    // Path to the source folder
    const sourceFolderPath = join(__dirname, "files");

    // Path to the destination folder
    const destinationFolderPath = join(__dirname, "files_copy");

    // Check if the source folder exists
    await fsPromises.access(sourceFolderPath, constants.R_OK);

    // Check if the destination folder already exists
    try {
      await fsPromises.access(destinationFolderPath, constants.F_OK);
      // If the destination folder exists, throw an error
      throw new Error("FS operation failed: Destination folder already exists");
    } catch (error) {
      // If the destination folder doesn't exist, proceed with copying
      if (error.code === "ENOENT") {
        await fsPromises.mkdir(destinationFolderPath);

        // Get the list of files in the source folder
        const files = await fsPromises.readdir(sourceFolderPath);

        // Copy each file from the source to the destination
        for (const file of files) {
          const sourceFilePath = join(sourceFolderPath, file);
          const destinationFilePath = join(destinationFolderPath, file);
          await fsPromises.copyFile(sourceFilePath, destinationFilePath);
        }

        console.log("Files copied successfully.");
      } else {
        throw error; // Propagate any other errors
      }
    }
  } catch (err) {
    console.error(err.message);
  }
};

await copy();
