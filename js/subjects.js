//--------------------------------------
//Variables
//--------------------------------------

const acordeon = document.querySelector('.Acordeon');
console.log(typeof marked);

const elements = document.querySelectorAll('[data-key]');

const courseSection = document.querySelector('.Course-sections');

const methodologySection = document.querySelector('.Section-content');


const img = document.getElementById('img');


const params = new URLSearchParams(window.location.search);
const paramCourse = params.get("course");
const paramSubject = params.get("subject");


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
 * Funcion para obtener el tema que viene en la url
 */
async function getSubject(paramCourse, paramSubject) {
    try {
        const curse = await getCourse(paramCourse);

        const subject = curse.modules.find((subject) => subject.title === paramSubject);

        return subject;


    } catch (error) {
        console.log(error);
        return null;
    }
}


/**
 * Funcion para llenar los datos del html con informacion del json
 */
async function fillData() {
    subject = await getSubject(paramCourse, paramSubject);
    elements.forEach((element) => {
        const key = element.getAttribute('data-key');
        element.textContent = subject[key];
    })
    img.src = subject.img;
    img.alt = subject.title;

}


/**
 * Funcion para crear el acordeon 
 */

async function createAcordeon() {
    acordeon.innerHTML = '';
    const subject = await getSubject(paramCourse, paramSubject);


    const titleSection = document.createElement('h2');
    titleSection.classList.add('u-title');
    titleSection.classList.add('Section-title');
    titleSection.textContent = 'Modules';
    acordeon.appendChild(titleSection);
    subject.lessons[0].content.forEach((stage) => {
        const divItem = document.createElement('div');
        const divTitle = document.createElement('div');
        const divContent = document.createElement('div');
        const title = document.createElement('h3');
        const span = document.createElement('span');

        title.classList.add('u-title');
        span.classList.add('material-symbols-outlined');
        divItem.classList.add('Acordeon-item');
        divTitle.classList.add('Acordeon-title');
        divContent.classList.add('Acordeon-content');

        
        title.textContent = stage.title;
        span.textContent = 'arrow_drop_down';
        divTitle.appendChild(title);
        divTitle.appendChild(span);
        divItem.appendChild(divTitle);
        divItem.appendChild(divContent);
        acordeon.appendChild(divItem);


        // Agregar el evento para que al clickear se muestre el contenido del acordeon
        divTitle.addEventListener('click', () => {
            // Creacion de variable booleana para saber si el item esta activo
            const isActive = divItem.classList.contains('isActive');
            // se recorre el acordeon-item para  que si hay un item activo se le quite la clase isActive y se limpie el contenido del divContent
            document.querySelectorAll('.Acordeon-item').forEach(item => {
                item.classList.remove('isActive');
                divContent.innerHTML = '';
            });
            // Si el item que se selecciono no esta activo se le agrega la clase active y se agrega contenido al divContent
            if (!isActive) {
                divItem.classList.toggle('isActive');
                divContent.classList.toggle('isActive');
                const div = document.createElement('div');
                const text = document.createElement('p');
                const ul = document.createElement('ul');
                const divMarkdown = document.createElement('div');
                divMarkdown.classList.add('Markdown-content');
                text.classList.add('u-text');
                ul.classList.add('Oporunities-list');
                text.textContent = stage.description;
               // Se busca en el contenido del json si hay una propiedad markdownContent 
                
                stage.key_points.forEach(keyActivity => {
                    const li = document.createElement('li');
                    li.classList.add('u-text');
                    li.textContent = keyActivity;
                    ul.appendChild(li);
                });
                div.appendChild(text);
                div.appendChild(ul);
                div.classList.add('Content-title')
                divContent.appendChild(div);
                if(stage.markdownContent != null){
                    // si la encuentra, se crea una variable const htmlContent que contendra la conversion del markdown a html 
                    const htmlContent = marked.parse(stage.markdownContent);
                    // se agrega el htmlContent al divMarkdown
                    divMarkdown.innerHTML = htmlContent;
                    divContent.appendChild(divMarkdown);
                }
                
                

            }
        });
    });
}

/**
 * Funcion para crear seccion de metodologias
 */
async function addMethodologies() {
    methodologySection.innerHTML = '';
    const subject = await getSubject(paramCourse, paramSubject);
    subject.lessons[1].content.forEach((content) => {
        const divContent = document.createElement('div');
        const divTitle = document.createElement('div');
        const typeTitle = document.createElement('h3');
        const typeText = document.createElement('p');

        const div = document.createElement('div');

        const divAdvantages = document.createElement('div');
        const advantages = document.createElement('h4');
        const ulAdvantages = document.createElement('ul');

        const divDisadvantages = document.createElement('div');
        const disadvantages = document.createElement('h4');
        const ulDisadvantages = document.createElement('ul');


        const divFrameworks = document.createElement('div');
        const frameworks = document.createElement('h4');
        const ulFrameworks = document.createElement('ul');

        const divRoles = document.createElement('div');
        const roles = document.createElement('h4');
        const ulRoles = document.createElement('ul');
        console.log('content.advantages', content.advantages);

        if (content.advantages != null) {
            for (let j = 0; j < content.advantages.length; j++) {
                console.log('content[i].advantages[j]', content.advantages[j]);
                const li = document.createElement('li');
                li.classList.add('u-text');
                li.textContent = content.advantages[j];
                ulAdvantages.appendChild(li);
            }
        }
        if (content.disadvantages != null) {
            for (let k = 0; k < content.disadvantages.length; k++) {
                const li = document.createElement('li');
                li.classList.add('u-text');
                li.textContent = content.disadvantages[k];
                ulDisadvantages.appendChild(li);
            }
        }
        if (content.frameworks != null) {
            for (let f = 0; f < content.frameworks.length; f++) {
                const li = document.createElement('li');
                li.classList.add('u-text');
                li.textContent = content.frameworks[f];
                ulFrameworks.appendChild(li);
            }
        }
        if (content.roles != null) {
            for (let r = 0; r < content.roles.length; r++) {
                const li = document.createElement('li');
                li.classList.add('u-text');
                li.textContent = content.roles[r];
                ulRoles.appendChild(li);
            }
        }



        typeTitle.classList.add('u-title');
        typeText.classList.add('u-text');
        divContent.classList.add('Methodology-item');
        div.classList.add('Methodology-content');
        
        divTitle.classList.add('Methodology-title');

        divAdvantages.classList.add('Methodology-advantages');
        advantages.classList.add('u-title');
        ulAdvantages.classList.add('Oporunities-list');


        divDisadvantages.classList.add('Methodology-disadvantages');
        disadvantages.classList.add('u-title');
        ulDisadvantages.classList.add('Oporunities-list');

        divFrameworks.classList.add('Methodology-extras');
        frameworks.classList.add('u-title');
        ulFrameworks.classList.add('Oporunities-list');


        divRoles.classList.add('Methodology-extras');
        roles.classList.add('u-title');
        ulRoles.classList.add('Oporunities-list');

        typeTitle.textContent = content.title;
        typeText.textContent = content.description;

        advantages.textContent = 'Addvantages';
        disadvantages.textContent = 'Disadvantages';
        frameworks.textContent = 'Frameworks';
        roles.textContent = 'Roles';


        divAdvantages.appendChild(advantages);
        divAdvantages.appendChild(ulAdvantages);

        divDisadvantages.appendChild(disadvantages);
        divDisadvantages.appendChild(ulDisadvantages);

        divFrameworks.appendChild(frameworks);
        divFrameworks.appendChild(ulFrameworks);

        divRoles.appendChild(roles);
        divRoles.appendChild(ulRoles);

        divTitle.appendChild(typeTitle);
        divTitle.appendChild(typeText);
        divContent.appendChild(divTitle);
        
        console.log('ulFrameworks', ulFrameworks);
        if (ulFrameworks.childElementCount > 0) {
            divContent.appendChild(divFrameworks);
        }
        if (
            ulAdvantages.childElementCount > 0) {
            div.appendChild(divAdvantages);
        }

        if (ulDisadvantages.childElementCount > 0) {
            div.appendChild(divDisadvantages);
        }
        if (ulRoles.childElementCount > 0) {
            divContent.appendChild(divRoles);
        }

        divContent.appendChild(div);

        methodologySection.appendChild(divContent);

    })

}



//--------------------------------------
//Events
//--------------------------------------

fillData();
createAcordeon();
addMethodologies();