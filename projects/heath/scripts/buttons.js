// Reusable variables
const buttons = {
    adminButton: document.getElementById('admin-button'),
    submitButton: document.getElementById('submit-button'),
    closeButton: document.querySelector('.close-button'),
    modal: document.getElementById('admin-modal'),
    recallLastButton: document.getElementById('recall-last'),
    recallAllButton: document.getElementById('recall-all')
};

// Admin button event listeners
document.addEventListener('DOMContentLoaded', () => {
    if (buttons.adminButton && buttons.modal && buttons.closeButton) {
        buttons.adminButton.addEventListener('click', (event) => {
            event.preventDefault();
            buttons.modal.style.display = 'block';
        });

        buttons.closeButton.addEventListener('click', () => {
            buttons.modal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target === buttons.modal) {
                buttons.modal.style.display = 'none';
            }
        });
    }

    if (buttons.submitButton) {
        buttons.submitButton.addEventListener('click', () => {
            window.location.href = 'https://forms.microsoft.com/';
        });
    }

    if (buttons.recallLastButton && buttons.recallAllButton) {
        buttons.recallLastButton.addEventListener('click', () => {
            recallLastFlag();
        });
        buttons.recallAllButton.addEventListener('click', () => {
            recallAllFlags();
        });
    }
});
