let products = require('../data/products')
const { v4: uuidv4 } = require('uuid')
const { writeDataToFile } = require('../utils/data')

function findAll() {
  return new Promise((resolve) => {
    resolve(products)
  })
}

function findById(id) {
  return new Promise((resolve) => {
    const product = products.find((p) => p.id === id)
    resolve(product)
  })
}

function create(product) {
  return new Promise((resolve) => {
    const newProduct = { id: uuidv4(), ...product }
    products.push(newProduct)
    writeDataToFile('./data/products.json', products)
    resolve(newProduct)
  })
}

function update(id, product) {
  return new Promise((resolve) => {
    const index = products.findIndex((p) => p.id === id)
    products[index] = { id, ...product }
    writeDataToFile('./data/products.json', products)
    resolve(products[index])
  })
}

function remove(id) {
  return new Promise((resolve) => {
    products = products.filter((p) => p.id !== id)
    writeDataToFile('./data/products.json', products)
    resolve()
  })
}

module.exports = { findAll, findById, create, update, remove }