const pool = require('../tables/tables')

class User{

    async GetUsers(){
        return await pool.user.findAll({
            order: [
                ['createdAt', 'DESC']
            ],
            raw: true})
    }

    async getById(id){
        return await pool.user.findOne({where: {id}, raw: true})
    }

    async getByEmail(email){
        return await pool.user.findOne({where: {email}, raw: true})
    }
    async create(password, email, name, token){
        return await pool.user.create({
            password, 
            email, 
            name, 
            token
        })
    }
    async AddRoleToUser(userId, roleId){
        await await pool.RoleUser.create({
            userId,
            roleId
        })
    }

    async getUserRole(userId, roleId){
        return await pool.RoleUser.findAll({where:{
            userId,
            roleId
        }, raw: true})
    }

    async GetUserRoles(userId){
        return await pool.RoleUser.findAll({where:{
            userId
        }, raw: true})
    }
    async SetStatus(token, status){
        await pool.user.update({status},{where:{token}})
    }
    async recoveryPass(email, token, date){
        await pool.recovery.create({
            email,
            date,
            token
        })
    }
    async GetRecToken(token){
        return await pool.recovery.findOne({where: {token}, raw: true})
    }
    async delPassToken(token){
        return await pool.recovery.destroy({where:{token}})
    }
    async SetPass(password, token){
        return await pool.user.update({password}, {where:{token}})
    }

    async UpdateRoleFromUser(id, value){
        await pool.RoleUser.destroy({where:{userId: id}})
        for (const i in value) {
            await pool.RoleUser.create({roleId: value[i], userId: id})
        }
    }

    async delete(id){
        await pool.user.destroy({where:{id}})
    }
}

module.exports = User