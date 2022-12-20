import { snackbar } from './snackbar.js'
import { createTask } from './todo.js'

export const API_URL = `http://localhost:3000/todo`

// save id of task flagged for deletion here
let taskForDeletion = null

const UI = {
    TODO_LIST: document.querySelector('#tasks'),
    TASK_TITLE_INPUT: document.querySelector('#input_element'),
    BUTTON_ADD: document.querySelector('#button_add'),
    LABEL_OPEN_TASKS: document.querySelector('#label_open_tasks'),
    LABEL_INPUT_ERROR: document.querySelector('#label_input_error'),
    BUTTON_DELETE_DONE: document.querySelector('#btn_delete_completed'),
    CONTAINER_SNACKBAR: document.querySelector('#container_snackbar'),
    LABEL_NO_TASKS: document.querySelector('#label_no_tasks'),
    MODAL_DELETE: document.querySelector('#modal_delete_one'),
    MODAL_DELETE_BUTTON_CLOSE: document.querySelector('#modal_delete_one button.close'),
    MODAL_DELETE_BACKGROUND: document.querySelector('#modal_delete_one .modal_background'),
    MODAL_DELETE_BUTTON_CONFIRM: document.querySelector('#modal_delete_one button.confirm'),
    MODAL_DELETE_BUTTON_CANCEL: document.querySelector('#modal_delete_one button.cancel'),
    MODAL_DELETE_DONE: document.querySelector('#modal_delete_done'),
    MODAL_DELETE_DONE_BUTTON_CLOSE: document.querySelector('#modal_delete_done button.close'),
    MODAL_DELETE_DONE_BACKGROUND: document.querySelector('#modal_delete_done .modal_background'),
    MODAL_DELETE_DONE_BUTTON_CONFIRM: document.querySelector('#modal_delete_done button.confirm'),
    MODAL_DELETE_DONE_BUTTON_CANCEL: document.querySelector('#modal_delete_done button.cancel'),
    MODAL_DELETE_DONE_LABEL_AMOUNT: document.querySelector('#modal_delete_done #amount_tasks_for_deletion')
}

UI.MODAL_DELETE_BUTTON_CONFIRM.addEventListener('click', () => deleteTask(taskForDeletion))
UI.MODAL_DELETE_BUTTON_CANCEL.addEventListener('click', closeDeleteModal)
UI.MODAL_DELETE_BUTTON_CLOSE.addEventListener('click', closeDeleteModal)
UI.MODAL_DELETE_BACKGROUND.addEventListener('click', closeDeleteModal)

UI.MODAL_DELETE_DONE_BUTTON_CONFIRM.addEventListener('click', deleteDone)
UI.MODAL_DELETE_DONE_BUTTON_CANCEL.addEventListener('click', closeDeleteDoneModal)
UI.MODAL_DELETE_DONE_BUTTON_CLOSE.addEventListener('click', closeDeleteDoneModal)
UI.MODAL_DELETE_DONE_BACKGROUND.addEventListener('click', closeDeleteDoneModal)

export function openDeleteModal(_taskForDeletion) {
    taskForDeletion = _taskForDeletion
    UI.MODAL_DELETE.classList.remove('hidden')
}

function closeDeleteModal() {
    taskForDeletion = null
    UI.MODAL_DELETE.classList.add('hidden')
}

function openDeleteDoneModal() {
    let amountForDeletion = document.querySelectorAll('.task[data-done="true"]').length

    let amountText = NUMBERWORDS[amountForDeletion]
    amountText += ' Task'
    if (amountForDeletion > 1) amountText += 's werden '
    else amountText += ' wird '
    amountText += ' unwiderruflich gelöscht.'

    UI.MODAL_DELETE_DONE_LABEL_AMOUNT.innerText = amountText

    UI.MODAL_DELETE_DONE.classList.remove('hidden')
}

function closeDeleteDoneModal() {
    UI.MODAL_DELETE_DONE.classList.add('hidden')
}

const NUMBERWORDS = ['Keine', 'Ein', 'Zwei', 'Drei', 'Vier', 'Fünf', 'Sechs', 'Sieben', 'Acht', 'Neun', 'Zehn']

function getTasksFromServer() {
    fetch(`${API_URL}`).then(async data => {
        const jsonData = await data.json()
        updateTasks(jsonData)
        updateAmountOpenTasks()
        updateDeleteDoneDisabled()
    }).catch(err => {
        UI.CONTAINER_SNACKBAR.append(snackbar('Tasks konnten nicht geladen werden. Versuchen Sie, die Seite neu zu laden.'))
    })
}

function updateTasks(jsonData) {
    document.querySelectorAll('.task').forEach(task => task.remove())

    jsonData.forEach(task => {
        const taskElement = createTask(task)
        UI.TODO_LIST.append(taskElement)
    })

    toggleNoTasksMessage()
}

function addTask(title) {
    fetch(`${API_URL}/create`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: title,
                done: false
            })
        }).catch(err => {
            snackbar('Task konnte nicht erstellt werden. Versuchen Sie, die Seite neu zu laden.')
        }).then(async response => {
            const newTaskId = await response.json()
            const newTask = createTask({ id: newTaskId, title: title, done: false })

            UI.TODO_LIST.append(newTask)

            updateAmountOpenTasks()
            toggleNoTasksMessage()
            updateDeleteDoneDisabled()
        })
}

export function updateAmountOpenTasks() {
    let amountOpenTasks = document.querySelectorAll('.task[data-done="false"]').length

    // build the string showing how many open tasks there are (without ternary operators 🙄)
    let text = `${NUMBERWORDS[amountOpenTasks] || amountOpenTasks} offene`

    if (amountOpenTasks === 0) text += 'n'
    else if (amountOpenTasks === 1) text += 'r'
    text += ' Task'

    if (amountOpenTasks !== 1) text += 's'

    UI.LABEL_OPEN_TASKS.innerText = text
}

export function updateDeleteDoneDisabled() {
    if (document.querySelectorAll('.task[data-done="true"]').length == 0) UI.BUTTON_DELETE_DONE.setAttribute('disabled', true)
    else UI.BUTTON_DELETE_DONE.removeAttribute('disabled')
}

function toggleNoTasksMessage() {
    if (document.querySelectorAll('.task').length == 0) {
        UI.TODO_LIST.classList.add('hidden')
        UI.LABEL_NO_TASKS.classList.remove('hidden')
    } else {
        UI.TODO_LIST.classList.remove('hidden')
        UI.LABEL_NO_TASKS.classList.add('hidden')
    }
}

export function deleteTask(task) {
    fetch(`${API_URL}/${task.getAttribute('data-id')}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    }).then(() => {
        task.remove()
        updateAmountOpenTasks()
        updateDeleteDoneDisabled()
        toggleNoTasksMessage()
    }).catch(err => snackbar('Löschen fehlgeschlagen. Versuchen Sie, die Seite neu zu laden.'))
        .finally(closeDeleteModal)
}

function deleteDone() {
    document.querySelectorAll('.task[data-done="true"]').forEach(task => deleteTask(task))
    updateDeleteDoneDisabled()
    toggleNoTasksMessage()
    closeDeleteDoneModal()
}

function taskAddEventHandler() {
    if (UI.TASK_TITLE_INPUT.value.length == 0) {
        UI.LABEL_INPUT_ERROR.innerText = 'Geben Sie Ihrem Task einen Titel.'
    } else {
        addTask(UI.TASK_TITLE_INPUT.value)

        UI.TASK_TITLE_INPUT.value = ''
        UI.LABEL_INPUT_ERROR.innerText = ''
    }
}

// add new task on button click
UI.BUTTON_ADD.addEventListener('click', taskAddEventHandler)

// add new task on press enter
UI.TASK_TITLE_INPUT.addEventListener('keyup', event => {
    if (event.key === 'Enter') taskAddEventHandler()
})

// close modals on escape press
document.addEventListener('keyup', event => {
    if (event.key == 'Escape') {
        closeDeleteDoneModal()
        closeDeleteModal()
    }
})

// delete completed tasks on button click
UI.BUTTON_DELETE_DONE.addEventListener('click', openDeleteDoneModal)

// init
getTasksFromServer()