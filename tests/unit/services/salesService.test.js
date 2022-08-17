const { expect, use } = require("chai");
const sinon = require("sinon");
const chaiAsPromised = require("chai-as-promised");
const salesModel = require("../../../models/salesModel");
const salesService = require("../../../services/salesService");
const NotFoundError = require("../../../middlewares/notFoundError");
const { ValidationError } = require("joi");

use(chaiAsPromised);

describe("services/salesService", () => {
  beforeEach(sinon.restore);

  describe("validateBody", () => {
    it("deve devolver o body quando ele for válido", () => {
      const validBody = { quantity: 10, productId: 1 };

      expect(salesService.validateBody(validBody)).to.be.deep.equal(validBody);
    });
    it("deve lançar um erro se o body estiver vazio", () => {
      return expect(() => salesService.validateBody({})).to.throw(
        ValidationError
      );
    });
    it("deve lançar um erro se a quantidade estiver vazia", () => {
      return expect(() =>
        salesService.validateBody({ quantity: "", productId: 1 })
      ).to.throw(ValidationError);
    });
    it("deve lançar um erro se productId estiver vazio", () => {
      return expect(() =>
        salesService.validateBody({ quantity: 5, productId: "" })
      ).to.throw(ValidationError);
    });
    it("deve lançar um erro se a quantidade for menor que 1", () => {
      return expect(() =>
        salesService.validateBody({ quantity: 0, productId: 1 })
      ).to.throw(ValidationError);
    });
    it("deve lançar um erro se a quantidade não for um número", () => {
      return expect(() =>
        salesService.validateBody({ quantity: "two", productId: 1 })
      ).to.throw(ValidationError);
    });
    it("deve lançar um erro se productId não for um número", () => {
      return expect(() =>
        salesService.validateBody({ quantity: 5, productId: "one" })
      ).to.throw(ValidationError);
    });
  });

  describe("checkIfExists", () => {
    it("deve retornar nada em caso de sucesso", () => {
      sinon.stub(salesModel, "exists").resolves([
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
      ]);

      return expect(salesService.checkIfExists(1)).to.eventually.be.undefined;
    });

    it("deve lançar um erro se a venda não for encontrada", () => {
      sinon.stub(salesModel, "exists").resolves([]);

      return expect(
        salesService.checkIfExists(0)
      ).to.eventually.be.rejectedWith(NotFoundError);
    });

    it("deve ser rejeitado quando o model for rejeitado", () => {
      sinon.stub(salesModel, "exists").rejects();
      return expect(salesService.checkIfExists(1)).to.eventually.be.rejected;
    });
  });

  describe("listSales", () => {
    it("deve retornar uma lista de vendas quando o model retornar uma lista", () => {
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
      sinon.stub(salesModel, "listSales").resolves(result);

      return expect(salesService.listSales()).to.eventually.deep.equal(result);
    });

    it("deve ser rejeitado quando o model for rejeitado", () => {
      sinon.stub(salesModel, "listSales").rejects();
      return expect(salesService.listSales()).to.eventually.be.rejected;
    });
  });

  describe("getSalesById", () => {
    it("deve retornar uma lista quando o model retornar uma lista", () => {
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

      sinon.stub(salesModel, "getSalesById").resolves(result);

      return expect(salesService.getSalesById(1)).to.eventually.deep.equal(result);
    });

    it("deve ser rejeitado quando o model for rejeitado", () => {
      sinon.stub(salesModel, "getSalesById").rejects();
      return expect(salesService.getSalesById(1)).to.eventually.be.rejected;
    });
  });
});
