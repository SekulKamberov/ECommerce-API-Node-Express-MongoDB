const { ProductModel } = require("../models")
const { APIError, BadRequestError } = require("../../utils/app-errors")

class ProductRepository {
    async CreateProduct({
        name, desc, type, unit, price, available, suplier, banner
      }) {
        try {
          const product = new ProductModel({
            name, desc, type, unit, price, available, suplier, banner
          }) 
          const productResult = await product.save()
          
          return productResult
        } catch (err) {
          throw new APIError(
            "API Error",
            STATUS_CODES.INTERNAL_ERROR,
            "Unable to Create Product"
          )
        }
      }
}

module.exports = ProductRepository
 