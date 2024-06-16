window.addEventListener('load', function() {
    const imageContainer = document.getElementById('image-container');
    const imagePath = 'assets/images/';
    
    // List of images in the assets/images/ folder
    const imageFiles = [
        'image1.png',
        'image2.jpg',
        'image3.gif',
        'image4.svg',
        'image5.webp'
    ];

    // Randomly select an image
    const randomImage = imageFiles[Math.floor(Math.random() * imageFiles.length)];
    
    // Create and append the image element
    const img = new Image();
    img.src = `${imagePath}${randomImage}`;
    img.alt = 'Random Image';
    img.classList.add('example-image');
    imageContainer.appendChild(img);
});
