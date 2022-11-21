
import dotenv from 'dotenv';
import parseArgs from 'minimist';
import cluster from 'cluster';
import os from 'os';

import { config } from './config.js';

import { conectarDB } from './controllers/dbController.js';

import logger from './logger/logger.js'

import app from './app.js'

// dotenv

dotenv.config();

// minimist

const options = {
    default: { puerto: 8080, modo: 'FORK' },
    alias: { p: 'puerto', m: 'modo' }
}

const args = parseArgs(process.argv.slice(2), options);

if (cluster.isPrimary && args.m === 'CLUSTER') {

    const numCpu = os.cpus().length;

    console.log('Cantidad de nucleos:' + numCpu)
    console.log('PID master: ' + process.pid)

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
        logger.info(`MODO ${args.m}`)

        app.listen(args.p, (err) => {
            if (err) return logger.error('error en listen server', err);
            logger.info(`Server running on port ${args.p}`);
        });
    });

}



