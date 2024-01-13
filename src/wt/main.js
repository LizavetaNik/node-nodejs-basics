import { Worker } from "worker_threads";
import { fileURLToPath } from "url";
import { join, dirname } from "path";
import { availableParallelism } from "os";

const START_NUM = 10;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const workerPath = join(__dirname, "worker.js");

const fibonacciServer = (num) =>
  new Promise((resolve) => {
    const worker = new Worker(workerPath, { workerData: num });
    worker.on("message", (data) =>
      resolve({
        status: "resolved",
        data,
      })
    );

    worker.on("error", () =>
      resolve({
        status: "error",
        data: null,
      })
    );
  });

const performCalculations = async () => {
  const workersPool = Array.from({ length: availableParallelism() }, (_, i) =>
    fibonacciServer(START_NUM + i)
  );
  const result = await Promise.all(workersPool);
  console.log(result);
};

await performCalculations();
