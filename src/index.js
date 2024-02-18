const express = require('express')
const { PORT } = require('./config')
const { databaseConnection } = require('./database')


const StartServer = async() => {
    const app = express()
    await databaseConnection()

    app.listen(PORT, () => {
        console.log(`listening to port ${PORT}`)
    })
    .on('error', (err) => {
        console.log(err)
        process.exit()
    })
}

StartServer() 
