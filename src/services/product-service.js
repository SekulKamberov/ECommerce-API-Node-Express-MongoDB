const { ProductRepository } = require("../database")
const { FormateData } = require("../utils")
const { APIError } = require('../utils/app-errors')


class ProductService {
    constructor(){
        this.repository = new ProductRepository()
    }

    async CreateProduct(productInputs){
        try{
            const productResult = await this.repository.CreateProduct(productInputs)
            return FormateData(productResult)
        }catch(err){
            throw new APIError('Data Not found')
        }
    }


}
module.exports = ProductService
