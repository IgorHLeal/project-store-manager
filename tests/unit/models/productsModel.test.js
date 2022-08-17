const { expect, use } = require("chai");
const chaiAsPromised = require("chai-as-promised");
const sinon = require("sinon");
const productsModel = require("../../../models/productsModel");
const connection = require("../../../models/connection");

use(chaiAsPromised);

describe("models/productsModel", () => {
  beforeEach(sinon.restore);

  describe("listProducts", () => {
    it("Verifica se é retornada uma lista de produtos", () => {
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

      sinon.stub(connection, "execute").resolves([result]);

      return expect(productsModel.listProducts()).to.eventually.deep.equal(
        result
      );
    });

    it("Verifica se é rejeitado quando a query for rejeitada", () => {

      sinon.stub(connection, "execute").rejects();
      return expect(productsModel.listProducts()).to.eventually.be.rejected;
    });
  });
});
