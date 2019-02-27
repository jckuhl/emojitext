export default class Letter {
    constructor(letter) {
        this.width = 8;
        this.letter = letter.toUpperCase();
        this.div = document.createElement('div');
        this.div.style.display = 'grid';
        this.div.style.gridTemplateColumns = `repeat(${this.width}, 1fr)`;
        this.div.style.gridTemplateRows = `repeat(${this.width}, 1fr)`;
        this.div.style.width = 10*8 + 'px';
        this.div.style.height = 10*8 + 'px';
    }

    attachTo(parent) {
        parent.appendChild(this.div);
    }

    convert(emoji, plots) {
        if(Object.keys(plots).includes(this.letter)) {
            if(this.letter === ' ') {
                return this;
            }
            let squares = 0;
            while(squares < this.width ** 2) {
                let div = document.createElement('div');
                div.style.width = '10px';
                div.style.height = '10px';
                if(plots[this.letter].includes(squares)) {
                    div.innerHTML = emoji;
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