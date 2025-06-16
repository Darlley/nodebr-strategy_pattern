const assert = require("assert")
const Postgres = require("../db/strategies/postgres")
const Context = require("../db/strategies/base/context.base")

const context = new Context(new Postgres())

const MOCK_HEROI = { nome: "Saitama 2", poder: "Força" }

describe("Postgres Strategy", function () {

  this.timeout(Infinity)

  this.beforeAll(async function() {
    await context.delete()
  })

  it("Conectar", async function() {
    const result = await context.isConnected()
    assert.equal(result, true)
  })

  it("Cadastrar", async function() {
    const result = await context.create(MOCK_HEROI)
    delete result.id
    assert.deepEqual(result, MOCK_HEROI)
  })

  it("Listar", async function() {
    const [result] = await context.read({ nome: MOCK_HEROI.nome })
    delete result.id
    assert.deepEqual(result, MOCK_HEROI)
  })

  it("Atualizar", async function() {
    const [itemAtualizar] = await context.read({ nome: MOCK_HEROI.nome })

    const MOCK_HEROI_ATUALIZADO = {
      ...MOCK_HEROI,
      nome: "Saitama",
      poder: "Força Absoluta"
    }

    const [result] = await context.update(itemAtualizar.id, MOCK_HEROI_ATUALIZADO)
    const [itemAtualizado] = await context.read({ id: itemAtualizar.id })    

    delete itemAtualizado.id

    assert.deepEqual(result, 1)
    assert.deepEqual(itemAtualizado, MOCK_HEROI_ATUALIZADO)
  })

  it("Remover", async function() {
    const [itemDeletar] = await context.read({})

    const result = await context.delete(itemDeletar.id)    
    assert.deepEqual(result, 1)

    const itemDeletado = await context.read({ id: itemDeletar.id })
    assert.deepEqual(itemDeletado, [])
  })
})