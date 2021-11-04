const fs = require('fs');
const readline = require('readline');
const path = require('path');

const filePath = path.join(__dirname, '/file.txt');
const rl = readline.createInterface({
    input:  process.stdin,
    output:  process.stdout,
});

fs.writeFile(filePath, '', (err) => {
    if (err) {
        throw err;
    }

    rl.question('Please, enter your text?', (input) => addTextToFile(input));
});

rl.on('line', (input) => addTextToFile(input));
rl.on('close', () => console.log('Thank you for choosing Node.js'));

function addTextToFile(input) {
    if (input === 'exit') {
        rl.close();   
    } else {
        fs.appendFile(filePath, `${input}\n`, err => {
            if (err) {
                console.error(err);
            };
        });
    };
} 
