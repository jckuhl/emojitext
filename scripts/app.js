import EmojiLetter from './emojiletter.js';
import faces from './faces.js';
import alphabetPlots from './alphabetplots.js';
import random from './random.js';

const textGrid = document.getElementById('textgrid');
const faceGrid = document.querySelector('.face-container');
const currentFaceDiv = document.getElementById('currentFace');
let currentFace = -1;

/**
 * Converts a string to emoji text and attaches it to a parent div.
 * Takes in an object of plots for each accepted character
 * Either takes an emoji string, or an array of emojis
 * If emoji an array, it will pick a random emoji from that array
 *
 * @param {String} string The string to be converted
 * @param {HTMLElement} parent The div to attach the text to
 * @param {Object} plots An object of plots of grid positions
 * @param {String | String[]} emoji An emoji or an array of emojis
 */
function createEmojiText(string, parent, plots, emoji) {
    const letters = string.split('').map(letter => {
        const emojiLetter = new EmojiLetter(letter, 8);
        return emojiLetter.convert(emoji, plots);
    });
    let error = letters.find(letter => letter instanceof Error);
    if(error) {
        parent.innerHTML = error.message;
    } else {
        letters.forEach(letter => letter.attachTo(parent));
    }
}

const divs = faces.map(face => {
    const div = document.createElement('div');
    div.innerHTML = face;
    div.dataset.index = face.index;
    div.dataset.selected = false;
    div.style.width = '20px';
    div.style.height = '20px';
    div.addEventListener('click', (event)=> {
        event.preventDefault();
        divs.forEach(div => div.dataset.selected = false);
        currentFace = event.target.innerHTML;
        currentFaceDiv.innerHTML = event.target.innerHTML;
    });
    faceGrid.appendChild(div);
    return div;
});

const button = document.querySelector('.submit');
const input = document.getElementById('emojiinput')

const randBtn = document.querySelector('.random');
randBtn.addEventListener('click', ()=> {
    currentFace = 'random';
})

button.addEventListener('click', (event)=> {
    textGrid.innerHTML = '';
    event.preventDefault();
    if(currentFace !== -1 && currentFace !== 'random') {
        createEmojiText(input.value, textGrid, alphabetPlots, currentFace)
    } else if (currentFace === 'random') {
        createEmojiText(input.value, textGrid, alphabetPlots, faces);
    } else {
        createEmojiText(input.value, textGrid, alphabetPlots, faces[random(faces.length)]);
    }
});