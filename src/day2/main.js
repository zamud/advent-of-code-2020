import LineReaderSync from 'line-reader-sync';

export const countValidSledPasswords = (inputFile) => {
    const lrs = new LineReaderSync(inputFile);
    const strInput = lrs.toLines();

    const input = strInput.map((line, i) => {
        let lineVals = line.split(' ');
        let minOccr = lineVals[0].split('-')[0];
        let maxOccr = lineVals[0].split('-')[1];
        let keyLetter = lineVals[1].substring(0, 1);
        let password = (i == strInput.length - 1) ? lineVals[2] : lineVals[2].substring(0, lineVals[2].length-1)

        return {
            keyLetter: keyLetter,
            minOccr: minOccr,
            maxOccr: maxOccr,
            password: password
        };
    });

    let numValid = 0;

    input.forEach((pwdCriteria) => {
        let {minOccr, maxOccr, keyLetter, password} = pwdCriteria;
        let numOccr = password.split(keyLetter).length-1;
        if (numOccr >= minOccr && numOccr <= maxOccr) numValid++;
    })

    return numValid;
}

export const countValidTobogganPasswords = (inputFile) => {
    const lrs = new LineReaderSync(inputFile);
    const strInput = lrs.toLines();

    const input = strInput.map((line, i) => {
        let lineVals = line.split(' ');
        let index1 = parseInt(lineVals[0].split('-')[0]) - 1;
        let index2 = parseInt(lineVals[0].split('-')[1]) - 1;
        let forbiddenLetter = lineVals[1].substring(0, 1);
        let password = (i == strInput.length - 1) ? lineVals[2] : lineVals[2].substring(0, lineVals[2].length-1)

        return {
            forbiddenLetter: forbiddenLetter,
            index1: index1,
            index2: index2,
            password: password
        };
    });

    let numValid = 0;

    input.forEach((pwdCriteria) => {
        let {forbiddenLetter, index1, index2, password} = pwdCriteria;
        let letter1 = password.charAt(index1);
        let letter2 = password.charAt(index2);
        if ((letter1 == forbiddenLetter && letter2 != forbiddenLetter) || 
            (letter1 != forbiddenLetter && letter2 == forbiddenLetter)) numValid++;
    })

    return numValid;
}

export default {countValidSledPasswords, countValidTobogganPasswords}