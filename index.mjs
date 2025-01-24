import { DiceGame } from "./DiceGame.mjs";
import { ProbabilityTable } from "./ProbabilityTable.mjs";
import { parseDiceArguments } from "./utils/index.mjs";
import { validateInputData } from "./validate.mjs";

const args = process.argv.slice(2);
validateInputData(args);

const userDiceOptions = parseDiceArguments(args);

ProbabilityTable.setDices(userDiceOptions);

const game = new DiceGame(userDiceOptions);
game.startGame();