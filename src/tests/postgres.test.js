const assert = require("assert")
const Postgres = require("../db/strategies/postgres")
const Context = require("../db/strategies/base/context.base")

const context = new Context(new Postgres())

const MOCK_HEROI_CADASTRAR = { nome: "Saitama 2", poder: "Força" }

describe("Postgres Strategy", function () {

  this.timeout(Infinity)

  it("Conectar", async function() {
    const result = await context.isConnected()
    assert.equal(result, true)
  })

  it("Cadastrar", async function() {
    const result = await context.create(MOCK_HEROI_CADASTRAR)
    delete result.id
    assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
  })

  it("Listar", async function() {
    const [result] = await context.read({ nome: MOCK_HEROI_CADASTRAR.nome })
    delete result.id
    assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
  })
})