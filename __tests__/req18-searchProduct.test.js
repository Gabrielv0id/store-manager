const { runSeed, connect } = require('./_utils');
const frisby = require("frisby");
const { productSearchNameResponse, allProductsResponse } = require('./_dataMock');

describe("18 - Crie endpoint products/search?q=searchTerm", () => {
  const url = `http://${process.env.HOST}:${process.env.PORT}`;

  beforeAll(async () => await runSeed());

  it("Será validado que é possível buscar um produto pelo name", async () => {
    const { status, json } = await frisby.get(`${url}/products/search?q=Martelo`);

    expect(status).toBe(200);
    expect(json).toEqual(productSearchNameResponse);
  });

  it("Será validado que é possível buscar todos os produtos quando passa a busca vazia", async () => {
    const { status, json } = await frisby.get(`${url}/products/search?q=`);

    expect(status).toBe(200);
    expect(json).toEqual(allProductsResponse);
  });
});
