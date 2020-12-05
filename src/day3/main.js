import LineReaderSync from 'line-reader-sync';

export const howManyTrees = (inputFile, numOver, numDown) => {
    const lrs = new LineReaderSync(inputFile);
    const strInput = lrs.toLines();
    let resetAt = strInput[0].length-1;
    let i = 0, j = 0, totalOver = 0, numTrees = 0;

    while(i < strInput.length-1) {
        i += numDown;
        totalOver += numOver;
        j = totalOver % resetAt;
        
        if (strInput[i].charAt(j) == '#') numTrees++;
    }

    return numTrees;
}

export default {howManyTrees};

