const { expect } = require('chai');
const sinon = require('sinon');
const { productsService } = require('../../../src/services');
const { productsModel } = require('../../../src/models');

const { products, validName, registeredProduct } = require('../../mocks/products.mock');

describe('Teste de unidade do service de produtos', function () {
  it('listagem de produtos',  async function () {
    // arrange
    sinon.stub(productsModel, 'findAll').resolves(products);

    // act
    const result = await productsService.findAll();

    // assert

    expect(result.type).to.be.equal(null);
    expect(result.message).to.be.deep.equal(products);
  });

  it('retorna um produto com base no ID', async function () {
    // arrange 
    sinon.stub(productsModel, 'findById').resolves(products[0]);

    // act
    const result = await productsService.findById(1);

    // assert
    expect(result.type).to.be.equal(null);
    expect(result.message).to.deep.equal(products[0]);
  });

  it('retorna um erro caso o ID do produto não exista', async function () {
    // arrange
    sinon.stub(productsModel, 'findById').resolves(undefined);

    // act
    const result = await productsService.findById(999);

    // assert
    expect(result.type).to.equal('PRODUCT_NOT_FOUND');
    expect(result.message).to.equal('Product not found');
  });

  describe('Registro de produto com valores corretos', function () {
    it('retorna o Produto cadastrado', async function () {
      // arrange
      sinon.stub(productsModel, 'insert').resolves(1);
      sinon.stub(productsModel, 'findById').resolves(registeredProduct[0]);

      // act
      const result = await productsService.registerProduct(validName);

      // assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.be.deep.equal(registeredProduct[0]);
    });
  });

  afterEach(function () {
     sinon.restore();
   });
});