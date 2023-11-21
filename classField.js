class Field {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.field = [];
        this.posX = 0;
        this.posY = 0;
        this.hatCounter = 0;
        this.hat = '^';
        this.hole = 'O';
        this.fieldCharacter = '░';
        this.pathCharacter = '*';
    }

    print() {
        console.clear();

        process.stdout.write('Hat counter: ' + this.hatCounter + '\n\n');

        for (let i = 0; i < this.height; i++) {
            console.log(this.field[i].join(''));
        }
        process.stdout.write('');
    }

    getRandomField() {
        const randomField = Math.floor(Math.random() * 8);
        switch (randomField) {
            case 0: return this.hat;
            case 1: return this.hole;
            default: return this.fieldCharacter;
        }
    }

    generateField() {
        for (let i = 0; i < this.height; i++) {
            this.field[i] = [];
            for (let j = 0; j < this.width; j++) {
                this.field[i].push(this.getRandomField());
            }
        }

        this.field[0][0] = this.pathCharacter;
    }
}

module.exports = { Field };