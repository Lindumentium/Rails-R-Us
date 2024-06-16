// buttons.js

const buttons = {
    recallLastButton: document.getElementById('recall-last'),
    recallAllButton: document.getElementById('recall-all')
};

document.addEventListener('DOMContentLoaded', () => {
    if (buttons.recallLastButton && buttons.recallAllButton) {
        buttons.recallLastButton.addEventListener('click', () => {
            recallLastFlag();
        });
        buttons.recallAllButton.addEventListener('click', () => {
            recallAllFlags();
        });
    }
});
