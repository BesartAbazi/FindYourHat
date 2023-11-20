const prompt = require('prompt-sync')({sigint: true});
const readline = require('readline');

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.field = [];
    }

    print(){
        for (let i = 0; i < this.height; i++){
            console.log(this.field[i].join(''));
        }
    }

    getRandomField(){
        const randomField = Math.floor(Math.random() * 6);
        switch (randomField){
            case 0: return hat;
            case 1: return fieldCharacter;
            case 2: return hole;
            case 3: return fieldCharacter;
            case 4: return fieldCharacter;
            case 5: return fieldCharacter;
        }
    }

    generateField(){
        for (let i = 0; i < this.height; i++){
            this.field[i] = [];
            for (let j = 0; j < this.width; j++){
                this.field[i].push(this.getRandomField());
            }
        }
    }
}

const playGame = (fieldWidth, fieldHeight) => {
    const myField = new Field(fieldWidth, fieldHeight);
    myField.generateField();
    myField.print();
}

const myInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

myInterface.question('Field size. Width: ', (width) => {
    const fieldWidth = width;

    myInterface.question('Field size. Height: ', (height) => {
        const fieldHeight = height;
        myInterface.close();

        playGame(fieldWidth, fieldHeight);
    });
});
