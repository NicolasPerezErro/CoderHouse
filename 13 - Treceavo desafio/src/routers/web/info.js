import { Router } from 'express';
import os from 'os';

const numCpu = os.cpus().length;

const infoRouter = new Router();

infoRouter.get('/info', (req, res) => {
    res.json({
        arg_de_entrada: process.argv.slice(2),
        plataforma: process.platform,
        version: process.version,
        memoria_total: process.memoryUsage().rss,
        path: process.cwd(),
        pid: process.pid,
        numCPU: numCpu
    })
})

export default infoRouter;