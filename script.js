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
// try {
//     const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
//     if (!response.ok) throw new Error('Networking not responsing, try again.');
//     return await response.json();
// } catch (error) {
//     console.error(`A chicken ate the definition, try again.`, error);
//     }
}

submitButton.addEventListener('click', async function (e) {
    e.preventDefault();
    const word = userInput.value;
    const data = await getWordData(word);
    
    if (Array.isArray(data)) {
     getWordData(word).then(data => {
         const definitions = data[0].meanings.map(meaning => meaning.definitions[0].definition);

          let definitionList = '';
          definitions.forEach(
              definition => {
                  definitionList += `<li>${definition}</li>`;
              });
              displayDefinition.innerHTML = definitionList;
              displayWord.textContent = word;
          });
        } else {
            displayWord.textContent = `The word '${word}' does not exist.`;
            displayDefinition.innerHTML = "This word does not exist in our dictionary. Otherwise, it may be a misspelling. Please try another word. "
        }
    });
//Using just fetch
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
