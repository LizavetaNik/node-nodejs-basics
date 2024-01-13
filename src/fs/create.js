import { promises as fsPromises } from "fs";
import { fileURLToPath } from "url";
import { join, dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const create = async () => {
  try {
    const filePath = join(__dirname, "files", "fresh.txt");

    try {
      await fsPromises.readFile(filePath);

      throw new Error("FS operation failed: File already exists");
    } catch (error) {
      if (error.code === "ENOENT") {
        await fsPromises.writeFile(filePath, "I am fresh and young", {
          flag: "wx",
        });
        console.log("File created successfully: fresh.txt");
      } else {
        throw error;
      }
    }
  } catch (err) {
    console.error(err.message);
  }
};

await create();
