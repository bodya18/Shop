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

    async GetRoleUser(){
        let data = await pool.sequelize.query(`Select roles.role, permissions.permission, users.name, RoleUsers.userId 
        from roles, permissions, users, RolePermissions, RoleUsers 
        where RolePermissions.roleId = roles.id AND RolePermissions.permissionId = permissions.id 
        AND RoleUsers.userId = users.id AND RoleUsers.roleId = roles.id`)
        return data[0]
    }
}

module.exports = Connection