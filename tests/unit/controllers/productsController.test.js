const { expect, use } = require("chai");
const sinon = require("sinon");
const chaiAsPromised = require("chai-as-promised");
const productsService = require("../../../services/productsService");
const productsController = require("../../../controllers/productsController");

use(chaiAsPromised);

describe("controllers/productsController", () => {
  beforeEach(sinon.restore);

  describe("listProducts", () => {
    it("deve ser rejeitado quando o service for rejeitado", () => {
      sinon.stub(productsService, "listProducts").rejects();
      return expect(productsController.listProducts({}, {})).to.eventually.be.rejected;
    });

    it("deve retornar um status code 200 e uma lista de produtos", async () => {
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      };

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

      sinon.stub(productsService, "listProducts").resolves(result);
      await productsController.listProducts({}, res);

      expect(res.status.getCall(0).args[0]).to.equal(200);
      expect(res.json.getCall(0).args[0]).to.deep.equal(result);
    });
  });

  describe("getProductsById", () => {
    it("deve ser rejeitado quando productsService.checkIfExists for rejeitado", () => {
      sinon.stub(productsService, "checkIfExists").rejects();
      return expect(productsController.getProductsById({}, {})).to.eventually.be
        .rejected;
    });

    it("deve ser rejeitado quando o service for rejeitado", () => {
      sinon.stub(productsService, "checkIfExists").resolves();
      sinon.stub(productsService, "getProductsById").rejects();
      return expect(productsController.getProductsById({}, {})).to.eventually.be
        .rejected;
    });

    it("deve retornar o status code 200 e o produto", async () => {
      const req = {
        params: { id: 1 },
      };
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      };

      sinon.stub(productsService, "checkIfExists").resolves();
      sinon
        .stub(productsService, "getProductsById")
        .resolves({ id: 1, name: "Martelo de Thor" });

      await productsController.getProductsById(req, res);
      expect(res.status.getCall(0).args[0]).to.equal(200);
      expect(res.json.getCall(0).args[0]).to.deep.equal({
        id: 1,
        name: "Martelo de Thor",
      });
    });
  });
});
