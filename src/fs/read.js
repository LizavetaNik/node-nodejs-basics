import { promises as fsPromises, constants } from "fs";
import { fileURLToPath } from "url";
import { join, dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const read = async () => {
  try {
    const filePath = join(__dirname, "files", "fileToRead.txt");

    await fsPromises.access(filePath, constants.R_OK);

    const fileContents = await fsPromises.readFile(filePath, "utf-8");
    console.log('Contents of "fileToRead.txt":');
    console.log(fileContents);
  } catch (err) {
    if (err.code === "ENOENT") {
      console.error("FS operation failed: File does not exist");
    } else {
      console.error(err.message);
    }
  }
};

await read();
