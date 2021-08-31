const Sequelize = require("sequelize");
 
const sequelize = new Sequelize("shop", "root", "ZAQwsxz1.", {
    dialect: "mysql",
    host: "localhost",
//     define: {
//       timestamps: false
//     },
    logging: false,
});

const category = sequelize.define('categories', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
})

const Product = sequelize.define("products", {
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
      type: Sequelize.STRING,
      allowNull: false
    },
    image: {
      type: Sequelize.STRING,
      allowNull: false
    }
});
category.hasMany(Product);

const DimensionProduct = sequelize.define("DimensionProducts", {
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
      type: Sequelize.INTEGER
    },
    OldPrice: {
      type: Sequelize.INTEGER
    },
    NewPrice: {
      type: Sequelize.INTEGER
    }
});
Product.hasMany(DimensionProduct);


const _order = sequelize.define("_orders", {
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
    },
    status: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    DimensionProductId: {
      type: Sequelize.INTEGER
    }
});

const user = sequelize.define("users",{
  id: {
    type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  status: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  token:{
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
});
user.hasMany(_order);
const role = sequelize.define('roles', {
  role:{
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
})

const permission = sequelize.define('permissions', {
  permission:{
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
}) 

const settings = sequelize.define('settings', {
  value:{
    type: Sequelize.STRING,
    allowNull: false
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
})

const RolePermission = sequelize.define('RolePermissions',{
  id: {
    type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
  }
})

const RoleUser = sequelize.define('RoleUsers',{
  id: {
    type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
  }
})

permission.belongsToMany(role, { through: 'RolePermissions' });
role.belongsToMany(permission, { through: 'RolePermissions' });

role.belongsToMany(user, { through: 'RoleUsers' });
user.belongsToMany(role, { through: 'RoleUsers' });

const recovery = sequelize.define('recovery', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  date: {
    type: Sequelize.STRING,
    allowNull: false
  },
  token: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
})

sequelize.sync({force:false}).then(()=>{
    console.log("Tables have been created");
}).catch(err=>console.error(err));

module.exports = {
  recovery,
  Product,
  DimensionProduct,
  _order,
  category,
  user,
  role,
  permission,
  RolePermission,
  RoleUser,
  settings,
  sequelize
}