const pool = require('../tables/tables')
const { Op } = require("sequelize");

class Product{

    async GetCategoryByTitile(title){
        return await pool.category
        .findAll({where:{title}, raw: true })
        .catch(err=>console.log(err));
    }

    async CreateCategory(title){
       return await pool.category
            .create({
                title
            })
            .then(res=>{
                return res.id
            })
            .catch(err=>console.log(err));
    }

    async GetProductByTitile(title){
        return await pool.Product
        .findAll({where:{title}, raw: true })
        .catch(err=>console.log(err));
    }

    async GetProductById(id){
        return await pool.Product
        .findAll({where:{id}, raw: true })
        .catch(err=>console.log(err));
    }

    async CreateProduct(title, article, image, categoryId){
        return await pool.Product
        .create({
            title,
            article,
            image,
            categoryId
        })
        .then(async (res)=>{ 
            return res.id
        })
        .catch(err=>console.log(err));
    }

    async CreateDimensionProduct(dimension, count, OldPrice, productId){
        const percent = await pool.settings.findOne({raw:true})
        const NewPrice = OldPrice * (percent.percent / 100 + 1)
        await pool.DimensionProduct.create({
            dimension,
            count,
            NewPrice,
            OldPrice,
            productId
        })
        .catch(err=>console.log(err));
    }
    async GetDimensionProducts(productId){
        await pool.DimensionProduct.findAll({where:{productId}, raw: true})
    }
    async UpdateDimensionProduct(id, dimension, count, OldPrice, productId){
        const percent = await pool.settings.findOne({raw:true})
        const NewPrice = OldPrice * (percent.percent / 100 + 1)
        await pool.DimensionProduct.update({
            dimension,
            count,
            NewPrice,
            OldPrice,
            productId
        }, {where:{id}})
    }
    async DeleteDimensionProduct(productId){
        await pool.DimensionProduct.destroy({
          where: {
            productId
          }
        })
    }

    async GetAllProduct(){
        return await pool.Product.findAll({raw: true})
    }
    async GetAllDimensionProducts(){
        return await pool.DimensionProduct.findAll({raw: true})
    }
    async GetAllCategories(){
        return await pool.category.findAll({raw: true})
    }
    
    async GetProductByCategoryId(categoryId){
        return await pool.Product.findAll({where:{categoryId}, raw: true})
    }

    async getSettings(){
        return await pool.settings.findOne({raw: true})
    }
    async EditSettings(percent){
        return await pool.settings.update({percent}, {where:{id: 1}})
    }
    async search(search){
        return await pool.Product.findAll({
            where:{
                [Op.or]: [{
                    title: {[Op.like]: `%${search}%`}
                },{
                    article: {[Op.like]: `%${search}%`}
                }]
            },
            raw:true
        })
    }
    async update(id, title, article){
        await pool.Product.update({title, article}, {where:{id}})
    }
    async destroyProd(){
        await pool.Product.destroy({
            where: {
                id:{
                    [Op.ne]: 0
                }
            }
        })
        await pool.sequelize.query('ALTER TABLE products AUTO_INCREMENT=0')
    }
    async destroyDim_Prod(){
        await pool.DimensionProduct.destroy({
            where: {
                id:{
                    [Op.ne]: 0
                }
            }
        })
        await pool.sequelize.query('ALTER TABLE DimensionProducts AUTO_INCREMENT=0')
    }
}
module.exports = Product