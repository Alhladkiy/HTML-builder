const fs = require('fs');
const path = require('path');

const templatePath = path.join(__dirname, '/template.html');
const newFolderPath = path.join(__dirname, '/project-dist');
const newFolderPathAssets = path.join(__dirname, '/project-dist/assets');

const newFilePathStyle = path.join(__dirname, '/project-dist/style.css');
const newFilePathIndex = path.join(__dirname, '/project-dist/index.html');
const folderPathAssets = path.join(__dirname, '/assets');
const folderPathComponents = path.join(__dirname, '/components');

const readStreamTemplate = fs.createReadStream(templatePath);



// const file = fs.createWriteStream('bundle.css');

fs.mkdir(newFolderPath, {recursive: true}, (err) => {
    if (err) {
        throw err;
    } 

    fs.mkdir(newFolderPathAssets, {recursive: true}, (err) => {
        if (err) {
            throw err;
        }
    });

    fs.writeFile(newFilePathStyle, '', (err) => {
        if (err) {
            throw err;
        }
    });

    fs.writeFile(newFilePathIndex, '', (err) => {
        if (err) {
            throw err;
        }

        readStreamTemplate.on('data', (data) => {
            const regExp =  /{{([^]*?)}}/;
            const promisesArray = [];
            let template = data.toString();
            let templateToUpdate = template;
            let matchRes = template.match(regExp);

            while (matchRes !== null) {
                const tag = matchRes[1]
                const textToReplace = matchRes[0];
                const startIndex = matchRes.index;

                templateToUpdate = templateToUpdate.slice(startIndex +  textToReplace.length);
                matchRes = templateToUpdate.match(regExp);

                const promise = new Promise((resolve, reject) => {
                    const readStream = fs.createReadStream(path.join(folderPathComponents, `${tag}.html`), 'utf-8');
                    readStream.on('data', (chunk) => {
                        resolve({
                            textToReplace,
                            markup: chunk
                        });
                    });
                });

                promisesArray.push(promise);
            }
            
            Promise.all(promisesArray).then(res => {
                res.forEach((x) => {
                    template = template.replace(x.textToReplace, x.markup);
                })

                const writeStream = fs.createWriteStream(path.join(newFilePathIndex));

                writeStream.write(template);
            })
        });     
    });
});
