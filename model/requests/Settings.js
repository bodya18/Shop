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
    async EditSettings(value, id){
        return await pool.settings.update({value}, {where:{id}})
    }
}

module.exports = Settings