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
});
