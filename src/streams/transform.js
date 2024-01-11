import { Transform } from "stream";

const transform = async () => {
  try {
    const reverseTransform = new Transform({
      transform(chunk, encoding, callback) {
        this.push(chunk.toString().split("").reverse().join(""));
        callback();
      },
    });

    process.stdin.pipe(reverseTransform).pipe(process.stdout);

    console.log("Enter text (Enter for give ansve, Ctrl + C for end):");
  } catch (error) {
    console.error("Error during transformation:", error);
    throw error;
  }
};

await transform();
