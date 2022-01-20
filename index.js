const wordsArr = [
    { name: "Giraffe", hint: "tallest animal" },
    { name: "Kiran Bedi", hint: "first woman I.P.S officer" },
    { name: "Washington D.C.", hint: "capital city of U.S.A" },
    { name: "rupee", hint: "a currency" }
]
let randomWordToGuess = null;

function getRandomWord() {
    let index = Math.floor(Math.random() * wordsArr.length)
    randomWordToGuess = wordsArr[index];
}

function displayAlphabets() {
    const start = "a"
    const end = "z"
    let htmlCode = ``
    for (let i = start.charCodeAt(); i <= end.charCodeAt(); i++) {
        html += String.fromCharCode(i);
    }
}

function render() {}
displayAlphabets();