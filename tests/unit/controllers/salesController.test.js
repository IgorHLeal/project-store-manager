const { expect, use } = require("chai");
const sinon = require("sinon");
const chaiAsPromised = require("chai-as-promised");
const productsService = require("../../../services/productsService");
const salesService = require("../../../services/salesService");
const salesController = require("../../../controllers/salesController");

use(chaiAsPromised);

describe("controllers/salesController", () => {
  beforeEach(sinon.restore);

  describe("listSales", () => {
    it("deve ser rejeitado quando o service.list for rejeitado", () => {
      sinon.stub(salesService, "listSales").rejects();
      return expect(salesController.listSales({}, {})).to.eventually.be.rejected;
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

      sinon.stub(salesService, "listSales").resolves(result);
      await salesController.listSales({}, res);

      expect(res.status.getCall(0).args[0]).to.equal(200);
      expect(res.json.getCall(0).args[0]).to.deep.equal(result);
    });
  });

  describe("getSalesById", () => {
    it("deve ser rejeitado quando salesService.checkIfExists for rejeitado", () => {
      sinon.stub(salesService, "checkIfExists").rejects();
      return expect(salesController.getSalesById({}, {})).to.eventually.be.rejected;
    });

    it("deve ser rejeitado quando o service for rejeitado", () => {
      sinon.stub(salesService, "checkIfExists").resolves();
      sinon.stub(salesService, "getSalesById").rejects();
      return expect(salesController.getSalesById({}, {})).to.eventually.be.rejected;
    });

    it("deve retornar o status code 200 e a venda", async () => {
      const req = {
        params: { id: 1 },
      };
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      };

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

      sinon.stub(salesService, "checkIfExists").resolves();
      sinon.stub(salesService, "getSalesById").resolves(result);

      await salesController.getSalesById(req, res);
      expect(res.status.getCall(0).args[0]).to.equal(200);
      expect(res.json.getCall(0).args[0]).to.deep.equal(result);
    });
  });
});
