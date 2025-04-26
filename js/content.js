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
const btnPrevComment = document.getElementById('btnPrevComment');

const sectionComments = document.querySelector('.Main-comments');

const inputSearch = document.getElementById('serachInput');
const btnSearch = document.getElementById('btnSearch');
const cartCountElement = document.querySelector('.cart-count');

const btnCart = document.querySelector('.cart-container');
const screenWidth = window.innerWidth;
let btnPrevCard = '';

const courseDropdown = document.getElementById('course-select');

const customDialog = document.getElementById('custom-dialog');
 const btnLogin = document.getElementById('loginButton');
 const logIn = document.getElementById('logIn');

const modal = document.getElementById('modal');
const form = document.getElementById('loginForm');

const register = document.getElementById('register');
const registerForm = document.getElementById('registerForm');
const btnRegister = document.getElementById('btnRegister');
const link = document.getElementById('linkRegister');


// Variables para slider de imaganes de inicio 
let currentImage = 0;
let cartCount = 0;
let courses = JSON.parse(localStorage.getItem('courses')) || [];

const imagesSlider = [];

// Variables para slider  de atarjetas de cursos
let currentCard = 0;
const cardsSlider = [];

// Variables para slider de comentarios
let currentComment = 0;
let commentsSlider = [];

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

const getCourses = async () => (await fetch('./jsons/courses_new.json')).json().catch(() => null);
const getListImages = async () => (await fetch('./jsons/list_images.json')).json().catch(() => null);
const getListComments = async () => (await fetch('./jsons/list_comments.json')).json().catch(() => null);

let listComments = [];
// Funciones  para slider de imagenes 
/** 
 * Funcion para cargar las imagenes en el slider
 * 
 */
async function addImages() {
    images = await getListImages()

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






async function addCards() {
    listCourses = await getCourses();
    listCourses.courses.forEach((course) => {
            const cardHTML = createCardHTML(course);
            const cardElement = document.createElement('div');
            cardElement.innerHTML = cardHTML;
            cardElement.classList.add('Main-courses--course');
            cardElement.id = `Curso_${course.id}`;

            const btnAdd = cardElement.querySelector('.u-button');
            btnAdd.addEventListener('click', () => handleAddToCart(course));

            cardBoxes.appendChild(cardElement);
            cardsSlider.push(cardElement);
        });
}

function createCardHTML(course) {
    const starsHTML = Array(Math.floor(course.qualification))
        .fill('<span class="material-symbols-outlined u-Starts">star</span>')
        .join('');
    return `
        <img class="Main-course--img" src="${course.img}" alt="${course.title}">
        <h2 class="u-title">${course.title}</h2>
        <p class="u-text">${course.overview}</p>
        <div>${starsHTML}</div>
        <p class="u-title">Professor: ${course.author[0].name}</p>
        <h3 class="u-title">Price: $20.00</h3>
        <button class="u-button">Buy now</button>
    `;
}



function handleAddToCart(course) {
    const profile = localStorage.getItem('correo');
    if(!profile){
        modal.classList.add('isOpen');
    }
    cartCount++;
    cartCountElement.textContent = cartCount;
    courses.push(course);
    localStorage.setItem('courses', JSON.stringify(courses));
    document.getElementById('coursesBuy').textContent = `The course ${course.title} has been added to the cart`;
    customDialog.classList.add('isActive');

    document.getElementById('go-to-cart').hidden = false;
    document.getElementById('go-to-cart').addEventListener('click', () => {
        customDialog.classList.remove('isActive');
        window.location.href = './shoping_car.html';
    });

    document.getElementById('go-to-home').hidden = false;
    
     document.getElementById('go-to-home').addEventListener('click', () => {
        customDialog.classList.remove('isActive');
       
    });

}


async function addComments() {
    cardComments.innerHTML = '';
    if (!listComments || listComments.length === 0) 
        listComments = await getListComments();
    listComments.forEach((comment) => {
        const cardHTML = createCommentCardHTML(comment);
        const cardElement = document.createElement('div');
        cardElement.innerHTML = cardHTML;
        cardElement.classList.add('Main-comments--coment');

        // Add event handlers if needed (example: click handler)
        cardElement.addEventListener('click', () => handleCommentClick(comment));

        cardComments.appendChild(cardElement);
        commentsSlider.push(cardElement);
    });

    checkCommentsOverflow();
}

function createCommentCardHTML(comment) {
    return `
        <h3 class="u-title">${comment.topic}</h3>
        <p class="u-txtPrimary">${comment.description}</p>
        <div class="Main-comments--coment-user">
            <img class="Main-comments--coment-user-img" src="${comment.img}" alt="${comment.author}">
            <p class="u-title">${comment.author}</p>
        </div>
    `;
}


function updateComments() {
    const width = calculateCommentWidth(screenWidth);
    updateCardCommentsTransform(width);
}

function calculateCommentWidth(screenWidth) {
    return screenWidth >= 600 && screenWidth <= 900 ? 550 : 200;
}

function updateCardCommentsTransform(width) {
    cardComments.style.transform = `translateX(-${currentComment * width}px)`;
}

/**
 * Funcion para mostrar la siguiente card
 */
function nextComment() {
    if(currentComment +1 == commentsSlider.length - 1)
        btnNextComment.hidden = true;    
    else {
        currentComment++;
       btnPrevComment.hidden = false;
    }    
    updateComments();
}


/**
 * Funcion para mostrar boton anterior
 */
function prevComment() {
    if(currentComment -1 <= 0) {
        btnPrevComment.hidden = true;
    }
    else {
        currentComment--;
        btnNextComment.hidden = false; 
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




/**
 * Función para cerrar el modal de login
 */
function closeModal() {
    modal.classList.remove('isOpen');
}

/**
 * Función para manejar el submit del formulario
 */
function handleFormSubmit(e) {
    e.preventDefault();


    const email = document.getElementById('email');
    const password = document.getElementById('password');

    if (email.value === '' || password.value === '') {
        alert('Please complete all fields');
    
        return;
    }

    if (password.value.length < 6) {
        alert('Password too short');
    
        return;
    }
localStorage.setItem('correo',email.value);
    closeModal();
}

/**
 * Función para manejar el submit del formulario register
 */
function handleRegisterSubmit(e) {
    e.preventDefault();

    const email = document.getElementById('emailRegister');
    const password = document.getElementById('passwordRegister');
    const name = document.getElementById('nameRegister');
    const passwordConfirm = document.getElementById('passwordConfirm');

    if (email.value === '' || password.value === ''|| name.value === '' || passwordConfirm.value === '') {
       alert('Please complete all fields');
        return;
    }
    if(password.value !== passwordConfirm.value) {
       alert('Passwords do not match');
        return;
    }
     
    localStorage.setItem('correo',email.value);
   closeModal();
   register.classList.remove('isOpen');
}

//----------------------------------
// Events
//----------------------------------
btnNextComment.addEventListener('click', nextComment);
btnPrevComment.addEventListener('click', prevComment);
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

// 
commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newComment = {
        "topic": courseDropdown.textContent,
        "author": document.getElementById('name').value,
        "img": "./assets/img/user2.webp",
        "description": document.getElementById('comment').value,
      
    }
    if (newComment.author === ''  || newComment.description === '' || newComment.topic === '') {
        alert('Por favor, completa todos los campos');
        return;
    }
    listComments.push(newComment);
    commentsSlider= [];
    addComments();
    btnNextComment.hidden = false;
    commentForm.reset();
});


btnCart.addEventListener('click', (e) => {
    if (cartCount > 0) {
        window.location.href = './shoping_car.html';
    } else {
        alert('No tienes cursos en el carrito');
    }
});


btnLogin.addEventListener('click',(e) => {modal.classList.add('isOpen')});
link.addEventListener('click',(e) => {register.classList.add('isOpen')});


window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});
window.addEventListener('click', (e) => {
    if (e.target === register) {
        register.classList.remove('isOpen');
    }
});

form.addEventListener('submit', handleFormSubmit);
register.addEventListener('submit',(e)=> {console.log('esto esta aqui');handleRegisterSubmit });
//----------------------------------
// Inits
//----------------------------------
addImages();
setInterval(nextImage, 4000);
addCards();
addComments();
checkCommentsOverflow();
showSelect();





