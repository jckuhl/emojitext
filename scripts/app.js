import Letter from './textconvert.js';
import faces from './faces.js';
import random from './random.js';
import ALPHABET from './alphabetplots.js';

const textGrid = document.getElementById('textgrid');
const faceGrid = document.querySelector('.face-container');
const currentFaceDiv = document.getElementById('currentFace');
let currentFace = -1;

function createEmojiText(string, parent, emoji) {
    const letters = string.split('').map(letter => {
        const emojiLetter = new Letter(letter);
        return emojiLetter.convert(emoji, ALPHABET);
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
    div.innerHTML = face.face;
    div.dataset.index = face.index;
    div.dataset.selected = false;
    div.style.width = '20px';
    div.style.height = '20px';
    div.addEventListener('click', (event)=> {
        event.preventDefault();
        divs.forEach(div => div.dataset.selected = false);
        currentFace = parseInt(event.target.dataset.index);
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
        createEmojiText(input.value, textGrid, faces[currentFace].face)
    } else if (currentFace === 'random') {
        createEmojiText(input.value, textGrid, faces[random(faces.length)].face);
    } else {
        createEmojiText(input.value, textGrid, faces[0].face);
    }
});