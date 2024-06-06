document.getElementById('danger-marker').addEventListener('click', function() {
    createMarker('danger');
});

document.getElementById('caution-marker').addEventListener('click', function() {
    createMarker('caution');
});

document.getElementById('safe-marker').addEventListener('click', function() {
    createMarker('safe');
});

document.getElementById('recall-marker').addEventListener('click', function() {
    if (!recallMarker()) {
        showError('No markers to recall.');
    }
});

function createMarker(type) {
    const marker = document.createElement('div');
    marker.classList.add('marker', type);
    marker.style.position = 'absolute';

    switch (type) {
        case 'danger':
            marker.style.top = '120px';
            marker.style.left = '10px';
            break;
        case 'caution':
            marker.style.top = '120px';
            marker.style.left = '110px';
            break;
        case 'safe':
            marker.style.top = '120px';
            marker.style.left = '210px';
            break;
    }

    document.body.appendChild(marker);

    interact(marker).draggable({
        listeners: {
            move(event) {
                const target = event.target;
                const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                target.style.transform = `translate(${x}px, ${y}px)`;
                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
            }
        },
        modifiers: [
            interact.modifiers.restrict({
                restriction: '#image-container img',
                endOnly: true
            })
        ]
    });
}

function recallMarker() {
    const markers = document.querySelectorAll('.marker:not(.pink)');
    if (markers.length > 0) {
        markers[markers.length - 1].remove();
        return true;
    }
    return false;
}

function clearMarkers() {
    const markers = document.querySelectorAll('.marker');
    if (markers.length > 0) {
        markers.forEach(marker => marker.remove());
    } else {
        showError('No markers to clear.');
    }
}

function submitMarkers() {
    const markers = document.querySelectorAll('.marker');
    if (markers.length > 0) {
        alert('Markers submitted!');
        window.location.href = 'results.html';
    } else {
        showError('No markers to submit.');
    }
}

function showError(message) {
    const errorModal = document.createElement('div');
    errorModal.className = 'error-modal';
    errorModal.textContent = message;
    document.body.appendChild(errorModal);

    setTimeout(() => {
        errorModal.classList.add('show');
    }, 10);

    setTimeout(() => {
        errorModal.classList.remove('show');
        setTimeout(() => {
            errorModal.remove();
        }, 500);
    }, 3000);
}

function openLoginModal() {
    const modal = document.getElementById('login-modal');
    const instance = M.Modal.init(modal); // Correct initialization of Materialize modal
    instance.open();
}

function adminLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Example login validation
    if (username === 'admin' && password === 'password') {
        window.location.href = 'admin.html';
    } else {
        showError('Invalid username or password.');
    }
}

// Initialize existing markers with draggable
document.querySelectorAll('.marker').forEach(marker => {
    interact(marker).draggable({
        listeners: {
            move(event) {
                const target = event.target;
                const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                target.style.transform = `translate(${x}px, ${y}px)`;
                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
            }
        },
        modifiers: [
            interact.modifiers.restrict({
                restriction: '#image-container img',
                endOnly: true
            })
        ]
    });
});
