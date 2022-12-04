import logger from '../logger/logger.js'

import { getProdTest } from '../services/productsService.js';

async function getProdTestController(req, res) {
    const ProdTestResult = getProdTest();
    logger.info(`Ruta: ${req.url} y metodo: ${req.method} ok`)
    res.json(ProdTestResult);
}

export { getProdTestController }