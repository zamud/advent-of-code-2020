import LineReaderSync from 'line-reader-sync';
import fs from 'fs';

const buildCommands = (inputFile) => {
    const lrs = new LineReaderSync(inputFile);
    const strCommands = lrs.toLines();
    var commands = [];

    strCommands.forEach(str => {
        commands.push({
            cmd: str.split(' ')[0],
            num: parseInt(str.split(' ')[1].replace('\r','')),
            hit: false
        });
    });

    return commands;
}


const runCommands = (commands) => {
    
    let nextCommand = commands[0], j = 0, acc = 0;

    while(nextCommand.hit === false) {
        let {cmd, num} = nextCommand;
        nextCommand.hit = true;
        switch(cmd) {
            case 'acc':
                acc += num;
                j++;
                break;
            case 'jmp':
                j += num;
                break;
            default:
                j++;
                break;
        }
    
        nextCommand = ( j >= 0 && j < commands.length) ? commands[j] : {cmd: 'STOP', hit: true}
    }

    commands.forEach(cmd => {
        cmd.hit = false;
    })

    return {
        acc,
        success: (j < commands.length) ? false : true 
    }
}


export const accBeforeLoop = (inputFile) => {
    const commands = buildCommands(inputFile); 
    return runCommands(commands).acc;
}

export const accWithoutLoop = (inputFile) => {
    const commands = buildCommands(inputFile);

    var i = 0;

    while(i < commands.length) {
        switch(commands[i].cmd) {
            case 'jmp':
                commands[i].cmd = 'nop';
                var {success, acc} = runCommands(commands);
                if(success) {
                    return acc;
                } else {
                    commands[i].cmd = 'jmp';
                }
                break;
            case 'nop':
                commands[i].cmd = 'jmp';
                var {success, acc} = runCommands(commands);
                if(success) {
                    return acc;
                } else {
                    commands[i].cmd = 'nop';
                }
                break;
            default:
                break;
        }
        i++;
    }
}