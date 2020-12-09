var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('9/input')
    //input: require('fs').createReadStream('9/test')
});

var data = []
var preamble

lineReader.on('line', function (line) {

    // preamble depends on data, is first line in file
    if (line.startsWith("preamble")) preamble = Number(line.split(' ')[1])
    else data.push(Number(line))

})

lineReader.on('close', function () {

    console.log("data lines in file:", data.length)
    console.log("preamble", preamble)

    // -- PART ONE --

    var answer

    for (var pos = preamble; pos < data.length; pos++) {
        if (!(findSum(data.slice(pos - preamble, pos), data[pos]))) answer = data[pos]
    }

    console.log("answer", answer)

    // -- PART TWO --

    console.log("answer 2", findContiguousSet(data, answer))

})

function findSum(dataset, targetvalue) {

    var found = false

    // iterate the data and see if they combine to target value
    dataset.forEach(function (a) {
        dataset.forEach(function (b) {
            if (a == b) return
            if ((a + b) == targetvalue) found = true
        })
    })
    return found
}

function findContiguousSet(dataset, targetvalue) {

    for (var a = 0; a < dataset.length; a++) {

        if (a > targetvalue) continue

        for (var b = 0; b < dataset.length; b++) {

            if (a == b) continue

            if (b > targetvalue) continue

            // loop through a slice of the array and get the sum of values to match target
            var sum = 0
            for (var n = a; n <= b; n++) sum += dataset[n]

            if (sum == targetvalue) {
                // return the highest and lowest found numbers in the slice combined
                var min = Math.min(...dataset.slice(a, b))
                var max = Math.max(...dataset.slice(a, b))
                return (min + max)
            }
        }
    }

    return -1
}