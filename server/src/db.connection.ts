import {config} from "dotenv"
config()

// параметры соединения с енв файла
const CONNECTION = {
    type: 'postgres',
    host: process.env.DB_HOST,        //хост
    port: process.env.DB_PORT,        //порт
    username: process.env.DB_USER,    //имя юзера
    password: process.env.DB_PASSWORD,//пароль
    database: process.env.DB_NAME,    //бд
}
export default CONNECTION;