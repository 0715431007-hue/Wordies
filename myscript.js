console.log("Script started");
// Get elements
let popup = document.getElementById("popup");
let closeButton = document.getElementById("closeBtn");
let popupContent = document.getElementById("popupText");

// Get hint buttons
let vowelButton = document.getElementById("vowelHint");
let letterButton = document.getElementById("letterHint");
let ConsonantButton = document.getElementById("consonantHint");

let currentRow = 0;
let currentPosition = 0; 


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
let wordList = ["APPLE", "BEACH", "CRANE", "DREAM", "EAGLE", "FLAME", "GRAPE", "HORSE", "IMAGE", "JUICE", "BORED", "BOARD"];


// Game variables
let secretWord = getRandomWord();
let currentGuess = 0;
let maxGuesses = 6;

// gives a random word
function getRandomWord() {
    let randomIndex = Math.floor(Math.random() * wordList.length);
    return wordList[randomIndex];
}

// Get input elements
let guessInput = document.getElementById("guessInput");
let submitButton = document.getElementById("submitGuess");
let feedback = document.getElementById("feedback");

// 3 guess rows into one variable called allRows
let allRows = document.querySelectorAll('.guess-row');

// singular key buttons grouped into one variable called allKeyButtons
let allKeyButtons = document.querySelectorAll('.key-btn');

function addLetter(letter) {
    console.log("Adding letter:", letter);
    console.log("Current position:", currentPosition);
    
    let allRows = document.querySelectorAll('.guess-row');
    
    if (currentPosition < 5 && currentRow < 6) {
        let currentRowBoxes = allRows[currentRow].querySelectorAll('.letter-box');
        currentRowBoxes[currentPosition].innerText = letter;
        currentPosition = currentPosition + 1;
        console.log("New position:", currentPosition);
    }
}

function checkGuess() {
    let allRows = document.querySelectorAll('.guess-row');
    let currentRowBoxes = allRows[currentRow].querySelectorAll('.letter-box');
    
    // Get the player's guess
    let playerGuess = "";
    for (let i = 0; i < 5; i++) {
        playerGuess = playerGuess + currentRowBoxes[i].innerText;
    }
    
    console.log("Player guessed:", playerGuess);
    console.log("Secret word:", secretWord);
    
    // Check each letter and add colors
    for (let i = 0; i < 5; i++) {
        let guessedLetter = playerGuess[i];
        let correctLetter = secretWord[i];
        if (guessedLetter === correctLetter) {
            // Right letter, right place = GREEN
            currentRowBoxes[i].style.backgroundColor = "lightGreen";
            currentRowBoxes[i].style.color = "black";
        } else if (secretWord.includes(guessedLetter)) {
            // Right letter, wrong place = YELLOW
            currentRowBoxes[i].style.backgroundColor = "yellow";
            currentRowBoxes[i].style.color = "black";
        } else {
            // Letter not in word = GRAY
            currentRowBoxes[i].style.backgroundColor = "gray";
            currentRowBoxes[i].style.color = "black";
        }
    }
    // Check if they won
    if (playerGuess === secretWord) {
        alert("You won! The word was " + secretWord);
    }
}

// Function for ENTER button - now includes checking
function submitGuess() {
    if (currentPosition === 5) {
        checkGuess();  // Check the guess and add colors
        currentRow = currentRow + 1;
        currentPosition = 0;
        console.log("Moving to row:", currentRow);
    } else {
        console.log("Need 5 letters before submitting!");
    }
}
// Function for DELETE button
function deleteLetter() {
    if (currentPosition > 0) {
        //if the current position is at 0, it will make it so it deletes 1
        currentPosition = currentPosition - 1;

        // guess-row grouped into one vairable called allRows
        let allRows = document.querySelectorAll('.guess-row');

        // currentRowBoxes equals all letter boxes to group them
        let currentRowBoxes = allRows[currentRow].querySelectorAll('.letter-box');

        //when it deletes one, it becomes empty and inner text = "" (empty)
        currentRowBoxes[currentPosition].innerText = "";
    }
}
// connects all keyboard buttons together 
for (let i = 0; i < allKeyButtons.length; i++) {

    // lets button equal all the key buttons to group them
    let button = allKeyButtons[i];

    // lets buttonText equal the button inner text so it connects
    let buttonText = button.innerText;

    //if buttonText length is equal to 1
    if (buttonText.length === 1) {

        // user clicks and the addLetter function is ran to add a new letter after that one
        button.addEventListener("click", function() {
            addLetter(buttonText);
        });

        //when ENTER button is clicked, it runs submitGuess function
    } else if (buttonText === "ENTER") {
        button.addEventListener("click", submitGuess);
        //when DEL button is clicked, it removes the current letter that was there
    } else if (buttonText === "DEL") {
        button.addEventListener("click", deleteLetter);
    }
}

console.log("Secret word:", secretWord);