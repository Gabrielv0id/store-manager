const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { products, newProduct, productsUpdated } = require('../../mocks/products.mock');

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

  describe('realizando um update dos produtos', function () {
    it('verifica se o produto com o ID selecionado foi alterado', async function () {
      // arrange
      sinon.stub(connection, 'execute').resolves(productsUpdated);

      const productId = 1;
      const updateName = 'Martelo do Batman';

      // act
      const result = await productsModel.update(updateName, productId);

      // assert
      expect(result[0].affectedRows).to.be.deep.equal(1);
      expect(result[0].changedRows).to.be.deep.equal(1);
    });
  });

   afterEach(function () {
    sinon.restore();
   });
});