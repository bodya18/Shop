const pool = require('../tables/tables')

class Permission{

    async GetPermissionByTitile(permission){
        return await pool.permission.findOne({where:{permission}, raw: true})
    }
    async create(permission){
        return await pool.permission.create({
            permission
        }).then(res=>{
            return res.id
        }).catch(e=>{
            console.error(e);
        })
    }
    async GetPermissions(){
        return await pool.permission.findAll({raw: true})
    }
}

module.exports = Permission