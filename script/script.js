function toggleDescription(id) {
    const desc = document.getElementById(id);
    if (desc.style.display === "block") {
        desc.style.display = "none";
    } else {
        desc.style.display = "block";
    }
}
