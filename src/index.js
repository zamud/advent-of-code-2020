import { twoSum2020Product, threeSum2020Product } from './day01/main.js';
import { countValidSledPasswords, countValidTobogganPasswords } from './day02/main.js'
import { howManyTrees } from './day03/main.js'
import { countValidPassports }  from './day04/main.js'
import { highestSeatID,findEmptySeat } from './day05/main.js'
import { sumUniqueDeclarations, sumUnanimousDeclarations } from './day06/main.js'
import { countBagColor, countTotalBags } from './day07/main.js'
import { accBeforeLoop, accWithoutLoop } from './day08/main.js'
import { crackTheCode, findFirstInvalid } from './day09/main.js';
import { countAdapterDiff } from './day10/main.js';
import { countStableOccupied } from './day11/main.js'
import { findManhattanDist, findManhattanDistUsingWaypoint } from './day12/main.js';
import { earliestDeparture, earliestSequentialDeparture } from './day13/main.js';
import { sumMemoryVals } from './day14/main.js';
import { findNthInPattern } from './day15/main.js';
import { getErrorRate, multDepartureFields } from './day16/main.js';

console.log("**************************************")
console.log("Welcome to Rick's 2020 Advent of Code!")
console.log("**************************************")

// DAY 1
// console.log(twoSum2020Product('../resources/day01/input.txt'));
// console.log(threeSum2020Product('../resources/day01/input.txt'));

// DAY 2
// console.log(countValidSledPasswords('../resources/day02/input.txt'))
// console.log(countValidTobogganPasswords('../resources/day02/input.txt'))

// DAY 3
// console.log(`${howManyTrees('../resources/day03/input.txt', 3, 1)}`);
/* console.log(`${howManyTrees('../resources/day03/input.txt', 1, 1) *
               howManyTrees('../resources/day03/input.txt', 3, 1) *
               howManyTrees('../resources/day03/input.txt', 5, 1) *
               howManyTrees('../resources/day03/input.txt', 7, 1) *
               howManyTrees('../resources/day03/input.txt', 1, 2)}`); */

// DAY 4
// console.log(countValidPassports('../resources/day04/input.txt'));

// DAY 5
// console.log(highestSeatID('../resources/day05/input.txt'));
// console.log(findEmptySeat('../resources/day05/input.txt'));

// DAY 6
// console.log(sumUniqueDeclarations('../resources/day06/input.txt'));
// console.log(sumUnanimousDeclarations('../resources/day06/input.txt'));

// DAY 7
// console.log(countBagColor('../resources/day07/test-input.txt', 'shiny gold'));
// console.log(countTotalBags('../resources/day07/test-input.txt', 'shiny gold')) --> TODO

// DAY 8
// console.log(accBeforeLoop('../resources/day08/input.txt'));
// console.log(accWithoutLoop('../resources/day08/input.txt'));

// DAY 9
// console.log(findFirstInvalid('../resources/day09/input.txt', 25));
// console.log(crackTheCode('../resources/day09/input.txt', 25));

// DAY 10
// console.log(countAdapterDiff('../resources/day10/input.txt'));
// console.log(countAdapterArrangements('../resources/day10/test-input.txt')); --> TODO

// DAY 11
// console.log(countStableOccupied('../resources/day11/input.txt')) --> TODO

// DAY 12
//console.log(findManhattanDist('../resources/day12/input.txt'))
//console.log(findManhattanDistUsingWaypoint('../resources/day12/input.txt'))

// DAY 13
//console.log(earliestDeparture('../resources/day13/input.txt'))
//console.log(earliestSequentialDeparture('../resources/day13/input.txt')); --> Brute forced - runtime WAY too long

// DAY 14
// console.log(sumMemoryVals('../resources/day14/input.txt'))

// DAY 15
// console.log(findNthInPattern('../resources/day15/input.txt', 2020))
// console.log(findNthInPattern('../resources/day15/input.txt', 30000000)) --> runtime WAY too long

// DAY 16
//console.log(getErrorRate('../resources/day16/input.txt'))
console.log(multDepartureFields('../resources/day16/input.txt'))