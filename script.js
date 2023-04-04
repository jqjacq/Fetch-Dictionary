'use strict';

//https://api.dictionaryapi.dev/api/v2/entries/en/<word>

const form = document.querySelector('form');
const userInput = document.querySelector('.userInput');
const userWord = document.querySelector('.userWord')
const result = document.querySelector('.result');
// const renderWord = function(userInput) {
    //     console.log(userInput);
    //     const html = `
    //         <div class="result userWord centerText">${userInput[0].word}</div>
    //         <div class="result definition">${userInput[0].meanings.definition}</div>
    //     `
    //     resultContainer.insertAdjacentElement('afterbegin', html)
    // }
    // const getJSONAPI = function (url) {
        //     return fetch(url).then(response => {
            //       if (!response.ok) throw new Error(` (${response.status})`);
            //       return response.json();
            //     });
            //   };
form.addEventListener('submit', function(e) {
    e.preventDefault();
    const word = userInput.value;
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    // getJSONAPI(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    fetch(url) 
    .then(response => response.json())
    .then(data => { 
            const definition = data[0].meanings[0].definitions[0].definition;
            userWord.textContent = `Definition of "${word}": `;
            userWord.style.fontWeight = "bold";
            result.textContent = `${definition}`;
            // result.textContent = definition;
        })
        .catch(error => console.error(`${error}`))
    });
    // submitButton.addEventListener('click', function(e) {
    // userWord.textContent = userInput.value;
    // e.preventDefault
    // getDefinition();
// });