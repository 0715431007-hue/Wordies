console.log("Script started");
// Get elements
let popup = document.getElementById("popup");
let closeButton = document.getElementById("closeBtn");
let popupContent = document.getElementById("popupText");

// Get hint buttons
let vowelButton = document.getElementById("vowelHint");
let letterRButton = document.getElementById("letterRHint");
let fiveLetterButton = document.getElementById("fiveLetterHint");

// Show popup function
function showPopup() {
    console.log("tezt")
    popup.style.display = "block";
}

// Hide popup function
function hidePopup() {
    popup.style.display = "none";
}

// Connect close button
closeButton.addEventListener("click", hidePopup);

// Connect the buttons to functions
vowelButton.addEventListener("click", showPopup);
letterRButton.addEventListener("click", showPopup);
fiveLetterButton.addEventListener("click", showPopup);
