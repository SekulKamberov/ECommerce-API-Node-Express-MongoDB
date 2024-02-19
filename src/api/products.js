const ProductService = require('../services/product-service')  

module.exports = (app) => {
    const service = new ProductService()

    app.post('/product/create', async(req,res,next) => {
        
        try {
            const { name, desc, type, unit,price, available, suplier, banner } = req.body 
            //
            const { data } =  await service.CreateProduct({ 
                name, desc, type, unit, price, available, suplier, banner 
            })
            return res.json(data);
            
        } catch (err) {
            next(err)    
        } 
    })

}

