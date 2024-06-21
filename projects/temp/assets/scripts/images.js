// Load images from image.json dynamically
fetch('assets/image.json')
  .then(response => response.json())
  .then(data => {
    const gallery = document.getElementById('imageGallery').querySelector('.row');
    data.images.forEach((image, index) => {
      if (index < 4) { // Ensure we only populate the first 4 images
        const column = document.createElement('div');
        column.classList.add('column');
        const img = document.createElement('img');
        img.src = 'assets/' + image.path;
        img.alt = image.name;
        img.style.width = '100%';
        img.onclick = function() {
          showFocusImage(this);
        };
        column.appendChild(img);
        gallery.appendChild(column);
      }
    });

    // Randomly select an image for the News tab
    const randomImage = data.images[Math.floor(Math.random() * data.images.length)];
    const newsImage = document.getElementById('newsImage');
    newsImage.src = 'assets' + randomImage.path;
    newsImage.alt = randomImage.name;
    newsImage.style.maxWidth = '100%';
    newsImage.style.maxHeight = 'calc(100vh - 100px)'; // Ensure image fits within viewable area
  })
  .catch(error => console.error('Error fetching images:', error));

// Load home demo images dynamically
fetch('assets/demo_image.json')
  .then(response => response.json())
  .then(data => {
    const randomDemoImage = data.images[Math.floor(Math.random() * data.images.length)];
    const homeDemoImage = document.getElementById('homeDemoImage');
    homeDemoImage.src = 'assets/media/demo/' + randomDemoImage.path;
    homeDemoImage.alt = randomDemoImage.name;
  })
  .catch(error => console.error('Error fetching demo images:', error));
