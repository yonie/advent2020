var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('5/input')
    //input: require('fs').createReadStream('5/test')
});

var input = []
var plane = []

lineReader.on('line', function (line) {

    input.push(line)

})

lineReader.on('close', function () {

    console.log("boarding cards in file:", input.length)

    var answer = 0

    input.forEach(function (pass) {
        seatID = getSeatID(pass)
        if (seatID > answer) answer = seatID
    })

    console.log("answer", answer)
    console.log(plane)

})

function getSeatID(pass) {

    var id

    var rows = pass.substring(0,7)
    var columns = pass.substring(7)

    rows = rows.split('F').join('0')
    rows = rows.split('B').join('1')

    columns = columns.split('R').join('1')
    columns = columns.split('L').join('0')

    row = binaryStringToInt(rows)
    column = binaryStringToInt(columns)
    
    // calculate seatID
    seatID = ((row * 8)+column)

    // fill the plane
    if (plane[row]==null) plane[row] = []
    plane[row][column]=seatID

    return seatID

}

function binaryStringToInt(binaryString) {

    var result = 0
    var counter = 1

    for (i=binaryString.length-1;i>=0;i--)
    {
        if (binaryString.charAt(i)=='1') result = result + counter
        counter = counter * 2
    }

    return result
}