var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('6/input')
    //input: require('fs').createReadStream('6/test')
});

var input = []
var n = 0

lineReader.on('line', function (line) {

    // collect separate lines into single line answer groups "ab aa ac"
    if (line == "") n++
    input[n] = (input[n] ? input[n] + " " : "") + line

})

lineReader.on('close', function () {

    console.log("groups in file:", input.length)

    var answer = 0
    var answer2 = 0

    input.forEach(function (group) {
        answer = answer + uniqueChars(group).length
        answer2 = answer2 + countAllAnswered(group)

    })

    console.log("answer", answer)
    console.log("answer2", answer2)

})

function uniqueChars(input) {
    var uniqueChars = "";
    for (var n = 0; n < input.length; n++) {

        if (uniqueChars.indexOf(input.charAt(n)) == -1 && input.charAt(n) != " ") {
            uniqueChars += input[n];
        }
    }

    return uniqueChars
}

function countAllAnswered(group) {
    var persons = group.split(" ")
    var answers = []
    var answersToCount = 0

    persons.forEach(function (answerSet) {

        // iterate each person's answers and populate "answers" counter matrix
        for (var n = 0; n < answerSet.length; n++) {
            var answer = answerSet.charAt(n)
            if (answers[answer] > 0) {
                answers[answer]++
            } else answers[answer] = 1

            // if we find all persons have answered, we should count this specific answer
            if (answers[answer] == persons.length) answersToCount++

        }
    })

    return answersToCount
}