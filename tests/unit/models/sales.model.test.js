const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');
const { validProductId, validProductQuantity, validSalesId, sales, saleById } = require('../../mocks/sales.mock');



describe('Testes de unidade do model de vendas', function () {
  describe('Registra uma venda', function () {
    it('ao passar as informações corretas', async function () {
      // arrange
      sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);
      // act
      const result = await salesModel.insertSales();
      // assert
      expect(result).to.equal(4);
    });

    it('registra os produtos que foram vendidos e a quantidade', async function () {
       // arrange
      sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);
      // act
      const result = await salesModel.insertSalesProducts(validSalesId, validProductId, validProductQuantity);
      // assert
      expect(result).to.equal(4);
    });
  });
  
  describe('Recuperando a venda', function () {
    it('listando todas as vendas', async function () {
      // arrange
      sinon.stub(connection, 'execute').resolves([sales]);
      // act
      const result = await salesModel.findAll();
      // assert
      expect(result).to.be.deep.equal(sales);
    });

    it('Recuperando uma venda a partir de seu ID', async function () {
      // Arrange
      sinon.stub(connection, 'execute').resolves([[saleById]]);
      // Act
      const result = await salesModel.findById(1);
      // Assert
      expect(result).to.be.deep.equal([saleById]);
    });

  });

  afterEach(function () {
    sinon.restore();
   });
});