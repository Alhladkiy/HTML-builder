const fs = require('fs');
const path = require('path');

const templatePath = path.join(__dirname, '/template.html');
const newFolderPath = path.join(__dirname, '/project-dist');
const newFolderPathAssets = path.join(__dirname, '/project-dist/assets');

const newFilePathStyle = path.join(__dirname, '/project-dist/style.css');
const newFilePathIndex = path.join(__dirname, '/project-dist/index.html');
const folderPathAssets = path.join(__dirname, '/assets');


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
    fs.writeFile(newFilePathStyle, '', (err) => {
        if (err) {
            throw err;
        } 
    fs.writeFile(newFilePathIndex, '', (err) => {
        if (err) {
            throw err;
        } 
        readStreamTemplate.on('data', (data) => {
            console.log(data.toString());
        }); 
     

        // });
        // fs.readdir(folderPathAssets, {withFileTypes: true}, (err, files) => {
        //     if (err) {
        //         throw err;
        //     }
        //     for (let file of files) {
        //         if (!file.isDirectory()) {
        //             fs.copyFile(path.join(folderPathAssets, file.name), path.join(newFolderPathAssets, file.name), (err) => {
        //                 if (err) {
        //                     throw err;
        //                 }
        //                 console.log(file.name)

        //             });
                    
        //         }
        //     }
      
        // })
    })
    })
    })


})