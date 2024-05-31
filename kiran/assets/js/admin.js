document.getElementById('dark-mode-toggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
});

// Placeholder script for image upload and management
document.getElementById('upload-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Image uploaded!');
});

document.querySelectorAll('.btn.red').forEach(button => {
    button.addEventListener('click', function() {
        alert('Image removed!');
    });
});
