import LineReaderSync from 'line-reader-sync';

const buildGroupDeclarations = (strInput) => {
    var groupDecs = [], curDec = '', partySize = 0;
    
    for(var i = 0; i < strInput.length; i++) {
        curDec = '';
        partySize = 0;
        while(!(/^\r$/.test(strInput[i])) && i < strInput.length) {
            curDec += (i == strInput.length-1)
                ? `${strInput[i]}`
                : `${strInput[i].substring(0, strInput[i].length-1)}`;
            partySize++;
            i++;
        }
        groupDecs.push({
            partySize: partySize,
            decs: curDec.split('')
        });
    }

    return groupDecs;
}

const countUniqueYes = (groupDeclaration) => {
    return groupDeclaration.filter((thisOne, i, arr) => arr.indexOf(thisOne) === i) // filter to unique chars
            .length; // return the length
}

export const sumUniqueDeclarations = (inputFile) => {
    const lrs = new LineReaderSync(inputFile);
    const individualDeclarations = lrs.toLines();
    const groupDeclarations = buildGroupDeclarations(individualDeclarations);
    var totalYes = 0;

    groupDeclarations.forEach(dec => {
        totalYes += countUniqueYes(dec.decs) 
    })

    return totalYes;
}

const countUnanimousYes = (groupDeclaration) => {
    const sortedDecs = groupDeclaration.decs.sort();
    const {partySize} = groupDeclaration;

    if(partySize === 1) {
        return sortedDecs.length;
    } else {
        var unanimousYes = 0;

        sortedDecs.forEach((yes, i) => {
            if(sortedDecs[i+partySize-1] === sortedDecs[i]) {
                unanimousYes++;
            }
        })

        return unanimousYes;
    }
}

export const sumUnanimousDeclarations = (inputFile) => {
    const lrs = new LineReaderSync(inputFile);
    const individualDeclarations = lrs.toLines();
    const groupDeclarations = buildGroupDeclarations(individualDeclarations);
    var totalUnanimousYes = 0;

    groupDeclarations.forEach(dec => {
        totalUnanimousYes += countUnanimousYes(dec) 
    })

    return totalUnanimousYes;
}