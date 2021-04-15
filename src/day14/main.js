import LineReaderSync from 'line-reader-sync';
import itb from 'int-to-binary';

const buildCmds = (inputFile) => {
    const lrs = new LineReaderSync(inputFile);
    var cmd = "", arg = "", mask = "", num = 0, memLocation = 0;
    var cmds = [];

    lrs.toLines().forEach(line => {
        cmd = line.split(' = ')[0];
        arg = line.split(' = ')[1];

        if(cmd === 'mask') {
            mask = arg.replace('\r','');
        } else {
            memLocation = parseInt(cmd.match(/[0-9]+/)[0]);
            num = itb.unsigned(arg, 36);

            cmds.push({mask, num, memLocation})
        }
    })

    return cmds;
}

const runCommands = (cmds) => {
    var memory = [], val = [], overwriteLoc = 0;

    cmds.forEach(cmd => {
        let {mask, num, memLocation} = cmd;
        val = [];
        for(var i = 0; i < mask.length; i++) {
            if(mask[i] === 'X') {
                val.push(num[i]);
            } else { // overwrite with mask bit
                val.push(mask[i]);
            }
        }

        overwriteLoc = memory.findIndex(memLoc => memLoc.loc === memLocation);

        if(overwriteLoc >= 0) {
            memory[overwriteLoc].num = val.join("");
        } else {
            memory.push({
                loc: memLocation,
                num: val.join("")
            });
        }
    });

    return memory;
}

export const sumMemoryVals = (inputFile) => {
    const cmds = buildCmds(inputFile);
    const memory = runCommands(cmds);
    var sum = 0;

    memory.forEach(mem => {
        for(var i = 0; i < mem.num.length; i++) {
            sum += (mem.num[i] === '1') ? 2**(35-i) : 0;
        }
    })

    return sum;
}