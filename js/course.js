//--------------------------------------
// Variables
//--------------------------------------

const acordeonItems = document.querySelectorAll('.Acordeon-item');
const acordeonTitles = document.querySelectorAll('.Acordeon-title');
const elements = document.querySelectorAll('[data-key]');
const img = document.getElementById('img');
const courseSection = document.querySelector('.Course-sections');
const authorSection = document.querySelector('.Instructor-section');
const params = new URLSearchParams(window.location.search);
const paramCourse = params.get("course");

let course = [];


//--------------------------------------
// Functions
//--------------------------------------

const getCourses = async () => {
  try {
    const response = await fetch('./jsons/courses_new.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getCourse = async (paramCourse) => {
  try {
    const coursesData = await getCourses();
    return coursesData.courses.find(course => course.title === paramCourse);
  } catch (error) {
    console.error(error);
    return null;
  }
};

const fillData = async () => {
  course = await getCourse(paramCourse);
  elements.forEach(element => {
    const key = element.dataset.key;
    element.textContent = course[key];
  });
  img.src = course.img;
  img.alt = course.title;
};

const createModuleHTML = (subject) => `
  <div class="Course-sections--item">
    <div class="Item-imgContent">
      <img class="Item-img" src="${subject.img}" alt="${subject.title}">
    </div>
    <div class="Item-content">
      <h3 class="u-title">${subject.title}</h3>
    </div>
  </div>
`;

const handleAccordionClick = (content, modules) => {
  content.innerHTML = modules.map(createModuleHTML).join('');
  
  // Agregar evento a cada módulo creado
  content.querySelectorAll('.Course-sections--item').forEach((div, index) => {
    div.addEventListener('click', () => {
      window.location.href = `./temas.html?course=${course.title}&subject=${modules[index].title}`;
    });
  });

  content.classList.toggle('isActive');
  content.closest('.Acordeon-item').classList.toggle('isActive');
};

const setupAccordion = async () => {
  course = await getCourse(paramCourse);

  acordeonTitles.forEach(title => {
    const item = title.closest('.Acordeon-item');
    const content = item.querySelector('.Acordeon-content');

    title.addEventListener('click', () => {
      acordeonItems.forEach(item => {
        item.classList.remove('isActive');
        item.querySelector('.Acordeon-content').innerHTML = '';
      });
      handleAccordionClick(content, course.modules);
    });
  });
};

const addCourseSection = async () => {
  course = await getCourse(paramCourse);

  course.careers.forEach(career => {
    courseSection.innerHTML += `
      <ul class="Oporunities-list">
        <li class="u-text">${career.title}</li>
      </ul>
    `;
  });
};

const addAuthor = async () => {
  course = await getCourse(paramCourse);
  authorSection.innerHTML = course.author.map(author => `
    <div class="Instructor-sections--item">
      <div class="Instructor-imgContent">
        <img class="Instructor-img" src="${author.img}" alt="${author.name}">
      </div>
      <div class="Instructor-content">
        <h3 class="u-title">${author.name}</h3>
        <p class="u-text">${author.biography}</p>
      </div>
    </div>
  `).join('');
};


//--------------------------------------
// Events
//--------------------------------------

(async function init() {
  await Promise.all([
    addCourseSection(),
    fillData(),
    addAuthor(),
    setupAccordion()
  ]);
})();
