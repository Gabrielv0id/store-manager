const validName = "Clotis, Deusa do Destino";

const products = [
  {
    id: 1,
    name: "Martelo de Thor"
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do Capitão América',
  }
]

const newProduct = {
  name: "Clotis, Deusa do Destino",
}

const registeredProduct = [
  {
  id: 1,
  name: validName,
  }
]

const productsUpdated = [
  {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 0,
    info: 'Rows matched: 1  Changed: 1  Warnings: 0',
    serverStatus: 2,
    warningStatus: 0,
    changedRows: 1,
  },
  undefined,
]

const productResponseUpdated = [
  {
  id: 1,
  name: 'Martelo do Batman',
  }
]

module.exports = {
  products,
  newProduct,
  validName,
  registeredProduct,
  productsUpdated,
  productResponseUpdated,
}