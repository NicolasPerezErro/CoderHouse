async function getInfoCpu() {
    const info = {
        arg_de_entrada: process.argv.slice(2),
        plataforma: process.platform,
        version: process.version,
        memoria_total: process.memoryUsage().rss,
        path: process.cwd(),
        pid: process.pid
    }
    return info
}

export { getInfoCpu }

