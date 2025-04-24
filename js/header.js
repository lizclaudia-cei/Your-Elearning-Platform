// Variable para el menu desplegable
const btnMenu = document.getElementById('menuBtn');
const navBar = document.querySelector('.Header-nav');
const header = document.querySelector('.Header');
const btnClose = document.getElementById('btnClose');

const btnChangeTeam = document.getElementById('changeTeam');
const btnLogin = document.getElementById('loginButton');
const modal = document.getElementById('modal');
const logIn = document.getElementById('logIn');
const iconMode = document.getElementById('spanMode');

const form = document.getElementById('loginForm');



/**
 * Funcion para cambiar de tema
 */
function changeTeam() {
    document.body.classList.toggle('u-Dark');
    const img = document.getElementById('headerLogo');
    if (document.body.classList.contains('u-Dark')) {
        img.src = "./assets/logo/logo.svg"
        btnChangeTeam.innerText = 'light_mode';
    } else {
        console.log('dark');
        img.src = "./assets/logo/logo_black.svg"
        btnChangeTeam.innerText = 'dark_mode';
    }

}


/**
 * Funcion para mostrar un form de login
 * 
 */
function openModal() {
    modal.classList.add('isOpen');
}

/**
 * Funcion para ocultar el form de login
 * 
 */
function closeModal() {
    modal.classList.remove('isOpen');

}




btnChangeTeam.addEventListener('click', changeTeam);

btnLogin.addEventListener('click', openModal);

btnMenu.addEventListener('click', ()=>{
    navBar.classList.toggle('isActiveMenu');
});
document.querySelectorAll('.Footer-nav--ul-li').forEach((li) => {
li.addEventListener('mouseenter', () => {
    li.classList.add('isHover');}
);
li.addEventListener('mouseleave', () => {
    li.classList.remove('isHover');
});

li.addEventListener('touchstart', () => {
    li.classList.add('isHover');}
);
li.addEventListener('touchend', () => {
    li.classList.remove('isHover');
});
});

btnClose.addEventListener('click', () => {navBar.classList.remove('isActiveMenu');});
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
})

form.addEventListener('submit', (e) => {
    console.log('submit');
    e.preventDefault();
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    if (email.value === '' || password.value === '') {
        alert('Por favor, completa todos los campos');
        return;
    }

    // Validar la contraseña (ejemplo: al menos 6 caracteres)
    if (password.value.length < 6) {
        alert('La contraseña debe tener al menos 6 caracteres.');
        return;
    }
    closeModal();
});