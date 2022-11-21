import os from 'os';
import { fork } from 'child_process';

import logger from '../logger/logger.js'

import { getInfoCpu } from '../services/infoService.js';

const numCpu = os.cpus().length;


async function getInfoController() {
    const infoResult = getInfoCpu();
    logger.info(`Ruta: ${req.url} y metodo: ${req.method} ok`)
    res.json(infoResult);

}

async function getInfoZipController() {
    const infoResult = getInfoCpu();

    /* DESACTIVAR child_process

    const computo = fork('../fork/calculoNumerosRandom.js');
    computo.send('start');
    computo.on('message', listado => {
        res.json(listado);
    })
    */

    logger.info(`Ruta: ${req.url} y metodo: ${req.method} ok`)
    res.json(infoResult);

}


export { getInfoController, getInfoZipController }