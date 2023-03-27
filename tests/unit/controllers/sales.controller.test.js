const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { salesController } = require('../../../src/controllers');
const { salesService } = require('../../../src/services');
const { salesInput, saleRegistered, invalidSalesInput, sales, saleById } = require('../../mocks/sales.mock');

const { expect } = chai;
chai.use(sinonChai);

describe('Teste de unidade do controller de vendas', function () {
  describe('Registra uma nova Venda', function () {
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
  describe('Listando todas as vendas', function () {
    it('Deve retornar o status 200 e a lista de vendas', async function () {
      // arrange
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'findAll').resolves({ type: null, message: sales });
        
      // act
      await salesController.listSales(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(sales);
    });
  });

  describe('Busca por uma venda pelo ID', function () {
    it('Deve retornar o status 200 e os dados da venda pedida', async function () {
      // arrange
      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(salesService, 'findById').resolves({ type: null, message: saleById });
      
      // act
      await salesController.getSale(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(saleById);
    });
    it('Ao passar um ID inválido deve retornar um erro', async function () {
      // arrange
      const res = {};
      const req = {
        params: { id: 999 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(salesService, 'findById').resolves({ type: 'SALE_NOT_FOUND', message: 'Sale not found' });
      
      // act 
      await salesController.getSale(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });

    });
  });
  afterEach(function () {
    sinon.restore();
  });
});