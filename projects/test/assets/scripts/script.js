function openPage(pageName, elmnt, color) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
  }
  document.getElementById(pageName).style.display = "block";
  elmnt.style.backgroundColor = color;
}

document.getElementById("defaultOpen").click();

fetch('./assets/images.json')
  .then(response => response.json())
  .then(images => loadImages(images))
  .catch(error => console.error('Failed to load images', error));

function loadImages(images) {
  const imageGrid = document.getElementById('imageGrid');
  images.forEach(image => {
    const imgDiv = document.createElement('div');
    imgDiv.className = 'column';
    const img = document.createElement('img');
    img.src = image.src;
    img.alt = image.alt;
    img.onclick = () => showLargeImage(image.src, image.alt);
    imgDiv.appendChild(img);
    imageGrid.appendChild(imgDiv);
  });
}

function showLargeImage(src, alt) {
  const gallery = document.querySelector('.gallery');
  const largeImageContainer = document.getElementById('largeImageContainer');
  const largeImage = document.getElementById('largeImage');

  gallery.style.display = 'none'; // Hide the gallery
  largeImageContainer.style.display = 'block'; // Show the large image container
  largeImage.src = src;
  largeImage.alt = alt;
}

function closeExpandedImage() {
  const gallery = document.querySelector('.gallery');
  const largeImageContainer = document.getElementById('largeImageContainer');

  gallery.style.display = 'flex'; // Show the gallery
  largeImageContainer.style.display = 'none'; // Hide the large image container
}
