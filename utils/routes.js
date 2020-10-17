function getRoutes(req) {
  return {
    isGetProducts: req.url === '/api/products' && req.method === 'GET',
    isGetProduct:
      req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'GET',
    isCreateProduct: req.url === '/api/products' && req.method === 'POST',
    isUpdateProduct:
      req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'PUT',
    isDeleteProduct:
      req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'DELETE'
  }
}

module.exports = { getRoutes }
