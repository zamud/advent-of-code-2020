import LineReaderSync from 'line-reader-sync';

const buildDirections = (inputFile) => {
    const lrs = new LineReaderSync(inputFile);

    return lrs.toLines().map(line => {
        return {
            mov: line.match(/^[NSEWLRF]/)[0],
            num: parseInt(line.match(/[0-9]+/)[0])
        }
    })
}

const rotateFerry = (ferry, direction) => {
    const dirs = ['N', 'E', 'S', 'W']
    const curFacing = dirs.indexOf(ferry.facing);
    var numTurns = 0;
    if(direction.mov === 'L') {
        numTurns = -1*direction.num/90;
    } else {
        numTurns = direction.num/90;
    }

    const facingAfterTurn = curFacing+numTurns;

    ferry.facing = (facingAfterTurn >= 0)
        ? dirs[facingAfterTurn%4]
        : dirs[4+facingAfterTurn]
}

const moveFerry = (coordinates, direction) => {

    const directionToMove = (direction.mov === 'F') ? coordinates.facing : direction.mov

    switch(directionToMove) {
        case 'E':
            coordinates.horizontal+=direction.num;
            break;
        case 'S':
            coordinates.vertical-=direction.num;
            break;
        case 'W':
            coordinates.horizontal-=direction.num;
            break;
        case 'N':
            coordinates.vertical+=direction.num;
            break;
        default:
            break;
    }
}

export const findManhattanDist = (inputFile) => {
    const directions = buildDirections(inputFile);
    var coordinates = {
        facing: 'E',
        horizontal: 0,
        vertical: 0
    }

    directions.forEach(dir => {
        if(dir.mov === 'L' || dir.mov === 'R') {
            rotateFerry(coordinates, dir);
        } else {
            moveFerry(coordinates, dir);
        }
    })

    return Math.abs(coordinates.horizontal) + Math.abs(coordinates.vertical)
}


const rotateWaypoint = (waypoint, dir) => {
    var numTurns = dir.num/90, curVert = 0, curHoriz = 0;

    switch(dir.mov) {
        case 'R':
            for(var i = 0; i < numTurns; i++) {
                curVert = waypoint.vertFromShip;
                curHoriz = waypoint.horizFromShip;
                waypoint.horizFromShip = curVert;
                waypoint.vertFromShip = -1*curHoriz;
            }
            break;
        case 'L':
            for(var i = 0; i < numTurns; i++) {
                curVert = waypoint.vertFromShip;
                curHoriz = waypoint.horizFromShip;
                waypoint.horizFromShip = -1*curVert;
                waypoint.vertFromShip = curHoriz;
            }
            break;
        default:
            break;
    }
}

const moveWaypoint = (waypoint, dir) => {
    switch(dir.mov) {
        case 'E':
            waypoint.horizFromShip+=dir.num;
            break;
        case 'S':
            waypoint.vertFromShip-=dir.num;
            break;
        case 'W':
            waypoint.horizFromShip-=dir.num;
            break;
        case 'N':
            waypoint.vertFromShip+=dir.num;
            break;
        default:
            break;
    }
}

const goForward = (ferry, waypoint, numMoves) => {
    ferry.totHoriz += (waypoint.horizFromShip*numMoves);
    ferry.totVert += (waypoint.vertFromShip*numMoves);
}

export const findManhattanDistUsingWaypoint = (inputFile) => {
    const directions = buildDirections(inputFile);
    var ferry = {
        totHoriz: 0,
        totVert: 0
    };
    var waypoint = {
        horizFromShip: 10,
        vertFromShip: 1,
    };

    directions.forEach(dir => {
        if(dir.mov === 'L' || dir.mov === 'R') {
            rotateWaypoint(waypoint, dir);
        } else if (dir.mov === 'F') {
            goForward(ferry, waypoint, dir.num);
        } else {
            moveWaypoint(waypoint, dir)
        }
    })

    return Math.abs(ferry.totHoriz) + Math.abs(ferry.totVert)
}