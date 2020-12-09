import LineReaderSync from 'line-reader-sync';

const numSearch = (bpRow, frontChar) => {
    const numRows = 2 ** bpRow.length;
    let minRow = 0, maxRow = numRows-1;

    for (let i = 0; i < bpRow.length; i++) {
        maxRow = (bpRow[i] === frontChar) ? minRow + Math.floor((maxRow-minRow)/2) : maxRow;
        minRow = (bpRow[i] === frontChar) ? minRow : minRow + Math.ceil((maxRow-minRow)/2);
    }

    return minRow;
}

const getSeatIDs = (boardingPasses) => {
    
    var row = 0, col = 0;
    var rowSeq = '', colSeq = '';
    var IDs = [];

    boardingPasses.forEach(pass => {
        rowSeq = pass.match(/[FB]+/)[0];
        colSeq = pass.match(/[LR]+/)[0];
        row = numSearch(rowSeq, 'F');
        col = numSearch(colSeq, 'L');
        IDs.push(row*8+col);
    });
    
    return IDs;
}

export const highestSeatID = (inputFile) => {
    const lrs = new LineReaderSync(inputFile);
    const boardingPasses = lrs.toLines();
    const IDs = getSeatIDs(boardingPasses);
    var maxID = 0;

    for(var i = 0; i < IDs.length; i++) {
        maxID = (IDs[i] > maxID) ? IDs[i] : maxID;
    }

    return maxID;
}

export const findEmptySeat = (inputFile) => {
    const lrs = new LineReaderSync(inputFile);
    const boardingPasses = lrs.toLines();
    const IDs = getSeatIDs(boardingPasses);
    var seatID = 0;

    IDs.sort((a, b) => a - b);

    for(var i = 0; i < IDs.length-1; i++) {
        if(IDs[i+1] == (IDs[i]+2)) {
            return IDs[i]+1;
        }
    }

    return -1;
}