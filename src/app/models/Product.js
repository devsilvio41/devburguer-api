import Sequelize, { Model } from "sequelize";

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        price: Sequelize.INTEGER,
        path: Sequelize.STRING,
        offer: Sequelize.BOOLEAN,
        url: {
  type: Sequelize.VIRTUAL,
  get() {
    // Usando a URL pública HTTPS do Easypanel e corrigindo a rota para /product-file/
    return `https://dev-burguer-backend.4l3rfx.easypanel.host/product-file/${this.path}`;
  },
}
      },
      {
        sequelize,
        tableName: "products",
      },
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Category, {
      foreignKey: "category_id",
      as: "category",
    });
  }
}

export default Product;
