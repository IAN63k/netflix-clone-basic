const sectionSearch = document.querySelector('#search-gallery');
const main = document.querySelector('#app-render');
const headerBackground = document.querySelector('.header__bg');
const inputSearch = document.querySelector('.searchInput');
const header = document.querySelector('header');

const getDataSearch = async () => {
    try {
        const response = await fetch(url);
        const data = await response.json();

        inputSearch.addEventListener('keyup', () => {
            headerBackground.style.display = 'none';
            main.style.display = 'none';
            header.style.height = '20px';
            sectionSearch.style.display = 'grid';

            const search = inputSearch.value.toLowerCase();

            const searchResult = data.movies.filter(item => item.Title.toLowerCase().includes(search));

            sectionSearch.innerHTML = '';

            if (searchResult.length > 0) {
                searchResult.forEach(item => {
                    const cardHtml = `
                        <div class="search-gallery-item" id="show-item" data-id="${item.id}">
                            <img src="${item.Carrusel}" alt="${item.Title}" data-item="${item.id}">
                            <div class="d-f">
                                <p>${item.Title}</p>
                                <i class="fa fa-play-circle" aria-hidden="true" id="show"></i>
                            </div>
                        </div>`;
                    sectionSearch.innerHTML += cardHtml;
                });
            } else {
                const noResultsMessage = document.createElement('h2');
                noResultsMessage.classList.add('category__title');
                noResultsMessage.innerHTML = 'No se encontraron resultados';
                sectionSearch.appendChild(noResultsMessage);
            }

            // Restaurar vista inicial si el campo de búsqueda está vacío
            if (search === '') {
                headerBackground.style.display = 'block';
                main.style.display = 'block';
                header.style.height = '80vh';
                sectionSearch.style.display = 'none';
            }

        });

        // Presionar escape para limpiar el campo de búsqueda
        inputSearch.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                inputSearch.value = '';
                sectionSearch.innerHTML = '';
                headerBackground.style.display = 'block';
                main.style.display = 'block';
                header.style.height = '80vh';
                sectionSearch.style.display = 'none';
            }
        });

        // Click en #search-gallery para limpiar el campo de búsqueda
        // sectionSearch.addEventListener('click', () => {
        //     inputSearch.value = '';
        //     sectionSearch.innerHTML = '';
        //     headerBackground.style.display = 'block';
        //     main.style.display = 'block';
        //     header.style.height = '80vh';
        //     sectionSearch.style.display = 'none';
        // });

        modalS(data.movies);


    } catch (error) {
        console.log(error);
    }
}

getDataSearch();

const modalS = (data) => {
    const modal = document.querySelector('#show-modal-item');
    const modalClose = document.querySelector('.modal-close');

    const modalOpen = document.querySelectorAll('#show-item');

    // datos
    const modalTitle = document.querySelector('.item-title');
    const modalImg = document.querySelector('.item-video');
    const modalDescription = document.querySelector('.item-description');
    

    // show modal
    modalOpen.forEach((item) => {
        item.addEventListener('click', () => {
                modal.style.display = 'block';

                const id = item.getAttribute('data-id');
                const dataItem = data.find(element => element.id === id);
                modalTitle.innerHTML = dataItem.Title;
                modalImg.src = dataItem.Trailer; 
                modalDescription.innerHTML = dataItem.Description;
                const category = dataItem.Type;
                similarCategoryS(category, data);

        });
    });


    // Close modal
    modalClose.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modal.style.display = 'none';
        }
    });


}


const similarCategoryS = (category, data) => {

    // obtener los 9 primeros elementos de la categoria
    const similarItems = data.filter(item => item.Type === category).slice(0, 9);
    
    const container = document.querySelector('.similar-item');
    
    similarItems.forEach(itemCategory => {
        const htmlImage = `<img src="${itemCategory.Carrusel}" alt="${itemCategory.Title}" data-id="${itemCategory.id}" id="show-item">`;
        container.innerHTML += htmlImage;

    });

}
