console.log("Script started");
// Get elements
let popup = document.getElementById("popup");
let closeButton = document.getElementById("closeBtn");
let popupContent = document.getElementById("popupText");

// Get hint buttons
let vowelButton = document.getElementById("vowelHint");
let letterButton = document.getElementById("letterHint");
let ConsonantButton = document.getElementById("consonantHint");

// Show popup function
function showPopup() {
    console.log("tezt")
    popup.style.display = "block";
}

// Hide popup function
function hidePopup() {
    popup.style.display = "none";
}

closeButton.addEventListener("click", hidePopup);

// Connect the buttons to functions
vowelButton.addEventListener("click", showPopup);
letterButton.addEventListener("click", showPopup);
ConsonantButton.addEventListener("click", showPopup);

// Functions to show different minigames
function showVowelGame() {
    minigameArea.innerText = "Vowel minigame goes here!";
    popup.style.display = "block";
}

function showLetterRGame() {
    minigameArea.innerText = "Letter minigame goes here!";
    popup.style.display = "block";
}

function showFiveLetterGame() {
    minigameArea.innerText = "Consonant minigame goes here!";
    popup.style.display = "block";
}

function hidePopup() {
    popup.style.display = "none";
}

// Connect each button to its own minigame
vowelButton.addEventListener("click", showVowelGame);
letterButton.addEventListener("click", showLetterRGame);
ConsonantButton.addEventListener("click", showFiveLetterGame);

// Connect close button
closeButton.addEventListener("click", hidePopup);

// Array of possible words
let wordList = ["APPLE", "BEACH", "CRANE", "DREAM", "EAGLE", "FLAME", "GRAPE", "HORSE", "IMAGE", "JUICE"];

// Function to pick random word
function getRandomWord() {
    let randomIndex = Math.floor(Math.random() * wordList.length);
    return wordList[randomIndex];
}

// Set the secret word when page loads
let secretWord = getRandomWord();

console.log("Secret word is:", secretWord); // Remove this later - just for testing!

// Get input elements
let guessInput = document.getElementById("guessInput");
let submitButton = document.getElementById("submitGuess");
let feedback = document.getElementById("feedback");

function checkGuess() {
    let playerGuess = guessInput.value.toUpperCase();
    
    if (playerGuess === secretWord) {
        feedback.innerText = "Correct! You won! The word was " + secretWord;
    } else {
        feedback.innerText = "Try again! Not " + playerGuess;
    }
    
    // Clear the input for next guess
    guessInput.value = "";
}

submitButton.addEventListener("click", checkGuess);

