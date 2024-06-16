// menu.js

const sidebar = {
    sidebarElement: document.getElementById("mySidebar"),
    mainElement: document.getElementById("main")
};

function openNav() {
    sidebar.sidebarElement.style.width = "250px";
    sidebar.mainElement.style.marginLeft = "250px";
}

function closeNav() {
    sidebar.sidebarElement.style.width = "0";
    sidebar.mainElement.style.marginLeft = "0";
}

window.openNav = openNav;
window.closeNav = closeNav;
