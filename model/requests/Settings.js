const pool = require('../tables/tables')

class Settings {
    async set(id, value){
        pool.settings.update({value}, {where:{id}})
    }

    async getSettings(){
        return await pool.settings.findAll({raw: true})
    }
    async getSettingById(id){
        return await pool.settings.findOne({where:{id}, raw: true})
    }
    async getSettingsByKey(_key){
        return await pool.settings.findOne({where:{_key}, raw: true})
    }
    async EditSettings(value, id){
        return await pool.settings.update({value}, {where:{id}})
    }
    async create(title, _key, type_value){
        await pool.settings.create({
            title,
            _key,
            type_value
        })
    }
}

module.exports = Settings