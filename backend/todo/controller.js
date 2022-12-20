import model from './model.js'

function getAllTodos(req, res) 
{
    try 
    {
        const data = model.getAllTodos()
        res.status(200).json(data)
    }
    catch (error) 
    {
        res.sendStatus(500)
        console.error(error)
    }
}

function newToDo(req, res) 
{
    try 
    {
        const data = model.newToDo(req.body.title, req.body.done)
        res.status(200).json(data)
    } 
    catch (error) 
    {
        res.sendStatus(500)
        console.error(error)
    }
}

function updateToDoState(req, res) 
{
    try 
    {
        model.updateToDoState(req.params.id, req.body.done)
        res.sendStatus(200)
    } 
    catch (error) 
    {
        res.sendStatus(500)
        console.error(error)
    }
}

function removeToDo(req, res) 
{
    try 
    {
        model.removeToDo(req.params.id)
        res.sendStatus(200)
    } 
    catch (error) 
    {
        res.sendStatus(500)
        console.error(error)
    }
}

export default 
{
    getAllTodos,
    newToDo,
    updateToDoState,
    removeToDo
}