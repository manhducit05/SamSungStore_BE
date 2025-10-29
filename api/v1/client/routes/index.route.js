const productRouter = require("./products.route")
const ProductCategoryRouter = require("./product-category.route")
const UserRouter = require("./user.route")

module.exports = (app) => {
  const version = "/api/v1"

  app.use(version + '/products', productRouter)
  app.use(version + '/products-category', ProductCategoryRouter)
  app.use(version + '/users', UserRouter)
}