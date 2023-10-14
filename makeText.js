/** Command-line tool to generate Markov text. */
const fs = require('fs');
const markov = require('./markov');
const process = require('process');
const axios = require('axios');

// make text
function genText(text){
    let mm = new markov.MarkovMachine(text);
    console.log(mm.makeText());
}

// read file and make text
function makeText(path){
    fs.readFile(path, 'utf8', function(err, data){
        if (err){
            console.log(`Error reading ${path}: ${err}`);
            process.exit(1);
        } else {
            genText(data);
        }
    })
}

// read url and make text
async function makeURLText(url){
    try {
        const res = await axios.get(url);
    } catch (err){
        console.log(`Error reading URL: ${url}, ${err}`);
        process.exit(1);
    }
    genText(res.data);
}

if (process.argv[2] === 'file'){
    makeText(process.argv[3]);
} else if (process.argv[2] === 'url'){
    makeURLText(process.argv[3]);
} else {
    console.log(`Error processing text.`);
    process.exit(1)
}