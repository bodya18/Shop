// const config = require('../middleware/config')
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

    async GetAllConnection(){
        const Alldata = await this.connection.GetAllConnection()
        const rule_permission = await this.connection.GetRulePermission()
        const rule_user = await this.connection.GetRuleUser()
        return {
            Alldata,
            rule_permission,
            rule_user
        }
    }

    async GivePermission(permissionId, roleId){
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

    async DeletePermissionFromUser(id) {
        await this.connection.DeletePermissionFromRule(id) 
    }

    async DeletePermission(id){
        const data = await this.permission.DeletePermission(id)
        if(data === false)
            return{isDel: false}
    }
}

module.exports = Permission