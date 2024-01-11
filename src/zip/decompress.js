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

const decompress = async () => {
  try {
    const inputFilePath = join(__dirname, "files", "archive.gz");
    const outputFilePath = join(__dirname, "files", "fileToCompress.txt");

    const readStream = createReadStream(inputFilePath);

    const writeStream = createWriteStream(outputFilePath);

    const gunzipStream = zlib.createGunzip();

    // Используем pipeline для удобного соединения потоков
    await pipeline(readStream, gunzipStream, writeStream, (error) => {
      if (error) {
        console.error("Decompression failed:", error);
      } else {
        console.log("Decompression successful.");
      }
    });
  } catch (error) {
    console.error("Error during decompression:", error);
    throw error;
  }
};

await decompress();
