const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { salesController } = require('../../../src/controllers');
const { salesService } = require('../../../src/services');
const { salesInput, saleRegistered, invalidSalesInput } = require('../../mocks/sales.mock');

const { expect } = chai;
chai.use(sinonChai);

describe('Teste de unidade do controller de vendas', function () {
  describe('Registra um novo Produto', function () {
    it('ao passar um input válido deve retornar um status 201 e o objeto da venda', async function () {
      // arrange
      const res = {}
      const req = {
        body: salesInput
      }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(salesService, 'registerSales').resolves({ type: null, message: saleRegistered });
      
      // act
      await salesController.registerSales(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(saleRegistered);
    });

    it('ao passar um input com id invalido deve retornar um erro', async function () {
      // arrange
      const res = {}
      const req = {
        body: invalidSalesInput
      }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(salesService, 'registerSales').resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
      
      // act
      await salesController.registerSales(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    })
  });
  afterEach(function () {
    sinon.restore();
  });
});