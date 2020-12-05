var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('1/input')
    //	input: require('fs').createReadStream('test')
});

var entries = []

lineReader.on('line', function (line) {

    var input = parseInt(line)
    entries.push(input)

})

lineReader.on('close', function () {

    console.log("lines in file:", entries.length)

    var answer = 0

    entries.forEach(function (entry1) {
        entries.forEach(function (entry2) {
            if (entry1 + entry2 == 2020) answer = (entry1 * entry2)
        })
    })

    console.log("answer", answer)


    var answer2 = 0

    entries.forEach(function (entry1) {
        entries.forEach(function (entry2) {
            entries.forEach(function (entry3) {
                if (entry1 + entry2 + entry3 == 2020) answer2 = (entry1 * entry2 * entry3)
            })
        })
    })

    console.log("answer2", answer2)


})