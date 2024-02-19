const { CustomerModel } = require("../models")
const { STATUS_CODES, APIError } = require("../../utils/app-errors")

class CustomerRepository {
    async CreateCustomer({email, password, phone, salt}) {
        try {
            const customer = new CustomerModel({email, password, salt, phone, address: []})
            const customerResult = await customer.save()
            return customerResult
        } catch (err) {
          throw new APIError(
            "API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Create Customer"
          )
        }
    }

    async FindCustomer({email}) {
        try {
          const existingCustomer = await CustomerModel.findOne({email: email})
          return existingCustomer
        } catch (err) {
          throw new APIError(
            "API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Find Customer"
          )
        }
      }
}
module.exports = CustomerRepository
