const { expect } = require('chai');
const sinon = require('sinon');
const { salesService } = require('../../../src/services');
const { salesModel, productsModel } = require('../../../src/models');
const { saleRegistered, salesInput, invalidSalesInput, sales, saleById, saleUpdate } = require('../../mocks/sales.mock');
const { products } = require('../../mocks/products.mock');

describe('Teste de unidade do service de vendas', function () {
  describe('Registro de venda', function () {
    it('retorna a venda cadastrada', async function () {
      // arrange
      sinon.stub(productsModel, 'findById').resolves(products[0]);
      sinon.stub(salesModel, 'insertSales').resolves(4);
      sinon.stub(salesModel, 'insertSalesProducts').resolves(4);
      // act
      const result = await salesService.registerSales(salesInput)
      // assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.be.deep.equal(saleRegistered);
    });

    it('retorna um erro caso nao seja encontrado o id do produto', async function () {
      // arrange
      sinon.stub(productsModel, 'findById').resolves(undefined);
      // act
      const result = await salesService.registerSales(invalidSalesInput)
      // assert
      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.equal('Product not found');
    });

   
  });
  describe('Testa a listagem de vendas', function () {
    it('se retorna toda a listagem de vendas', async function () {
      // arrange
    sinon.stub(salesModel, 'findAll').resolves(sales);

    // act
    const result = await salesService.findAll();

    // assert
    expect(result.type).to.be.equal(null);
    expect(result.message).to.be.deep.equal(sales);
    });

    it('se retorna as vendas se o ID for correto', async function () {
      // arrange 
    sinon.stub(salesModel, 'findById').resolves(saleById);

    // act
    const result = await salesService.findById(2);

    // assert
    expect(result.type).to.be.equal(null);
    expect(result.message).to.deep.equal(saleById);
    });

    it('retorna um erro caso o ID da venda não exista', async function () {
    // arrange
    sinon.stub(salesModel, 'findById').resolves([]);

    // act
    const result = await salesService.findById(999);

    // assert
    expect(result.type).to.equal('SALE_NOT_FOUND');
    expect(result.message).to.equal('Sale not found');
    });
  });

  describe('faz a remoção de uma venda', function () {
    it('quando é passado um id correto', async function () {
      // arrange
      sinon.stub(salesModel, 'remove').resolves(true);
      sinon.stub(salesModel, 'findById').resolves(saleById);

      const saleId = 1;

      // act
      const result = await salesService.removeSale(saleId);

      // assert
      expect(result.type).to.be.equal(null);
    });

    it('trás um erro quando não acha um produto com o id passado', async function () {
      // arrange
      sinon.stub(salesModel, 'findById').resolves([]);

      const saleId = 1;

      // act
      const result = await salesService.removeSale(saleId);

      // assert
      expect(result.type).to.equal('SALE_NOT_FOUND');
      expect(result.message).to.equal('Sale not found');
    });
  });

  describe('fazendo o update de uma venda', function () {
    it('quando é passado um id correto', async function () {
      // arrange
      sinon.stub(salesModel, 'findById').resolves(saleById);
      sinon.stub(productsModel, 'findById').resolves(products[0]);
      sinon.stub(salesModel, 'update').resolves(true);

      const saleId = 1;

      // act
      const result = await salesService.updateSale(salesInput, saleId); 

      // assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(saleUpdate);
    });
    
    it('trás um erro quando não acha uma venda com o id passado', async function () {
      // arrange
      sinon.stub(salesModel, 'findById').resolves([]);
      
      const saleId = 999;

      // act
      const result = await salesService.updateSale(salesInput, saleId); 

      // assert
      expect(result.type).to.equal('SALE_NOT_FOUND');
      expect(result.message).to.equal('Sale not found');
    });

    it('trás um erro quando não acha um produto com o id passado', async function () {
      // arrange
      sinon.stub(salesModel, 'findById').resolves(saleById);
      sinon.stub(productsModel, 'findById').resolves(undefined);
      
      const saleId = 1;

      // act
      const result = await salesService.updateSale(invalidSalesInput, saleId); 

      // assert
      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.equal('Product not found');
    });
  });
  afterEach(function () {
     sinon.restore();
   });
});