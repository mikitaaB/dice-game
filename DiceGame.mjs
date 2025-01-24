import { generateFairRandomValue, generateRandomNumber } from "./fairRandomGenerator.mjs";
import { getPlayerDiceChoice, guessFirstMoveMenu, playerThrow } from "./inputHandlers.mjs";

class DiceGame {
    constructor(userDiceOptions) {
        this.userDiceOptions = userDiceOptions;
        this.userDice = null;
        this.computerDice = null;
        this.userThrow = null;
        this.computerThrow = null;
        this.isUserTurn = false;
    }

    async startGame() {
        await this.determineFirstMover();
        await this.chooseDice();
        this.play();
    }

    async determineFirstMover() {
        console.log("Let's determine who makes the first move.");
        const { randomValue: computerValue, key, hmac } = generateFairRandomValue(2);
        console.log(`I selected a random value in the range 0..1 (HMAC=${hmac}).`);

        let userValue;
        do {
            userValue = await guessFirstMoveMenu();
        } while (['help', ''].includes(userValue));

        this.isUserTurn = userValue === computerValue;
        console.log(`My selection: ${computerValue} (Key=${key.toString('hex')}).`);
    }

    async chooseDice() {
        if (this.isUserTurn) {
            await this.chooseUserDice();
            this.chooseComputerDice();
        } else {
            this.chooseComputerDice();
            await this.chooseUserDice();
        }
    }

    async chooseUserDice() {
        let userDiceIdx;
        console.log(this.userDiceOptions)
        do {
            userDiceIdx = await getPlayerDiceChoice(this.userDiceOptions);
        } while (['help', ''].includes(userDiceIdx));

        this.userDice = this.userDiceOptions[userDiceIdx];
        this.userDiceOptions = this.userDiceOptions.filter((_, i) => i !== userDiceIdx);
        console.log(`You choose the [${this.userDice}] dice.`);
    }

    chooseComputerDice() {
        const computerDiceIdx = generateRandomNumber(this.userDiceOptions.length);
        this.computerDice = this.userDiceOptions[computerDiceIdx];
        this.userDiceOptions = this.userDiceOptions.filter((_, i) => i !== computerDiceIdx);
        console.log(this.isUserTurn ? `I choose the [${this.computerDice}] dice.` : `I make the first move and choose the [${this.computerDice}] dice.`);
    }

    async userTurn() {
        console.log("It's time for your throw.");
        const { randomValue: computerValue, key, hmac } = generateFairRandomValue(6);
        console.log(`I selected a random value in the range 0..5 (HMAC=${hmac}).`);
        console.log('Add your number module 6');

        let userValue;
        do {
            userValue = await playerThrow();
        } while (['help', ''].includes(userValue));

        console.log(`My number is ${computerValue} (KEY=${key.toString('hex')}).`);
        const mod = (userValue + computerValue) % 6;
        console.log(`The result is ${userValue} + ${computerValue} = ${mod} (mod 6).`);
        this.userThrow = this.userDice[mod];
        console.log(`Your throw is ${this.userThrow}.`);
    }

    async computerTurn() {
        console.log("It's time for my throw.");
        const { randomValue: computerValue, key, hmac } = generateFairRandomValue(6);
        console.log(`I selected a random value in the range 0..5 (HMAC=${hmac}).`);
        console.log('Add your number module 6');
        let userValue;
        do {
            userValue = await playerThrow();
        } while (['help', ''].includes(userValue));

        console.log(`My number is ${computerValue} (KEY=${key.toString('hex')}).`);
        const mod = (userValue + computerValue) % 6;
        console.log(`The result is ${userValue} + ${computerValue} = ${mod} (mod 6).`);
        this.computerThrow = this.computerDice[mod];
        console.log(`My throw is ${this.computerThrow}.`);
    }

    compareThrows() {
        const compare = (a, b) => (a === b ? 'draw' : a > b ? 'computer' : 'user');
        const results = {
            "draw": `It's a draw (${this.userThrow} = ${this.computerThrow}).`,
            "computer": `I win (${this.userThrow} < ${this.computerThrow}).`,
            "user": `You win (${this.userThrow} > ${this.computerThrow}).`
        };
        const resultKey = compare(this.computerThrow, this.userThrow);
        console.log(results[resultKey]);
        process.exit(0);
    }

    async play() {
        if (this.isUserTurn) {
            await this.userTurn();
            await this.computerTurn();
        } else {
            await this.computerTurn();
            await this.userTurn();
        }

        this.compareThrows();
    }
}

export { DiceGame };