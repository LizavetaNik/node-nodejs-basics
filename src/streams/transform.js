import { Transform } from "stream";

const transform = async () => {
  try {
    const reverseTransform = new Transform({
      transform(chunk, _, callback) {
        const stringForTransform = chunk.toString().trim();
        const reversedString = stringForTransform.split("").reverse().join("");
        callback(null, reversedString + "\n");
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
