const pool = require("../tables/tables");

class Order{
    async GetOrders(){
        return await pool._order
            .findAll({raw: true })
            .catch(err=>console.log(err));
    }

    async GetOrderBuId(id){
        return await pool._order
            .findByPk(id)
            .then(order=>{
                if(!order) return;
                return order;
            })
            .catch(e=>{
                console.error(e);
            })
    }

    async CreateOrder(number, address, DimensionProductId){
        return await pool._order
            .create({
                number,
                address,
                DimensionProductId
            })
            .then(res=>{
                return res.id
            })
            .catch(e=>{
                console.error(e);
            })
    }
    async DeleteOrder(id){
        await pool._order
            .destroy({
                where:{
                    id
                }
            })
            .then()
            .catch(e=>{
                console.error(e);
            })
    }
    async GetOrdersByStatus(status){
        console.log(status);
        const data = await pool.sequelize.query(`
            select _orders.id, _orders.number, _orders.address, DimensionProducts.dimension, DimensionProducts.NewPrice, products.title
            from _orders, DimensionProducts, products 
            where _orders.status = ${status} 
            AND _orders.DimensionProductId = DimensionProducts.id 
            AND DimensionProducts.productId = products.id`)
        return data[0]
    }
    async UpdateStatus(status, id){
        await pool._order.update({status},{where:{id}})
    }

}
module.exports = Order