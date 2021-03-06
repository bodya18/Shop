const RoleModel = require('../model/requests/role');
const PermissionModel = require('../model/requests/permission');
const ConnectionModel = require('../model/requests/connection');

class Permission{

    constructor(){
        this.is = false
        this.permission = new PermissionModel
        this.role = new RoleModel
        this.connection = new ConnectionModel
    } 

    async GetPermissions (){
        return await this.permission.GetPermissions()        
    }

    async ShowAllPermissions(id){
        return await this.permission.ShowAllPermissions(id)
    }

    async GetRoleUser(){
        return await this.connection.GetRoleUser()
    }

    async GivePermission(permissionId, roleId){
        if (!permissionId || !roleId)
            return 'Выберите роль и разрешение'
        const role = await this.role.GetRoleById(roleId)
        if(!role)
            return 'Данной роли не существует либо она удалена'
        const RolePerm = await this.connection.GetRoleRerm(permissionId, roleId)
        if(RolePerm)
            return 'Данное разрешение уже принадлежит роли'
        await this.connection.GivePermission(permissionId,roleId)
    }

    async CreatePermission(Permission){
        if(Permission.length<3)
            return 'Разрешение должно быть больше 2 символов'
        const data = await this.permission.GetPermissionByTitile(Permission)
        if(data)
            return 'Данное разрешение уже есть'
        await this.permission.create(Permission)
    }

    async DeletePermission(id){
        await this.permission.DeletePermission(id)
    }
}

module.exports = Permission