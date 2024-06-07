// Database configuration
const { createRxDatabase, addRxPlugin } = rxdb;
addRxPlugin(pouchdbAdapterIdb);

const dbPromise = createRxDatabase({
    name: 'interactive_image_db',
    adapter: 'idb',
    multiInstance: true
}).then(db => {
    const areasSchema = {
        title: 'areas schema',
        description: 'describes an area highlighted by the admin',
        version: 0,
        primaryKey: 'id',
        type: 'object',
        properties: {
            id: {
                type: 'string',
                maxLength: 100
            },
            point: {
                type: 'string'
            }
        }
    };

    const selectedAreasSchema = {
        title: 'selected areas schema',
        description: 'describes an area selected by the user',
        version: 0,
        primaryKey: 'id',
        type: 'object',
        properties: {
            id: {
                type: 'string',
                maxLength: 100
            },
            point: {
                type: 'string'
            }
        }
    };

    return db.addCollections({
        areas: { schema: areasSchema },
        selectedAreas: { schema: selectedAreasSchema }
    }).then(() => db);
});

// Database functions
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
