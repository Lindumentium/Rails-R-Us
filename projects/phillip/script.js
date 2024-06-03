document.addEventListener('DOMContentLoaded', function() {
    const contractorLogin = document.getElementById('contractorLogin');
    const qrAssessorLogin = document.getElementById('qrAssessorLogin');

    if (contractorLogin) {
        contractorLogin.addEventListener('click', function() {
            window.location.href = 'contractor/contractor.html';
        });
    }

    if (qrAssessorLogin) {
        qrAssessorLogin.addEventListener('click', function() {
            window.location.href = 'assessor/assessor.html';
        });
    }

    const toggleSwitch = document.getElementById('themeSwitch');
    toggleSwitch.addEventListener('change', function() {
        document.body.classList.toggle('dark-mode');
        document.body.classList.toggle('light-mode');
    });

    // Add sleepers to the rail tracks
    const leftTrack = document.querySelector('.rail-track.left');
    const rightTrack = document.querySelector('.rail-track.right');
    for (let i = 0; i < 20; i++) {
        const sleeper = document.createElement('div');
        sleeper.classList.add('sleeper');
        sleeper.style.top = `${i * 50}px`;
        leftTrack.appendChild(sleeper.cloneNode());
        rightTrack.appendChild(sleeper.cloneNode());
    }
});
