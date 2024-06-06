const cubesContainer = document.getElementById('cubes-container');
const menuBox = document.querySelector('.menu-box');
const menuTitle = menuBox.querySelector('h2');
const menuDescription = menuBox.querySelector('p');
const menuButton = menuBox.querySelector('button');
const themeToggle = document.querySelector('.theme-toggle');
const toggleBall = document.querySelector('.toggle-ball');
let isDarkMode = false;

// Fetch project data from JSON file
fetch('assets/pathways/projects.json')
    .then(response => response.json())
    .then(data => {
        const projects = data.projects;
        projects.forEach((project, index) => {
            const cube = document.createElement('div');
            cube.classList.add('cube');
            cube.setAttribute('data-color', project.color);
            cube.setAttribute('data-project', project.title);

            const faces = ['front', 'back', 'left', 'right', 'top', 'bottom'];
            faces.forEach(face => {
                const faceDiv = document.createElement('div');
                faceDiv.classList.add('cube-face', face);
                faceDiv.style.backgroundColor = project.color;
                if (face === 'front') {
                    faceDiv.textContent = project.title;
                }
                cube.appendChild(faceDiv);
            });

            cubesContainer.appendChild(cube);

            cube.addEventListener('mouseenter', () => {
                cube.style.transform = 'translateY(-50px) rotateX(15deg) rotateY(15deg)';
                const color = cube.getAttribute('data-color');
                menuTitle.textContent = project.title;
                menuDescription.textContent = project.description;
                menuButton.onclick = () => {
                    window.location.href = project.link;
                };

                menuBox.classList.add('visible');
                menuBox.style.top = `${cube.getBoundingClientRect().top}px`;
                menuBox.style.left = `${cube.getBoundingClientRect().right + 20}px`;

                // Update Paper.js path color
                window.updatePathColor(color);
            });

            cube.addEventListener('mouseleave', () => {
                cube.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
            });
        });
    });

document.addEventListener('click', (event) => {
    if (!menuBox.contains(event.target) && !cubesContainer.contains(event.target)) {
        menuBox.classList.remove('visible');
    }
});

themeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode', isDarkMode);
    menuBox.classList.toggle('dark-mode', isDarkMode);

    // Update Paper.js path color on theme change
    const path = project.activeLayer.children[0];
    path.fillColor = isDarkMode ? '#61f4de' : '#ff7477';
});

// Draggable functionality for the theme toggle
themeToggle.addEventListener('mousedown', (e) => {
    let shiftX = e.clientX - themeToggle.getBoundingClientRect().left;
    let shiftY = e.clientY - themeToggle.getBoundingClientRect().top;

    function moveAt(pageX, pageY) {
        themeToggle.style.left = pageX - shiftX + 'px';
        themeToggle.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    document.addEventListener('mousemove', onMouseMove);

    themeToggle.onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove);
        themeToggle.onmouseup = null;
    };
});

themeToggle.ondragstart = function() {
    return false;
};
