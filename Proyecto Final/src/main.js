import dotenv from 'dotenv';
import cluster from 'cluster';
import parseArgs from 'minimist';
import os from 'os';

import { conectarDB } from './controllers/dbController.js';

import config from './config.js'
import app from './server.js'
import logger from './logger/logger.js'

dotenv.config();

// minimist

const options = {
    default: { puerto: 8080 },
    alias: { p: 'puerto' }
}

const args = parseArgs(process.argv.slice(2), options);

if (cluster.isPrimary && process.env.MODO === 'CLUSTER') {

    const numCpu = os.cpus().length;

    for (let i = 0; i < numCpu; i++) {
        cluster.fork();
    }

    cluster.on('exit', worker => {
        cluster.fork();
    })

} else {

    conectarDB(config.mongodb.cnxStr, err => {

        if (err) return logger.error('error en conexión de base de datos', err);
        logger.info('BASE DE DATOS CONECTADA');
        logger.info(`MODO ${process.env.MODO}`)

        app.listen(args.p, (err) => {
            if (err) return logger.error('error en listen server', err);
            logger.info(`Server running on port ${args.p}`);
        });
    });
}
