document.addEventListener('DOMContentLoaded', function() {
    if (typeof interact !== 'undefined') {
        interact('.marker').draggable({
            inertia: true,
            modifiers: [
                interact.modifiers.restrictRect({
                    restriction: 'parent',
                    endOnly: true
                })
            ],
            autoScroll: true,
            listeners: {
                start(event) {
                    let markerType = getMarkerType(event.target);
                    console.log(`Drag started for ${markerType} marker.`);
                },
                move(event) {
                    const target = event.target;
                    const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                    const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                    target.style.transform = `translate(${x}px, ${y}px)`;
                    target.setAttribute('data-x', x);
                    target.setAttribute('data-y', y);
                },
                end(event) {
                    let markerType = getMarkerType(event.target);
                    console.log(`Drag ended for ${markerType} marker.`);
                }
            }
        });
    } else {
        console.error('Interact.js is not loaded.');
    }
});

function getMarkerType(element) {
    if (element.classList.contains('danger')) return 'danger';
    if (element.classList.contains('caution')) return 'caution';
    if (element.classList.contains('safe')) return 'safe';
    if (element.classList.contains('pink')) return 'pink';
    if (element.classList.contains('demo')) return 'demo';
    return 'unknown';
}
