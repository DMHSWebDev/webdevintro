const menuButton = document.querySelector("a#menu-icon");

menuButton.addEventListener("click", function (e) {
    e.preventDefault();
    menuButton.classList.toggle("close");
});