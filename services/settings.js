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
}

module.exports = Settings