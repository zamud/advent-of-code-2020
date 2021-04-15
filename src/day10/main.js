import LineReaderSync from 'line-reader-sync';

const buildAdapterList = (inputFile) => {
    const lrs = new LineReaderSync(inputFile);
    var adapters = lrs.toLines().map(line => {
        return parseInt(line.replace('\r',''));
    });

    adapters.sort((a,b) => a-b);
    adapters.unshift(0);
    adapters.push(adapters[adapters.length-1]+3);

    return adapters;
}

export const countAdapterDiff = (inputFile) => {
    var adapters = buildAdapterList(inputFile);
    var diff = 0, count1 = 0, count3 = 0;

    for(var i = 0; i < adapters.length-1; i++) {
        diff = adapters[i+1]-adapters[i];
        if (diff === 3) {
            count3++;
        } else if (diff === 1) {
            count1++;
        }
    }

    return count1*count3;
}

// const countValidPermutations = (arrSeg) => {
//     var count = 0;

//     for(var i = 0; i < arrSeg.length-1; i++) {
//         for(var j = i+1; j < arrSeg.length; j++) {
//             if(arrSeg[j]-arrSeg[i] <= 2) count++;
//         }
//     }

//     console.log(`perms for ${arrSeg} -- ${count}`)
//     return count;
// }

// export const countAdapterArrangements = (inputFile) => {
//     var adapters = buildAdapterList(inputFile);
//     var numArr = 0, permutations = [];

//     for(var i = 0; i < adapters.length-3; i += 4) {
//         permutations.push(countValidPermutations(adapters.slice(i,i+4)))
//     }

//     return numArr;
// }