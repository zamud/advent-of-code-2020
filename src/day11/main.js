import LineReaderSync from 'line-reader-sync';

const buildSeatGrid = (inputFile) => {
    const lrs = new LineReaderSync(inputFile);
    const strInput = lrs.toLines().map(str => str.replace('\r',''));
    var grid = [], gridRow = [];

    strInput.forEach(str => {
        gridRow = [];
        for(var i = 0; i < str.length; i++) {
            gridRow.push(str[i])
        }
        grid.push(gridRow);
    })

    return grid;
    
}

const simulate = (grid) => {
    var bottomEdge = grid.length-1, rightEdge = grid[0].length-1;
    var nextGrid = [], adjacent = [], thisRow = [], numOccupied = 0;
    
    for(var x = 0; x <= rightEdge; x++) {
        thisRow = [];
        for(var y = 0; y <= bottomEdge; y++) {
            if(grid[x][y] != '.') {
                adjacent = [];
                numOccupied = 0;
                if(x-1>=0 && y-1>=0) adjacent.push(grid[x-1][y-1]);
                if(x>=0 && y-1>=0) adjacent.push(grid[x][y-1]);
                if(x+1<=rightEdge && y-1>=0) adjacent.push(grid[x+1][y-1]);
                if(x+1<=rightEdge && y>=0) adjacent.push(grid[x+1][y]);
                if(x+1<=rightEdge && y+1<=bottomEdge) adjacent.push(grid[x+1][y+1]);
                if(x>=0 && y+1<=bottomEdge) adjacent.push(grid[x][y+1]);
                if(x-1>=0 && y+1<=bottomEdge) adjacent.push(grid[x-1][y+1]);
                if(x-1>=0 && y>=0) adjacent.push(grid[x-1][y]);
                adjacent.forEach(seat => {
                    numOccupied += (seat === '#') ? 1 : 0
                })
                // console.log(`seat (${x},${y}) has ${numOcscupied} occupied neighbors`)
                if(grid[x][y] === 'L') thisRow.push((numOccupied === 0) ? '#' : 'L');
                if(grid[x][y] === '#') thisRow.push((numOccupied >= 4) ? 'L' : '#');
            } else {
                thisRow.push('.');
            }
        }
        nextGrid.push(thisRow);
    }

    nextGrid.forEach((row, i) => {
        grid[i] = [...row];
    })
}

const areIdentical = (prev, cur) => {
    if(prev.length !== 0) {
        for (var x = 0; x < prev[0].length; x++) {
            for(var y = 0; y < prev.length; y++) {
                if(prev[x][y] != cur[x][y]) return false;
            }
        }
    } else {
        return false;
    }
    return true;
}

export const countStableOccupied = (inputFile) => {
    var curGrid = buildSeatGrid(inputFile);
    var prevSnapshot = [], numOccupied = 0;

    while(!areIdentical(prevSnapshot, curGrid)) {
        prevSnapshot = [...curGrid];
        simulate(curGrid);
    }

    curGrid.forEach(row => {
        row.forEach(seat => {
            if(seat === '#') numOccupied++;
        })
    })

    return numOccupied;
}