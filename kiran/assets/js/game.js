document.getElementById('dark-mode-toggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});

const markers = [];
let lastMarker = null;
let adminLoggedIn = false;
let timerStarted = false;
let timer = 180; // 3 minutes in seconds
let interval;
let currentPinkMarker = null;

// Start timer function
function startTimer() {
    if (!timerStarted) {
        timerStarted = true;
        interval = setInterval(function() {
            if (timer > 0) {
                timer--;
                document.getElementById('timer').textContent = `Time left: ${Math.floor(timer / 60)}:${String(timer % 60).padStart(2, '0')}`;
            } else {
                submitMarkers();
            }
        }, 1000);
    }
}

function createMarker(type) {
    const marker = document.createElement('div');
    marker.className = `marker ${type}`;
    document.getElementById('image-container').appendChild(marker);
    markers.push(marker);
    lastMarker = marker;

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
        }
    });

    if (type !== 'pink' && !timerStarted) {
        startTimer();
    }

    if (type === 'pink') {
        currentPinkMarker = marker;
        var instance = M.Modal.getInstance(document.getElementById('label-modal'));
        instance.open();
    }
}

document.getElementById('danger-marker').addEventListener('click', function() {
    createMarker('danger');
});
document.getElementById('caution-marker').addEventListener('click', function() {
    createMarker('caution');
});
document.getElementById('safe-marker').addEventListener('click', function() {
    createMarker('safe');
});

if (document.getElementById('designate-hazard-marker')) {
    document.getElementById('designate-hazard-marker').addEventListener('click', function() {
        if (adminLoggedIn) {
            createMarker('pink');
        } else {
            alert('You must be logged in as an admin to designate hazards.');
        }
    });
}

function recallMarker() {
    if (markers.length === 0) {
        alert('No markers to recall.');
        return;
    }
    if (lastMarker) {
        lastMarker.remove();
        markers.pop();
        lastMarker = markers[markers.length - 1];
    }
}

function clearMarkers() {
    if (markers.length === 0) {
        alert('No markers to clear.');
        return;
    }
    markers.forEach(marker => marker.remove());
    markers.length = 0;
    lastMarker = null;
    clearInterval(interval);
    timerStarted = false;
    timer = 180;
    document.getElementById('timer').textContent = `Time left: 3:00`;
}

function submitMarkers() {
    if (markers.length === 0) {
        alert('No markers to submit.');
        return;
    }

    const pinkMarkers = Array.from(document.querySelectorAll('.marker.pink'));
    const userMarkers = markers.filter(marker => !marker.classList.contains('pink'));
    let totalScore = 0;

    userMarkers.forEach(userMarker => {
        const userType = userMarker.className.split(' ').pop();
        let closestDistance = Infinity;
        let matchedPinkMarker = null;

        pinkMarkers.forEach(pinkMarker => {
            const pinkType = pinkMarker.getAttribute('data-hazard-level');
            if (userType === pinkType) {
                const userRect = userMarker.getBoundingClientRect();
                const pinkRect = pinkMarker.getBoundingClientRect();
                const distance = Math.sqrt(Math.pow(userRect.left - pinkRect.left, 2) + Math.pow(userRect.top - pinkRect.top, 2));

                if (distance < closestDistance) {
                    closestDistance = distance;
                    matchedPinkMarker = pinkMarker;
                }
            }
        });

        if (matchedPinkMarker && closestDistance <= 10) {
            totalScore += Math.max(0, 100 - (closestDistance / 10) * 100);
        }
    });

    localStorage.setItem('userScore', totalScore);
    window.location.href = paths.results;
}

function openLoginModal() {
    var instance = M.Modal.getInstance(document.getElementById('login-modal'));
    instance.open();
}

function adminLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'admin' && password === 'password') {
        adminLoggedIn = true;
        document.getElementById('admin-options').style.display = 'block';
        M.Modal.getInstance(document.getElementById('login-modal')).close();
    } else {
        alert('Invalid credentials.');
    }
}

function setHazardLevel() {
    const hazardLevel = document.getElementById('hazard-level').value;
    if (currentPinkMarker && hazardLevel) {
        currentPinkMarker.setAttribute('data-hazard-level', hazardLevel);
    }
}

function manageImages() {
    window.location.href = paths.admin;
}

// Load dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}
