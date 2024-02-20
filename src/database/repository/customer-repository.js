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

    async FindCustomerById({id}) {
        try {
          const existingCustomer = await CustomerModel.findById(id)
            .populate("address")
            .populate("wishlist")
            .populate("orders")
            .populate("cart.product")

          return existingCustomer
        } catch (err) {
          throw new APIError(
            "API Error",
            STATUS_CODES.INTERNAL_ERROR,
            "Unable to Find Customer"
          );
        }
      }

    async CreateAddress({_id, street, postalCode, city, country}) {
        try {
          const profile = await CustomerModel.findById(_id)
    
          if (profile) {
            const newAddress = new AddressModel({street, postalCode, city, country}) 
            await newAddress.save()
    
            profile.address.push(newAddress)
          }
    
          return await profile.save()
        } catch (err) {
          throw new APIError(
            "API Error",
            STATUS_CODES.INTERNAL_ERROR,
            "Error on Create Address"
          )
        }
    }

    async Wishlist(customerId) {
        try {
          const profile = await CustomerModel.findById(customerId)
            .populate("wishlist")
    
          return profile.wishlist
        } catch (err) {
          throw new APIError(
            "API Error",
            STATUS_CODES.INTERNAL_ERROR,
            "Unable to Get Wishlist "
          )
        }
      }
}
module.exports = CustomerRepository
