'use strict';

//https://api.dictionaryapi.dev/api/v2/entries/en/<word>

const userInput = document.querySelector('.userInput');
const submitButton = document.querySelector('.submitButton');
const resultContainer = document.querySelector('result.container')
const userWord = document.querySelector('.userWord')


const renderWord = function(userInput) {
    console.log(userInput);
    const html = `
        <div class="result userWord centerText">${userInput[0].word}</div>
        <div class="result definition">${userInput[0].meanings.definition}</div>
    `
    resultContainer.insertAdjacentElement('afterbegin', html)
}
const getDefinition = function(word) {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    fetch(url)
        .then(resp => resp.json())
        .then(data => console.log(data))
            // renderWord(),
        .catch(error => console.error(error))
}

submitButton.addEventListener('click', function(e) {
    e.preventDefault
    userWord.textContent = userInput.value;
    getDefinition(userInput);
    console.log(userInput);
});