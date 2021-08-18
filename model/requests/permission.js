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
    async ShowAllPermissions(userId){
        const UserRoles = await pool.RoleUser.findAll({attributes: ['roleId'], where:{userId}, raw: true})
        let permission = []
        for (const i in UserRoles) {
            let data = await pool.RolePermission.findOne({
                attributes: ['permissionId'],
                where:{
                    roleId: UserRoles[i].roleId
                },
                raw:true
            })
            if(data)
                permission.push(data)
        }
        for (const i in permission) {
            permission[i] = await pool.permission.findOne({attributes: ['permission'], where:{id: permission[i].permissionId}, raw: true})
            permission[i] = permission[i]['permission']
        }
        return permission
    }
}

module.exports = Permission