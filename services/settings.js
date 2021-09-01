const SettingsModel = require('../model/requests/Settings');

class Settings {
    constructor(){
        this.settings = new SettingsModel
    }

    async getSettings(){
        return await this.settings.getSettings();
    }
    async getSettingById(id){
        return await this.settings.getSettingById(id);
    }
    async EditSettings(value, id){
        return await this.settings.EditSettings(value, id)
    }
    async create(title, _key, type_value){
        let data = await this.settings.getSettingByKey(_key)
        if(data)
            return 'Настройка с данным ключем уже существует'
        await this.settings.create(title, _key, type_value)
    }
}

module.exports = Settings