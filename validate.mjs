const MIN_ARGS_LENGTH = 3;
const REQUIRED_DICE_LENGTH = 6;
const MIN_DICE_NUMBER = 1;
const MAX_DICE_NUMBER = 9;

const validateArgsLength = (args) => {
    if (args.length < MIN_ARGS_LENGTH) {
        console.error("Error: Provide at least 3 strings, each containing 6 comma-separated integers.");
        console.error("Example: node index.mjs '1,2,3,4,5,6' '7,8,9,1,2,3' '4,5,6,7,8,9'");
        process.exit(1);
    }
};

const validateDiceLength = (diceValues, arg) => {
    if (diceValues.length !== REQUIRED_DICE_LENGTH) {
        console.error(`Error: Each string must contain exactly ${REQUIRED_DICE_LENGTH} comma-separated integers. Found: ${arg}`);
        process.exit(1);
    }
};

const validateDiceIsInteger = (value, arg) => {
    if (!Number.isInteger(Number(value))) {
        console.error(`Error: Each value must be an integer. Found: ${value} in string "${arg}"`);
        process.exit(1);
    }
};

const validateDiceValueRange = (value, arg) => {
    const intValue = Number(value);
    if (intValue > MAX_DICE_NUMBER || intValue < MIN_DICE_NUMBER) {
        console.error(`Error: Each value must be between ${MIN_DICE_NUMBER} and ${MAX_DICE_NUMBER}. Found: ${value} in string "${arg}"`);
        process.exit(1);
    }
};

const validateDiceValues = (diceValues, arg) => {
    for (let value of diceValues) {
        validateDiceIsInteger(value, arg);
        validateDiceValueRange(value, arg);
    }
};

const validateInputData = (inputStrings) => {
    validateArgsLength(inputStrings);

    for (let arg of inputStrings) {
        const diceValues = arg.split(',');
        validateDiceLength(diceValues, arg);
        validateDiceValues(diceValues, arg);
    }
};

export { validateInputData };