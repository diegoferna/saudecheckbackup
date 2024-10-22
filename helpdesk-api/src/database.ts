import {knex as setupKnex, Knex} from 'knex'
import { env } from './env'

export const config: Knex.Config = {
    client: 'mssql',
    connection: {
        database: 'Checklist',
        server: 'localhost',
       // host: '127.0.0.1',
        user:'checklist',
        password: '123456',
        filename: env.DATABASE_URL,
        connectionTimeout: 30000,
        options: {
            encrypt: false,
            trustedConnection: true
        },
    },    
    useNullAsDefault: true,
    migrations: {
        extension: 'ts',
        directory: './db/migrations'
    }
}


export const knex = setupKnex (config)