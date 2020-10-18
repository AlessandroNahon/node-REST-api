const Product = require('../models/productModel')
const { getPostData } = require('../utils/data')

const ContentType = {
  json: { 'Content-Type': 'application/json' }
}

const notFound = JSON.stringify({ message: 'Product Not Found' })

const setResponse = (res, code, type, data) => {
  res.writeHead(code, type)
  res.end(JSON.stringify(data))
}

// @desc  Gets All Products
// @route GET /api/products
async function getProducts(_, res) {
  try {
    const products = await Product.findAll()
    setResponse(res, 200, ContentType.json, products)
  } catch (error) {
    console.log(error)
  }
}

// @desc  Gets Single Product
// @route GET /api/product/:id
async function getProduct(_, res, id) {
  try {
    const product = await Product.findById(id)

    if (!product) {
      setResponse(res, 404, ContentType.json, notFound)
    } else {
      setResponse(res, 200, ContentType.json, product)
    }
  } catch (error) {
    console.log(error)
  }
}

// @desc  Create a Product
// @route POST /api/products
async function createProduct(req, res) {
  try {
    const body = await getPostData(req)

    const { title, description, price } = JSON.parse(body)

    const product = {
      title,
      description,
      price
    }

    const newProduct = await Product.create(product)

    setResponse(res, 201, ContentType.json, newProduct)
  } catch (error) {
    console.log(error)
  }
}

// @desc  Update a Product
// @route PUT /api/products/:id
async function updateProduct(req, res, id) {
  try {
    const product = await Product.findById(id)

    if (!product) {
      setResponse(res, 404, ContentType.json, notFound)
    } else {
      const body = await getPostData(req)

      const { title, description, price } = JSON.parse(body)

      const productData = {
        title: title || product.title,
        description: description || product.description,
        price: price || product.price
      }

      const updProduct = await Product.update(id, productData)

      setResponse(res, 200, ContentType.json, updProduct)
    }
  } catch (error) {
    console.log(error)
  }
}

// @desc  Delete Product
// @route DELETE /api/product/:id
async function deleteProduct(req, res, id) {
  try {
    const product = await Product.findById(id)

    if (!product) {
      setResponse(res, 404, ContentType.json, notFound)
    } else {
      await Product.remove(id)
      setResponse(res, 200, ContentType.json, {
        message: `Product ${id} removed`
      })
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
}
