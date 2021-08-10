const Sequelize = require("sequelize");
 
const sequelize = new Sequelize("shop", "root", "ZAQwsxz1.", {
    dialect: "mysql",
    host: "localhost",
    define: {
      timestamps: false
    }
    // ,logging: false
});

const Product = sequelize.define("product", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    article: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    image: {
      type: Sequelize.STRING,
      allowNull: false
    }
});

const DimensionProduct = sequelize.define("DimensionProduct", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    dimension: {
      type: Sequelize.STRING,
      allowNull: false
    },
    count: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
});
Product.hasMany(DimensionProduct);


const _order = sequelize.define("_order", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    number: {
      type: Sequelize.STRING,
      allowNull: false
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false
    }
});
DimensionProduct.hasMany(_order);

sequelize.sync({force:true}).then(()=>{
    console.log("Tables have been created");
}).catch(err=>console.error(err));

module.exports = {
  Product,
  DimensionProduct,
  _order
}