import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv'
dotenv.config()

export const db = new Sequelize( process.env.DATABASE_URL ,{
    models: [__dirname + '/../models/**/*'],
    logging: false,//Evita que se ejecute codigo de SQL al iniciar
    dialectOptions: {
        ssl: {
            require: false
        }
    }
})