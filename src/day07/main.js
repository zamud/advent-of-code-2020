import LineReaderSync from 'line-reader-sync';

const buildContains = (strContains) => {

    let cleanedContains = strContains.map(con => {
        return con
            .replace(' bags.', '')
            .replace(' bag.', '')
            .replace(' bags', '')
            .replace(' bag', '')
            .replace('\r','')
    })

    return (cleanedContains[0] === 'no other') 
        ? null 
        : cleanedContains.map(con => {
            return {
                color: `${con.split(' ')[1]} ${con.split(' ')[2]}`,
                quantity: con.split(' ')[0]
            }
    })
}

const buildRules = (strRules) => {
    return strRules.map(str => {
        let color = str.split(' contain ')[0].split(' bags')[0];
        let strContains = str.split(' contain ')[1].split(', ');
        let contains = buildContains(strContains);

        return {
            color,
            contains
        }
    })
}

const connectRules = (rules) => {
    return rules.map(rule => {
        let thisColor = rule.color;
        let containedBy = [];
        
        rules.forEach(othRule => {
            if(othRule.contains) {
                othRule.contains.forEach(con => {
                    if(con.color === thisColor) {
                        containedBy.push(othRule.color);
                    }
                })
            }
        })

        return {
            ...rule,
            containedBy
        }
    })
}

const getColorRule = (rules, color) => {
    return rules.filter(rule => rule.color === color)[0];
}

const countPossibleBags = (rules, color) => {
    const thisColor = getColorRule(rules, color);
    var count = 0, theQueue = [], dequeued = {}, bags = [];
    theQueue.push(thisColor);

    while(theQueue.length > 0) {
        dequeued = theQueue.shift();
        // Add bags containing dequeued to the queue
        dequeued.containedBy.forEach(color => {
            theQueue.push(getColorRule(rules, color))
        })
        // If dequeued isn't already in bag list, add it
        if(!bags.filter(bag => bag.color === dequeued.color)[0]) {
            bags.push(dequeued);
        }
    }
    
    // Subtract 1 because original bag was added
    return bags.length-1;
}

export const countBagColor = (inputFile, color) => {
    const lrs = new LineReaderSync(inputFile);
    const strRules = lrs.toLines();
    const rules = buildRules(strRules);
    const connRules = connectRules(rules);

    return countPossibleBags(connRules, color);
}

const totalBags = (rules, color) => {
    const thisColor = getColorRule(rules, color);
    var count = 0, theQueue = [], dequeued = {}, bags = [];
    theQueue.push(thisColor);

    while(theQueue.length > 0) {
        dequeued = theQueue.shift();

        if(dequeued.contains != null) {
            // Add bags contained by dequeued to the queue
            dequeued.contains.forEach(bag => {
                for(let i = 0; i < bag.quantity; i++) {
                    theQueue.push(getColorRule(rules, bag.color))
                }
            })
        }
        count++;
    }

    return count-1;
}

export const countTotalBags = (inputFile, color) => {
    const lrs = new LineReaderSync(inputFile);
    const strRules = lrs.toLines();
    const rules = buildRules(strRules);
    const connRules = connectRules(rules);

    return totalBags(connRules, color);
}