import LineReaderSync from 'line-reader-sync';

const buildStrPassports = (strInput) => {
    var strPassports = [], curStr = '', curPassport = '';
    
    for(var i = 0; i < strInput.length-1; i++) {
        curStr = '';
        curPassport = '';
        while(strInput[i].length > 1 && i < strInput.length-1) {
            curStr += ` ${strInput[i].substring(0, strInput[i].length-1)}`;
            i++;
        }
        strPassports.push(curStr.substring(1, curStr.length));
    }
    strPassports[strPassports.length-1] += ` ${strInput[i-1]}`;

    return strPassports;
}

const buildPassports = (strPassports) => {
    var passports = [];
    var attrs = [];
    var key = '', val = '';

    strPassports.forEach(str => {
        let thisPassport = new Object();
        attrs = str.split(" ");
        attrs.forEach(attr => {
            key = attr.split(":")[0];
            val = attr.split(":")[1];
            thisPassport[key] = val;
        })
        passports.push(thisPassport);
    })

    return passports;
}

const isBYRValid = (byr) => {
    let year = parseInt(byr);
    return (year >= 1920 && year <= 2002) ? true : false;
}

const isIYRValid = (iyr) => {
    let year = parseInt(iyr);
    return (year >= 2010 && year <= 2020) ? true : false;
}

const isEYRValid = (eyr) => {
    let year = parseInt(eyr);
    return (year >= 2020 && year <= 2030) ? true : false;
}

const isHGTValid = (hgt) => {
    let unit = hgt.substring(hgt.length-2, hgt.length);
    let num = parseInt(hgt.substring(0, hgt.length-2));
    if(unit == 'cm') {
        return (num >= 150 && num <= 193) ? true : false;
    } else if(unit == 'in') {
        return (num >= 59 && num <= 76) ? true : false;
    } else {
        return false;
    }
}

const isHCLValid = (hcl) => {
    return /^#[a-f0-9]{6}$/.test(hcl) ? true : false;
}

const isECLValid = (ecl) => {
    return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(ecl) ? true : false;
}

const isPIDValid = (pid) => {
    return /^\d{9}$/.test(pid) ? true : false;
}

const isValid = (passport) => {
    let {byr, iyr, eyr, hgt, hcl, ecl, pid} = passport;

    if(byr && iyr && eyr && hgt && hcl && ecl && pid) {
        return (isBYRValid(byr) && isECLValid(ecl) && isEYRValid(eyr) && isHCLValid(hcl) && isHGTValid(hgt) && isIYRValid(iyr) && isPIDValid(pid)) ? true : false
    } else {
        return false;
    }
}

export const countValidPassports = (inputFile) => {
    var numValid = 0;
    const lrs = new LineReaderSync(inputFile);
    const strInput = lrs.toLines();
    const strPassports = buildStrPassports(strInput);
    const passports = buildPassports(strPassports);

    passports.forEach(passport => {
        if(isValid(passport)) numValid++;
    });

    return numValid;
}