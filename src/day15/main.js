import LineReaderSync from 'line-reader-sync';

const numberAge = (spoken, target) => {
    var mostRecent = null, secondMostRecent = null, i = spoken.length-1;

    while(secondMostRecent === null && i >= 0) {
        if(spoken[i] === target) {
            if(mostRecent === null) {
                mostRecent = i;
            } else {
                secondMostRecent = i;
            }
        }
        i--;
    }

    return (mostRecent === null || secondMostRecent === null) ? -1 : mostRecent-secondMostRecent;
}

export const findNthInPattern = (inputFile, n) => {
    const lrs = new LineReaderSync(inputFile);
    const startingNums = lrs.toLines()[0]
        .replace('\r','')
        .split(',')
        .map(str => parseInt(str));
    var spoken = {};
    startingNums.forEach((num,i) => {
        spoken[num] = [i];
    })
    var age = 0, lastSpoken = 0, turnsSpoken = [];

    for(var i = Object.keys(spoken).length; i < n; i++) {
        lastSpoken = Object.keys(spoken).find(key => spoken[key].includes(i-1));
        
        // look up when this has been spoken before
        turnsSpoken = spoken[lastSpoken];

        if(turnsSpoken.length < 2) {
            // insert a 0
            if(Object.keys(spoken).includes('0')) {
                spoken['0'].push(i);
            } else {
                spoken['0'] = [i];
            }
        } else {
            // insert the age
            age = turnsSpoken[turnsSpoken.length-1] - turnsSpoken[turnsSpoken.length-2];
            if(Object.keys(spoken).includes(age.toString())) {
                spoken[age].push(i);
            } else {
                spoken[age] = [i];
            }
        }
    }

    lastSpoken = Object.keys(spoken).find(key => spoken[key].includes(i-1));
    return lastSpoken;
}