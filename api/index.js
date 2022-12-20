import cors from 'cors'
import Express from "express"
import routerToDo from './todo/router.js'

const requestPort = 3000
const app = Express()

app.use(cors())
app.use(Express.json())
app.use(Express.urlencoded({extended: true}))
app.use('/todo', routerToDo)

app.listen(requestPort, () => {
    console.log(`App listening on http://localhost:${requestPort}`)
})