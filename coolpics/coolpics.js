const menu_button = document.querySelector('button');
const pictures = document.querySelectorAll('img');

function toggleMenu() {
    document.querySelector('.menu').classList.toggle('hide');
}

function handleResize() {
    if (window.innerWidth > 1000) {
        document.querySelector('.menu').classList.remove('hide');
    }
    else {
        document.querySelector('.menu').classList.add('hide');
    }
}

function toggleModal(event) {
    const modal = document.querySelector('.modal');
    
    const img = event.target.closest('img');
    const src = img.getAttribute('src');
    const imgList = src.split('-');
    const newimg = imgList[0] + '-full.jpeg';

    modal.innerHTML = `<img src="${newimg}" alt="picture"><button class="close-viewer">X</button>`;

    modal.showModal();

    const closeButton = document.querySelector('.close-viewer');
    closeButton.addEventListener('click', () => {
        modal.close();
    })

    modal.addEventListener('click', (event) => {
    if (event.target === modal){
        modal.close();
    }
})
}

handleResize();
menu_button.addEventListener('click', toggleMenu);
window.addEventListener('resize', handleResize);

pictures.forEach(picture => {
    picture.addEventListener('click', toggleModal);
})