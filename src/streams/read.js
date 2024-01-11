import { createReadStream, promises as fsPromises, constants } from "fs";
import { fileURLToPath } from "url";
import { join, dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const read = async () => {
  try {
    const filePath = join(__dirname, "files", "fileToRead.txt");

    await fsPromises.access(filePath, constants.R_OK);

    const fileStream = createReadStream(filePath, { encoding: "utf-8" });

    fileStream.on("data", (chunk) => {
      process.stdout.write(chunk);
    });

    fileStream.on("end", () => {
      console.log();
    });

    fileStream.on("error", (error) => {
      console.error("Error reading the file:", error);
    });
  } catch (error) {
    console.error("Error accessing the file:", error);
    throw error;
  }
};

await read();
