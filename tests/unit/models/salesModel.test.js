const { expect, use } = require("chai");
const chaiAsPromised = require("chai-as-promised");
const sinon = require("sinon");
const salesModel = require("../../../models/salesModel");
const connection = require("../../../models/connection");

use(chaiAsPromised);

describe("models/salesModel", () => {
  beforeEach(sinon.restore);

  describe("exists", () => {
    it("deve retornar uma lista vazia quando connection.query retornar uma lista vazia", () => {
      sinon.stub(connection, "execute").resolves([[]]);

      return expect(salesModel.exists(0)).to.eventually.deep.equal([]);
    });
    it("deve retornar uma lista com um item quando connection.query retornar uma lista com um item", () => {
      const result = [
        {
          date: "2021-09-09T04:54:29.000Z",
          productId: 1,
          quantity: 2,
        },
        {
          date: "2021-09-09T04:54:54.000Z",
          productId: 2,
          quantity: 2,
        },
      ];

      sinon.stub(connection, "execute").resolves([result]);

      return expect(salesModel.exists(1)).to.eventually.deep.equal(result);
    });

    it("deve ser rejeitado quando connection.query for rejeitado", () => {
      sinon.stub(connection, "execute").rejects();
      return expect(salesModel.exists(1)).to.eventually.be.rejected;
    });
  });

  describe("listSales", () => {
    it("deve retornar uma lista de vendas quando connection.query retornar uma lista", () => {
      const result = [
        {
          saleId: 1,
          date: "2021-09-09T04:54:29.000Z",
          productId: 1,
          quantity: 2,
        },
        {
          saleId: 1,
          date: "2021-09-09T04:54:54.000Z",
          productId: 2,
          quantity: 2,
        },
      ];

      sinon.stub(connection, "execute").resolves([result]);

      return expect(salesModel.listSales()).to.eventually.deep.equal(result);
    });

    it("deve ser rejeitado quando connection.query for rejeitado", () => {
      sinon.stub(connection, "execute").rejects();
      return expect(salesModel.listSales()).to.eventually.be.rejected;
    });
  });

  describe("getSalesById", () => {
    it("deve retornar uma lista quando connection.query retornar uma lista", () => {
      const result = [
        {
          date: "2021-09-09T04:54:29.000Z",
          productId: 1,
          quantity: 2,
        },
        {
          date: "2021-09-09T04:54:54.000Z",
          productId: 2,
          quantity: 2,
        },
      ];

      sinon.stub(connection, "execute").resolves([result]);

      return expect(salesModel.getSalesById(1)).to.eventually.deep.equal(result);
    });

    it("deve ser rejeitado quando connection.query for rejeitado", () => {
      sinon.stub(connection, "execute").rejects();
      return expect(salesModel.getSalesById(1)).to.eventually.be.rejected;
    });
  });
});
