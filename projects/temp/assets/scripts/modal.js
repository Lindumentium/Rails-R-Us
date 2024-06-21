// Open modal box
function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
  }
  
  // Close modal box
  function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
  }
  
  // Close modal when clicking outside of it
  window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    });
  }
  
  function adminLogin(event) {
    event.preventDefault();
    closeModal('adminModal');
    openPage('Admin', document.querySelector('[data-page="Admin"]'), 'blue');
    return false;
  }
  
  // Show error popup
  function showErrorPopup(message) {
    const popup = document.getElementById('errorPopup');
    popup.textContent = message;
    popup.style.display = 'block';
    setTimeout(() => {
      popup.style.display = 'none';
    }, 3000);
  }
  