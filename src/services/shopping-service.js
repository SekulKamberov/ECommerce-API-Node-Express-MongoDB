const { ShoppingRepository } = require("../database")
const { FormateData } = require("../utils")
 
class ShoppingService {

  constructor() {
    this.repository = new ShoppingRepository()
  }

  async PlaceOrder(userInput) {
    const { _id, txnNumber } = userInput 
    try {
      const orderResult = await this.repository.CreateNewOrder(_id, txnNumber)
      return FormateData(orderResult)
    } catch (err) {
      throw new APIError("Data Not found", err)
    }
  }

  async GetOrders(customerId) {
    try {
      const orders = await this.repository.Orders(customerId)
      return FormateData(orders)
    } catch (err) {
      throw new APIError("Data Not found", err)
    }
  }
}

module.exports = ShoppingService




