document.getElementById('dark-mode-toggle').addEventListener('click', function() {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});

document.getElementById('upload-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const fileInput = document.getElementById('image-upload');
  const file = fileInput.files[0];
  if (file) {
      const reader = new FileReader();
      reader.onload = function(event) {
          const imgData = event.target.result;
          saveImage(imgData);
          displayImage(imgData);
          fileInput.value = '';
      };
      reader.readAsDataURL(file);
  }
});

function saveImage(imgData) {
  const images = JSON.parse(localStorage.getItem('images')) || [];
  images.push(imgData);
  localStorage.setItem('images', JSON.stringify(images));
}

function loadImages() {
  const images = JSON.parse(localStorage.getItem('images')) || [];
  images.forEach(displayImage);
}

function displayImage(imgData) {
  const container = document.getElementById('images-container');
  const img = document.createElement('img');
  img.src = imgData;
  img.style.width = '100%';
  img.className = 'hover-shadow cursor';
  img.onclick = () => openHeroImage(imgData);
  container.appendChild(img);
}

function openHeroImage(imgData) {
  const heroImage = document.getElementById('hero-image');
  const heroImg = document.getElementById('hero-img');
  heroImg.src = imgData;
  heroImage.style.display = 'block';
  document.getElementById('images-container').style.display = 'none';
}

function closeHeroImage() {
  const heroImage = document.getElementById('hero-image');
  heroImage.style.display = 'none';
  document.getElementById('images-container').style.display = 'grid';
}

const predefinedImages = [
  './assets/images/img1.png',
  './assets/images/img2.png',
  './assets/images/img3.png',
  './assets/images/img4.png'
];

function loadPredefinedImages() {
  predefinedImages.forEach(img => {
    displayImage(img);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  loadPredefinedImages();
  loadImages();
});
document.getElementById('dark-mode-toggle').addEventListener('click', function() {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});

document.getElementById('upload-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const fileInput = document.getElementById('image-upload');
  const file = fileInput.files[0];
  if (file) {
      const reader = new FileReader();
      reader.onload = function(event) {
          const imgData = event.target.result;
          saveImage(imgData);
          displayImage(imgData);
          fileInput.value = '';
      };
      reader.readAsDataURL(file);
  }
});

function saveImage(imgData) {
  const images = JSON.parse(localStorage.getItem('images')) || [];
  images.push(imgData);
  localStorage.setItem('images', JSON.stringify(images));
}

function loadImages() {
  const images = JSON.parse(localStorage.getItem('images')) || [];
  images.forEach(displayImage);
}

function displayImage(imgData) {
  const container = document.getElementById('images-container');
  const img = document.createElement('img');
  img.src = imgData;
  img.style.width = '100%';
  img.className = 'hover-shadow cursor';
  img.onclick = () => openHeroImage(imgData);
  container.appendChild(img);
}

function openHeroImage(imgData) {
  const heroImage = document.getElementById('hero-image');
  const heroImg = document.getElementById('hero-img');
  heroImg.src = imgData;
  heroImage.style.display = 'block';
  document.getElementById('images-container').style.display = 'none';
}

function closeHeroImage() {
  const heroImage = document.getElementById('hero-image');
  heroImage.style.display = 'none';
  document.getElementById('images-container').style.display = 'grid';
}

document.getElementById('spawn-pink-marker').addEventListener('click', function() {
  spawnPinkMarker();
});

function spawnPinkMarker() {
  const marker = document.createElement('div');
  marker.classList.add('marker', 'pink');
  marker.style.position = 'absolute';
  marker.style.top = '100px';
  marker.style.left = '100px';
  marker.setAttribute('data-label', '');
  document.getElementById('markers-container').appendChild(marker);
  marker.onclick = () => openLabelModal(marker);
  interact(marker).draggable({
      listeners: {
          move(event) {
              const target = event.target;
              const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
              const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
              target.style.transform = `translate(${x}px, ${y}px)`;
              target.setAttribute('data-x', x);
              target.setAttribute('data-y', y);
          },
          end(event) {
              const target = event.target;
              const rect = target.getBoundingClientRect();
              const targetRect = document.querySelector('#hero-img').getBoundingClientRect();

              if (
                  rect.left >= targetRect.left &&
                  rect.right <= targetRect.right &&
                  rect.top >= targetRect.top &&
                  rect.bottom <= targetRect.bottom
              ) {
                  openHazardModal();
              }
          }
      },
      modifiers: [
          interact.modifiers.restrictRect({
              restriction: 'parent',
              endOnly: true
          })
      ]
  });
  saveMarker(marker);
}

function openLabelModal(marker) {
  const modal = document.getElementById('label-modal');
  const instance = M.Modal.init(modal);
  instance.open();
  document.getElementById('marker-label').value = marker.getAttribute('data-label');
  document.getElementById('save-label').onclick = () => {
      marker.setAttribute('data-label', document.getElementById('marker-label').value);
      saveMarker(marker);
      instance.close();
  };
}

function saveMarker(marker) {
  const markers = JSON.parse(localStorage.getItem('markers')) || [];
  const markerData = {
      x: parseFloat(marker.getAttribute('data-x')) || 0,
      y: parseFloat(marker.getAttribute('data-y')) || 0,
      label: marker.getAttribute('data-label') || ''
  };
  const index = markers.findIndex(m => m.x === markerData.x && m.y === markerData.y);
  if (index !== -1) {
      markers[index] = markerData;
  } else {
      markers.push(markerData);
  }
  localStorage.setItem('markers', JSON.stringify(markers));
}

function loadMarkers() {
  const markers = JSON.parse(localStorage.getItem('markers')) || [];
  markers.forEach(markerData => {
      const marker = document.createElement('div');
      marker.classList.add('marker', 'pink');
      marker.style.position = 'absolute';
      marker.style.transform = `translate(${markerData.x}px, ${markerData.y}px)`;
      marker.setAttribute('data-x', markerData.x);
      marker.setAttribute('data-y', markerData.y);
      marker.setAttribute('data-label', markerData.label);
      marker.onclick = () => openLabelModal(marker);
      document.getElementById('markers-container').appendChild(marker);
      interact(marker).draggable({
          listeners: {
              move(event) {
                  const target = event.target;
                  const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                  const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
                  target.style.transform = `translate(${x}px, ${y}px)`;
                  target.setAttribute('data-x', x);
                  target.setAttribute('data-y', y);
              },
              end(event) {
                  saveMarker(event.target);
              }
          },
          modifiers: [
              interact.modifiers.restrictRect({
                  restriction: 'parent',
                  endOnly: true
              })
          ]
      });
  });
}

document.addEventListener('DOMContentLoaded', function() {
  loadImages();
  loadMarkers();
});

function openHazardModal() {
  const hazardModal = document.getElementById('hazard-modal');
  const instance = M.Modal.init(hazardModal);
  instance.open();
}

// Hazard Modal HTML
const hazardModalHTML = `
<div id="hazard-modal" class="modal">
  <div class="modal-content">
      <h4>What hazard level?</h4>
      <div class="input-field">
          <select id="hazard-level">
              <option value="" disabled selected>Choose your option</option>
              <option value="danger">Danger</option>
              <option value="caution">Caution</option>
              <option value="safe">Safe</option>
          </select>
          <label for="hazard-level">Hazard Level</label>
      </div>
  </div>
  <div class="modal-footer">
      <button class="modal-close btn waves-effect waves-light" id="save-hazard-level">Save</button>
  </div>
</div>
`;

// Append Hazard Modal to the body
document.body.insertAdjacentHTML('beforeend', hazardModalHTML);

// Initialize Materialize Select
document.addEventListener('DOMContentLoaded', function() {
  const elems = document.querySelectorAll('select');
  M.FormSelect.init(elems);
});
