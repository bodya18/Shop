const xlsx = require('node-xlsx').default;
const AdmZip = require('adm-zip');
var fs = require('fs');
const config = require('../middleware/config');
const productModel = require('../model/requests/Produc');
const orderModel = require('../model/requests/order');

class Product{
    constructor(){
        this.product = new productModel
        this.order = new orderModel
    }

    async ParseData(filedata){
        if(!filedata){
            return {perm: false, error: 'Файл должен быть разшерением .xlsx или .xls'}
        }
        const workSheetsFromFile = xlsx.parse(`${config.dirname}/${filedata.path}`);
        var zip = new AdmZip(`${config.dirname}/${filedata.path}`);
        zip.extractEntryTo("xl/media/", `${config.dirname}/media`, /*maintainEntryPath*/false, /*overwrite*/true);
        fs.unlink(`${config.dirname}/${filedata.path}`, (err)=>{
            if(err) throw err;
        })
        return {perm: true, data: workSheetsFromFile[0].data}
    }

    async SetDataInDB(data){
        data.splice(0, 6)
        await this.product.destroyDim_Prod()
        await this.product.destroyProd()
        data[0][8] = undefined
        let img = 1, thisProductId, thisCategoryId;
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
                    while (true) {
                        var stats = fs.lstatSync(`${config.dirname}/media/image${img}.png`);
                        if(stats.size > 1000)
                            break;
                        else img++
                    }
                    thisProductId = await this.product.CreateProduct(data[i][0], data[i][1], `image${img}.png`, thisCategoryId)
                    await this.product.CreateDimensionProduct(data[i][2], data[i][4], data[i][3], thisProductId)
                }
                else{
                    thisProductId = product[0].id
                    await this.product.DeleteDimensionProduct(thisProductId)
                    await this.product.CreateDimensionProduct(data[i][2], data[i][4], data[i][3], thisProductId)
                }
                img++;
            }
            else
                await this.product.CreateDimensionProduct(data[i][1], data[i][3], data[i][2], thisProductId)
        }
        let CountProduct = await this.product.GetAllProduct()
        CountProduct = CountProduct.reverse()[0].id
        return CountProduct
    }

    async GetAllProduct(){
        return await this.product.GetAllProduct()
    }

    async GetAllDimensionProducts(){
        return await this.product.GetAllDimensionProducts()
    }
    async GetDimensionProductByProductId(productId){
        return await this.product.GetDimensionProductByProductId(productId)
    }
    async GetAllCategories(){
        return await this.product.GetAllCategories()
    }
    async GetProductByCategoryId(categoryId){
        return await this.product.GetProductByCategoryId(categoryId)
    }
    async GetProductById(id){
        return await this.product.GetProductById(id)
    }
    async GetOrdersByStatus(status){
        return await this.order.GetOrdersByStatus(status)
    }
    async GetOrdersByUserId(userId){
        return await this.order.GetOrdersByUserId(userId)
    }
    async CreateOrder(number, address, DimensionProductId, userId){
        if(userId)
            await this.order.CreateOrder(number, address, DimensionProductId, userId)
        else
            await this.order.CreateOrder(number, address, DimensionProductId)
    }
    async EditOrder(number, address, OrderId){
        await this.order.EditOrder(number, address, OrderId)
    }
    async DeleteOrder(id){
        await this.order.DeleteOrder(id)
    }
    async UpdateOrderStatus(status, id){
        await this.order.UpdateStatus(status, id)
    }
    async search(search){
        return await this.product.search(search)
    }
    async searchCategory(categoryId){
        return await this.product.searchCategory(categoryId)
    }
}

module.exports = Product