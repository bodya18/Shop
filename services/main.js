const Permission = require('./permission');
const Product = require('./product');
const Role = require('./role');
const User = require('./user');

class Main{
    constructor(){
        this.product = new Product;
        this.user = new User;
        this.permission = new Permission;
        this.role = new Role;
    }
}

module.exports = Main