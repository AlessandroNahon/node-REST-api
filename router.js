const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require('./controllers/productController')
const { getRoutes } = require('./utils/routes')

function router(req, res) {
  const id = req.url.split('/')[3]
  const {
    isGetProducts,
    isGetProduct,
    isCreateProduct,
    isUpdateProduct,
    isDeleteProduct
  } = getRoutes(req)

  if (isGetProducts) {
    getProducts(req, res)
  } else if (isGetProduct) {
    getProduct(req, res, id)
  } else if (isCreateProduct) {
    createProduct(req, res)
  } else if (isUpdateProduct) {
    updateProduct(req, res, id)
  } else if (isDeleteProduct) {
    deleteProduct(req, res, id)
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: 'Route Not Found' }))
  }
}

module.exports = router
