import { Router } from "express"
import controller from './controller.js'

const todoRouter = Router()

todoRouter.get('/', controller.getAllTodos)
todoRouter.post('/create', controller.createTodo)
todoRouter.put('/:id', controller.updateDoneState)
todoRouter.delete('/:id', controller.deleteTodo)

export default todoRouter