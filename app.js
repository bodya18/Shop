const express = require('express')
const app = express()
var xlsx = require('node-xlsx').default;
var AdmZip = require('adm-zip');
const pool = require('./model/tables');

app.get('/', async (req, res)=>{
    const workSheetsFromFile = xlsx.parse(`${__dirname}/Прайс LBS 27.07.xlsx`);
    let data = workSheetsFromFile[0].data;
    data.splice(0, 6)
    data[0][8] = undefined
    // console.log(data);
    let img = 2;
    let thisProductId;
    for (let i = 0; i < data.length; i++) {
        data[i] = data[i].filter(n => n)
        if(!data[i].length) continue;
        if(data[i].length === 1){//category
            pool.category.findAll({where:{title: data[i][0]}, raw: true })
            .then(category=>{
              if(!category.length){
                pool.category.create({
                    title: data[i][0]
                }).catch(err=>console.log(err));
              }
            }).catch(err=>console.log(err));
            continue;
        }
        else if(typeof data[i][0] === 'string'){//product
            thisProductId = await pool.Product.findAll({where:{title: data[i][0]}, raw: true })
            .then(async (product)=>{
                // console.log(product);
                let temp;
              if(!product.length){
                temp = await pool.Product
                .create({
                    title: data[i][0],
                    article: data[i][1],
                    image: `image${img}.png`
                })
                .then(async (res)=>{ 
                    pool.DimensionProduct.create({
                        dimension: data[i][2],
                        count: data[i][4],
                        price: data[i][3],
                        productId: res.id
                    })
                    return res.id
                })
                .catch(err=>console.log(err));
                img++;
              }
              else{
                  temp = product[0].id
                pool.DimensionProduct.destroy({
                  where: {
                    productId: product[0].id
                  }
                })
              }
              return temp
            }).catch(err=>console.log(err));
        }
        else{
            pool.DimensionProduct.create({
                dimension: data[i][1],
                count: data[i][3],
                price: data[i][2],
                productId: thisProductId
            })
        }
        // console.log(data[i]);
    }
    var zip = new AdmZip(`${__dirname}/Прайс LBS 27.07.xlsx`);
    zip.extractEntryTo("xl/media/", `${__dirname}/media`, /*maintainEntryPath*/false, /*overwrite*/true);
    res.end('hi')
})

app.get('/a', (req, res)=>{
    
    res.end('12321')
})
app.listen(3000)