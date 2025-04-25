//----------------------------------
//  Variables
//----------------------------------


const cardBoxes = document.querySelector('.CartItems');
const summary = document.getElementById('sumary');
const cardsSlider = [];
const btnBuy = document.getElementById('btnBuy');
const paymentModal = document.getElementById('modalPayment');
const paymentForm = document.getElementById('paymentForm');

const dialog = document.getElementById('custom-dialog');
let courses = JSON.parse(localStorage.getItem('courses'));
    

/**
 * 
 * Funcion para agregar las tarjetas de los cursos agregados al carrito
 * 
 */
function showCards(){
    
let courses = JSON.parse(localStorage.getItem('courses'));
    if(courses){
        courses.map((course) => {
            const card = document.createElement('div');
            const cardImage = document.createElement('img');
            const cardTitle = document.createElement('p');
            const cardAuthor = document.createElement('p');
            const cardPrice = document.createElement('p');
            const cardStarts = document.createElement('div');
            const btnRemove = document.createElement('button');

            for (let i = 0; i < course.qualification; i++) {
                const star = document.createElement('span');
                star.classList.add('material-symbols-outlined');
                star.classList.add('u-Starts');
                star.innerText = 'star';
                cardStarts.appendChild(star);
            }

            card.id = `Curso_${course.id}`;
            card.classList.add('CartItem');
            cardImage.classList.add('CartItem-img');
            cardTitle.classList.add('u-title');
            cardAuthor.classList.add('u-text');
            cardPrice.classList.add('u-text');
            btnRemove.classList.add('u-button');
            cardImage.src = course.img;
            cardImage.alt = course.title;
            cardTitle.textContent = course.title;
            cardPrice.textContent = '$ 20.00';
            cardAuthor.textContent = course.author[0].name;
            btnRemove.textContent = 'Eliminar';
            

            card.appendChild(cardImage);
            card.appendChild(cardTitle);
            card.appendChild(cardAuthor);
            card.appendChild(cardStarts);
            card.appendChild(cardPrice);

            card.appendChild(btnRemove);
            btnRemove.addEventListener('click', () => {
                const courses = JSON.parse(localStorage.getItem('courses'));
                const newCourses = courses.filter((c) => c.id !== course.id);
                localStorage.setItem('courses', JSON.stringify(newCourses));
                cardBoxes.removeChild(card);
                showCards();
            });
         
            cardBoxes.appendChild(card);
            cardsSlider.push(card);
        });
        const total = courses.length * 20;
        console.log(total);
        summary.textContent = `Total: $ ${total}`;
    }else{
       const card = document.createElement('div');
         const cardTitle = document.createElement('h2');
         card.classList.add('CartItem');
            cardTitle.classList.add('u-title');
            cardTitle.textContent = 'No hay cursos en el carrito';
            card.appendChild(cardTitle);
            cardBoxes.appendChild(card);

            summary.textContent = `Total: $0`;
            
    }


}
/**
 * Funcion para mostrar un form de login
 * 
 */
function openModal() {
    paymentModal.classList.add('isOpen');
}

paymentForm.addEventListener('submit', (e) => {
    
    e.preventDefault();
    const cardNumber = document.getElementById('cardNumber').value;
    const cardName = document.getElementById('cardName').value;
    const cardDate = document.getElementById('cardDate').value;
    const cardCvv = document.getElementById('cardCvc').value;

    if (cardNumber === '' || cardName === '' || cardDate === '' || cardCvv === '') {
        alert('Por favor complete todos los campos');
        return;
    }
    paymentForm.reset();
    paymentModal.classList.remove('isOpen');
    showDialog();

    localStorage.removeItem('courses');
 

})

/**
 * Funcion para mostrar el confirm dialog
 */
function showDialog() {
    dialog.classList.add('isActive');
}

/**
 * Funcion para ocultar el confirm dialog
 */
function hideDialog() {
    dialog.classList.remove('isActive');
}


document.getElementById('go-to-course').addEventListener('click', () => {
    hideDialog();
    window.location.href = 'course.html?course=' + courses[0].title;
  });
  
  document.getElementById('go-to-home').addEventListener('click', () => {
    hideDialog();
    window.location.href = './index.html';
  });
  
btnBuy.addEventListener('click',openModal);
window.addEventListener('click', (e) => {
    if (e.target === paymentModal) {
        closeModal();
    }
})

showCards();