document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('image-canvas');
    paper.setup(canvas);
    const tool = new paper.Tool();

    const imageUrl = 'path/to/your/image.jpg';
    const raster = new paper.Raster(imageUrl);
    raster.onLoad = () => {
        raster.fitBounds(paper.view.bounds);
    };

    tool.onMouseMove = (event) => {
        // Highlight logic here
    };

    tool.onMouseDown = (event) => {
        // Click handling logic here
    };

    // Add RxDB initialization and user selection handling
});

// admin.js
document.addEventListener('DOMContentLoaded', () => {
    // Admin tool initialization
    const adminTool = new paper.Tool();
    adminTool.onMouseDown = (event) => {
        // Draw area logic here
    };

    // Add admin login handling and area management
});