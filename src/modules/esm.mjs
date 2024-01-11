import path from "path";
import { release, version } from "os";
import { createServer as createServerHttp } from "http";
import fs from "fs/promises";
import "./files/c.js";

const random = Math.random();

let unknownObject;
let filePath;

if (random > 0.5) {
  filePath = "files/a.json";
} else {
  filePath = "files/b.json";
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${import.meta.url}`);
console.log(
  `Path to current directory is ${new URL(".", import.meta.url).pathname}`
);

const myServer = createServerHttp((_, res) => {
  res.end("Request accepted");
});

const PORT = 3000;

try {
  const data = await fs.readFile(filePath, "utf8");
  unknownObject = JSON.parse(data);
  console.log(unknownObject);
} catch (err) {
  console.error("Can not read json:", err);
}

myServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log("To terminate it, use Ctrl+C combination");
});

export { unknownObject, myServer };
