// Variables
const cardBoxes = document.querySelector('.CartItems');
const summary = document.getElementById('sumary');
const btnBuy = document.getElementById('btnBuy');
const paymentModal = document.getElementById('modalPayment');
const paymentForm = document.getElementById('paymentForm');
const dialog = document.getElementById('custom-dialog');

let courses = JSON.parse(localStorage.getItem('courses'));
const cardsSlider = [];

/**
 * Función para mostrar las tarjetas de los cursos agregados al carrito
 */
function showCards() {
    cardBoxes.innerHTML = ''; // Limpiar contenido antes de volver a renderizar

    const courses = JSON.parse(localStorage.getItem('courses'));
    
    if (courses && courses.length > 0) {
        courses.forEach((course) => {
            const card = document.createElement('div');
            card.classList.add('CartItem');
            card.id = `Curso_${course.id}`;

            const cardImage = document.createElement('img');
            cardImage.classList.add('CartItem-img');
            cardImage.src = course.img;
            cardImage.alt = course.title;

            const cardTitle = document.createElement('p');
            cardTitle.classList.add('u-title');
            cardTitle.textContent = course.title;

            const cardAuthor = document.createElement('p');
            cardAuthor.classList.add('u-text');
            cardAuthor.textContent = course.author[0].name;

            const cardStarts = document.createElement('div');
            for (let i = 0; i < course.qualification; i++) {
                const star = document.createElement('span');
                star.classList.add('material-symbols-outlined', 'u-Starts');
                star.innerText = 'star';
                cardStarts.appendChild(star);
            }

            const cardPrice = document.createElement('p');
            cardPrice.classList.add('u-text');
            cardPrice.textContent = '$ 20.00';

            const btnRemove = document.createElement('button');
            btnRemove.classList.add('u-button');
            btnRemove.textContent = 'Eliminar';

            btnRemove.addEventListener('click', () => {
                const updatedCourses = courses.filter((c) => c.id !== course.id);
                localStorage.setItem('courses', JSON.stringify(updatedCourses));
                showCards();
            });

            card.append(cardImage, cardTitle, cardAuthor, cardStarts, cardPrice, btnRemove);
            cardBoxes.appendChild(card);
            cardsSlider.push(card);
        });

        const total = courses.length * 20;
        summary.textContent = `Total: $ ${total}`;
    } else {
        const emptyCard = document.createElement('div');
        emptyCard.classList.add('CartItem');

        const emptyTitle = document.createElement('h2');
        emptyTitle.classList.add('u-title');
        emptyTitle.textContent = 'You don\'t have any courses yet';

        emptyCard.appendChild(emptyTitle);
        cardBoxes.appendChild(emptyCard);

        summary.textContent = `Total: $ 0`;
    }
}

/**
 * Función para abrir el modal de pago
 */
function openModal() {
    paymentModal.classList.add('isOpen');
}

/**
 * Función para cerrar el modal de pago
 */
function closeModal() {
    paymentModal.classList.remove('isOpen');
}

/**
 * Función para mostrar el dialog de confirmación
 */
function showDialog() {
    dialog.classList.add('isActive');
}

/**
 * Función para ocultar el dialog de confirmación
 */
function hideDialog() {
    dialog.classList.remove('isActive');
}

// Eventos
btnBuy.addEventListener('click', openModal);

paymentForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const cardNumber = document.getElementById('cardNumber').value;
    const cardName = document.getElementById('cardName').value;
    const cardDate = document.getElementById('cardDate').value;
    const cardCvv = document.getElementById('cardCvc').value;

    if (!cardNumber || !cardName || !cardDate || !cardCvv) {
        alert('Please fill in all fields');
        return;
    }

    paymentForm.reset();
    closeModal();
    showDialog();
    localStorage.removeItem('courses');
    localStorage.setItem('coursesBought', JSON.stringify(courses));
});

window.addEventListener('click', (e) => {
    if (e.target === paymentModal) {
        closeModal();
    }
});

document.getElementById('go-to-course').addEventListener('click', () => {
    hideDialog();

        window.location.href = `./courses.html`;
   
});

document.getElementById('go-to-home').addEventListener('click', () => {
    hideDialog();
    window.location.href = './index.html';
});

// Inicializar tarjetas
showCards();
