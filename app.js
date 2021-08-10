const express = require('express')
const app = express()
var xlsx = require('node-xlsx').default;
var AdmZip = require('adm-zip');
require('./model/tables');

app.get('/', (req, res)=>{
    const workSheetsFromFile = xlsx.parse(`${__dirname}/Прайс LBS 27.07.xlsx`);
    console.log(workSheetsFromFile[0].data); //length 9
    var zip = new AdmZip(`${__dirname}/Прайс LBS 27.07.xlsx`);
    zip.extractEntryTo("xl/media/", `${__dirname}/media`, /*maintainEntryPath*/false, /*overwrite*/true);
    res.end('hi')
}) 

app.get('/a', (req, res)=>{

    res.end('12321')
})
app.listen(3000)