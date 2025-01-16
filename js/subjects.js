//--------------------------------------
//Variables
//--------------------------------------

const acordeon = document.querySelector('.Acordeon');

const elements = document.querySelectorAll('[data-key]');

const courseSection = document.querySelector('.Course-sections');

const methodologySection = document.querySelector('.Methodology-section');


const params = new URLSearchParams(window.location.search);
const paramCourse = params.get("course");
const paramSubject = params.get("subject");
console.log('paramCourse', paramCourse);
console.log('paramSubject', paramSubject);


let course = [];






//--------------------------------------
//Functions
//--------------------------------------


/**
 * Funcion para tarer los cursos desde el courses.json
 */

async function getCourses() {
    console.log('agsdjghsjdaghdaks')
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

/**
 * Funcion para obtener el curso que viene en la url
 */
async function getCourse(paramCourse) {
    console.log('paramCourse', paramCourse);
    try {
        const courses = await getCourses();
        console.log('courses del getCourses', courses);
        const course = courses.courses.find((course) => course.title === paramCourse);
        console.log('course del getCourse', course);
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
    console.log('paramSubject', paramSubject);
    try{
        const curse = await getCourse(paramCourse);
        console.log('curse', curse);
        const subject = curse.teams.find((subject) => subject.title === paramSubject);
        console.log('subject', subject);
        return subject;


    }catch(error){
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

}


/**
 * Funcion para crear el acordeon 
 */

async function createAcordeon() {
    acordeon.innerHTML = '';
    const subject = await getSubject(paramCourse, paramSubject);
    subject.activities[0].stages.forEach((stage) => {
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

        title.textContent = stage.name;
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
                    text.classList.add('u-text');
                    ul.classList.add('Oporunities-list');
                    text.textContent = stage.details;

                    stage.key_activities.forEach(keyActivity => {
                        const li = document.createElement('li');
                        li.classList.add('u-text');
                        li.textContent = keyActivity;
                        ul.appendChild(li);
                    });
                    div.appendChild(text);
                    div.appendChild(ul);
                    divContent.appendChild(div);
               
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
    console.log('subject', subject.activities[1].methodologies);

    const title = document.createElement('h3');
    const text = document.createElement('p');

    title.classList.add('u-title');
    text.classList.add('u-text');

    title.textContent = subject.activities[1].methodologies.title;
    text.textContent = subject.activities[1].methodologies.description;
    methodologySection.appendChild(title);
    methodologySection.appendChild(text);

    for (let i = 0; i < subject.activities[1].methodologies.types.length; i++) {
        const divContent = document.createElement('div');
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

        for (let j = 0; j < subject.activities[1].methodologies.types[i].advantages.length; j++) {
            const li = document.createElement('li');
            li.classList.add('u-text');
            li.textContent = subject.activities[1].methodologies.types[i].advantages[j];
            ulAdvantages.appendChild(li);
        }

        if (subject.activities[1].methodologies.types[i].disadvantages != null) {
            for (let k = 0; k < subject.activities[1].methodologies.types[i].disadvantages.length; k++) {
                const li = document.createElement('li');
                li.classList.add('u-text');
                li.textContent = subject.activities[1].methodologies.types[i].disadvantages[k];
                ulDisadvantages.appendChild(li);
            }
        }
        if (subject.activities[1].methodologies.types[i].frameworks != null) {
            for (let f= 0; f < subject.activities[1].methodologies.types[i].frameworks.length; f++) {
                const li = document.createElement('li');
                li.classList.add('u-text');
                li.textContent = subject.activities[1].methodologies.types[i].frameworks[f];
                ulFrameworks.appendChild(li);
            }
        }
        if (subject.activities[1].methodologies.types[i].roles != null) {
            for (let r = 0; r < subject.activities[1].methodologies.types[i].roles.length; r++) {
                const li = document.createElement('li');
                li.classList.add('u-text');
                li.textContent = subject.activities[1].methodologies.types[i].roles[r];
                ulRoles.appendChild(li);
            }
        }



        typeTitle.classList.add('u-title');
        typeText.classList.add('u-text');
        divContent.classList.add('Methodology-item');
        div.classList.add('Methodology-content');

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

        typeTitle.textContent = subject.activities[1].methodologies.types[i].name;
        typeText.textContent = subject.activities[1].methodologies.types[i].description;

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

        divContent.appendChild(typeTitle);
        divContent.appendChild(typeText);
       console.log('ulFrameworks', ulFrameworks);   
       if(ulFrameworks.childElementCount > 0){
        divContent.appendChild(divFrameworks);
       }
       if(
        ulAdvantages.childElementCount > 0){
          div.appendChild(divAdvantages);
         }

        if(ulDisadvantages.childElementCount > 0){
            div.appendChild(divDisadvantages);
        }
        if(ulRoles.childElementCount > 0){
            divContent.appendChild(divRoles);
        }

        divContent.appendChild(div);

        methodologySection.appendChild(divContent);
    }
}
    


//--------------------------------------
//Events
//--------------------------------------

fillData();
createAcordeon();
addMethodologies();