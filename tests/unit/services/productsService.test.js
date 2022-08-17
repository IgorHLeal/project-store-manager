const { expect, use } = require("chai");
const sinon = require("sinon");
const chaiAsPromised = require("chai-as-promised");
const productsModel = require("../../../models/productsModel");
const productsService = require("../../../services/productsService");
const NotFoundError = require("../../../middlewares/notFoundError");
const { ValidationError } = require("joi");

use(chaiAsPromised);

describe("services/productsService", () => {
  beforeEach(sinon.restore);

  describe("validateBody", () => {
    it("deve devolver o body quando ele for válido", () => {
      const validBody = { name: "Green Lantern" };

      expect(productsService.validateBody(validBody)).to.be.deep.equal(
        validBody
      );
    });

    it("deve lançar um erro se o body estiver vazio", () => {
      return expect(() => productsService.validateBody({})).to.throw(
        ValidationError
      );
    });

    it("deve lançar um erro se o name estiver vazio", () => {
      return expect(() => productsService.validateBody({ name: "" })).to.throw(
        ValidationError
      );
    });

    it("deve lançar um erro se o name tiver menos de 5 caracteres", () => {
      return expect(() =>
        productsService.validateBody({ name: "Hulk" })
      ).to.throw(ValidationError);
    });

    it("deve lançar um erro se o name não for uma string", () => {
      return expect(() => productsService.validateBody({ name: 123 })).to.throw(
        ValidationError
      );
    });
  });

  describe("checkIfExists", () => {
    it("deve retornar nada em caso de sucesso", () => {
      sinon
        .stub(productsModel, "getProductsById")
        .resolves({ id: 1, name: "Martelo de Thor" });

      return expect(productsService.checkIfExists(1)).to.eventually.be
        .undefined;
    });

    it("deve lançar um erro se o produto não for encontrado", () => {
      sinon.stub(productsModel, "getProductsById").resolves(undefined);

      return expect(
        productsService.checkIfExists(0)
      ).to.eventually.be.rejectedWith(NotFoundError);
    });

    it("deve ser rejeitado quando o model for rejeitado", () => {
      sinon.stub(productsModel, "getProductsById").rejects();
      return expect(productsService.checkIfExists(1)).to.eventually.be.rejected;
    });
  });

  describe("listProducts", () => {
    it("Deve retornar uma lista de produtos quando productsModel.list retornar uma lista de produtos", () => {
      const result = [
        {
          id: 1,
          name: "Martelo de Thor",
        },
        {
          id: 2,
          name: "Traje de encolhimento",
        },
        {
          id: 3,
          name: "Escudo do Capitão América",
        },
      ];

      sinon.stub(productsModel, "listProducts").resolves(result);

      return expect(productsService.listProducts()).to.eventually.deep.equal(result);
    });
    it("should be rejected when productsModel.list is rejected", () => {
      sinon.stub(productsModel, "listProducts").rejects();
      return expect(productsService.listProducts()).to.eventually.be.rejected;
    });
  });

  describe("getProductsById", () => {
    it("deve retornar um objeto quando productsModel.getById retornar um objeto", () => {
      const result = { id: 1, name: "Martelo de Thor" };
      sinon.stub(productsModel, "getProductsById").resolves(result);

      return expect(productsService.getProductsById(1)).to.eventually.deep.equal(
        result
      );
    });

    it("deve ser rejeitado quando productsModel.getById for rejeitado", () => {
      sinon.stub(productsModel, "getProductsById").rejects();
      return expect(productsService.getProductsById(1)).to.eventually.be.rejected;
    });
  });
});
