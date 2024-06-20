document.addEventListener("DOMContentLoaded", function() {
    // Load images from image.json dynamically
    fetch('assets/image.json')
      .then(response => response.json())
      .then(data => {
        const gallery = document.getElementById('imageGallery').querySelector('.row');
        data.images.forEach((image, index) => {
          if (index < 8) { // Ensure we only populate the first 4 images
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
      })
      .catch(error => console.error('Error fetching images:', error));
    
    // Get the element with id="defaultOpen" and click on it
    document.getElementById("defaultOpen").click();
  });
  
  function openModal() {
    document.getElementById('adminModal').style.display = "block";
  }
  
  function closeModal() {
    document.getElementById('adminModal').style.display = "none";
  }
  
  function showFocusImage(img) {
    const focusImgContainer = document.getElementById('focusImageContainer');
    const focusedImg = document.getElementById('focusedImg');
    focusedImg.src = img.src;
    focusImgContainer.style.display = "block";
  }
  
  function closeFocusImage() {
    document.getElementById('focusImageContainer').style.display = "none";
  }
  
  function openPage(pageName, elmnt, color) {
    const tabcontent = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    const tablinks = document.getElementsByClassName("tablink");
    for (let i = 0; i < tablinks.length; i++) {
      tablinks[i].style.backgroundColor = "";
    }
    document.getElementById(pageName).style.display = "block";
    elmnt.style.backgroundColor = color;
  }
  
  function getColor(pageName) {
    switch (pageName) {
      case "Home":
        return "red";
      case "News":
        return "green";
      case "Contact":
        return "blue";
      case "About":
        return "orange";
      default:
        return "";
    }
  }
  
  // Get all elements with class="tablink" and add click event listeners
  document.querySelectorAll(".tablink").forEach(tab => {
    tab.addEventListener("click", function() {
      const pageName = this.getAttribute("data-page");
      openPage(pageName, this, getColor(pageName));
    });
  });
  