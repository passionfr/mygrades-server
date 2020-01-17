var fs = require('fs');

// From https://github.com/ponyesteves/tsv-parser/blob/master/src/index.js
const _objWithFirstAsHeader = (rowAry) => {
    _objWithFirstAsHeader.header = _objWithFirstAsHeader.header || rowAry
    return rowAry.reduce((p, c, i) => ({ [_objWithFirstAsHeader.header[i]]: c, ...p }), {})
}

universityDefinitionsFolder = './src/api/universities'
universityDatabasePath = './src/api/hochschulkompass-alle-hochschulen.tsv'

outputFolder = './dist'

universityDefinitions = fs.readdirSync(universityDefinitionsFolder);

universities = fs.readFileSync(universityDatabasePath, { encoding: 'utf-8' }).split('\n').map(row => row.split('\t')).map(_objWithFirstAsHeader)

universitiesAPIArray = []
universities.shift()
universities.forEach((uni, index) => {
    realIndex = index + 1;

    if (universityDefinitions.map(d => d.split(".")[0]).includes(realIndex.toString())) {
        uniDef = JSON.parse(fs.readFileSync(universityDefinitionsFolder + "/" + realIndex + ".json"))
        universitiesAPIArray.push({
            "university_id": realIndex,
            "published": true,
            "name": uni["Hochschulname"],
            "updated_at_server": currentDate(),
            "rules": uniDef.rules.map(rule => {
                return {
                    "rule_id": rule.rule_id,
                    "name": rule.name,
                    "university_id": rule.university_id,
                    "type": rule.type
                }
            })
        })
    } else {
        // universitiesAPIArray.push({
        //     "university_id": realIndex,
        //     "published": false,
        //     "name": uni["Hochschulname"],
        //     "updated_at_server": currentDate(),
        // })
    }
})

fs.writeFileSync(outputFolder + "/" + 'universities.json', JSON.stringify(universitiesAPIArray))
subFolder = 'universities'
if (!fs.existsSync(outputFolder + "/" + subFolder)) {
    fs.mkdirSync(outputFolder + "/" + subFolder);
}
universityDefinitions.forEach(def => {
    fs.writeFileSync(outputFolder + "/" + subFolder + "/" + def, fs.readFileSync(universityDefinitionsFolder + "/" + def, { encoding: "utf-8" }))
})



function currentDate() {
    date = new Date("2020-01-10 22:50:56")
    return date.getFullYear() + "-" + ((date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1).toString()) : (date.getMonth() + 1)) + "-" + (date.getDate() < 10 ? ("0" + date.getDate().toString()) : date.getDate()) + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
}