const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { products, newProduct } = require('../../mocks/products.mock');

describe('Testes de unidade do model de produtos', function () {
  it('Recuperando a lista de produtos', async function () {
    // arrange
    sinon.stub(connection, 'execute').resolves([products]);
    // act
    const result = await productsModel.findAll();
    // assert
    expect(result).to.be.deep.equal(products);
  });

  it('Recuperando um produto a partir de seu ID', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([[products[0]]]);
    // Act
    const result = await productsModel.findById(1);
    // Assert
    expect(result).to.be.deep.equal(products[0]);
  });

  it('Registrando um novo produto', async function () {
    // arrange
    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);

    // act
    const result = await productsModel.insert(newProduct);

    // assert
    expect(result).to.equal(4);
  });

   afterEach(function () {
    sinon.restore();
   });
});