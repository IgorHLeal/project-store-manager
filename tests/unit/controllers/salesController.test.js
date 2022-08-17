const { expect, use } = require("chai");
const sinon = require("sinon");
const chaiAsPromised = require("chai-as-promised");
const productsService = require("../../../services/productsService");
const salesService = require("../../../services/salesService");
const salesController = require("../../../controllers/salesController");

use(chaiAsPromised);

describe("controllers/salesController", () => {
  beforeEach(sinon.restore);

  describe("listProducts", () => {
    it("deve ser rejeitado quando o service.list for rejeitado", () => {
      sinon.stub(salesService, "listProducts").rejects();
      return expect(salesController.listProducts({}, {})).to.eventually.be.rejected;
    });

    it("deve retornar o status code 200 e uma lista de vendas", async () => {
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      };

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

      sinon.stub(salesService, "listProducts").resolves(result);
      await salesController.listProducts({}, res);

      expect(res.status.getCall(0).args[0]).to.equal(200);
      expect(res.json.getCall(0).args[0]).to.deep.equal(result);
    });
  });
});
