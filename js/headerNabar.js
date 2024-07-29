const searchTab = document.querySelector('.searchTab');
const searchInput = document.querySelector('.searchInput');
const searchInputSvg = document.querySelector('#searchInput_svg');

searchTab.addEventListener('click', () => {
    searchTab.style.display = searchTab.style.display === 'none' ? 'block' : 'none';
    searchInput.style.display = searchInput.style.display === 'block' ? 'none' : 'block';
    searchInputSvg.style.display = searchInputSvg.style.display === 'block' ? 'none' : 'block';

    searchInput.animate([
        { width: '10px' },
        { width: '250px' }
    ], {
        duration: 200,
        fill: 'forwards'
    });

    searchInput.focus();
});

searchInput.addEventListener('blur', () => {
    searchTab.style.display = 'block';
    searchInput.style.display = 'none';
    searchInputSvg.style.display = 'none';
});

// Scroll != 0 => change background color of nav
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY !== 0) {
        nav.style.backgroundColor = '#000';
    } else {
        nav.style.backgroundColor = 'transparent';
    }
});