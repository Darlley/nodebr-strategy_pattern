const ContextStrategy = require("./db/strategies/base/context.base")
const MongoDB = require("./db/strategies/mongodb")
const PostgreSQL = require("./db/strategies/postgres")

const databaseClient = new ContextStrategy(new PostgreSQL)
// const databaseClient = new ContextStrategy(new MongoDB)
databaseClient.create({ name: "PostgreSQL" })