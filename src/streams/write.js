import { createWriteStream, promises as fsPromises, constants } from "fs";
import { fileURLToPath } from "url";
import { join, dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const write = async () => {
  try {
    const filePath = join(__dirname, "files", "fileToWrite.txt");

    await fsPromises.access(filePath, constants.W_OK);

    const writeStream = createWriteStream(filePath, { encoding: "utf-8" });

    process.stdin.pipe(writeStream);

    console.log("Enter text (Ctrl + D for read, Ctrl + C for end):");

    writeStream.on("finish", () => {
      console.log("Data has been written to the file.");
    });

    writeStream.on("error", (error) => {
      console.error("Error writing to the file:", error);
    });
  } catch (error) {
    console.error("Error accessing the file:", error);
    throw error;
  }
};

await write();
