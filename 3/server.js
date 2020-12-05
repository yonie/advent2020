var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('3/input')
    //input: require('fs').createReadStream('3/test')
});

var input = []

lineReader.on('line', function (line) {

    input.push(line)

})

lineReader.on('close', function () {

    console.log("lines in file:", input.length)

    // PART 1

    var answer1 =  calculateTrees(input,3,1)
    console.log("answer 1: " + answer1)

    // PART 2
    var answer2 = (calculateTrees(input,1,1)*calculateTrees(input,3,1)*calculateTrees(input,5,1)*calculateTrees(input,7,1)*calculateTrees(input,1,2))
    console.log("answer 2: "+answer2)



})

function calculateTrees(puzzle,stepsX,stepsY) {

    // process input
    var puzzlewidth = puzzle[0].length
    var puzzleheight = puzzle.length

    // store answer
    var answer = 0
    
    // starting cursor for x
    var xPos = 0

    // we start at heightY because its our first traversal down 
    for(var height=stepsY;height<puzzleheight;height=height+stepsY) {

        // loop back x cursor
        xPos = (xPos + stepsX) % puzzlewidth 

        // see if we hit a tree
        if (puzzle[height].charAt(xPos)=='#') answer++
    }

    return answer
}