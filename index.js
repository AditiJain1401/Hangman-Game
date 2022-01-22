   const alphabets = document.querySelector(".alphabets");
   const gameStatus = document.querySelector("#status");
   const restartBtn = document.querySelector(".restart-btn")
   const hintBtn = document.querySelector('.hint-btn')
   const wordsAndHints = [
       { name: "Giraffe", hint: "tallest animal" },
       { name: "Kiran Bedi", hint: "first woman I.P.S officer" },
       { name: "Washington D.C.", hint: "capital city of U.S.A" },
       { name: "Rupee", hint: "a currency" }
   ]
   const hintDiv = document.querySelector('.hint');
   let randomWordToGuess = null;
   let answer = []
   let remainingLives = 5;
   let guesses = [];

   function getRandomWord() {
       let index = Math.floor(Math.random() * wordsAndHints.length)
       randomWordToGuess = wordsAndHints[index];
       render();
   }

   function displayAlphabets() {
       const start = "A"
       const end = "Z"
       let htmlCode = ``
       for (let i = start.charCodeAt(); i <= end.charCodeAt(); i++) {
           //console.log(i);
           let letter = String.fromCharCode(i)
           htmlCode += `<button class="alphabetBtn" id="${i}" onclick="checkGuess(${i})">${letter}</button>`;
       }
       alphabets.innerHTML = htmlCode;
       getRandomWord();
   }

   function render() {
       const guessedLetters = []
       const displayBlock = document.querySelector(".word");
       displayBlock.innerHTML = ""
       answer = randomWordToGuess.name.split("");
       console.log(answer);
       for (let letter of answer) {
           let button = document.createElement("button");
           button.setAttribute('id', `${letter}`)
           button.setAttribute('class', 'wordBtn')
           if (letter == ".") {
               button.innerText = '.'
           } else if (letter != " " && guesses.length != 0) {
               guesses.forEach(element => {
                   if (element == letter) {
                       button.innerText = letter;
                       guessedLetters.push(letter)
                   }
               })
           } else {
               button.innerText = '-'
           }
           displayBlock.appendChild(button);
       }
       checkWin(answer, guessedLetters)
   }

   function checkWin(answer, guessedLetters) {
       let newArr = answer.filter((element) => element != " " && element != '.')
       if (newArr.sort().toString() == guessedLetters.sort().toString()) {
           console.log(newArr, guessedLetters)
           gameStatus.innerText = "Congratulations! You Won"
           restartBtn.classList.remove('disabled');
           hintBtn.classList.add('disabled');
       }
   }

   function checkGuess(charCode) {
       const btn = document.getElementById(charCode);
       btn.setAttribute('class', 'disabled');

       if (remainingLives >= 0) {
           let letter = String.fromCharCode(charCode);
           let result = answer.find((element) => element == letter || element == letter.toLowerCase());
           if (result != undefined) {
               guesses.push(result);
           } else {
               remainingLives -= 1;
               gameStatus.innerText = `You have ${remainingLives} remaining Lives`
           }
           render();
       } else {
           gameStatus.innerText = "Oops! Better Luck Next Time";
           restartBtn.classList.remove('disabled');
           hintBtn.classList.add('disabled');
       }
   }

   function displayHint() {
       hintDiv.innerText = randomWordToGuess.hint;
   }

   function restart() {
       randomWordToGuess = null;
       answer = []
       remainingLives = 5;
       guesses = [];
       alphabets.innerHTML = ""
       hintDiv.innerHTML = ""
       gameStatus.innerText = "You have 5 lives"
       hintBtn.classList.remove('disabled')
       restartBtn.classList.add('disabled')
       displayAlphabets();
   }
   displayAlphabets();