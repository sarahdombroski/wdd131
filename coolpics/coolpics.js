const menu_button = document.querySelector('button')

function toggleMenu() {
    menu_button.classList.toggle('hide')
}

menu_button.addEventListener('click', toggleMenu)