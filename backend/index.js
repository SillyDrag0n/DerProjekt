import cors from 'cors'
import Express from "express"

import routerToDo from './todo/router.js'

const requestPort = 3000
const express = Express()

express.use(cors())
express.use(Express.json())
express.use(Express.urlencoded({extended: true}))

express.use('/todo', routerToDo)

express.listen(requestPort, () => {
    console.log(`App listening on http://localhost:${requestPort}`)
})