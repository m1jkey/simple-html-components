'use strict';

const fs = require('fs');
const dir = 'include', // all include HTML files
    input = 'layout.html',
    output = 'index.html'; // final output HTML file

let importFile = (dir, input, output) => {
    fs.readFile(`${dir}/${input}`, {encoding: 'utf8'}, (err, data) => {
        if (err) throw err;
        
        // replace <link rel="import" href="header.html"> to the content of href file
        let dataReplace = data.replace(/<link\srel="import"\shref="(.*)">/gi, (matches, path) => {
            return fs.readFileSync(`${dir}/${path}`, {encoding: 'utf8'});
        });

        fs.writeFile(output, dataReplace, {encoding: 'utf8'}, (err) => {
            if (err) throw err;
            console.log(`${output} success created`);
        });
    });
};

importFile(dir, input, output);

fs.watch(dir, (e, filename) => {
    console.log(e);
    if (e === 'change') {
        console.log(`${dir}/${filename} has changed, rebuilding...`);
        importFile(dir, input, output);
    }
});
