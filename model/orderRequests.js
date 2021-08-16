const pool = require('./tables');

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

    async CreateOrder(number, address){
        return await pool._order
            .create({
                number,
                address
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

}
module.exports = Order