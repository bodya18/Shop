const pool = require('../tables/tables')

class User{
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
}

module.exports = User