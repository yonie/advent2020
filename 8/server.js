var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('8/input')
    //input: require('fs').createReadStream('8/test')
});

var code = []

lineReader.on('line', function (line) {

    code.push(line)

})

lineReader.on('close', function () {

    console.log("code lines in file:", code.length)

    // -- PART ONE --

    console.log("running code into loop to find accumulator value..")
    runCode(code, true)

    // -- PART TWO --

    // we will now modify the code single line every time
    for (var n = 0; n < code.length; n++) {

        // make a new copy of the code
        var copiedCode = [...code]

        // replace one line in the copy
        if (copiedCode[n].substring(0, 3) == 'nop') copiedCode[n] = "jmp " + copiedCode[n].split(' ')[1]
        else if (copiedCode[n].substring(0, 3) == 'jmp') copiedCode[n] = "nop " + copiedCode[n].split(' ')[1]

        // run the new copy and see if it ran
        var result = runCode(copiedCode)
        if (result > -1) console.log("answer2", result)
    }

})

function runCode(programCode, debug) {

    var linesRun = []
    var accumulator = 0

    for (var cursor = 0; cursor < programCode.length; cursor++) {

        // if we run into the same line again, we are in a loop so stop
        if (linesRun[cursor]) {
            if (debug) console.log("loop detected. accumulator value was", accumulator)
            break
        }

        // save our run code
        linesRun[cursor] = true

        // parse 
        var operation = programCode[cursor].substring(0, 3)
        var argument = Number(programCode[cursor].split(' ')[1])

        // run code
        if (operation == 'acc') accumulator += argument
        if (operation == 'jmp') cursor += argument - 1
        if (operation == 'nop') continue

    }

    // exit with accumulator value if we exit the program successfully, otherwise -1
    if (cursor == code.length) return accumulator
    else return -1

}