const fs = require('fs');

function invertJson(json) {
    let invertedJson = {};

    for (let key in json) {
        let value = json[key];

        if (invertedJson[value]) {
            invertedJson[value].push(key);
        } else {
            invertedJson[value] = [key];
        }
    }

    return invertedJson;
}

fs.readFile('ambiguous-formatted.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    let json = JSON.parse(data);
    let invertedJson = invertJson(json["_common"]);

    fs.writeFile('output.json', JSON.stringify(invertedJson, null, 2), (err) => {
        if (err) {
            console.error('Error writing file:', err);
        } else {
            console.log('Inverted JSON has been written to output.json');
        }
    });
});
