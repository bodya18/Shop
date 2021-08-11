const xlsx = require('node-xlsx').default;
const AdmZip = require('adm-zip');

const config = require('../middleware/config');
const productModel = require('../model/ProducRequests');

class Product{
    constructor(){
        this.product = new productModel
    }

    async ParseData(){
        const workSheetsFromFile = xlsx.parse(`${config.dirname}/Прайс LBS 27.07.xlsx`);
        var zip = new AdmZip(`${config.dirname}/Прайс LBS 27.07.xlsx`);
        zip.extractEntryTo("xl/media/", `${config.dirname}/media`, /*maintainEntryPath*/false, /*overwrite*/true);
        return workSheetsFromFile[0].data;
    }

    async SetDataInDB(data){
        data.splice(0, 6)
        data[0][8] = undefined
        let img = 2, thisProductId, thisCategoryId;
        
        for (const i in data) {
            data[i] = data[i].filter(n => n)
            if(!data[i].length) continue;

            if(data[i].length === 1){//category
                let category = await this.product.GetCategoryByTitile(data[i][0])
                if(!category.length)
                    thisCategoryId = await this.product.CreateCategory(data[i][0])
                else
                    thisCategoryId = category[0].id
                continue;
            }
            else if(typeof data[i][0] === 'string'){//product
                let product = await this.product.GetProductByTitile(data[i][0])
                
                if(!product.length){
                    if(img === 25)
                        img++
                    thisProductId = await this.product.CreateProduct(data[i][0], data[i][1], `image${img}.png`, thisCategoryId)
                    await this.product.CreateDimensionProduct(data[i][2], data[i][4], data[i][3], thisProductId)
                    img++;
                }
                else{
                    thisProductId = product[0].id
                    await this.product.DeleteDimensionProduct(thisProductId)
                }

            }
            else
                await this.product.CreateDimensionProduct(data[i][1], data[i][3], data[i][2], thisProductId)
        }
    }

    async GetAllProduct(){
        return await this.product.GetAllProduct()
    }
}

module.exports = Product