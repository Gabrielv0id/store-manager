const { expect } = require('chai');
const sinon = require('sinon');
const { salesService } = require('../../../src/services');
const { salesModel, productsModel } = require('../../../src/models');
const { saleRegistered, salesInput, invalidSalesInput } = require('../../mocks/sales.mock');

describe('Teste de unidade do service de vendas', function () {
  describe('Registro de venda', function () {
    it('retorna a venda cadastrada', async function () {
      // arrange
      sinon.stub(productsModel, 'findById').resolves(1);
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

  afterEach(function () {
     sinon.restore();
   });
});