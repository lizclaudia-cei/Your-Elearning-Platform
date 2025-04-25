//----------------------------------
// Variables
//----------------------------------
const imageBoxes = document.querySelector('.ImageBoxes');
const btnNext = document.getElementById('btnNext');
const btnPrev = document.getElementById('btnPrev');

const cardBoxes = document.querySelector('.CoursesCards');
const sectionCourses = document.querySelector('.Main-courses');
const btnNextCard = document.getElementById('btnNextCard');

const cardComments = document.querySelector('.Comments');
const btnNextComment = document.getElementById('btnNextComment');
const sectionComments = document.querySelector('.Main-comments');

const inputSearch = document.getElementById('serachInput');
const btnSearch = document.getElementById('btnSearch');
const cartCountElement = document.querySelector('.cart-count');

const btnCart = document.querySelector('.cart-container');
const screenWidth = window.innerWidth;
let btnPrevCard = '';

const courseDropdown = document.getElementById('course-select');

const customDialog = document.getElementById('custom-dialog');


// Variables para slider de imaganes de inicio 
let currentImage = 0;
let cartCount = 0;
let courses = JSON.parse(localStorage.getItem('courses')) || [];
const listImages = `[
    {
        "id" : 1,
        "src" : "./assets/img/cursos_ia.webp",
        "description": "Curso IA"
    },
    {
        "id" : 2,
        "src" : "./assets/img/version_control.webp",
        "description": "Control de versiones"
    },
    {
        "id" : 3,
        "src" : "./assets/img/testing.webp",
        "description": "Testing"
    },
    {
        "id" : 4,
        "src" : "./assets/img/imagen_ejecutiva.webp",
        "description": "Ejecutiva"
    }
]`;


const imagesSlider = [];

// Variables para slider  de atarjetas de cursos
let currentCard = 0;
const cardsSlider = [];

// Variables para slider de comentarios
let currentComment = 0;
const commentsSlider = [];

let listComments = `[
    {
        "topic": "Platform",
        "author": "Juan Perez",
        "img": "./assets/img/user2.webp",
        "description":"Excelente plataforma, me ayudo a mejorar mis habilidades"
    },
    {
        "topic": "Software Engineering",
        "author": "Maria Lopez",
        "img": "./assets/img/user1.webp",
        "description":"Me encanto el curso, muy recomendado"
    },
    {
        "topic": "Software Engineering",
        "author": "Pedro Ramirez",
        "img": "./assets/img/user3.webp",
        "description":"Excelente curso, muy completo"
    },
    {
        "topic": "Software Engineering",
        "author": "Ana Maria",
         "img": "./assets/img/user4.webp",
        "description":"Muy buen curso, lo recomiendo"
    }
]`

//----------------------------------
// Functions
//----------------------------------

/**
 * Funcion para convertir el json a un objeto de js
 * @param {string} json
 * @returns {object}
 */
function convertJsonToObject(json) {
    return JSON.parse(json);
}


/**
 * Funcion para tarer los cursos desde el courses.json
 */

async function getCourses() {
    try {
        let courses = await fetch('./jsons/courses_new.json');
        courses = await courses.json();

        return courses;

    } catch (error) {
        console.error(error);
        return null;
    }

}

// Funciones  para slider de imagenes 
/** 
 * Funcion para cargar las imagenes en el slider
 * 
 */
function addImages() {
    const images = convertJsonToObject(listImages);
    images.map((image) => {
        const imageBox = document.createElement('img');
        imageBox.classList.add('ImageBoxes--box');
        imageBox.src = image.src;
        imageBox.alt = image.description;
        imageBoxes.appendChild(imageBox);
        imagesSlider.push(imageBox);
    });
}

/**
 * Funcion para actualizar el slider de imagenes
 */
function updateSlider() {
    let width = 400;
    const screenWidth = window.innerWidth;
    if (screenWidth >= 600 && screenWidth <= 900) {
        width = 800;
    } else if (screenWidth >= 900) {
        width = 2800;
    }
    imageBoxes.style.transform = `translateX(-${currentImage * width}px)`;
}

/**
 * Funcion para mostrar la siguiente imagen
 */
function nextImage() {
    currentImage++;
    if (currentImage >= imagesSlider.length) {
        currentImage = 0;
    }
    updateSlider();
}

/**
 * Funcion para mostrar la imagen anterior
 */
function prevImage() {
    currentImage--;
    if (currentImage < 0) {
        currentImage = imagesSlider.length - 1;
    }
    updateSlider();
}

/**
 * Funcion para mostrar imaganes en un intervalo de tiempo
 */
function showImagesInterval() {
    intervals = setInterval(nextImage, 4000);
}


// Funcione spara slider de tarjetas de cursos

/**
 * Funcion para agregar las tarjetas de cursos
 */
function addCards() {
    getCourses().then((cour) => {
        cour.courses.map((course) => {
            const card = document.createElement('div');
            const cardImage = document.createElement('img');
            const cardTitle = document.createElement('h2');
            const cardDescription = document.createElement('p');
            const cardAuthor = document.createElement('p');
            const cardStarts = document.createElement('div');
            const cardPrice = document.createElement('h3');
            const btnAdd = document.createElement('button');

            for (let i = 0; i < course.qualification; i++) {
                const star = document.createElement('span');
                star.classList.add('material-symbols-outlined');
                star.classList.add('u-Starts');
                star.innerText = 'star';
                cardStarts.appendChild(star);
            }

            card.id = `Curso_${course.id}`;
            card.classList.add('Main-courses--course');
            cardImage.classList.add('Main-course--img');
            cardTitle.classList.add('u-title');
            cardDescription.classList.add('u-text');
            cardAuthor.classList.add('u-title');
            cardPrice.classList.add('u-title');
            btnAdd.classList.add('u-button');
            cardImage.src = course.img;
            cardImage.alt = course.title;
            cardTitle.textContent = course.title;
            cardDescription.textContent = course.overview;
            cardPrice.textContent = `Price: $20.00`;
            cardAuthor.textContent = `Professor: ${course.author[0].name}` ;
            btnAdd.textContent = 'Buy now';

           btnAdd.addEventListener('click', (e) => {
                cartCount++;
                cartCountElement.textContent = cartCount;
                courses.push(course);
                localStorage.setItem('courses', JSON.stringify(courses));
                document.getElementById('coursesBuy').textContent = `The course ${course.title} has been added to the cart`;
                customDialog.classList.add('isActive');
                document.getElementById('go-to-cart').addEventListener('click', () => {
                    customDialog.classList.remove('isActive');
                    window.location.href = './shoping_car.html';
                  });
                  
                  document.getElementById('go-to-home').addEventListener('click', () => {
                    customDialog.classList.remove('isActive');
                    window.location.href = './index.html';
                  });
                console.log(courses);
            });
            card.appendChild(cardImage);
            card.appendChild(cardTitle);
            card.appendChild(cardDescription);
            card.appendChild(cardStarts);
            card.appendChild(cardAuthor);
            card.appendChild(cardPrice);
           
            card.appendChild(btnAdd);
            cardBoxes.appendChild(card);
            cardsSlider.push(card);
        });
    });
    


}

/**
 * Funciones para actualizar el slider de tarjetas
 */
function updateCards() {
    let width = 250;
    const screenWidth = window.innerWidth;
    if (screenWidth >= 600 && screenWidth <= 900) {
        width = 400;
    }
    cardBoxes.style.transform = `translateX(-${currentCard * width}px)`;

    const button = document.getElementById('btnPrevCard');
    if (button) {
        button.remove();
    }
    if (currentCard > 0) {
        const button = document.createElement('button');
        const span = document.createElement('span');
        button.classList.add('Main-imageCarousel--button');
        button.classList.add('u-Prev');
        span.classList.add('material-symbols-outlined');
        button.id = 'btnPrevCard';
        span.innerText = 'arrow_back_ios';
        button.addEventListener('click', prevCard);
        button.appendChild(span);
        sectionCourses.appendChild(button);
    }

}





/**
 * Funcion para agregar comentarios 
 */
function addComments() {
    cardComments.innerHTML = '';
    const comments = convertJsonToObject(listComments);
    

    comments.map((comment) => {
        const card = document.createElement('div');
        const cardImage = document.createElement('img');
        const cardText = document.createElement('p');
        const cardTitle = document.createElement('h3');
        const cardAuthor = document.createElement('p');
        const cardUser = document.createElement('div');


        card.classList.add('Main-comments--coment');
        cardImage.classList.add('Main-comments--coment-user-img');
        cardTitle.classList.add('u-title');
        cardText.classList.add('u-txtPrimary');
        cardAuthor.classList.add('u-title');
        cardUser.classList.add('Main-comments--coment-user');



        cardImage.src = comment.img;
        cardImage.alt = comment.author;
        cardTitle.textContent = comment.topic;
        cardAuthor.textContent = comment.author;
        cardText.textContent = comment.description;

        card.appendChild(cardTitle);
        card.appendChild(cardText);
        cardUser.appendChild(cardImage);
        cardUser.appendChild(cardAuthor);
        card.appendChild(cardUser);


        cardComments.appendChild(card);
        commentsSlider.push(card);

        checkCommentsOverflow();
    });



}

function updateComments() {
    let width = 200;

    if (screenWidth >= 600 && screenWidth <= 900) {
        width = 550;
    }
    cardComments.style.transform = `translateX(-${currentComment * width}px)`;

    const button = document.getElementById('btnPrevComment');
    if (button) {
        button.remove();
    }
    if (currentComment > 1) {
        const button = document.createElement('button');
        const span = document.createElement('span');
        button.classList.add('Main-imageCarousel--button');
        button.classList.add('u-Prev');
        span.classList.add('material-symbols-outlined');
        button.id = 'btnPrevComments';
        span.innerText = 'arrow_back_ios';
        button.addEventListener('click', prevComment);
        button.appendChild(span);
        sectionComments.appendChild(button);
    }

}


/**
 * Funcion para mostrar la siguiente card
 */
function nextComment() {

    currentComment++;
    if (currentComment >= commentsSlider.length) {
        currentComment = 0;
    }
    updateComments();
}

/**
 * Funcion para mostrar boton anterior
 */
function prevComment() {
    currentComment--;
    if (currentComment <= 0) {

        currentComment = commentsSlider.length - 1;
    }
    updateComments();
}







/**
 * Funcion para verificar el tamaño del contenidos
 */
function checkCommentsOverflow() {
    const comments = document.querySelector('.Comments');
    if (comments.scrollWidth > comments.clientWidth) {
        btnNextComment.style.opacity = '1';

    } else {
        btnNextComment.style.opacity = '0';

    }
}

/**
 * Funcion para mostrar el select del form
 */

function showSelect() {
    getCourses().then((cours) => {
        cours.courses.map((course) => {
            const option = document.createElement('option');
            option.value = course.id;
            option.textContent = course.title;
            courseDropdown.appendChild(option);
        });
    });
}


//----------------------------------
// Events
//----------------------------------
btnNextComment.addEventListener('click', nextComment);
btnNext.addEventListener('click', nextImage);
btnPrev.addEventListener('click', prevImage);


window.addEventListener('resize',checkCommentsOverflow);


inputSearch.addEventListener('focus', (e) => {
    inputSearch.style.outline = 'none';
    document.querySelector('.searchInput').classList.toggle('isFocus');
});
inputSearch.addEventListener('input', (e) => {
    const searchValue = e.target.value.toLowerCase();
    getCourses().then((cours) => {
        cours.courses.forEach(course => {
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
    })
});
inputSearch.addEventListener('blur', () => {
    document.querySelector('.searchInput').classList.remove('isFocus');

});

// 



commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name');
    const email = document.getElementById('emailComment');
    const comment = document.getElementById('comment');
    

    console.log(name.value);
    console.log(email.value);
    console.log(comment.value);
    
    if (name.value === '' || email.value === '' || comment.value === '' || courseDropdown.value === '') {
        alert('Por favor, completa todos los campos');
        return;
    }
    let comments = JSON.parse(listComments);
    comments.push({
        "topic": courseDropdown.value,
        "author": name.value,
        "img": "./assets/img/user2.webp",
        "description": comment.value

    });
    listComments = JSON.stringify(comments);
    console.log(comments);
  
    addComments();
    commentForm.reset();
});


btnCart.addEventListener('click', (e) => {
    if (cartCount > 0) {
        window.location.href = './shoping_car.html';
    } else {
        alert('No tienes cursos en el carrito');
    }
});

//----------------------------------
// Inits
//----------------------------------
addImages();
showImagesInterval();
addCards();
addComments();
checkCommentsOverflow();
showSelect();



