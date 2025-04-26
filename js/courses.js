
const inputSearch = document.getElementById('serachInput');


const cardBoxes = document.querySelector('.CartItems');

let courses = JSON.parse(localStorage.getItem('coursesBought'));
const cardsSlider = [];

/**
 * Función para mostrar las tarjetas de los cursos agregados al carrito
 */
function showCards() {
    cardBoxes.innerHTML = ''; // Limpiar contenido antes de volver a renderizar

    const courses = JSON.parse(localStorage.getItem('coursesBought'));
   
    if (courses && courses.length > 0) {
        courses.forEach((course) => {
            const card = document.createElement('div');
            card.classList.add('CartItem');
            card.id = `Curso_${course.id}`;

            const cardImage = document.createElement('img');
            cardImage.classList.add('CartItem-img');
            cardImage.src = course.img;
            cardImage.alt = course.title;

            const cardTitle = document.createElement('p');
            cardTitle.classList.add('u-title');
            cardTitle.textContent = course.title;

            const cardAuthor = document.createElement('p');
            cardAuthor.classList.add('u-text');
            cardAuthor.textContent = course.author[0].name;

            const cardStarts = document.createElement('div');
            for (let i = 0; i < course.qualification; i++) {
                const star = document.createElement('span');
                star.classList.add('material-symbols-outlined', 'u-Starts');
                star.innerText = 'star';
                cardStarts.appendChild(star);
            }

            const cardPrice = document.createElement('p');
            cardPrice.classList.add('u-text');
            cardPrice.textContent = '$ 20.00'; 

            card.addEventListener('click', () => { window.location.href = 'course.html?course=' + course.title });

            card.append(cardImage, cardTitle, cardAuthor, cardStarts, cardPrice);
            cardBoxes.appendChild(card);
            cardsSlider.push(card);
        });

    } else {
        const emptyCard = document.createElement('div');
        emptyCard.classList.add('CartItem');

        const emptyTitle = document.createElement('h2');
        emptyTitle.classList.add('u-title');
        emptyTitle.textContent = 'You don\'t have any courses yet';

        emptyCard.appendChild(emptyTitle);
        cardBoxes.appendChild(emptyCard);
    }
}




inputSearch.addEventListener('focus', (e) => {
    inputSearch.style.outline = 'none';
    document.querySelector('.searchInput').classList.toggle('isFocus');
});

inputSearch.addEventListener('input', (e) => {
    const searchValue = e.target.value.toLowerCase();

    courses.forEach(course => {
            const title = course.title.toLowerCase();
            if (searchValue === '') {
           
                document.getElementById(`Curso_${course.id}`).classList.remove('isNotFounded');
            }
            if (!title.includes(searchValue)) {
              
                document.getElementById(`Curso_${course.id}`).classList.add('isNotFounded');
                
            } else {
                document.getElementById(`Curso_${course.id}`).classList.remove('isNotFounded');
            }
        });
   
});

showCards();