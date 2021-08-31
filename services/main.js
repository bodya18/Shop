const Permission = require('./permission');
const Product = require('./product');
const Role = require('./role');
const User = require('./user');
const Settings = require('./settings');

class Main{
    constructor(){
        this.product = new Product;
        this.user = new User;
        this.permission = new Permission;
        this.role = new Role;
        this.settings = new Settings
    }
}

module.exports = Main