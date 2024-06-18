document.addEventListener('DOMContentLoaded', function() {
  initializeDarkMode();
  initializeImageUpload();
  initializePredefinedImages();
  loadStoredImages();
  loadStoredMarkers();
  initializeMarkerButton();
  initializeHazardModal();
});

function initializeDarkMode() {
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  darkModeToggle.addEventListener('click', function() {
      document.body.classList.toggle('dark-mode');
      localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
  });
  if (localStorage.getItem('darkMode') === 'true') {
      document.body.classList.add('dark-mode');
  }
}

function initializeImageUpload() {
  const uploadForm = document.getElementById('upload-form');
  uploadForm.addEventListener('submit', function(e) {
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
}

function saveImage(imgData) {
  const images = JSON.parse(localStorage.getItem('images')) || [];
  images.push(imgData);
  localStorage.setItem('images', JSON.stringify(images));
}

function loadStoredImages() {
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

function initializePredefinedImages() {
  const predefinedImages = [
      './assets/images/img1.png',
      './assets/images/img2.png',
      './assets/images/img3.png',
      './assets/images/img4.png'
  ];
  predefinedImages.forEach(displayImage);
}

function initializeMarkerButton() {
  const spawnMarkerButton = document.getElementById('spawn-pink-marker');
  spawnMarkerButton.addEventListener('click', function() {
      const heroImage = document.getElementById('hero-img');
      if (!heroImage.src) {
          alert('Please select a hero image first.');
          return;
      }

      // Remove any existing pink marker without a label
      const existingMarker = document.querySelector('.marker.pink:not([data-label])');
      if (existingMarker) {
          existingMarker.remove();
      }

      const marker = document.createElement('div');
      marker.classList.add('marker', 'pink');
      marker.style.position = 'absolute';
      marker.style.top = '10px';
      marker.style.left = '10px';
      marker.style.width = '40px';
      marker.style.height = '40px';
      marker.style.backgroundColor = 'pink';
      marker.style.borderRadius = '50%';
      marker.style.cursor = 'pointer';
      document.body.appendChild(marker);
      enableDrag(marker);
  });
}

function enableDrag(element) {
  interact(element).draggable({
      inertia: true,
      autoScroll: true,
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
              const heroImg = document.getElementById('hero-img');
              const heroRect = heroImg.getBoundingClientRect();
              const targetRect = event.target.getBoundingClientRect();

              if (targetRect.left >= heroRect.left && targetRect.right <= heroRect.right &&
                  targetRect.top >= heroRect.top && targetRect.bottom <= heroRect.bottom) {
                  const relativeX = targetRect.left - heroRect.left;
                  const relativeY = targetRect.top - heroRect.top;
                  addCoordinatesToList(relativeX, relativeY);
                  saveCoordinatesToLocalStorage(relativeX, relativeY);
                  openLabelModal(event.target);
              }
          }
      }
  });
}

function addCoordinatesToList(x, y) {
  const list = document.getElementById('coordinates-list');
  const listItem = document.createElement('li');
  listItem.textContent = `X: ${x.toFixed(2)}, Y: ${y.toFixed(2)}`;
  list.appendChild(listItem);
}

function saveCoordinatesToLocalStorage(x, y) {
  const coordinates = JSON.parse(localStorage.getItem('markerCoordinates')) || [];
  coordinates.push({ x, y });
  localStorage.setItem('markerCoordinates', JSON.stringify(coordinates));
}

function loadStoredMarkers() {
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
      document.body.appendChild(marker);
      enableDrag(marker);
  });
}

function openLabelModal(marker) {
  const modal = document.getElementById('label-modal');
  const instance = M.Modal.init(modal);
  instance.open();
  document.getElementById('marker-label').value = marker.getAttribute('data-label') || '';
  document.getElementById('save-label').onclick = () => {
      const label = document.getElementById('marker-label').value;
      marker.setAttribute('data-label', label);
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

function initializeHazardModal() {
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
  document.body.insertAdjacentHTML('beforeend', hazardModalHTML);
  M.FormSelect.init(document.querySelectorAll('select'));
}
