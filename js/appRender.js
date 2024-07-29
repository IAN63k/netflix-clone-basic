
const url = 'https://api.jsonsilo.com/public/9147c927-d488-4aa0-bf9c-7121ac637876';

const getData = async () => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        // Imprimir los tipos de pelicula
        const categories = data.movies.map(item => item.Type);
        const uniqueCategories = [...new Set(categories)];
        renderCategories(data.movies, uniqueCategories);
    } catch (error) {
        console.log(error);
    }
}

getData();

const renderCategories = async (data, categories) => {
    const main = document.querySelector('#app-render');

    // create a div for each category
    categories.forEach(itemCateory => {

        const wrapperSlide = document.createElement('div');
        wrapperSlide.classList.add('wrapper__slide');


        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('wrapper__cards');
        categoryDiv.classList.add('category');


        const h2 = document.createElement('h2');
        h2.classList.add('category__title');
        h2.innerHTML = itemCateory;



        const containerCards = document.createElement('div');
        containerCards.classList.add('container__cards');

        // Add cards to category
        data.forEach(item => {

            if (item.Type !== itemCateory) return;

            const card = document.createElement('div');
            card.classList.add('card');
            card.setAttribute('data-title', item.Title);
            card.innerHTML = `
                    <img src="${item.Carrusel}" alt="${item.Title}" data-item="${item.id}" id="show-item">
                    <div class="card__control">
                        <span>${item.Title}</span>
                        <div>
                        <i class="fa fa-play-circle" aria-hidden="true"></i>
                        <i class="fa fa-plus-circle" aria-hidden="true"></i>
                        <div class="reactions">
                            <i class="fa fa-thumbs-up" aria-hidden="true"></i>
                            <i class="fa fa-gratipay" aria-hidden="true"></i>
                            <i class="fa fa-thumbs-down" aria-hidden="true"></i>
                        </div>
                        </div>
                    </div>
                `;
            containerCards.appendChild(card);
        });

        categoryDiv.appendChild(containerCards);
        wrapperSlide.appendChild(h2);
        wrapperSlide.appendChild(categoryDiv);
        main.appendChild(wrapperSlide);
    });


}

const createCard = (data) => {
    data.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-title', item.Title);
        card.innerHTML = `
                    <img src="${item.Poster}" alt="${item.Title}" id="show-item">
                    <div class="card__control">
                        <i class="fa fa-play-circle" aria-hidden="true"></i>
                        <i class="fa fa-plus-circle" aria-hidden="true"></i>
                        <div class="reactions">
                            <i class="fa fa-thumbs-up" aria-hidden="true"></i>
                            <i class="fa fa-gratipay" aria-hidden="true"></i>
                            <i class="fa fa-thumbs-down" aria-hidden="true"></i>
                        </div>
                    </div>
                `;
        container.appendChild(card);
    });
}
// renderData();