//--------------------------------------
//Variables
//--------------------------------------

const acordeonItems = document.querySelectorAll('.Acordeon-item');
const acordeonTitle = document.querySelectorAll('.Acordeon-title');

const elements = document.querySelectorAll('[data-key]');

const img = document.getElementById('img');

const courseSection = document.querySelector('.Course-sections');

const authorSection = document.querySelector('.Instructor-section');

const params = new URLSearchParams(window.location.search);
const paramCourse = params.get("course");


let course = [];






//--------------------------------------
//Functions
//--------------------------------------


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

/**
 * Funcion para obtener el curso que viene en la url
 */
async function getCourse(paramCourse) {
    try {
        const courses = await getCourses();
        const course = courses.courses.find((course) => course.title === paramCourse);
        return course;
    } catch (error) {
        console.error(error);
        return null;
    }
}


/**
 * Funcion para llenar los datos del html con informacion del json
 */
async function fillData() {
    course = await getCourse(paramCourse);
    elements.forEach((element) => {
        const key = element.getAttribute('data-key');
        element.textContent = course[key];
    })
    img.src = course.img;
    img.alt = course.title;

}





acordeonTitle.forEach(async (title) => {
    course = await getCourse(paramCourse);
    const item = title.closest('.Acordeon-item');
    const content = item.querySelector('.Acordeon-content');
    title.addEventListener('click', () => {

        acordeonItems.forEach((item) => {
            const content = item.querySelector('.Acordeon-content');
            content.innerHTML = '';
            item.classList.remove('isActive');
        });


        course.modules.map((subject) => {

            const div = document.createElement('div');
            const divImg = document.createElement('div');
            const img = document.createElement('img');
            const divContent = document.createElement('div');
            const title = document.createElement('h3');

            div.classList.add('Course-sections--item');
            divImg.classList.add('Item-imgContent');
            img.classList.add('Item-img');
            divContent.classList.add('Item-content');
            title.classList.add('u-title');

            img.src = subject.img;
            img.alt = subject.title;
            title.textContent = subject.title;
            divImg.appendChild(img);
            divContent.appendChild(title);
            div.appendChild(divImg);
            div.appendChild(divContent);
            content.appendChild(div);
            // Evento para redireccionar a la pagian de temas se envia el curso y el tema seleccionados
            div.addEventListener('click', () => {
                window.location.href = `./temas.html?course=${course.title}&subject=${subject.title}`;
            });

        });


        content.classList.toggle('isActive');
        item.classList.toggle('isActive');
    });
});


/**
 * Funcion para crear seccions del curso
 */

async function addCourseSection() {
    course = await getCourse(paramCourse);
    course.careers.map((carrear) => {
        const ul = document.createElement('ul');
        const li = document.createElement('li');
        ul.classList.add('Oporunities-list');
        li.classList.add('u-text');
        li.textContent = carrear.title;

        ul.appendChild(li);

        courseSection.appendChild(ul);
    });
}

/**
 * Funcion para llenar los datos del author
 */

async function addAuthor() {
    course = await getCourse(paramCourse);
    authorSection.innerHTML = '';
    course.author.map((author) => {

        const div = document.createElement('div');
        const divImg = document.createElement('div');
        const img = document.createElement('img');
        const divContent = document.createElement('div');
        const title = document.createElement('h3');
        const text = document.createElement('p');

        div.classList.add('Instructor-sections--item');
        divImg.classList.add('Instructor-imgContent');
        img.classList.add('Instructor-img');
        divContent.classList.add('Instructor-content');
        title.classList.add('u-title');
        text.classList.add('u-text');

        img.src = author.img;
        img.alt = author.name;
        title.textContent = author.name;
        text.textContent = author.biography
        divImg.appendChild(img);
        divContent.appendChild(title);
        divContent.appendChild(text);
        div.appendChild(divImg);
        div.appendChild(divContent);
        
        authorSection.appendChild(div);

    })
}
//--------------------------------------
//Events
//--------------------------------------

addCourseSection();
fillData();
addAuthor();