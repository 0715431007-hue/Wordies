console.log("Script started");
// popup for popup, close button for close button, popup content for content inside of the popup
let popup = document.getElementById("popup");
let closeButton = document.getElementById("closeBtn");
let popupContent = document.getElementById("popupText");

// hint buttons
let vowelButton = document.getElementById("vowelHint");
let letterButton = document.getElementById("letterHint");
let ConsonantButton = document.getElementById("consonantHint");

// current row and current position equal 0
let currentRow = 0;
let currentPosition = 0; 

// player guess currently empty
let playerGuess = "";

// Track which hints have been used
let vowelHintUsed = false;
let letterHintUsed = false;
let consonantHintUsed = false;

function hidePopup() {
    popup.style.display = "none";
}

// Connect each button to its own minigame
vowelButton.addEventListener("click", showVowelGame);
letterButton.addEventListener("click", showLetterGame);
ConsonantButton.addEventListener("click", showConsonantGame);

// Connect close button
closeButton.addEventListener("click", hidePopup);

// Array of possible words
let wordList = [
    "APPLE", "BEACH", "CRANE", "DREAM", "EAGLE", "FLAME", "GRAPE", "HORSE", "IMAGE", "JUICE", "BORED", "BOARD", "HATER", "LATER", "FIGHT", "READS", "FEETS", "MUSIC", "YACHT", "HAPPY",
    "WATER", "CUTIE", "FRUIT", "TACOS", "DIZZY", "JOKES", "JUDGE", "PLOTS", "FUZZY", "ENJOY", "PUPPY", "QUOTE", "CHUNK", "GUPPY", "SNACK", "BRICK", "HEXED", "HOBBY", "HOPPY", "JADES",
    "JAILS", "BUMPY", "LUMPY", "MIXER", "MIXES", "QUIET", "SKUNK", "SKULL", "WITCH", "WHICH", "THANK", "FAKER", "LOVER", "ZONES", "BENCH", "CRAMP", "BOMBS", "IMPLY", "ENTER", "LUNCH",
    "NIGHT", "HUNCH", "QUICK", "LOUDS", "FOXES", "BREAD", "CRAZY", "ANGRY", "DROWN", "AUDIO", "MEDIA"
];


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

    // Check if they won
    if (playerGuess === secretWord) {
        alert("You won! The word was " + secretWord);
    }

// Function for ENTER button - updated to refresh after game over
function submitGuess() {
    if (currentPosition === 5) {
        checkGuess();
        currentRow = currentRow + 1;
        currentPosition = 0;
        
        // Check if game is over after this guess
        if (currentRow >= 6) {
            // They used all 6 guesses - show the answer
            alert("Game Over! The word was: " + secretWord);
            location.reload(); // Refresh the page
        }
        
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

// Function to check the guess and add colors to BOTH boxes and keyboard
function checkGuess() {
    let allRows = document.querySelectorAll('.guess-row');
    let currentRowBoxes = allRows[currentRow].querySelectorAll('.letter-box');
    let allKeyButtons = document.querySelectorAll('.key-btn');
    
    // Get the player's guess
    let playerGuess = "";
    for (let i = 0; i < 5; i++) {
        playerGuess = playerGuess + currentRowBoxes[i].innerText;
    }
    
    console.log("Player guessed:", playerGuess);
    console.log("Secret word:", secretWord);
    
    // Track which letters in secret word have been used
    let secretLetterUsed = [false, false, false, false, false];
    let boxColors = ["", "", "", "", ""]; // Store what color each box should be
    
    // FIRST PASS: Mark all exact matches (green)
    for (let i = 0; i < 5; i++) {
        if (playerGuess[i] === secretWord[i]) {
            boxColors[i] = "green";
            secretLetterUsed[i] = true;
        }
    }
    
    // SECOND PASS: Mark letters in wrong position (yellow)
    for (let i = 0; i < 5; i++) {
        if (boxColors[i] === "") { // Only check if not already green
            let guessedLetter = playerGuess[i];
            let foundMatch = false;
            
            // Look for this letter in secret word
            for (let j = 0; j < 5; j++) {
                if (secretWord[j] === guessedLetter && !secretLetterUsed[j]) {
                    boxColors[i] = "yellow";
                    secretLetterUsed[j] = true;
                    foundMatch = true;
                    break;
                }
            }
            
            if (!foundMatch) {
                boxColors[i] = "gray";
            }
        }
    }
    
    // Apply colors to boxes
    for (let i = 0; i < 5; i++) {
        if (boxColors[i] === "green") {
            currentRowBoxes[i].style.backgroundColor = "lightGreen";
            currentRowBoxes[i].style.color = "black";
        } else if (boxColors[i] === "yellow") {
            currentRowBoxes[i].style.backgroundColor = "yellow";
            currentRowBoxes[i].style.color = "black";
        } else {
            currentRowBoxes[i].style.backgroundColor = "gray";
            currentRowBoxes[i].style.color = "black";
        }
        
        // Color the keyboard button for this letter
        let guessedLetter = playerGuess[i];
        for (let j = 0; j < allKeyButtons.length; j++) {
            let keyButton = allKeyButtons[j];
            
            if (keyButton.innerText === guessedLetter) {
                if (boxColors[i] === "lightGreen") {
                    keyButton.style.backgroundColor = "lightGreen";
                    keyButton.style.color = "black";
                } else if (boxColors[i] === "yellow") {
                    if (keyButton.style.backgroundColor !== "lightGreen") {
                        keyButton.style.backgroundColor = "yellow";
                        keyButton.style.color = "black";
                    }
                } else {
                    if (keyButton.style.backgroundColor !== "lightGreen" && keyButton.style.backgroundColor !== "yellow") {
                        keyButton.style.backgroundColor = "gray";
                        keyButton.style.color = "black";
                    }
                }
                break;
            }
        }
    }
    
    // Check if they won
    if (playerGuess === secretWord) {
        alert("You won! The word was " + secretWord);
        location.reload(); // Refresh the page
    }
}


// Functions to show different minigames
function showVowelGame() {
    // Check if hint already used
    if (vowelHintUsed) {
        alert("You already used the vowel hint for this game!");
        return;
    }
    
    // Pick a random math operation
    let operations = ['+', '-', '*', '/'];
    let randomOperation = operations[Math.floor(Math.random() * operations.length)];
    
    let num1, num2, correctAnswer;
    
    if (randomOperation === '+') {
        num1 = Math.floor(Math.random() * 20) + 1;
        num2 = Math.floor(Math.random() * 20) + 1;
        correctAnswer = num1 + num2;
    } else if (randomOperation === '-') {
        num1 = Math.floor(Math.random() * 20) + 10;
        num2 = Math.floor(Math.random() * 10) + 1;
        correctAnswer = num1 - num2;
    } else if (randomOperation === '*') {
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        correctAnswer = num1 * num2;
    } else if (randomOperation === '/') {
        correctAnswer = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 5) + 1;
        num1 = correctAnswer * num2;
    }
    
    minigameArea.innerHTML = `
        <h3>Vowel Hint Minigame</h3>
        <p>Solve this math problem to get a vowel hint:</p>
        <p>${num1} ${randomOperation} ${num2} = ?</p>
        <input type="number" id="vowelAnswer" placeholder="Your answer">
        <button id="vowelSubmit">Submit</button>
        <p id="vowelResult"></p>
    `;
    
    popup.style.display = "block";
    
    let vowelSubmitBtn = document.getElementById("vowelSubmit");
    vowelSubmitBtn.addEventListener("click", function() {
        let playerAnswer = document.getElementById("vowelAnswer").value;
        let resultArea = document.getElementById("vowelResult");
        
        if (parseInt(playerAnswer) === correctAnswer) {
            // ONLY mark as used when they get it RIGHT
            vowelHintUsed = true;
            vowelButton.style.backgroundColor = "#ccc";
            vowelButton.style.cursor = "not-allowed";
            
            let vowels = [];
            for (let i = 0; i < secretWord.length; i++) {
                let letter = secretWord[i];
                if (letter === 'A' || letter === 'E' || letter === 'I' || letter === 'O' || letter === 'U') {
                    vowels.push(letter);
                }
            }
            
            if (vowels.length > 0) {
                let randomVowel = vowels[Math.floor(Math.random() * vowels.length)];
                resultArea.innerText = "Correct! A vowel in the word is: " + randomVowel;
            } else {
                resultArea.innerText = "Correct! There are no vowels in this word.";
            }
        } else {
            resultArea.innerText = "Wrong answer! Try again.";
        }
    });
}

function showLetterGame() {
    // Check if hint already used
    if (letterHintUsed) {
        alert("You already used the letter hint for this game!");
        return;
    }
    
    let wordsToScramble = ["GAMES", "MUSIC", "BOOKS", "PHONE", "WATER", "HAPPY", "SMILE", "DANCE", "MAGIC", "LIGHT"];
    
    let originalWord = wordsToScramble[Math.floor(Math.random() * wordsToScramble.length)];
    
    function scrambleWord(word) {
        let letters = word.split('');
        
        for (let i = letters.length - 1; i > 0; i--) {
            let randomIndex = Math.floor(Math.random() * (i + 1));
            let temp = letters[i];
            letters[i] = letters[randomIndex];
            letters[randomIndex] = temp;
        }
        
        return letters.join('');
    }
    
    let scrambledWord = scrambleWord(originalWord);
    
    while (scrambledWord === originalWord) {
        scrambledWord = scrambleWord(originalWord);
    }
    
    minigameArea.innerHTML = `
        <h3>Letter Hint Minigame</h3>
        <p>Unscramble this word to get a letter hint:</p>
        <p>Scrambled: <strong>${scrambledWord}</strong></p>
        <input type="text" id="letterAnswer" placeholder="Unscrambled word">
        <button id="letterSubmit">Submit</button>
        <p id="letterResult"></p>
    `;
    
    popup.style.display = "block";
    
    let letterSubmitBtn = document.getElementById("letterSubmit");
    letterSubmitBtn.addEventListener("click", function() {
        let playerAnswer = document.getElementById("letterAnswer").value.toUpperCase();
        let resultArea = document.getElementById("letterResult");
        
        if (playerAnswer === originalWord) {
            // ONLY mark as used when they get it RIGHT
            letterHintUsed = true;
            letterButton.style.backgroundColor = "#ccc";
            letterButton.style.cursor = "not-allowed";
            
            let randomIndex = Math.floor(Math.random() * secretWord.length);
            let randomLetter = secretWord[randomIndex];
            resultArea.innerText = "Correct! A letter in the word is: " + randomLetter;
        } else {
            resultArea.innerText = "Wrong answer! Try again.";
        }
    });
}

function showConsonantGame() {
    // Check if hint already used
    if (consonantHintUsed) {
        alert("You already used the consonant hint for this game!");
        return;
    }
    
    let numDots = Math.floor(Math.random() * 11) + 5;
    
    let dots = "";
    for (let i = 0; i < numDots; i++) {
        dots = dots + "• ";
    }
    
    minigameArea.innerHTML = `
        <h3>Consonant Hint Minigame</h3>
        <p>Count the dots to get a consonant hint:</p>
        <p style="font-size: 20px; line-height: 1.5;">${dots}</p>
        <input type="number" id="consonantAnswer" placeholder="How many dots?">
        <button id="consonantSubmit">Submit</button>
        <p id="consonantResult"></p>
    `;
    
    popup.style.display = "block";
    
    let consonantSubmitBtn = document.getElementById("consonantSubmit");
    consonantSubmitBtn.addEventListener("click", function() {
        let playerAnswer = document.getElementById("consonantAnswer").value;
        let resultArea = document.getElementById("consonantResult");
        
        if (parseInt(playerAnswer) === numDots) {
            // ONLY mark as used when they get it RIGHT
            consonantHintUsed = true;
            letterButton.style.backgroundColor = "#ccc";
            letterButton.style.cursor = "not-allowed";
            
            let consonants = [];
            for (let i = 0; i < secretWord.length; i++) {
                let letter = secretWord[i];
                if (letter !== 'A' && letter !== 'E' && letter !== 'I' && letter !== 'O' && letter !== 'U') {
                    consonants.push(letter);
                }
            }
            
            if (consonants.length > 0) {
                let randomConsonant = consonants[Math.floor(Math.random() * consonants.length)];
                resultArea.innerText = "Correct! A consonant in the word is: " + randomConsonant;
            } else {
                resultArea.innerText = "Correct! There are no consonants in this word.";
            }
        } else {
            resultArea.innerText = "Wrong answer! Try again.";
        }
    });
}

