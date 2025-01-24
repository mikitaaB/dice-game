const parseDiceArguments = diceArgs => diceArgs.map(arg => arg.split(',').map(Number));

export { parseDiceArguments };