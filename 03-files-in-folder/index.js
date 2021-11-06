const fs = require('fs')
const path = require('path');

const folderPath = path.join(__dirname, '/secret-folder');

fs.readdir(folderPath, {withFileTypes: true}, (err, files) => {
    if (err) {
        throw err;
    }

    for (let file of files) {
        if (!file.isDirectory())  {
            const { ext, name } = path.parse(file.name);

            fs.stat(path.join(folderPath, file.name), (err, stats) => {
                if (err) {
                    throw  err;
                }
                console.log(`${name} - ${ext.slice(1)} - ${(stats.size/1024).toFixed(3)}kb`);
            });
        }
    }
});

