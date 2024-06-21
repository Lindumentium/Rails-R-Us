let tutorialCompleted = false;

function showFocusImage(img) {
  const focusImgContainer = document.getElementById('focusImageContainer');
  const focusedImg = document.getElementById('focusedImg');
  focusedImg.src = img.src;
  focusImgContainer.style.display = "block";
}

function closeFocusImage() {
  document.getElementById('focusImageContainer').style.display = "none";
}

function openPage(pageName, elmnt, color) {
  const tabcontent = document.getElementsByClassName("tabcontent");
  for (let i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  const tablinks = document.getElementsByClassName("tablink");
  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
  }
  document.getElementById(pageName).style.display = "block";
  elmnt.style.backgroundColor = color;
}

function getColor(pageName) {
  switch (pageName) {
    case "Welcome":
      return "red";
    case "Game":
      return "green";
    case "Admin":
      return "blue";
    case "Results":
      return "orange";
    default:
      return "";
  }
}

document.querySelectorAll(".tablink").forEach(tab => {
  tab.addEventListener("click", function() {
    const pageName = this.getAttribute("data-page");
    if (pageName === "Game" && !tutorialCompleted) {
      showErrorPopup('Please complete the tutorial before starting the game');
    } else if (pageName === "Admin") {
      openModal('adminModal');
    } else {
      openPage(pageName, this, getColor(pageName));
    }
  });
});

document.getElementById("defaultOpen").click();
