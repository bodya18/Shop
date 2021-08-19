// const config = require('../middleware/config')
const RoleModel = require('../model/requests/role');
const UserModel = require('../model/requests/user');
const ConnectionModel = require('../model/requests/connection')

class Role{

    constructor(){
        this.is = false
        this.role = new RoleModel
        this.user = new UserModel
        this.connection = new ConnectionModel
    }  

    async GetRoles() {
        return await this.role.GetRoles()
        
    }

    async GetUserRoles(id) {
        const roles = await this.rule.GetRoles()
        const users = await this.user.GetUserRoles(id)
        return{
            roles,
            users
        }
        
    }

    async CreateRole(Role){
        if(Role.length<3)
            return 'Роль должна быть больше 2 символов'
        const data = await this.role.GetRoleByTitle(Role)
        if(data)
            return 'Данная роль уже есть'
        await this.role.create(Role)
    }

    async DeleteRole(id){
        await this.role.delete(id)
    }

    async GiveRule(user, rule){
        await this.connection.AddRuleToUser(user, rule)
    }
    
    async DeleteRuleFromUser(id, title){
        const data = await this.connection.GetRuleID(id, title)
        await this.connection.deleteFromUser(data.id)
    }
    async UpdateRuleFromUser(id, value){
        await this.connection.UpdateRuleFromUser(id, value)
    }
}

module.exports = Role