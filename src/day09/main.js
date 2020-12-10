import LineReaderSync from 'line-reader-sync';

const buildDataArr = (inputFile) => {
    const lrs = new LineReaderSync(inputFile);
    const strData = lrs.toLines();

    return strData.map(str => {
        return parseInt(str.replace('\r',''));
    })
}

const initSums = (data, windowLength) => {
    let sums = [];
    
    for(var i = 0; i < windowLength-1; i++) {
        for(var j = i+1; j < windowLength; j++) {
            if(data[i] != data[j]) {
                sums.push({
                    ind1: i,
                    ind2: j,
                    sum: data[i]+data[j]
                });
            }
        }
    }

    return sums;
}

const removeFromSums = (indToRemove, sums) => {
    return sums.filter(sum => sum.ind1 != indToRemove )
}

const addToSums = (sums, data, windowLength, newInd) => {
    const newVal = data[newInd];
    for(var i = newInd-windowLength; i < newInd; i++) {
        sums.push({
            ind1: i,
            ind2: newInd,
            sum: data[i]+newVal
        });
    }
}

const checkSums = (sums, num) => {

    for(var i = 0; i < sums.length; i++) {
        if(sums[i].sum === num) {
            return true;
        }
    }

    return false;
}

export const findFirstInvalid = (inputFile, windowLength) => {
    const data = buildDataArr(inputFile);
    var sums = initSums(data, windowLength);

    for(var i = windowLength; i < data.length; i++) {
        if(checkSums(sums, data[i]) === false) {
            return data[i];
        }
        sums = removeFromSums(i-windowLength, sums);
        addToSums(sums, data, windowLength, i)
    }

    return -1;
    
}

export const crackTheCode = (inputFile, windowLength) => {
    const data = buildDataArr(inputFile);
    const target = findFirstInvalid(inputFile, windowLength);
    var curNums = [];
    var curSum = 0, j = 0;

    for(var i = 0; i < data.length; i++) {
        curSum = 0;
        curNums = [];
        j = i;
        while(curSum < target && j < data.length) {
            curSum += data[j]
            curNums.push(data[j]);
            if(curSum == target && curNums.length > 1) {
                return Math.min(...curNums) + Math.max(...curNums);
            }
            j++;
        }
    }

    return -1

}