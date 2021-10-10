class SodokuBlock {
    isSolved;
    value;
    possibilities = [];

    rowNumber;
    colNumber;

    constructor(isSolved, value) {
        this.isSolved = isSolved;
        this.value = value;
    }
}

export default SodokuBlock;