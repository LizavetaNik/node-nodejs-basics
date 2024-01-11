import { createReadStream, promises as fsPromises, constants } from "fs";
import crypto from "crypto";
import { fileURLToPath } from "url";
import { join, dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const calculateHash = async () => {
  try {
    const filePath = join(__dirname, "files", "fileToCalculateHashFor.txt");

    await fsPromises.access(filePath, constants.R_OK);

    const hash = crypto.createHash("sha256");

    const fileStream = createReadStream(filePath);

    return new Promise((resolve, reject) => {
      fileStream.on("data", (chunk) => {
        hash.update(chunk);
      });

      fileStream.on("end", () => {
        const finalHash = hash.digest("hex");

        console.log(`SHA-256 Hash: ${finalHash}`);

        resolve(finalHash);
      });

      fileStream.on("error", (error) => {
        reject(error);
      });
    });
  } catch (error) {
    console.error("Error reading the file:", error);
    throw error;
  }
};

await calculateHash();
