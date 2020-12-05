var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('4/input')
    //input: require('fs').createReadStream('4/test')
});

var input = []
var n = 0

lineReader.on('line', function (line) {

    // collect separate lines into single line passports
    if (line == "") n++
    input[n] = (input[n] ? input[n] + " " : "") + line

})

lineReader.on('close', function () {

    console.log("passports in file:", input.length)

    var answer = 0
    var answer2 = 0
    input.forEach(function (passport) {
        if (checkValid(passport)) answer++
        if (checkValidStrict(passport)) answer2++
    })
    console.log("answer", answer)
    console.log("answer2", answer2)

})

function checkValid(passport) {

    if (passport.indexOf("byr") == -1) return false
    if (passport.indexOf("iyr") == -1) return false
    if (passport.indexOf("eyr") == -1) return false
    if (passport.indexOf("hgt") == -1) return false
    if (passport.indexOf("hcl") == -1) return false
    if (passport.indexOf("ecl") == -1) return false
    if (passport.indexOf("pid") == -1) return false

    return true
}

function checkValidStrict(passport) {

    // basic check first
    if (!checkValid(passport)) return false

    // strict checks
    var fields = passport.split(" ")
    var passportData = []
    fields.forEach(function (field) {
        var key = field.split(':')[0]
        var value = field.split(':')[1]
        passportData[key] = value
    })

    if (passportData.byr < 1920 || passportData.byr > 2002) return false
    if (passportData.iyr < 2010 || passportData.iyr > 2020) return false
    if (passportData.eyr < 2020 || passportData.eyr > 2030) return false
    if (!(passportData.hgt.endsWith("in") || passportData.hgt.endsWith("cm"))) return false
    if (passportData.hgt.endsWith("cm")) {
        var cm = passportData.hgt.split("cm")[0]
        if (cm < 150 || cm > 193) return false
    }
    if (passportData.hgt.endsWith("in")) {
        var inch = passportData.hgt.split("in")[0]
        if (inch < 59 || inch > 76) return false
    }
    if (passportData.hcl.length != 7 || ("" + passportData.hcl).search(/#[a-f0-9]{6}/) == -1) return false
    if (!(passportData.ecl == "amb" || passportData.ecl == "blu" || passportData.ecl == "brn" || passportData.ecl == "gry" || passportData.ecl == "grn" || passportData.ecl == "hzl" || passportData.ecl == "oth")) return false
    if (passportData.pid.length != 9 || ("" + passportData.pid).search(/[0-9]{9}/) == -1) return false

    return true
}