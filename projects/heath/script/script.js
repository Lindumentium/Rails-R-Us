document.addEventListener("DOMContentLoaded", () => {
    const image = document.getElementById("main-image");
    const selectionsList = document.getElementById("selections-list");
    let selections = [];

    // Sample hotspot data
    const hotspots = [
        { id: 1, top: 50, left: 100, width: 50, height: 50, description: "Hazard 1" },
        { id: 2, top: 200, left: 300, width: 75, height: 75, description: "Hazard 2" }
    ];

    // Add draggable hotspots to the image
    hotspots.forEach(hotspot => {
        const div = document.createElement("div");
        div.classList.add("hotspot");
        div.style.top = `${hotspot.top}px`;
        div.style.left = `${hotspot.left}px`;
        div.style.width = `${hotspot.width}px`;
        div.style.height = `${hotspot.height}px`;
        div.dataset.description = hotspot.description;

        div.addEventListener("click", () => {
            selections.push(hotspot.description);
            updateSelections();
        });

        image.parentElement.appendChild(div);

        Draggable.create(div, {
            onDragEnd: function() {
                hotspot.top = this.y;
                hotspot.left = this.x;
            }
        });
    });

    function updateSelections() {
        selectionsList.innerHTML = selections.map(selection => `<li>${selection}</li>`).join("");
    }
});
