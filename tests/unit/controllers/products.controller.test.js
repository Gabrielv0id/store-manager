const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');
const { products, newProduct, productResponseUpdated } = require('../../mocks/products.mock');

describe('Teste de unidade do controller de products', function () {
  describe('Listando todos os produtos', function () {
    it('Deve retornar o status 200 e a lista de produtos', async function () {
      // arrange
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'findAll').resolves({ type: null, message: products });
        
      // act
      await productsController.listProducts(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(products);
    });
  });

  describe('Busca por um produto pelo ID', function () {
    it('Deve retornar o status 200 e os dados do produto pedido', async function () {
      // arrange
      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productsService, 'findById').resolves({ type: null, message: products[0] });
      
      // act
      await productsController.getProduct(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(products[0]);
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
        .stub(productsService, 'findById').resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
      
      // act 
      await productsController.getProduct(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });

    });
  });

  describe('Registra um novo Produto', function () {
    it('ao enviar dados válidos retorna status 201', async function () {
      // arrange
      const res = {};
      const req = {
        body: newProduct
      }

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productsService, 'registerProduct').resolves({ type: null, message: newProduct });
      
      // act
      await productsController.registerProduct(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(newProduct);
    });
  });

  describe('Faz a alteração do nome de um produto pelo ID', function () {
    it('Deve retornar o status 200 e os dados do produto alterado', async function () {
      // arrange
      const res = {};
      const req = { params: { id: 1 }, body: { name: 'Martelo do Batman' } };
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productsService, 'updateProduct').resolves({ type: null, message: productResponseUpdated[0] });
      // act
      await productsController.updateProduct(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productResponseUpdated[0]);
    });

    it('Ao passar um ID inválido deve retornar um erro', async function () {
    // arrange
      const res = {};
      const req = { params: { id: 999 }, body: { name: 'Martelo do Batman' } };
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productsService, 'updateProduct').resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
      // act
      await productsController.updateProduct(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });


  describe('remove  um produto pelo ID', function () {
    it('Deve retornar o status 204', async function () {
      // arrange
      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productsService, 'removeProduct').resolves({ type: null });
      
      // act
      await productsController.removeProduct(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(204);
      expect(res.json).to.have.been.calledWith();
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
        .stub(productsService, 'removeProduct').resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
      
      // act 
      await productsController.removeProduct(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });

    });
  });
  


  afterEach(function () {
    sinon.restore();
  });
});