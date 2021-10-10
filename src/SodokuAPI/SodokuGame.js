import Board from "./Board";
import SodokuBlock from "./SodokuBlock";

class SodokuGame {
    board;
    groups;

    constructor(sizeOfBoardN) {
        if (sizeOfBoardN < 9) {
            const errMsg = "Error initiating board, board too small. Must have a min size of 9";
            console.error(errMsg);
            throw new Error(errMsg);
        }
        if (sizeOfBoardN % 3 !== 0) {
            const errMsg = "Size of board must be a multiple of 3";
            console.log(errMsg);
            throw new Error("Size of board must be a multiple of 3");
        }

        this.board = new Board(sizeOfBoardN);
    }



    populateBoard(values) {
        this.groups = {};

        const copiedValues = [...values];
        copiedValues.reverse();

        let tmpRowNum = 0;
        for (let row of this.board.rows) {
            for (let i = 0; i < row.length; i++) {
                if (copiedValues.length === 0) {
                    break;
                }
                const currentInsertValue = copiedValues[copiedValues.length - 1];

                if (currentInsertValue === "unsolved") {
                    row[i] = new SodokuBlock(false, undefined);
                    row[i].rowNumber = tmpRowNum;
                    row[i].colNumber = i;
                    copiedValues.pop();
                    continue;
                }

                row[i] = new SodokuBlock(true, currentInsertValue);
                row[i].rowNumber = tmpRowNum;
                row[i].colNumber = i;
                copiedValues.pop();
            }
            tmpRowNum++;
        }

        //console.debug("Finished populating", this.board.rows);

        let currentTarget1 = 0;
        let currentTarget2 = 1;
        let currentTarget3 = 2;

        const groupPrefix = "grp";
        let startName = 1;

        let copyOfRows = [];
        for (let row of this.board.rows) {
            const newArr = [];

            for (let item of row) {
                newArr.push(item);
            }

            copyOfRows.push(newArr);
        }

        //console.debug("Copying over rows to avoid mutating", this.groups);

        while (true) {
            if (copyOfRows[currentTarget1].length === 0) {
                currentTarget1 = currentTarget1 + 3;
                currentTarget2 = currentTarget2 + 3;
                currentTarget3 = currentTarget3 + 3;
            }

            if (copyOfRows[currentTarget1] === null || copyOfRows[currentTarget1] === undefined) {
                break;
            }

            let val1 = copyOfRows[currentTarget1].pop();
            let val2 = copyOfRows[currentTarget1].pop();
            let val3 = copyOfRows[currentTarget1].pop();
            let val4 = copyOfRows[currentTarget2].pop();
            let val5 = copyOfRows[currentTarget2].pop();
            let val6 = copyOfRows[currentTarget2].pop();
            let val7 = copyOfRows[currentTarget3].pop();
            let val8 = copyOfRows[currentTarget3].pop();
            let val9 = copyOfRows[currentTarget3].pop();
            const tempArray = [val1, val2, val3, val4, val5, val6, val7, val8, val9];
            this.groups[groupPrefix + "-" + startName] = tempArray;

            startName++;

        }

        //console.debug("Finished grouping segments", this.groups);

        for (let groupKey of Object.keys(this.groups)) {
            let group = this.groups[groupKey];
            const tmpGroupNumbers = new Set();

            for (const sodokuBlock of group) {
                if (sodokuBlock.isSolved === true) {
                    tmpGroupNumbers.add(sodokuBlock.value);
                }
            }

            this.groups[groupKey] = { value: group, groupNumbersNotAllowed: tmpGroupNumbers };
        }

        //console.debug("Finished modifying group segments, numbers not allowed by group", this.groups);


        for (let groupKey of Object.keys(this.groups)) {
            const group = this.groups[groupKey].value;
            const notAllowedInGroup = this.groups[groupKey].groupNumbersNotAllowed;

            for (let sodokoBlock of group) {
                if (sodokoBlock.isSolved === true) {
                    continue;
                }
                const tmpSetNotAllowedHorizontalVertical = new Set();

                // rows not allowed
                for (let i = 0; i < this.board.rows.length; i++) {
                    tmpSetNotAllowedHorizontalVertical.add(this.board.rows[i][sodokoBlock.colNumber].value);
                }

                // col not allowed
                for (let j = 0; j < this.board.rows.length; j++) {
                    tmpSetNotAllowedHorizontalVertical.add(this.board.rows[sodokoBlock.rowNumber][j].value);
                }

                const combinedSetNotAllowed = new Set([...notAllowedInGroup.keys(), ...tmpSetNotAllowedHorizontalVertical.keys(), ...tmpSetNotAllowedHorizontalVertical.keys()]);

                const possibities = [];

                for (let i = 1; i <= 9; i++) {
                    if (!combinedSetNotAllowed.has(i)) {
                        possibities.push(i);
                    }
                }

                sodokoBlock.possibities = possibities;
            }
        }
    }

    printGroups() {
        console.debug("Printing groups verbosely");
        for (let groupKey of Object.keys(this.groups)) {
            const group = this.groups[groupKey].value;

            for (let sodokoBlock of group) {
                console.log(sodokoBlock);
            }
        }
    }

    get unsolvedSodokuBlocks() {
        console.debug("Getting unsolved blocks");
        const unsolvedSodokuBlocks = [];

        for (let groupKey of Object.keys(this.groups)) {
            const group = this.groups[groupKey].value;

            for (let sodokoBlock of group) {
                if (sodokoBlock.isSolved !== true) {
                    unsolvedSodokuBlocks.push(sodokoBlock);
                }
            }
        }

        return unsolvedSodokuBlocks;
    }

}

export default SodokuGame;