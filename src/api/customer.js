const CustomerService = require("../services/customer-service")

module.exports = (app) => {
    const service = new CustomerService()
    
    //http://localhost:8001/customer/signup
    app.post("/customer/signup", async (req, res, next) => { 
        console.log('oppa', req)
        try {
            const {email, password, phone} = req.body
            console.log('email', email)
            const {data} = await service.SignUp({email, password, phone})

            return res.json(data)
        } catch (err) {
            next(err)
        }
    })

    //http://localhost:8001/customer/login
    app.post("/customer/login", async (req, res, next) => {
        try {
          const { email, password } = req.body 
          const { data } = await service.SignIn({ email, password })
    
          return res.json(data)
        } catch (err) {
          next(err)
        }
      })
}