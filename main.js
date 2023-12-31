const readline = require('readline');
const { Field } = require('./classField');

const myInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


let myField = null;

const walk = (y, x) => {
    const currentPosX = myField.posX;
    const currentPosY = myField.posY;
    myField.posX += x;
    myField.posY += y;
    const newPosX = myField.posX;
    const newPosY = myField.posY;

    myField.field[currentPosX][currentPosY] = myField.fieldCharacter;
    myField.print();

    if (newPosX < 0 || newPosY < 0 || newPosX >= myField.height || newPosY >= myField.width){
        process.stdout.write('\nGame over: Out of field');
        myInterface.close();
        process.exit();
    }
    
    if (myField.field[newPosX][newPosY] === myField.hole){
        process.stdout.write('\nGame over: You fell into a hole');
        myInterface.close();   
        process.exit();
    }
    
    if (myField.field[newPosX][newPosY] === myField.hat)
        myField.hatCounter += 1;
    
    myField.field[newPosX][newPosY] = myField.pathCharacter;
    myField.print();
    
    process.stdout.write('\nChoose a direction via arrow buttons or press "q" to quit: ');
}

const playGame = (input) => {
    /*
        Buffer values for directions:
            left    <Buffer 1b 5b 44>
            right   <Buffer 1b 5b 43>
            up      <Buffer 1b 5b 41>
            down    <Buffer 1b 5b 42>
    */
    if (input.equals(Buffer.from('1b5b44', 'hex')))         // left
        walk(-1, 0);
    else if (input.equals(Buffer.from('1b5b43', 'hex')))    // right
        walk(1, 0);
    else if (input.equals(Buffer.from('1b5b41', 'hex')))    // up
        walk(0, -1);
    else if (input.equals(Buffer.from('1b5b42', 'hex')))    // down
        walk(0, 1);
    else if (input.toString().trim() === 'q'){
        process.stdout.write('\nQuit');
        myInterface.close();
    }
    else
        process.stdout.write('\nWrong entry try again: ');
}

myInterface.question('Field size. Width: ', (width) => {
    const fieldWidth = width;

    myInterface.question('Field size. Height: ', (height) => {
        const fieldHeight = height;

        myField = new Field(fieldWidth, fieldHeight);
        myField.generateField();
        myField.print();

        // Play game
        process.stdout.write('\nChoose a direction via arrow buttons or press "q" to quit: ');
        process.stdin.on(
            'data',
            playGame
        );
    });
});
