import readline from 'readline';
import { ProbabilityTable } from './ProbabilityTable.mjs';

const MIN_INPUT_VALUE = 0;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const commandHandlers = {
    'x': () => process.exit(),
    '?': () => {
        console.log(ProbabilityTable.showTable());
        return 'help';
    },
    'default': (answer, maxInputValue) => {
        const value = parseInt(answer, 10);
        if (isNaN(value) || value < MIN_INPUT_VALUE || value > maxInputValue) {
            console.log(`Invalid input. Please enter a number between ${MIN_INPUT_VALUE} and ${maxInputValue}.`);
            return getUserValue(maxInputValue);
        }
        return value;
    }
};

const getUserValue = (maxInputValue) => {
    return new Promise((resolve) => {
        rl.question('Your selection: ', (answer) => {
            answer = answer.trim();
            const handler = commandHandlers[answer] || ((ans) => commandHandlers['default'](ans, maxInputValue));
            const result = handler(answer);
            if (result instanceof Promise) {
                result.then(resolve);
            } else {
                resolve(result);
            }
        });
    });
};

const guessFirstMoveMenu = () => {
    const maxInputValue = 1;
    showFirstMoveOptionsMenu();
    showCommandOptionsMenu();
    return getUserValue(maxInputValue);
}

const showFirstMoveOptionsMenu = () => {
    console.log("0: 0");
    console.log("1: 1");
}

const showCommandOptionsMenu = () => {
    console.log("X - exit");
    console.log("? - help");
    console.log("Please select an option:");
};

const getPlayerDiceChoice = (dices) => {
    let options = 'Choose your dice:\n';
    dices.forEach((dice, i) => options += `${i}: ${dice.join(', ')}\n`);
    console.log(options);
    showCommandOptionsMenu();
    return getUserValue(dices.length - 1);
}

const playerThrow = () => {
    const maxInputValue = 5;
    Array.from({ length: maxInputValue + 1 }).forEach((_, i) => {
        console.log(`${i}: ${i}`);
    });
    showCommandOptionsMenu();
    return getUserValue(maxInputValue);
}

export { guessFirstMoveMenu, getPlayerDiceChoice, playerThrow };