# dice-game

Console application dice game.

### Game Mechanics

1. **Dice Selection**: The user and the computer will select different dice configurations.
2. **Fair Random Generation**: The computer generates a cryptographically secure random key and uses it to produce a random number. The HMAC of this number is displayed to the user for verification.
3. **User Input**: The user selects a number based on the displayed HMAC, and the computer reveals its generated number and the secret key.
4. **Result Calculation**: The final result is calculated using modular arithmetic based on the user’s and computer’s selections.
5. **Winning Conditions**: The player with the higher roll wins the game.

### Game Process

The first step of the game is to determine who makes the first move. The computer generates a random value in the range of 0..1 and shows the HMAC to the user. The user must guess the computer's selection, after which both players choose their dice and make their rolls. The result is determined as the sum of the numbers obtained from the user and the computer using modular arithmetic.

### Help Option

The application includes a help option that displays a table of winning probabilities for each dice pair, helping users understand their chances based on the selected dice.

### How to setup

1. Install node.js: https://nodejs.org/en/ (LTS)
2. Install all dependencies:
   `npm i`

### How to run

Run `index.mjs` file

Example:
```
node index.mjs '1,2,3,4,5,6' '7,8,9,1,2,3' '4,5,6,7,8,9'
```