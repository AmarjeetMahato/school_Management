import cluster from 'cluster'
import os from 'os'
import * as dotenv from "dotenv";
import { app } from './app';

dotenv.config();

const PORT = process.env.PORT ? +process.env.PORT : 5000
const numCPUs = os.cpus().length;

const startWorker = async () => {
      
     try {
    await app.listen({ port: PORT, host: "0.0.0.0" });
    console.log(`Worker ${process.pid} running on port ${PORT}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  const shutdown = () => {
    app.close(() => {
      console.log(`Worker ${process.pid} - Gracefully shutting down`);
      process.exit(0);
    });
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);

}


if (cluster.isPrimary) {
  console.log(`Master ${process.pid} running`);
  console.log(`Starting ${numCPUs} workers`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });
} else {
  startWorker();
}