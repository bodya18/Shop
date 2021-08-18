const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const UserModel = require('../model/requests/user');
const PermissionModel = require('../model/requests/permission');
const ConnectionModel = require('../model/requests/connection');

class User{

    constructor(){
        this.user = new UserModel
        this.permission = new PermissionModel
        this.connection = new ConnectionModel
    }

    async GiveRole(userId, roleId){
        if(!userId || !roleId)
            return 'Выберите роль и пользователя'
        const user = await this.user.getById(userId)
        if(!user)
            return 'Данного пользователя не существует либо он удален'
        const RoleFromUser = await this.user.getUserRole(userId, roleId)
        if (RoleFromUser.length)
            return 'Данная роль уже принадлежит пользователю'
        await this.user.AddRoleToUser(userId, roleId)
    }

    async SetStatus(token, num){
        return await this.user.SetStatus(token, num)
    }

    async GetUsers(){
        return await this.user.GetUsers()
    }

    async EditPost(name, id){
        if(name.length < 1)
            return 'Имя должно быть длиннее 1-го символа'
        try {
            this.user.edit(id, name)
        } catch {
            this.user.edit(id, name)
        }
    }

    async deleteUser(id, sessionId, permission){
        if(sessionId === id){
            await this.user.delete(id)
            return {isAcс: true}
        }
        else{
            for (let i = 0; i < permission.length; i++) {
                if (permission[i] === "DELETE") {
                    await this.user.delete(id)
                    break;
                }
            }
            return {isAcс: false}
        }
    }

    async GetUser(id){
        return await this.user.getById(id)
    }

    async loginLogic(email, passwordBody){
        const user = await this.user.getByEmail(email)
        if(!user)
            return {isAuth: false, error: 'Данного email не существует'}
        else {
            const password = user.password
            const areSame = await bcrypt.compare(passwordBody, password)
            
            if(!areSame)
                return {isAuth: false, error: 'Неверный пароль'}
            
            const Perm = await this.permission.ShowAllPermissions(user.id)
            return {
                isAuth: true,
                user,
                isAuthenticated: true,
                Perm
            }
        }
    }

    async NewPass(token){
        const isToken = await this.user.GetRecToken(token)
        if(!isToken)
            return 'Данного токена не существует'
        const date = Date.now()
        if(isToken.date < date){
            await this.user.delPassToken(token)
            return 'Данный токен устарел'
        }
    }
    async setPass(token, password){
        const isToken = await this.user.GetRecToken(token)
        const date = Date.now()
        if(isToken.date < date)
            return false
        else{
            const user = await this.user.getByEmail(isToken.email)
            const hashPassword = await bcrypt.hash(password, 10)
            await this.user.SetPass(hashPassword, user.token)
            return true
        }
    }

    async getByToken(token){
        return await this.user.GetRecToken(token)
    }
    async delPassToken(token){
        return await this.user.delPassToken(token)
    }
    async recovery(email){
        const buffer = crypto.randomBytes(32)
        const token = buffer.toString('hex')

        const date = Date.now() + 1000*60*60;
        await this.user.recoveryPass(email, token, date)

        return token
    }

    async registerLogic(email, name, password, repeat){
        const data = await this.user.getByEmail(email)
        if(data)
            return {isAuth: false, error: 'Данный email уже зарегистрирован'}
        else {
            if(email.length < 2)
                return {isAuth: false, error: 'Введите настоящий email'}
            if(name.length < 1)
                return {isAuth: false, error: 'Имя меньше 1-го символа'}
            if(password.length < 6)
                return {isAuth: false, error: 'Пароль должен быть длиннее 6 символов'}
            if(password !== repeat)
                return {isAuth: false, error: 'Пароли должны совпадать'}

            const hashPassword = await bcrypt.hash(password, 10)
            const buffer = crypto.randomBytes(32)

            const token = buffer.toString('hex')
            const user = await this.user.create(hashPassword, email, name, token)
            await this.user.AddRoleToUser(user.id, 3)

            return {
                user,
                isAuth: true,
            }
        }
        
    }

}

module.exports = User