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


const screenWidth = window.innerWidth;
let btnPrevCard = '';


// Variables para slider de imaganes de inicio 
let currentImage = 0;
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

const listComments =`[
    {
        "author": "Juan Perez",
        "img": "./assets/img/user2.webp",
        "description":"Excelente plataforma, me ayudo a mejorar mis habilidades"
    },
    {
        "author": "Maria Lopez",
        "img": "./assets/img/user1.webp",
        "description":"Me encanto el curso, muy recomendado"
    },
    {
        "author": "Pedro Ramirez",
        "img": "./assets/img/user3.webp",
        "description":"Excelente curso, muy completo"
    },
    {
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
    images.map((image, index) => {
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
    if(screenWidth >= 600 && screenWidth <= 900){
        width = 800;
    }else if(screenWidth >= 900){
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
            const cardTitle = document.createElement('p');
            const cardAuthor = document.createElement('p');
            const cardStarts = document.createElement('div');

            for (let i = 0; i < course.qualification; i++) {
                const star = document.createElement('span');
                star.classList.add('material-symbols-outlined');
                star.classList.add('u-Starts');
                star.innerText = 'star';
                cardStarts.appendChild(star);
            }
            card.classList.add('Main-courses--course');
            cardImage.classList.add('Main-course--img');
            cardTitle.classList.add('u-title');
            cardAuthor.classList.add('u-text');
             cardImage.src = course.img;
             cardImage.alt = course.title;
            cardTitle.textContent = course.title;;
            cardAuthor.textContent = course.author[0].name;

            card.addEventListener('click', () => { window.location.href = 'course.html?course=' + course.title });
            card.appendChild(cardImage);
            card.appendChild(cardTitle);
            card.appendChild(cardAuthor);
            card.appendChild(cardStarts);
            cardBoxes.appendChild(card);
            cardsSlider.push(card);
        });
    });
    if(screenWidth >= 900){
        const button = document.getElementById('btnNextCard');
        button.remove();
    }


}

/**
 * Funciones para actualizar el slider de tarjetas
 */
function updateCards() {
    let width = 250;
    const screenWidth = window.innerWidth;
    if(screenWidth >= 600 && screenWidth <= 900){
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
 * Funcion para mostrar la siguiente card
 */
function nextCard() {
    currentCard++;
    if (currentCard >= cardsSlider.length) {
        currentCard = 0;
    }
    updateCards();
}

/**
 * Funcion para mostrar boton anterior
 */
function prevCard() {
    currentCard--;
    if (currentCard <= 0) {
        currentCard = cardsSlider.length - 1;
    }
    updateCards();
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
            const cardAuthor = document.createElement('p');
            const cardUser = document.createElement('div');
            const divInteraction = document.createElement('div');
            const textInteraction = document.createElement('p');
            const iconLike = document.createElement('span');
            const iconDislike = document.createElement('span');
            
            card.classList.add('Main-comments--coment');
            cardImage.classList.add('Main-comments--coment-user-img');
            cardText.classList.add('u-textPrimary');
            cardAuthor.classList.add('u-title');
            cardUser.classList.add('Main-comments--coment-user');
            divInteraction.classList.add('Main-interaction');
            iconLike.classList.add('material-symbols-outlined');
            iconDislike.classList.add('material-symbols-outlined');


            iconDislike.addEventListener('click', () => {
                iconLike.style.color=`black`;
                iconDislike.style.color=`red`;
            });

            iconLike.addEventListener('click', () => {
                iconDislike.style.color=`black`;
                iconLike.style.color=`green`;
            })

            cardImage.src = comment.img;
            cardImage.alt = comment.author;
            cardAuthor.textContent = comment.author;
            cardText.textContent = comment.description;
            iconLike.innerText = 'thumb_up';   
            iconDislike.innerText = 'thumb_down';
            textInteraction.textContent ='Helpful?'

            divInteraction.appendChild(textInteraction);
            divInteraction.appendChild(iconLike);
            divInteraction.appendChild(iconDislike);

            card.appendChild(cardText);
            cardUser.appendChild(cardImage);
            cardUser.appendChild(cardAuthor);
            card.appendChild(cardUser);

            card.appendChild(divInteraction);
            cardComments.appendChild(card);
            commentsSlider.push(card);
        });
   
        if(screenWidth >= 900){
            
            const button = document.getElementById('btnNextComment');
            button.remove();
        }  

}

function updateComments() {
    let width = 200;
   
    if(screenWidth >= 600 && screenWidth <= 900){
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

//----------------------------------
// Events
//----------------------------------

btnNextCard.addEventListener('click', nextCard);
btnNextComment.addEventListener('click', nextComment);
// 




//----------------------------------
// Inits
//----------------------------------
addImages();
showImagesInterval();
addCards();
addComments();





