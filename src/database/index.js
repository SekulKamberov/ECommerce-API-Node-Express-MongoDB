module.exports = {
    databaseConnection: require('./connection'),
    CustomerRepository: require('./repository/customer-repository'),
    ProductRepository: require('./repository/product-repository'),
    ShoppingRepository: require('./repository/shopping-repository')
}