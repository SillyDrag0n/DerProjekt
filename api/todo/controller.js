import model from './model.js'

function getAllTodos(req, res) {
    try {
        const data = model.getAllTodos()
        res.status(200).json(data)
    } catch (error) {
        res.sendStatus(500)
        console.error(error)
    }
}

function createTodo(req, res) {
    try {
        const data = model.createTodo(req.body.title, req.body.done)
        res.status(200).json(data)
    } catch (error) {
        res.sendStatus(500)
        console.error(error)
    }
}

function updateDoneState(req, res) {
    try {
        model.updateDoneState(req.params.id, req.body.done)
        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(500)
        console.error(error)
    }
}

function deleteTodo(req, res) {
    try {
        model.deleteTodo(req.params.id)
        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(500)
        console.error(error)
    }
}

export default {
    getAllTodos,
    createTodo,
    updateDoneState,
    deleteTodo
}