//----------------------------------
// Variables
//----------------------------------
const imageBoxes = document.querySelector('.ImageBoxes');
const btnNext = document.getElementById('btnNext');
const btnPrev = document.getElementById('btnPrev');

const cardBoxes = document.querySelector('.CoursesCards');
const sectionCourses = document.querySelector('.Main-courses');
const btnNextCard = document.getElementById('btnNextCard');

let btnPrevCard = '';

const acordeonItems = document.querySelectorAll('.Main-acordeon--item');
const acordeonTitle = document.querySelectorAll('.Main-acordeon--title');
const skillBoxes = document.querySelector('.SkillsBoxes');

// Variables para slider de imaganes de inicio 
let currentImage = 0;
const listImages = `[
    {
        "id" : 1,
        "src" : "https://placehold.co/600x400?text=Imagen",
        "description": "imagen de pruebas 1"
    },
    {
        "id" : 1,
        "src" : "https://placehold.co/600x400?text=HolaMundo",
        "description": "imagen de pruebas 1"
    },
    {
        "id" : 1,
        "src" : "https://placehold.co/600x400?text=Hola",
        "description": "imagen de pruebas 1"
    }
]`;

const imagesSlider = [];

// Variables para slider  de atarjetas de cursos
let currentCard = 0;
const listCourses = `[
    {
        "id": 1,
        "title": "Curso de React",
        "src": "https://placehold.co/600x400?text=CursoReact",
        "author": "Juan Perez",
        "price": 100,
        "calification": 4.5,
        "skill": "HTML"
    },
    {
        "id": 1,
        "title": "Curso de React",
        "src": "https://placehold.co/600x400?text=CursoReact",
        "author": "Juan Perez",
        "price": 100,
        "calification": 4.5,
        "skill": "JS"
    },
    {
        "id": 1,
        "title": "Curso de React",
        "src": "https://placehold.co/600x400?text=CursoReact",
        "author": "Juan Perez",
        "price": 100,
        "calification": 4.5,
        "skill": "REACT"
    },
     {
        "id": 1,
        "title": "Curso de React",
        "src": "https://placehold.co/600x400?text=CursoReact",
        "author": "Juan Perez",
        "price": 100,
        "calification": 4.5,
        "skill": "REACT"
    }

]`;

const cardsSlider = [];

// Variables par acordeon

let currentSkill = 0;

let acordeonSlider = [];

const listSkills = `[
    {
        "id":1,
        "title":"HTML"
    },
    {
        "id":2,
        "title":"JS"
    },
    {
        "id":3,
        "title":"CSS"
    },
    {
        "id":4,
        "title":"REACT"
    }

]`;


const skillSlider = [];





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
        let courses = await fetch('./jsons/courses.json');
        courses = await courses.json();
        console.log('Estos son los cursos');
        console.log(courses);
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
    const width = 400;
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
    intervals = setInterval(nextImage, 1000);
}


// Funcione spara slider de tarjetas de cursos

/**
 * Funcion para agregar las tarjetas de cursos
 */
function addCards() {
    const courses = convertJsonToObject(listCourses);
    getCourses().then((cour) => {
        console.log('este es el cour', cour);
        cour.courses.map((course, index) => {
            console.log('esta es la imagen del curso', course.img)
            const card = document.createElement('div');
            const cardImage = document.createElement('img');
            const cardTitle = document.createElement('p');
            const cardPrice = document.createElement('p');
            const cardAuthor = document.createElement('p');
            const cardStarts = document.createElement('div');

            for (let i = 0; i < course.calification; i++) {
                const star = document.createElement('span');
                star.classList.add('material-symbols-outlined');
                star.innerText = 'star';
                cardStarts.appendChild(star);
            }
            card.classList.add('Main-courses--course');
            cardImage.classList.add('Main-course--img');
            cardTitle.classList.add('u-title');
            cardPrice.classList.add('u-title');
            cardAuthor.classList.add('u-text');
            cardStarts.classList.add('Main-acordeon--starts');
             cardImage.src = course.img;
            cardTitle.textContent = course.title;
            //cardPrice.textContent = `$ ${course.price}`;
            cardAuthor.textContent = course.author[0].name;

            card.addEventListener('click', () => { window.location.href = 'course.html?course=' + course.title });
            card.appendChild(cardImage);
            card.appendChild(cardTitle);
            card.appendChild(cardAuthor);
            card.appendChild(cardStarts);
            // card.appendChild(cardPrice);
            cardBoxes.appendChild(card);
            cardsSlider.push(card);
        });
    });


}

/**
 * Funciones para actualizar el slider de tarjetas
 */
function updateCards() {
    const width = 250;
    const offset = 250;
    cardBoxes.style.transform = `translateX(-${currentCard * width - offset}px)`;

    const button = document.getElementById('btnPrevCard');
    if (button) {
        button.remove();
    }
    if (currentCard > 1) {
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
    console.log('este es el currentCard', currentCard);

    console.log('este es el lenght ', cardsSlider.length);
    if (currentCard <= 0) {
        console.log('este es el lenght ', cardsSlider.length);
        currentCard = cardsSlider.length - 1;
    }
    updateCards();
}


// Funciones para acordeon 

acordeonTitle.forEach((title, index) => {
    const item = title.closest('.Main-acordeon--item');
    const content = item.querySelector('.Main-acordeon--content');
    const skillBoxes = item.querySelector('.SkillsBoxes');

    title.addEventListener('click', () => {
        acordeonItems.forEach((item) => {
            content.innerHTML = '';
            skillBoxes.innerHTML = '';
            item.classList.remove('isActive');
            acordeonSlider = [];
            const courses = convertJsonToObject(listCourses);
            courses.map((course, index) => {
                const card = document.createElement('div');
                const cardImage = document.createElement('img');
                const cardTitle = document.createElement('p');
                const cardPrice = document.createElement('p');
                const cardAuthor = document.createElement('p');
                const cardStarts = document.createElement('div');
                const cardSkill = document.createElement('p');

                for (let i = 0; i < course.calification; i++) {
                    const star = document.createElement('span');
                    star.classList.add('material-symbols-outlined');
                    star.innerText = 'star';
                    cardStarts.appendChild(star);
                }
                card.classList.add('Main-courses--course');
                cardImage.classList.add('Main-course--img');
                cardTitle.classList.add('u-title');
                cardPrice.classList.add('u-title');
                cardAuthor.classList.add('u-text');
                cardStarts.classList.add('Main-acordeon--starts');
                cardSkill.classList.add('u-text');
                cardImage.src = course.src;
                cardTitle.textContent = course.title;
                cardPrice.textContent = `$ ${course.price}`;
                cardAuthor.textContent = course.author;
                cardSkill.textContent = course.skill;

                card.addEventListener('click', () => { window.location.href = 'course.html' });
                card.appendChild(cardImage);
                card.appendChild(cardTitle);
                card.appendChild(cardAuthor);
                card.appendChild(cardStarts);
                card.appendChild(cardPrice);
                card.appendChild(cardSkill);
                content.appendChild(card);
                acordeonSlider.push(card);
            });

        })
        content.classList.toggle('isActive');
        addSkills(skillBoxes);
        skillBoxes.classList.toggle('isActive');


    });
});

/**
 * Funcion para agregar habilidades en el top de cada acordeon
 */

function addSkills(container) {
    const skills = convertJsonToObject(listSkills);
    skills.map((skill, index) => {
        const skillBox = document.createElement('button');
        skillBox.classList.add('SkillBox');
        skillBox.textContent = skill.title;
        skillBox.id = `skill-${skill.id}`;
        skillBox.addEventListener('click', () => {
            currentSkill = skill.title;
            filterCourses();
        });
        container.appendChild(skillBox);
        skillSlider.push(skillBox);
    });
}

/**
 * Funcion para que solo se muestren los contenidos de los cursos que tengan la habilidad seleccionada
 */

function filterCourses() {
    acordeonSlider.map((card) => {

        const info = card.querySelectorAll('p');
        let containsSkill = false;
        info.forEach((element) => {
            if (element.textContent.includes(currentSkill)) {
                containsSkill = true;
            }
        })
        if (containsSkill) {
            card.classList.add('isActive');
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }

    });
}



//----------------------------------
// Events
//----------------------------------

btnNextCard.addEventListener('click', nextCard);
console.log('este es el boton btnPrevCard', btnPrevCard);
// 




//----------------------------------
// Inits
//----------------------------------
addImages();
showImagesInterval();
addCards();
acordeonTitle[0].click();





