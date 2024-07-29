const modal = document.querySelector('#show-modal-item');
const modalClose = document.querySelector('.modal-close');
const modalOpen = document.querySelectorAll('#show-item');  


modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
}) ;



modalOpen.forEach((item) => {
    console.log(item);
});




