import { API_URL, openDeleteModal, updateAmountOpenTasks, updateDeleteDoneDisabled } from "./index.js"
import { snackbar } from "./snackbar.js"

export function createTask(taskData) {
    // task container
    let elementContainer = document.createElement('li')
    elementContainer.className = 'task'

    // create elements
    let elementCheckbox = document.createElement('input')
    let elementTitle = document.createElement('p')
    let elementButtonDelete = document.createElement('button')

    // set element attributes
    elementContainer.setAttribute('data-done', taskData.done)
    elementContainer.setAttribute('data-id', taskData.id)
    elementCheckbox.setAttribute('type', 'checkbox')
    elementCheckbox.setAttribute('title', 'Status ändern')
    elementCheckbox.checked = taskData.done
    elementButtonDelete.setAttribute('title', 'Task löschen')


    // set element text
    elementTitle.innerText = taskData.title

    // set event listeners
    elementCheckbox.addEventListener('change', event => {
        let taskDone = event.target.checked

        fetch(`${API_URL}/${taskData.id}`,
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    done: taskDone
                })
            }).then(() => {
                elementContainer.setAttribute('data-done', taskDone)
                updateAmountOpenTasks()
                updateDeleteDoneDisabled()
            }).catch(err => {
                snackbar('Etwas ist schiefgelaufen. Versuchen Sie, die Seite neu zu laden.')
                event.target.checked = !event.target.checked
            })
    })

    elementButtonDelete.addEventListener('click', () => {
        openDeleteModal(elementContainer)
    })

    // append elements to container
    elementContainer.append(elementCheckbox, elementTitle, elementButtonDelete)

    return elementContainer
}
