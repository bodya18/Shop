const pool = require('../tables/tables')

class User{

    async GetUsers(){
        return await pool.user.findAll({raw: true})
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
}

module.exports = User