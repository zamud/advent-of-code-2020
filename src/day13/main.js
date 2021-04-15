import LineReaderSync from 'line-reader-sync';

const buildItinerary = (inputFile) => {
    const lrs = new LineReaderSync(inputFile);

    return {
        earliest: parseInt(lrs.toLines()[0].replace('\r','')),
        ids: lrs.toLines()[1].split(',').filter(val => val !== 'x').map(num => parseInt(num))
    }

}

export const earliestDeparture = (inputFile) => {
    const itinerary = buildItinerary(inputFile);
    var waits = {}, waitTime = 0, earliestBusId = 0;

    itinerary.ids.forEach(num => {
        let departure = 0
        while(departure < itinerary.earliest) {
            departure += num;
        }
        waits[num] = departure-itinerary.earliest;
    })

    waitTime = Object.values(waits).sort((a,b) => a-b)[0];
    earliestBusId = Object.keys(waits).find(key => waits[key] === waitTime);

    return waitTime*earliestBusId;
}

const buildIDs = (inputFile) => {
    const lrs = new LineReaderSync(inputFile);

    return lrs.toLines()[1].split(',').map(val => {
       return (val === 'x') ? 'x' : parseInt(val);
    });

}

const checkSequence = (times) => {
    const startTime = times[0];
    
    for(var i = 0; i < times.length; i++) {
        if(typeof times[i] === "number" && times[i]-i !== startTime) {
            return false;
        }
    }
    return true;
}

const incrementSequence = (times, ids) => {
    var j = 0;
    //find the next time they're in order
    for(var i = 0; i < times.length-1; i++){
        j = i+1;
        while(typeof times[j] !== 'number'){
            j++;
        }
        while(times[i] <= times[j]) {
            times[i] += ids[i];
        }
        while(times[j] <= times[i]) {
            times[j] += ids[j];
        }
    }
    // get them as close as possible
    for(var i = times.length; i > 0; i--){
        j = i-1;
        while(typeof times[j] !== 'number'){
            j--;
        }
        while(times[j]+ids[j] < times[i]) {
            times[j]+=ids[j];
        }
    }
}

export const earliestSequentialDeparture = (inputFile) => {
    const ids = buildIDs(inputFile);
    var times = [...ids];

    while(!checkSequence(times)) {
        incrementSequence(times, ids);
    }

    return times[0];
}