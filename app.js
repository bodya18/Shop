const express = require('express')
const app = express()
var xlsx = require('node-xlsx').default;
var AdmZip = require('adm-zip');
const exphbs = require('express-handlebars')
const pool = require('./model/tables');
const path = require('path');

const hbs = exphbs.create({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, "views/layouts"),
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs');
app.set('views', 'views')
app.use(express.static(__dirname))

app.get('/', async (req, res)=>{
    const workSheetsFromFile = xlsx.parse(`${__dirname}/Прайс LBS 27.07.xlsx`);
    let data = workSheetsFromFile[0].data;
    data.splice(0, 6)
    data[0][8] = undefined
    // console.log(data);
    let img = 2;
    let thisProductId;
    let thisCategoryId;
    for (let i = 0; i < data.length; i++) {
        data[i] = data[i].filter(n => n)
        if(!data[i].length) continue;
        if(data[i].length === 1){//category
            thisCategoryId = await pool.category.findAll({where:{title: data[i][0]}, raw: true })
            .then(async (category)=>{
              if(!category.length){
                thisCategoryId = await pool.category
                .create({
                    title: data[i][0]
                })
                .then(res=>{
                    return res.id
                })
                .catch(err=>console.log(err));
              }else
                thisCategoryId = category[0].id
              return thisCategoryId
            }).catch(err=>console.log(err));
            continue;
        }
        else if(typeof data[i][0] === 'string'){//product
            thisProductId = await pool.Product.findAll({where:{title: data[i][0]}, raw: true })
            .then(async (product)=>{
                // console.log(product);
                let temp;
              if(!product.length){
                if(img === 25)
                    img++
                temp = await pool.Product
                .create({
                    title: data[i][0],
                    article: data[i][1],
                    image: `image${img}.png`,
                    categoryId: thisCategoryId
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
    res.render('index.hbs', {
        title: 'перезапись данных'
    })
})

app.get('/a', async(req, res)=>{
    let Product = await pool.Product.findAll({raw: true})
    res.render('view.hbs', {
        title: 'вывод данных',
        Product
    })
})
app.listen(3000)