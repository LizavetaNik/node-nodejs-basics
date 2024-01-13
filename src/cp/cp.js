import { fork } from "child_process";
import { fileURLToPath } from "url";
import { join, dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const childModule = join(__dirname, "files", "script.js");

const spawnChildProcess = async (args) => {
  fork(childModule, args);
};

// Put your arguments in function call to test this functionality
spawnChildProcess([5, 3, "q"]);
