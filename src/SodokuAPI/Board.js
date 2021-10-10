/*
    A board is a data structure that is essentially a 2-D array.
    The board's length is the same as its width, so we require only
    one dimension, sideLength. The board is essentially a square.
*/
class Board {
    #rows; // the rows that comprise the board
    #sideLength; //the Side measurement of the board
    constructor(n) {
        this.#rows = new Array(n);
        for (let i = 0; i < this.#rows.length; i++) {
            this.#rows[i] = (new Array(n));
        }
        this.#sideLength = n;
    }

    getRowAtIndex(rowIndex) {
        return this.#rows[rowIndex];
    }

    get rows() {
        return this.#rows;
    }

    get sideLength() {
        return this.#sideLength;
    }
}

export default Board;