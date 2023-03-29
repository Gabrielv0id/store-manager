const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');
const { validProductId, validProductQuantity, validSalesId, sales, saleById, removeSaleReturn, salesUpdated } = require('../../mocks/sales.mock');



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

  describe('removendo uma venda', function () {
    it('remove uma venda do banco de dados pelo id', async function () {
      // arrange
      sinon.stub(connection, 'execute').resolves(removeSaleReturn);

      const saleId = 1;

      // act
      const result = await salesModel.remove(saleId);

      // assert
      expect(result[0].affectedRows).to.be.deep.equal(1);
    })
  })

   describe('realizando um update de uma venda', function () {
    it('verifica se a venda com o ID selecionado foi alterada', async function () {
      // arrange
      sinon.stub(connection, 'execute').resolves(salesUpdated);

      const saleId = 1;
      const productId = 2
      const quantity = 4;

      // act
      const result = await salesModel.update(saleId, productId, quantity);

      // assert
      expect(result[0].affectedRows).to.be.deep.equal(1);
      expect(result[0].changedRows).to.be.deep.equal(1);
    });
  });

  afterEach(function () {
    sinon.restore();
   });
});