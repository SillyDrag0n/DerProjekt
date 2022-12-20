import cors from 'cors'
import Express from "express"

// import routers
import todoRouter from './todo/router.js'

const port = 3000
const app = Express()

// middleware
app.use(cors())
app.use(Express.json())
app.use(Express.urlencoded({extended: true}))

// use routers
app.use('/todo', todoRouter)

// start
app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`)
})