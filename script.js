'use strict';

//https://api.dictionaryapi.dev/api/v2/entries/en/<word>

const userInput = document.querySelector('.userInput');
const submitButton = document.querySelector('.submitButton');
const displayWord = document.querySelector('.userWord');
const displayDefinition = document.querySelector('.result');

async function getWordData(word) {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await response.json();
    return data;
}

submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    const word = userInput.value;
    getWordData(word).then(data => {
        const definitions = data[0].meanings.map(meaning => meaning.definitions[0].definition);
        
        let definitionList = '';
        definitions.forEach(
            definition => {
                definitionList += `<li>${definition}</li>`;
            });
            displayWord.textContent = word;
            displayDefinition.innerHTML = definitionList;
        });
    });
    
// const form = document.querySelector('form');
    // form.addEventListener('submit', function(e) {
//     e.preventDefault();
//     const word = userInput.value;
//     const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
//     fetch(url) 
//     .then(response => response.json())
//     .then(data => { 
//             const definition = data[0].meanings[0].definitions[0].definition;
//             userWord.textContent = `Definition of "${word}": `;
//             userWord.style.fontWeight = "bold";
//             result.textContent = `${definition}`;
//         })
//         .catch(error => console.error(`${error}`))
//     });
