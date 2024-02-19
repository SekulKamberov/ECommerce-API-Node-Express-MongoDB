const { CustomerRepository } = require("../database")
const { FormateData, GeneratePassword, GenerateSalt, GenerateSignature, ValidatePassword } = require('../utils');
 
class CustomerService {
    constructor(){
        this.repository = new CustomerRepository()
    }

    async SignIn(userInputs){
        const { email, password, phone } = userInputs 
        try {

        } catch(err) {

        }
    }

    async SignUp(userInputs){
        const { email, password, phone } = userInputs 
        console.log('hi from service-SignUp phone' , phone)
        
        try {
            let salt = await GenerateSalt()
            let userPassword = await GeneratePassword(password, salt)
            
            const existingCustomer = await this.repository.CreateCustomer({email, password: userPassword, phone, salt}) 
            const token = await GenerateSignature({email: email, _id: existingCustomer._id})

            return FormateData({id: existingCustomer._id, token})
        } catch(err) {
            throw new APIError('Data Not found', err)
        }
    }
}
module.exports = CustomerService
