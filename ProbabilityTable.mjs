import Table from 'ascii-table';

class ProbabilityTable {
    static DICE_COMBINATIONS = 6 * 6;

    static setDices(diceOptions) {
        this.dices = diceOptions;
    }

    static calculateWinProbability(userDice, computerDice) {
        let wins = 0;
        userDice.forEach((userDie) => {
            computerDice.forEach((computerDie) => {
                if (userDie > computerDie) {
                    wins++;
                }
            });
        });
        return (wins / ProbabilityTable.DICE_COMBINATIONS).toFixed(4);
    }

    static showTable() {
        const table = new Table('Probability of the wins for the user:');
        const cols = this.dices.map(diceOption => diceOption.join(','));
        table.setHeading('User dice v', ...cols);

        this.dices.forEach((userDice, i) => {
            const rowData = [userDice.join(',')];
            this.dices.forEach((computerDice, j) => {
                if (i === j) {
                    rowData.push(`- (${(1 / this.dices.length).toFixed(4)})`);
                } else {
                    let prob = this.calculateWinProbability(userDice, computerDice);
                    rowData.push(prob);
                }
            });
            table.addRow(...rowData);
        });

        return table.toString();
    }
}

export { ProbabilityTable };