// Variable para el menu desplegable
const btnMenu = document.getElementById('menuBtn');
const navBar = document.querySelector('.Header-nav');
const header = document.querySelector('.Header');



/**
 * Funcion para el abrir el menu deplegable
 */

function toggleMenu() {
    navBar.innerHTML = '';
 const ul = document.createElement('ul');
 const li = document.createElement('li');
 const a = document.createElement('a');
 ul.classList.add('Footer-nav--ul'); 
li.classList.add('Footer-nav--ul-li'); 

a.href = '#';
a.textContent = 'Inicio';
li.appendChild(a);
ul.appendChild(li);
navBar.appendChild(ul);
}

btnMenu.addEventListener('click', ()=>{
    navBar.classList.toggle('isActiveMenu');
    header.classList.toggle('isActiveMenu');
});