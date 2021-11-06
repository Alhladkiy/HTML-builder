const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, '/files');
const newFolderPath = path.join(__dirname, '/files-copy');

fs.mkdir(newFolderPath, {recursive: true}, (err) => {
    if (err) {
        throw err;
    }

    fs.readdir(folderPath, {withFileTypes: true}, (err, files) => {
        if (err) {
            throw err;
        }
        for (let file of files) {
            if (!file.isDirectory()) {
                fs.copyFile(path.join(folderPath, file.name), path.join(newFolderPath, file.name), (err) => {
                    if (err) {
                        throw err;
                    }
                });
            }
        }
    });
});