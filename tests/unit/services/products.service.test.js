const { expect } = require('chai');
const sinon = require('sinon');
const { productsService } = require('../../../src/services');
const { productsModel } = require('../../../src/models');

const { products, validName, registeredProduct, productResponseUpdated } = require('../../mocks/products.mock');

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

  describe('fazendo o update de um produto', function () {
    it('quando é passado um id correto', async function () {
      // arrange
      sinon.stub(productsModel, 'update').resolves(true);
      sinon.stub(productsModel, 'findById').resolves(productResponseUpdated[0]);
      
      const productId = 1;
      const updateName = 'Martelo do Batman';

      // act
      const result = await productsService.updateProduct(updateName, productId); 

      // assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(productResponseUpdated[0]);
    });
    
    it('trás um erro quando não acha um produto com o id passado', async function () {
      // arrange
      sinon.stub(productsModel, 'update').resolves(false);
      sinon.stub(productsModel, 'findById').resolves(undefined);
      
      const productId = 999;
      const updateName = 'Martelo do Batman';

      // act
      const result = await productsService.updateProduct(updateName, productId); 

      // assert
      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.equal('Product not found');
    });
  });

  describe('faz a remoção de um produto', function () {
    it('quando é passado um id correto', async function () {
      // arrange
      sinon.stub(productsModel, 'remove').resolves(true);
      sinon.stub(productsModel, 'findById').resolves(products[0]);

      const productId = 1;

      // act
      const result = await productsService.removeProduct(productId);

      // assert
      expect(result.type).to.be.equal(null);
    });

    it('trás um erro quando não acha um produto com o id passado', async function () {
      // arrange
      sinon.stub(productsModel, 'findById').resolves(undefined);

      const productId = 1;

      // act
      const result = await productsService.removeProduct(productId);

      // assert
      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.equal('Product not found');
    });
  });
  afterEach(function () {
     sinon.restore();
   });
});