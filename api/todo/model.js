let data = [
    { id: 3, title: 'Hausaufgaben machen', done: true },
    { id: 4, title: 'Projekt abgeben', done: false },
    { id: 5, title: 'Webservice erstellen', done: false }
]

function getAllTodos() {
    return data
}

function createTodo(title, done) {
    let newId = data.at(-1)?.id + 1 || 0 // start with id 0

    data.push({
        id: newId,
        title: title,
        done: done
    })

    return newId
}

function updateDoneState(id, newDoneState) {
    const task = data.find(todo => todo.id == id)

    if (!task) throw new Error('Task not found')

    task.done = newDoneState
}

function deleteTodo(id) {
    const idx = data.findIndex(todo => todo.id == id)
    data.splice(idx, 1)
}

export default {
    getAllTodos,
    createTodo,
    updateDoneState,
    deleteTodo
}