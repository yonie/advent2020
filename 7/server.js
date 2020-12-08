var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('7/input')
    //input: require('fs').createReadStream('7/test')
});

var rules = []
var bagsWithParents = []
var bagsWithChildren = []

lineReader.on('line', function (line) {

    rules.push(line)

})

lineReader.on('close', function () {

    console.log("rules in file:", rules.length)

    // we're building both parent->child and child->parent arrays at the same time
    rules.forEach(function (rule) {

        // some input parsing for the rules: container bags + containts
        var containerBag = rule.split(" bags contain")[0]
        var containts = rule.split(" bags contain")[1].substring(1).replace(/[0-9] /g, "").replace(/ bag[s]?[.]?/g, "").split(", ")
        var containtsWithAmounts = rule.split(" bags contain")[1].substring(1).replace(/ bag[s]?[.]?/g, "").split(", ")

        // initialize parent->child array 
        bagsWithChildren[containerBag] = []

        if (containts.length < 1) return

        // initialize child->parent array
        containts.forEach(function (bag) {
            if (!bagsWithParents[bag]) bagsWithParents[bag] = []
            bagsWithParents[bag].push(containerBag)
        })

        // add children into parent->child array
        containtsWithAmounts.forEach(function (bag) {
            if (bag != "no other") bagsWithChildren[containerBag].push(bag)
        })
    })

    // some voodoo to count unique colors required for first answer
    console.log("answer", [...new Set(findBagParents("shiny gold"))].length)

    console.log("answer 2", findBagChildren("shiny gold"))

})

function findBagParents(color) {

    if (!color) return

    var result = []

    // iterate our lookup array if it contains parents
    if (bagsWithParents[color]) bagsWithParents[color].forEach(function (parentColor) {

        // first, add each parent color itself
        result.push(parentColor)

        // then add its parents recursively
        result = result.concat(findBagParents(parentColor))

    })

    return result
}

function findBagChildren(color) {

    // we are counting and returning an amount of bags 
    var n = 0

    // iterate our lookup array if it contains children
    if (bagsWithChildren[color]) bagsWithChildren[color].forEach(function (child) {

        // first count the current amounts (eg 3 black bags)
        var amount = Number(child.charAt(0))

        // then, also add the children multiplied by the same amount
        var childColor = child.substring(2)
        n = n + amount + (amount * findBagChildren(childColor))
    })

    return n
}