import Letter from './textconvert.js';

//'😀'
const textGrid = document.getElementById('textgrid');

function createEmojiText(string, parent, emoji) {
    string.split('').forEach(letter => {
        const emojiLetter = new Letter(letter);
        emojiLetter.convert(emoji);
        emojiLetter.attach(parent);
    });
}
