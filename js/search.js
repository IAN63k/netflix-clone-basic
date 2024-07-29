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
                        <div class="search-gallery-item">
                            <img src="${item.Carrusel}" alt="${item.Title}" data-item="${item.id}" id="show-item">
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
        sectionSearch.addEventListener('click', () => {
            inputSearch.value = '';
            sectionSearch.innerHTML = '';
            headerBackground.style.display = 'block';
            main.style.display = 'block';
            header.style.height = '80vh';
            sectionSearch.style.display = 'none';
        });

    } catch (error) {
        console.log(error);
    }
}

getDataSearch();
