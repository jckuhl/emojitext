import random from "./random.js";

export default class EmojiLetter {

    /**
     * Creates an instance of Letter.
     * 
     * @param {String} letter A single character
     * @param {Number} width Width of the grid used to display the character
     * @param {Number} height Is set to width if height param is not defined
     * @memberof Letter
     */
    constructor(letter, width, height) {
        this.width = width;
        this.height = height || width;
        this.letter = letter.toUpperCase();
        this.div = document.createElement('div');
        this.div.style.display = 'grid';
        this.div.style.gridTemplateColumns = `repeat(${this.width}, 1fr)`;
        this.div.style.gridTemplateRows = `repeat(${this.height}, 1fr)`;
        this.div.style.width = 10 * this.width + 'px';
        this.div.style.height = 10 * this.width + 'px';
    }

    /**
     * Attaches the created div to the given parent element
     *
     * @param {HTMLElement} parent
     * @memberof Letter
     */
    attachTo(parent) {
        parent.appendChild(this.div);
    }

    /**
     * Takes an emoji or an array of emojis and creates an emoji representation
     * of this.letter, according to the given plots object that define the 
     * CSS grid positions
     * If emoji is an array, it will pick random emojis from that array
     *
     * @param {String | String[]} emoji
     * @param {Object} plots
     * @returns {Object} "this" instance
     * @memberof Letter
     */
    convert(emoji, plots) {
        if(Object.keys(plots).includes(this.letter)) {
            if(this.letter === ' ') {
                return this;
            }
            let squares = 0;
            while(squares < plots.width * plots.height) {
                let div = document.createElement('div');
                div.style.width = '10px';
                div.style.height = '10px';
                if(plots[this.letter].includes(squares)) {
                    if(Array.isArray(emoji)) {
                        div.innerHTML = emoji[random(emoji.length)];
                    } else {
                        div.innerHTML = emoji;
                    }
                }
                this.div.appendChild(div);
                squares += 1;
            }
            return this;
        } else {
            return new Error('Please only use alphabetical or numeric characters and spaces');
        }
    }
}