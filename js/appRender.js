
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
            card.id = "show-item";
            card.setAttribute('data-id', item.id);
            card.innerHTML = `
                    <img src="${item.Carrusel}" alt="${item.Title}" data-item="${item.id}">
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

    modal(data);
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


const modal = (data) => {
    const modal = document.querySelector('#show-modal-item');
    const modalClose = document.querySelector('.modal-close');

    const modalOpen = document.querySelectorAll('#show-item');

    // datos
    const modalTitle = document.querySelector('.item-title');
    const modalImg = document.querySelector('.item-video');
    const modalDescription = document.querySelector('.item-description');
    const itemValue = document.querySelector('.item-value');

    // show modal
    modalOpen.forEach((item) => {
        item.addEventListener('click', () => {
                modal.style.display = 'block';

                const id = item.getAttribute('data-id');
                const dataItem = data.find(element => element.id === id);
                modalTitle.innerHTML = dataItem.Title;
                modalImg.src = dataItem.Trailer; 
                modalDescription.innerHTML = dataItem.Description;
                itemValue.innerHTML = dataItem.Value;                
                const category = dataItem.Type;
                similarCategory(category, data);

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


const similarCategory = (category, data) => {

    // obtener los 9 primeros elementos de la categoria
    const similarItems = data.filter(item => item.Type === category).slice(0, 9);
    
    const container = document.querySelector('.similar-item');
    
    similarItems.forEach(itemCategory => {
        const htmlImage = `<img src="${itemCategory.Carrusel}" alt="${itemCategory.Title}" data-id="${itemCategory.id}" id="show-item">`;
        container.innerHTML += htmlImage;

    });

}

