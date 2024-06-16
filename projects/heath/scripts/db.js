// db.js

const imageUrlKey = (imageUrl) => `image_${imageUrl}`;

async function savePointsToLocalStorage(imageUrl, flags) {
    const points = flags.map(f => ({
        xPercent: parseFloat(f.listItem.getAttribute('data-x-percent')),
        yPercent: parseFloat(f.listItem.getAttribute('data-y-percent'))
    }));
    localStorage.setItem(imageUrlKey(imageUrl), JSON.stringify(points));
}

function loadPointsFromLocalStorage(imageUrl) {
    return JSON.parse(localStorage.getItem(imageUrlKey(imageUrl))) || [];
}

async function saveArea(path) {
    const db = await dbPromise;
    await db.areas.insert({
        id: new Date().toISOString(),
        point: JSON.stringify(path.position)
    });
}

async function saveSelectedArea(point) {
    const db = await dbPromise;
    await db.selectedAreas.insert({
        id: new Date().toISOString(),
        point: JSON.stringify(point)
    });
}

async function loadAreas() {
    const db = await dbPromise;
    return await db.areas.find().exec();
}

async function loadSelectedAreas() {
    const db = await dbPromise;
    return await db.selectedAreas.find().exec();
}
