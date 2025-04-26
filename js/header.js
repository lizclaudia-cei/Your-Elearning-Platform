// Variables para el menú desplegable
const btnMenu = document.getElementById('menuBtn');
const navBar = document.querySelector('.Header-nav');
const header = document.querySelector('.Header');
const btnClose = document.getElementById('btnClose');

const btnChangeTheme = document.getElementById('changeTeam');

const iconMode = document.getElementById('spanMode');

/**
 * Función para cambiar de tema
 */
function changeTheme() {
    const img = document.getElementById('headerLogo');
    document.body.classList.toggle('u-Dark');

    if (document.body.classList.contains('u-Dark')) {
        img.src = "./assets/logo/logo.svg";
        btnChangeTheme.innerText = 'light_mode';
    } else {
        img.src = "./assets/logo/logo_black.svg";
        btnChangeTheme.innerText = 'dark_mode';
    }
}


// --- EVENT LISTENERS ---

btnChangeTheme.addEventListener('click', changeTheme);

btnMenu.addEventListener('click', () => {
    navBar.classList.toggle('isActiveMenu');
});

btnClose.addEventListener('click', () => {
    navBar.classList.remove('isActiveMenu');
});

document.querySelectorAll('.Footer-nav--ul-li').forEach((li) => {
    li.addEventListener('mouseenter', () => {
        li.classList.add('isHover');
    });
    li.addEventListener('mouseleave', () => {
        li.classList.remove('isHover');
    });
    li.addEventListener('touchstart', () => {
        li.classList.add('isHover');
    });
    li.addEventListener('touchend', () => {
        li.classList.remove('isHover');
    });
});



