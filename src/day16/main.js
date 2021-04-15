import LineReaderSync from 'line-reader-sync';

const buildRules = (rules) => {
    rules.forEach((rule, i) => {
        let name = rule.split(': ')[0];
        let ranges = rule.split(': ')[1].replace('\r','').split(' or ');
        let valid = [];

        ranges.forEach(range => {
            let start = parseInt(range.split('-')[0]);
            let end = parseInt(range.split('-')[1]);
            for(var i = start; i <= end; i++) {
                valid.push(i);
            }
        })

        rules[i] = {name, valid}
    })
}

const buildRulesAndTickets = (inputFile) => {
    const lrs = new LineReaderSync(inputFile);
    const strRulesAndTickets = lrs.toLines();
    var rules = [], myTicket = [], nearbyTickets = [], i = 0, endRules = false, endMyTicket = false;

    while(i < strRulesAndTickets.length && endRules == false) {
        if(strRulesAndTickets[i] === '\r') {
            endRules = true;
        } else {
            rules.push(strRulesAndTickets[i])
        }
        i++;
    }

    buildRules(rules);

    while(i < strRulesAndTickets.length && endMyTicket == false) {
        if(strRulesAndTickets[i] === '\r') {
            endMyTicket = true;
        } else if (strRulesAndTickets[i].includes('your') === false) {
            myTicket = strRulesAndTickets[i].replace('\r','').split(',').map(str => parseInt(str));
        }
        i++;
    }

    while(i < strRulesAndTickets.length) {
        if (strRulesAndTickets[i].includes('nearby') === false) {
            nearbyTickets.push(strRulesAndTickets[i].replace('\r','').split(',').map(str => parseInt(str)));
        }
        i++;
    }
    
    return {rules, myTicket, nearbyTickets}
}

export const getErrorRate = (inputFile) => {
    const rulesAndTickets = buildRulesAndTickets(inputFile);
    const {rules, nearbyTickets} = rulesAndTickets;
    var allValidNums = [], errorRate = 0;

    rules.forEach(rule => {
        allValidNums = allValidNums.concat(rule.valid);
    })

    nearbyTickets.forEach(ticket => {
        ticket.forEach(num => {
            if(!allValid.includes(num)){
                errorRate += num;
            }
        })
    })

    return errorRate;
}

const isTicketValid = (allValidNums, ticket) => {

    for(var i = 0; i < ticket.length; i++) {
        if(!allValidNums.includes(ticket[i])){
            return false;
        }
    }

    return true;

}

const notAll1 = (arr) => {
    for(var i = 0; i < arr.length; i++) {
        if(arr[i].length > 1) return true;
    }
    return false;
}

export const multDepartureFields = (inputFile) => {
    const rulesAndTickets = buildRulesAndTickets(inputFile);
    const {rules, myTicket, nearbyTickets} = rulesAndTickets;
    var allValidNums = [], validTickets = [], numsByField = [], possibilitiesByField = [];

    rules.forEach(rule => {
        allValidNums = allValidNums.concat(rule.valid);
    })

    validTickets = nearbyTickets.filter(ticket => isTicketValid(allValidNums, ticket));

    validTickets.forEach(ticket => {
        ticket.forEach((num, i) => {
            if(numsByField[i] === undefined) {
                numsByField[i] = [num];
            } else {
                if(numsByField[i].includes(num) === false){
                    numsByField[i].push(num);
                }
            }
        })
    })

    numsByField.forEach((field, i) => {
        rules.forEach(rule => {
            let intersection = rule.valid.filter(num => field.includes(num));
            if(intersection.length === field.length) {
                if(possibilitiesByField[i] === undefined) {
                    possibilitiesByField[i] = [rule.name];
                } else {
                    possibilitiesByField[i].push(rule.name);
                }
            }
        })
    })

    while(notAll1(possibilitiesByField)) {
        for(var i = 0; i < possibilitiesByField.length; i++) {
            if(possibilitiesByField[i].length === 1) {
                let removedRule = possibilitiesByField[i][0];
                for(var j = 0; j < possibilitiesByField.length; j++) {
                    if(j != i) {
                        possibilitiesByField[j] = possibilitiesByField[j].filter(rule => rule !== removedRule)
                    }
                }
            }
        }
    }

    var answer = 1;

    myTicket.forEach((num, i) => {
        if(possibilitiesByField[i][0].includes('departure')){
            answer *= num;
        }
    })

    return answer;

}