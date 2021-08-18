const pool = require('../tables/tables')

class Role{
    async GetRoleByTitle(role){
        return await pool.role.findOne({where:{role}, raw: true})
    }
    async create(role){
        return await pool.role.create({
            role
        }).then(res=>{
            return res.id
        }).catch(e=>{
            console.error(e);
        })
    }
    async GetRoles(){
        return await pool.role.findAll({raw: true})
    }
}

module.exports = Role