import MongoStore from 'connect-mongo'

export const config = {
    sqlite3: {
        client: 'sqlite3',
        connection: {
            filename: `./DB/ecommerce.sqlite`
        },
        useNullAsDefault: true
    },
    mariaDb: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'coderhouse'
        }
    },
    fileSystem: {
        path: './DB/'
    },
    mongoRemote: {
    
            store: MongoStore.create(
                {
                    mongoUrl: 'mongodb+srv://nicoperez20365:Afmm4YrqYw2ijbZr@cluster0.kjlk6re.mongodb.net/sesiones?retryWrites=true&w=majority',
                    mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true }
                }),
            secret: 'secret',
            resave: false,
            saveUninitialized: false,
            cookie: {
                expires: 10000
            }
    },
    mongodb: {
        cnxStr: 'mongodb://localhost:27017/coderhouse',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useCreateIndex: true,
            //serverSelectionTimeoutMS: 5000,
        }
    }
}