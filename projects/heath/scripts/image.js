// Reusable variables
const canvas = document.getElementById('image-canvas');
const imageSection = document.getElementById('image-section');
const selectionList = document.getElementById('selection-list');
const mainContainer = document.getElementById('main-container');
let flags = [];

document.addEventListener('DOMContentLoaded', async () => {
    paper.setup(canvas);
    const tool = new paper.Tool();
    let highlightCircle = null;
    let imageAspectRatio;

    async function loadImages() {
        return ['image1.png', 'image2.png', 'image3.png'];
    }

    const imageFiles = await loadImages();
    if (!imageFiles.length) {
        console.error('No images found in the assets/images folder');
        return;
    }

    const imageUrl = `assets/images/${imageFiles[Math.floor(Math.random() * imageFiles.length)]}`;
    const raster = new paper.Raster(imageUrl);

    raster.onLoad = () => {
        imageAspectRatio = raster.width / raster.height;
        resizeCanvas();
        raster.fitBounds(paper.view.bounds);
        paper.view.draw();
        loadPointsFromLocalStorage(imageUrl);
    };

    raster.onError = (event) => {
        console.error('Error loading image:', event);
    };

    window.addEventListener('resize', resizeCanvas);

    function resizeCanvas() {
        const imageContainerWidth = imageSection.clientWidth;
        const imageContainerHeight = imageSection.clientHeight;

        if (imageContainerWidth / imageAspectRatio > imageContainerHeight) {
            canvas.width = imageContainerHeight * imageAspectRatio;
            canvas.height = imageContainerHeight;
        } else {
            canvas.width = imageContainerWidth;
            canvas.height = imageContainerWidth / imageAspectRatio;
        }

        raster.fitBounds(paper.view.bounds);
        updateFlagsPositions();
        paper.view.draw();
    }

    tool.onMouseMove = (event) => {
        if (highlightCircle) {
            highlightCircle.remove();
        }
        const hitResult = raster.hitTest(event.point);
        if (hitResult) {
            highlightCircle = new paper.Path.Circle({
                center: event.point,
                radius: 20,
                strokeColor: 'yellow'
            });
            paper.view.draw();
        }
    };

    tool.onMouseDown = (event) => {
        const hitResult = raster.hitTest(event.point);
        if (hitResult) {
            const point = event.point;
            addFlag(point, imageUrl);
        }
    };

    function addFlag(point, imageUrl) {
        const xPercent = point.x / raster.width;
        const yPercent = point.y / raster.height;

        const selectedArea = document.createElement('li');
        selectedArea.textContent = `Area at (${(xPercent * 100).toFixed(2)}%, ${(yPercent * 100).toFixed(2)}%)`;
        selectedArea.setAttribute('data-x-percent', xPercent);
        selectedArea.setAttribute('data-y-percent', yPercent);
        selectionList.appendChild(selectedArea);

        const flag = document.createElement('div');
        flag.className = 'flag';
        flag.textContent = 'F';
        flag.style.left = `${point.x}px`;
        flag.style.top = `${point.y}px`;
        flag.style.position = 'absolute';
        mainContainer.appendChild(flag);
        flags.push({ flag, listItem: selectedArea });

        interact(flag).draggable({
            listeners: {
                move(event) {
                    const target = event.target;
                    const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                    const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                    target.style.transform = `translate(${x}px, ${y}px)`;

                    const xPercent = (x + parseFloat(target.style.left)) / raster.width;
                    const yPercent = (y + parseFloat(target.style.top)) / raster.height;

                    target.setAttribute('data-x', x);
                    target.setAttribute('data-y', y);

                    const listItem = flags.find(f => f.flag === target).listItem;
                    if (listItem) {
                        listItem.textContent = `Area at ${(xPercent * 100).toFixed(2)}%, ${(yPercent * 100).toFixed(2)}%`;
                        listItem.setAttribute('data-x-percent', xPercent);
                        listItem.setAttribute('data-y-percent', yPercent);
                    }

                    savePointsToLocalStorage(imageUrl);
                }
            }
        });

        savePointsToLocalStorage(imageUrl);
    }

    function savePointsToLocalStorage(imageUrl) {
        const points = flags.map(f => ({
            xPercent: parseFloat(f.listItem.getAttribute('data-x-percent')),
            yPercent: parseFloat(f.listItem.getAttribute('data-y-percent'))
        }));
        localStorage.setItem(imageUrl, JSON.stringify(points));
    }

    function loadPointsFromLocalStorage(imageUrl) {
        const points = JSON.parse(localStorage.getItem(imageUrl)) || [];
        points.forEach(point => {
            const x = point.xPercent * raster.width;
            const y = point.yPercent * raster.height;
            addFlag(new paper.Point(x, y), imageUrl);
        });
    }

    function updateFlagsPositions() {
        const points = JSON.parse(localStorage.getItem(imageUrl)) || [];
        flags.forEach((flagItem, index) => {
            const x = points[index].xPercent * raster.width;
            const y = points[index].yPercent * raster.height;
            flagItem.flag.style.left = `${x}px`;
            flagItem.flag.style.top = `${y}px`;
            flagItem.flag.style.transform = 'translate(0, 0)';
        });
    }

    function recallLastFlag() {
        if (flags.length > 0) {
            const lastFlagItem = flags.pop();
            lastFlagItem.flag.remove();
            lastFlagItem.listItem.remove();
            savePointsToLocalStorage(imageUrl);
        }
    }

    function recallAllFlags() {
        flags.forEach(flagItem => {
            flagItem.flag.remove();
            flagItem.listItem.remove();
        });
        flags = [];
        savePointsToLocalStorage(imageUrl);
    }

    const draggable = new Draggable.Sortable(document.querySelectorAll('.draggable-list'), {
        draggable: 'li'
    });

    draggable.on('sortable:sorted', (event) => {
        savePointsToLocalStorage(imageUrl);
    });

    window.recallLastFlag = recallLastFlag;
    window.recallAllFlags = recallAllFlags;
});
