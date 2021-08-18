const pool = require('../tables/tables')

class Connection{
    async GivePermission(permissionId, roleId){
        return await pool.RolePermission.create({
            roleId,
            permissionId
        }).then(res=>{
            return res.id
        }).catch(err=>{
            console.error(err);
        })
    }
    async GetRoleRerm(permissionId, roleId){
        return await pool.RolePermission.findOne({where:{permissionId, roleId}, raw: true})
    }
}

module.exports = Connection