let data = [
    { id: 3, title: 'Einkaufen gehen', done: true },
    { id: 4, title: 'Die Pyramiden in Ghaza abreissen', done: false },
    { id: 5, title: 'Fragen und Unklarheiten notieren', done: false }
]

function getAllTodos() {
    return data
}

function createNewToDo(title, done) {
    let newId = data.at(-1)?.id + 1 || 0 // start with id 0

    data.push({
        id: newId,
        title: title,
        done: done
    })

    return newId
}

function updateToDoState(id, newDoneState) {
    const task = data.find(todo => todo.id == id)

    if (!task) throw new Error('Task not found')

    task.done = newDoneState
}

function removeToDo(id) {
    const idx = data.findIndex(todo => todo.id == id)
    data.splice(idx, 1)
}

export default {
    getAllTodos,
    createNewToDo,
    updateToDoState,
    removeToDo
}