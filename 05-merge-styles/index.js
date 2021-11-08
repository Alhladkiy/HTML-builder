const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, '/styles');
const newFolderPath = path.join(__dirname, '/project-dist/bundle.css');

fs.readdir(folderPath, {withFileTypes: true}, (err, files) => {
    if (err) {
        throw err;
    } 
    let cssPromiseArray = [];
    for (let file of files) {
        const isCssFile = path.extname(file.name) === '.css';

        if (!file.isDirectory() && isCssFile) {
            const promise = new Promise((resolve, reject) => {
                const readStream = fs.createReadStream(path.join(folderPath, file.name), 'utf-8');
                readStream.on('data', (chunk) => {
                    resolve(chunk);
                });
            });

            cssPromiseArray.push(promise);
        }

        Promise.all(cssPromiseArray).then(cssContentArray => {
            const writeStream = fs.createWriteStream(path.join(newFolderPath));
            writeStream.write(`${cssContentArray.join('\n')}`)
        });
    }  
});

