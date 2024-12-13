// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelector('.nav-links');
    const logo = document.querySelector('.logo');

    // Create a menu toggle button for mobile
    const menuToggle = document.createElement('div');
    menuToggle.classList.add('menu-toggle');
    menuToggle.innerHTML = '&#9776;'; // Hamburger icon
    document.querySelector('nav .container').appendChild(menuToggle);

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close the menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });
});
