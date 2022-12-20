let data = [
    { id: 4, title: 'Einkaufen gehen', done: true },
    { id: 5, title: 'Die Pyramiden in Ghaza abreissen', done: false },
    { id: 69, title: 'Kempf Hausaufgaben machen', done: false }
]

function newToDo(title, done) 
{
    let newId = data.at(-1)?.id + 1 || 0 // start with id 0

    data.push({
        id: newId,
        title: title,
        done: done
    })

    return newId
}

function getAllTodos() 
{
    return data
}

function removeToDo(id) 
{
    const idx = data.findIndex(todo => todo.id == id)
    data.splice(idx, 1)
}

function updateToDoState(id, newDoneState) 
{
    const task = data.find(todo => todo.id == id)

    if (!task) throw new Error('Task not found')

    task.done = newDoneState
}

export default 
{
    newToDo,
    getAllTodos,
    removeToDo,
    updateToDoState
}