const ProductService = require('../services/product-service')  

module.exports = (app) => {
    const service = new ProductService()

    app.post('/product/create', async(req,res,next) => { 
        try {
            const { name, desc, type, unit, price, available, suplier, banner } = req.body  
            const { data } =  await service.CreateProduct({ 
                name, desc, type, unit, price, available, suplier, banner 
            })

            return res.json(data)
        } catch (err) {
            next(err)    
        } 
    })

    app.get('/', async (req, res, next) => {
        let url = req.protocol + '://' + req.get('host') + req.originalUrl
        console.log('url ==========>', url)
        // TO DO: Validation
        try {
            const { data} = await service.GetProducts()      
            return res.status(200).json(data)
        } catch (error) {
            next(err)
        } 
        
    })





}

