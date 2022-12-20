import { Router } from "express"
import controller from './controller.js'

const routerToDo = Router()

routerToDo.get('/', controller.getAllTodos)
routerToDo.post('/new', controller.newToDo)
routerToDo.put('/:id', controller.updateToDoState)
routerToDo.delete('/:id', controller.removeToDo)

export default routerToDo