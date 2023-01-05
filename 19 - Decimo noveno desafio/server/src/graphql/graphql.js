import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'

import { getInfoCpu } from '../services/infoService.js'
import { getProdTest } from '../services/productsService.js'

const schema = new buildSchema(

    `   type Info {
            arg_de_entrada: String,
            plataforma: String,
            version: String,
            memoria_total: String,
            path: String,
            pid: String
        }

        type Products {
            id: String
            title: String,
            price: String,
            thumbnail: String
        }

        type Query{
            obtenerInfoCpu: Info
            obtenerProductosRandom: [Products]
        }

    `
)

async function obtenerInfoCpu() {
    const result = await getInfoCpu();
    return result
}

async function obtenerProductosRandom() {
    const result = await getProdTest();
    return result
}


const graphqlRouter = graphqlHTTP({
    schema: schema,
    rootValue: {
        obtenerInfoCpu,
        obtenerProductosRandom
    },
    graphiql: false
})

export default graphqlRouter



