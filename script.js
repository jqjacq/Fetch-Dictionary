'use strict';
//https://api.dictionaryapi.dev/api/v2/entries/en/<word>

const userInput = document.querySelector('.userInput');
const submitButton = document.querySelector('.submitButton');
const resultContainer = document.querySelector('.result-container')
const displayWord = document.querySelector('.userWord');
const displayDefinition = document.querySelector('.result');
const content = document.querySelector('.content')
const displayError = function(errorMessage) {
    const errorElement = document.getElementById('error')
    errorElement.textContent = errorMessage;
} 
const wait = function () {
    return new Promise(function (resolve) {
        resultContainer.style.opacity = 1;
        setTimeout(resolve, 2000);
    });
};
const defaultWord = function() {
    wait();
    displayWord.textContent = 'Welcome';
    displayDefinition.innerHTML = `1. The act of greeting someone’s arrival, especially by saying "Welcome!"; reception. <br>
    2. To affirm or greet the arrival of someone, especially by saying "Welcome!". <br>
    3. Whose arrival is a cause of joy; received with gladness; admitted willingly to the house, entertainment, or company. <br>
    4. Greeting given upon someone's arrival.`
}
async function getWordData(word) {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await response.json();
    return data;
}

async function getDefinition() {
    try {
        const word = userInput.value;
        const data = await getWordData(word);
    
        if (Array.isArray(data)) {
                const definitions = data[0].meanings.map(meaning => meaning.definitions[0].definition);
                let definitionList = '';
                definitions.forEach(
                    definition => {
                        definitionList += `<li>${definition}</li>`;
                    });
                    displayDefinition.innerHTML = definitionList;
                    displayWord.textContent = word;
            } else {
                displayWord.textContent = `The word '${word}' does not exist.`;
                displayDefinition.innerHTML = "This word does not exist in our dictionary. Otherwise, it may be a misspelling. Please try another word. "
            }
    } catch (error) {
        if (error instanceof TypeError && error.message === 'Failed to fetch') { 
            displayError(`A chicken ate the word. Just kidding, here's the reason.  ${error}. 
            What does this even mean? Maybe check your internet connection and try again.`);
            console.error(`Error: A chicken ate the word, try again later.`);
            content.style.display = "none";
        } else {
            console.error(error);
        }
        
    }

}

submitButton.addEventListener('click', async function (e) {
    e.preventDefault();
    wait();
    getDefinition();
});

defaultWord();

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