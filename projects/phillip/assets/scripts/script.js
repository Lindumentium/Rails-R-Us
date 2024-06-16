document.addEventListener('DOMContentLoaded', function() {
    const contractorLogin = document.getElementById('contractorLogin');
    const qrAssessorLogin = document.getElementById('qrAssessorLogin');
    const toggleSwitch = document.getElementById('themeSwitch');

    if (contractorLogin) {
        contractorLogin.addEventListener('click', function() {
            window.location.href = 'contractor.html';
        });
    }

    if (qrAssessorLogin) {
        qrAssessorLogin.addEventListener('click', function() {
            window.location.href = 'assessor.html';
        });
    }

    if (toggleSwitch) {
        toggleSwitch.addEventListener('change', function() {
            document.body.classList.toggle('dark-mode');
            document.body.classList.toggle('light-mode');
        });
    }
});
