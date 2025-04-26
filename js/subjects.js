//--------------------------------------
// Variables
//--------------------------------------

const acordeon = document.querySelector('.Acordeon');
const elements = document.querySelectorAll('[data-key]');
const courseSection = document.querySelector('.Course-sections');
const methodologySection = document.querySelector('.Section-content');
const img = document.getElementById('img');

const params = new URLSearchParams(window.location.search);
const paramCourse = params.get("course");
const paramSubject = params.get("subject");


//--------------------------------------
// Fetch Functions
//--------------------------------------

const getCourses = async () => {
    try {
        const res = await fetch('./jsons/courses_new.json');
        return await res.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

const getCourse = async (paramCourse) => {
    const courses = await getCourses();
    return courses?.courses.find(course => course.title === paramCourse);
};

const getSubject = async (paramCourse, paramSubject) => {
    const course = await getCourse(paramCourse);
    return course?.modules.find(subject => subject.title === paramSubject);
};

//--------------------------------------
// UI Helper Functions
//--------------------------------------

const createListItems = (items = []) => {
    return items.map(item => `<li class="u-text">${item}</li>`).join('');
};

const createAccordionItem = (stage) => `
    <div class="Acordeon-item">
        <div class="Acordeon-title">
            <h3 class="u-title">${stage.title}</h3>
            <span class="material-symbols-outlined">arrow_drop_down</span>
        </div>
        <div class="Acordeon-content"></div>
    </div>
`;

const createMethodologyItem = (content) => `
    <div class="Methodology-item">
        <div class="Methodology-title">
            <h3 class="u-title">${content.title}</h3>
            <p class="u-text">${content.description}</p>
        </div>
        <div class="Methodology-content">
            <h2 class="projects-title">Real projects usage</h2>
            ${content.frameworks?.length ? `
                <div class="Methodology-extras">
                    <h4 class="u-title">Frameworks</h4>
                    <ul class="Oporunities-list">${createListItems(content.frameworks)}</ul>
                </div>` : ''}
            ${content.advantages?.length ? `
                <div class="Methodology-advantages">
                    <h4 class="u-title">Advantages</h4>
                    <ul class="Oporunities-list">${createListItems(content.advantages)}</ul>
                </div>` : ''}
            ${content.disadvantages?.length ? `
                <div class="Methodology-disadvantages">
                    <h4 class="u-title">Disadvantages</h4>
                    <ul class="Oporunities-list">${createListItems(content.disadvantages)}</ul>
                </div>` : ''}
            ${content.roles?.length ? `
                <div class="Methodology-extras">
                    <h4 class="u-title">Roles</h4>
                    <ul class="Oporunities-list">${createListItems(content.roles)}</ul>
                </div>` : ''}
        </div>
    </div>
`;

//--------------------------------------
// Main Render Functions
//--------------------------------------

const fillData = async () => {
    const subject = await getSubject(paramCourse, paramSubject);
    if (!subject) return;

    elements.forEach(element => {
        const key = element.dataset.key;
        element.textContent = subject[key] ?? '';
    });

    img.src = subject.img;
    img.alt = subject.title;
};

const createAccordion = async () => {
    acordeon.innerHTML = `<h2 class="u-title Section-title">Modules</h2>`;

    const subject = await getSubject(paramCourse, paramSubject);
    if (!subject) return;

    subject.lessons[0].content.forEach(stage => {
        const template = document.createElement('div');
        template.innerHTML = createAccordionItem(stage);
        const item = template.firstElementChild;

        const title = item.querySelector('.Acordeon-title');
        const content = item.querySelector('.Acordeon-content');

        title.addEventListener('click', () => {
            const isActive = item.classList.contains('isActive');

            document.querySelectorAll('.Acordeon-item').forEach(i => {
                i.classList.remove('isActive');
                i.querySelector('.Acordeon-content').innerHTML = '';
            });

            if (!isActive) {
                item.classList.add('isActive');
                content.classList.add('isActive');

                content.innerHTML = `
                    <div class="Content-title">
                        <p class="u-text">${stage.description}</p>
                        <ul class="Oporunities-list">
                            ${createListItems(stage.key_points)}
                        </ul>
                    </div>
                    ${stage.markdownContent ? `<div class="Markdown-content">${marked.parse(stage.markdownContent)}</div>` : ''}
                `;
            }
        });

        acordeon.appendChild(item);
    });
};

const addMethodologies = async () => {
    methodologySection.innerHTML = '';

    const subject = await getSubject(paramCourse, paramSubject);
    if (!subject) return;

    subject.lessons[1].content.forEach(content => {
        const template = document.createElement('div');
        template.innerHTML = createMethodologyItem(content);
        methodologySection.appendChild(template.firstElementChild);
    });
};

//--------------------------------------
// Events
//--------------------------------------

(async function init() {
    await fillData();
    await createAccordion();
    await addMethodologies();
})();
