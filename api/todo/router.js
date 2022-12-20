import { Router } from "express"
import controller from './controller.js'

const routerToDo = Router()

routerToDo.get('/', controller.getAllTodos)
routerToDo.post('/create', controller.createNewToDo)
routerToDo.put('/:id', controller.updateToDoState)
routerToDo.delete('/:id', controller.removeToDo)

export default routerToDo