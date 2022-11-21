import logger from '../logger/logger.js'

import { getNumerosRandom } from '../services/randomService.js';

async function getRandomController(req, res) {
    const body = req.query;
    if (body.cant) {
        res.send(getNumerosRandom(body.cant));
        return
    }
    logger.info(`Ruta: ${req.url} y metodo: ${req.method} ok`);
    res.redirect('/api/randomSinParam')
}

async function getRandomSinParamController() {
    logger.info(`Ruta: ${req.url} y metodo: ${req.method} ok`);
    res.send(getNumerosRandom(600000000));

}

export { getRandomController, getRandomSinParamController }