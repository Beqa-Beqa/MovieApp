import { headerNav } from "../data/index.js";


// header 

const headerNavElement = document.querySelector('.header-nav');
const fragment = document.createDocumentFragment();
const hoverMenu = document.querySelector('.hover-menu');
const burgerMenu = document.querySelector('.bx-menu');
const headerNavigation = document.querySelector('.header-nav');
const overlay = document.querySelector('.overlay')
const burgerMenuCloseBtn = document.getElementById('burger-menu-close-button');

burgerMenuCloseBtn.addEventListener('click', () => {
    headerNavigation.classList.remove('show')
    overlay.style.display = 'none'
});

burgerMenu.addEventListener('click' , () => {
    headerNavigation.classList.add('show');
    overlay.style.display = 'block'
})

overlay.addEventListener('click', () => {
    headerNavigation.classList.remove('show')
    overlay.style.display = 'none'
})

headerNav.map((nav) => {
    const navBar = document.createElement('a');
    const icon = document.createElement('i');
    const navSpan = document.createElement('span');

    icon.classList.add(...nav.classes);

    navSpan.textContent = nav.name;

    navBar.setAttribute('href', nav.link);
    navBar.append(icon);
    navBar.append(navSpan);

    navBar.addEventListener('mouseenter', () => {
        nav.subLinks && hoverMenu.classList.add('show');

        nav.subLinks?.map((el) => {
            const subLink = document.createElement('a');
            subLink.textContent = el.name;
            subLink.setAttribute('href', el.link);
            hoverMenu.append(subLink)
            hoverMenu.classList.add('hover-menu-open')
            navSpan.append(hoverMenu)

        })
        
    })

    navBar.addEventListener('mouseleave', () => {
        hoverMenu.classList.remove('show');
        hoverMenu.classList.remove('hover-menu-open')

        hoverMenu.innerHTML= ''
    })

    fragment.append(navBar);
});

headerNavElement.append(fragment);