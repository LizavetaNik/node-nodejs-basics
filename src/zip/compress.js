import {
  createReadStream,
  createWriteStream,
  promises as fsPromises,
} from "fs";
import { join, dirname } from "path";
import { pipeline } from "stream";
import zlib from "zlib";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compress = async () => {
  try {
    const inputFilePath = join(__dirname, "files", "fileToCompress.txt");
    const outputFilePath = join(__dirname, "files", "archive.gz");

    const readStream = createReadStream(inputFilePath);

    const writeStream = createWriteStream(outputFilePath);

    const gzipStream = zlib.createGzip();

    await pipeline(readStream, gzipStream, writeStream, (error) => {
      if (error) {
        console.error("Compression failed:", error);
      } else {
        console.log("Compression successful.");
      }
    });
  } catch (error) {
    console.error("Error during compression:", error);
    throw error;
  }
};

await compress();
