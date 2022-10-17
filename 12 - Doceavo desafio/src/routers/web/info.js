import { Router } from 'express'

const infoRouter = new Router();

infoRouter.get('/info', (req, res) => {
    res.json({
        arg_de_entrada: process.argv.slice(2),
        plataforma: process.platform,
        version: process.version,
        memoria_total: process.memoryUsage().rss,
        path: process.cwd(),
        pid: process.pid
    })
})

export default infoRouter;