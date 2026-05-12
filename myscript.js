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

// Function for ENTER button - now includes checking
function submitGuess() {
    if (currentPosition === 5) {
        checkGuess();  // Check the guess and add colors
        currentRow = currentRow + 1;
        currentPosition = 0;
        if (currentRow >= 6) {
            // They used all 6 guesses - show the answer
            alert("Game Over! The word was: " + secretWord);
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

    // prints player guess and secret word to the console 
    console.log("Player guessed:", playerGuess);
    console.log("Secret word:", secretWord);
    
    // Check each letter and add colors to boxes AND keyboard
    for (let i = 0; i < 5; i++) {
        let guessedLetter = playerGuess[i];
        let correctLetter = secretWord[i];
        
        // Color the letter box
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
        
        // Color the keyboard button for this letter
        for (let j = 0; j < allKeyButtons.length; j++) {
            let keyButton = allKeyButtons[j];

            // checks if the key buttons inner text is the correct
            if (keyButton.innerText === guessedLetter) {
                if (guessedLetter === correctLetter) {

                    // Right letter, right place = GREEN
                    keyButton.style.backgroundColor = "lightGreen";
                    keyButton.style.color = "black";
                } else if (secretWord.includes(guessedLetter)) {

                    // Right letter, wrong place = YELLOW (only if not already green)
                    if (keyButton.style.backgroundColor !== "lightGreen") {
                        keyButton.style.backgroundColor = "yellow";
                        keyButton.style.color = "black";
                    }
                } else {
                    // Letter not in word = GRAY (only if not already green or yellow)
                    if (keyButton.style.backgroundColor !== "green" && keyButton.style.backgroundColor !== "yellow") {
                        keyButton.style.backgroundColor = "gray";
                        keyButton.style.color = "black";
                    }
                }
                // break stops the code immediately after it runs for all the letter boxes that checks what letter is in the correct syntax for the secret word
                break;
            }
        }
    }
    
    // Check if they won
    if (playerGuess === secretWord) {
        alert("You won! The word was " + secretWord);
    }
}

function showVowelGame() {
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
        // Make sure division gives a whole number
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
    
    // Connect the submit button
    let vowelSubmitBtn = document.getElementById("vowelSubmit");
    vowelSubmitBtn.addEventListener("click", function() {
        let playerAnswer = document.getElementById("vowelAnswer").value;
        let resultArea = document.getElementById("vowelResult");
        
        if (parseInt(playerAnswer) === correctAnswer) {
            // Find vowels in secret word
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
    // List of words to scramble
    let wordsToScramble = ["GAMES", "MUSIC", "BOOKS", "PHONE", "WATER", "HAPPY", "SMILE", "DANCE", "MAGIC", "LIGHT"];
    
    // Pick a random word
    let originalWord = wordsToScramble[Math.floor(Math.random() * wordsToScramble.length)];
    
    // Function to scramble the word
    function scrambleWord(word) {
        let letters = word.split(''); // Turn word into array of letters
        
        // Shuffle the letters randomly
        for (let i = letters.length - 1; i > 0; i--) {
            let randomIndex = Math.floor(Math.random() * (i + 1));
            // Swap letters
            let temp = letters[i];
            letters[i] = letters[randomIndex];
            letters[randomIndex] = temp;
        }
        
        return letters.join(''); // Turn back into word
    }
    
    let scrambledWord = scrambleWord(originalWord);
    
    // Make sure scrambled word is different from original
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
            // Pick a random letter from secret word
            let randomIndex = Math.floor(Math.random() * secretWord.length);
            let randomLetter = secretWord[randomIndex];
            resultArea.innerText = "Correct! A letter in the word is: " + randomLetter;
        } else {
            resultArea.innerText = "Wrong answer! The correct word was: " + originalWord + ". Try again!";
        }
    });
}

function showConsonantGame() {
    // Picks a random number of dots between 5 and 15
    let numDots = Math.floor(Math.random() * 11) + 5;
    
    // Creates the dots string
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
            // Find consonants in secret word
            let consonants = [];
            for (let i = 0; i < secretWord.length; i++) {
                let letter = secretWord[i];
                if (letter !== 'A' && letter !== 'E' && letter !== 'I' && letter !== 'O' && letter !== 'U') {
                    consonants.push(letter);
                }
            }
            
            if (consonants.length > 0) {
                // randomConsonant equals random consonant in the word
                let randomConsonant = consonants[Math.floor(Math.random() * consonants.length)];
                
                // gives random consonant in word if you answer minigame correctly
                resultArea.innerText = "Correct! A consonant in the word is: " + randomConsonant;

                // if you get the minigame correct but there's no consonants in the word
            } else {
                resultArea.innerText = "Correct! There are no consonants in this word.";
            }
            // if you get the minigame incorrect it will show this message
        } else {
            resultArea.innerText = "Wrong answer! There were " + numDots + " dots. Try again!";
        }
    });
}
