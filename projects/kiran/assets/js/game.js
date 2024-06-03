interact('.marker').draggable({
    listeners: {
        move(event) {
            const target = event.target;
            const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
            const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

            target.style.transform = `translate(${x}px, ${y}px)`;

            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
        },
        start(event) {
            event.preventDefault(); // Prevent default touch behavior
        }
    },
    modifiers: [
        interact.modifiers.restrict({
            restriction: 'parent',
            endOnly: true,
            elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
        })
    ]
});
