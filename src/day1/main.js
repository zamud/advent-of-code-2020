import LineReaderSync from 'line-reader-sync';

export const twoSum2020Product = (inputFile) => {
    const lrs = new LineReaderSync(inputFile);
    const strInput = lrs.toLines();

    let input = strInput.map((val, i) => {
        if (i == strInput.length-1) return parseInt(val)
        else return parseInt(val.substring(0, val.length-1))
    })

    for(let i = 0; i < input.length - 1; i++) {
        for(let j = i+1; j < input.length; j++) {
            if(input[i]+input[j] == 2020) {
                return input[i]*input[j];
            }
        }
    }
}

export const threeSum2020Product = (inputFile) => {
    const lrs = new LineReaderSync(inputFile);
    const strInput = lrs.toLines();

    let input = strInput.map((val, i) => {
        if (i == strInput.length-1) return parseInt(val)
        else return parseInt(val.substring(0, val.length-1))
    })

    for(let i = 0; i < input.length - 2; i++) {
        let first = input[i];
        for(let j = i+1; j < input.length - 1; j++) {
            let second = input[j];
            if(first+second <= 2020) {
                for(let k = j+1; k < input.length; k++) {
                    let third = input[k];
                    if(first+second+third == 2020) return first*second*third
                }
            }
        }
    }
}

export default {twoSum2020Product, threeSum2020Product}