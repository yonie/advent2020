var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('2/input')
    //	input: require('fs').createReadStream('2/test')
});

var passwordPolicies = []

lineReader.on('line', function (line) {

    passwordPolicies.push(line)

})

lineReader.on('close', function () {

    console.log("lines in file:", passwordPolicies.length)

    var answer = 0

    passwordPolicies.forEach(function (passwordPolicy) {
        var split = passwordPolicy.split(':')
        var policy = split[0]
        var password = split[1]
        console.log(policy, password)
        var character = policy.split(' ')[1]
        var minAmount = policy.split('-')[0]
        var maxAmount = policy.split('-')[1].split(' ')[0]
        var charCount = password.split(character).length - 1
        console.log(character, minAmount, maxAmount, charCount)
        if (charCount >= minAmount && charCount <= maxAmount) {
            answer++
        }
    })

    console.log("answer", answer)

    var answer2 = 0

    passwordPolicies.forEach(function (passwordPolicy) {
        var split = passwordPolicy.split(':')
        var policy = split[0]
        var password = split[1]
        console.log(policy, password)
        var character = policy.split(' ')[1]
        var firstPos = policy.split('-')[0]
        var secondPos = policy.split('-')[1].split(' ')[0]

        var firstChar = password.charAt(firstPos)
        var secondChar = password.charAt(secondPos)

        if (firstChar == character && secondChar != character) answer2++
        else if (firstChar != character && secondChar == character) answer2++
    })

    console.log("answer2", answer2)

})