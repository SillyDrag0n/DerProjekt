function closeSnackbar(snackbarElement) {
    snackbarElement.classList.add('closing')
    setTimeout(() => snackbarElement.remove(), 500)
}

export function snackbar(message, type = 'error', closeAfter = 5000) {
    const element_snackbar = document.createElement('div')
    element_snackbar.className = 'snackbar'

    const element_icon = document.createElement('div')
    element_icon.className = `icon ${type}`

    const element_text = document.createElement('p')
    element_text.innerText = message

    const element_close = document.createElement('button')
    element_close.className = 'icon close'
    element_close.addEventListener('click', () => closeSnackbar(element_snackbar))

    element_snackbar.append(element_icon, element_text, element_close)

    // close snackbar automatically
    if (closeAfter) setTimeout(() => closeSnackbar(element_snackbar), closeAfter)

    return element_snackbar
}