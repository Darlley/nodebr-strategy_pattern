const { Sequelize, DataTypes } = require("sequelize")
const ICrud = require("./interfaces/crud.interface")

class PostgreSQL extends ICrud {
  constructor() {
    super()
    this._driver = null
    this._herois = null

    this.connect()
  }

  async connect(){
    this._driver = new Sequelize('postgres', 'postgres', 'postgres', {
      host: 'localhost',
      dialect: 'postgres',
      quoteIdentifiers: false, // não altere o padrão pré definido 
      operatorsAliases: false // não mostre logs de operações inválidas
    })

    await this.defineModel()
  }

  async defineModel(){
    this._herois = this._driver.define('herois', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        validate: {
          notEmpty: true
        },
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        },
      },
      poder: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        },
      }
    }, {
      tableName: 'TB_HEROIS',
      timestamps: false, /// manter a mesma estrutura do código
      freezeTableName: false // não alterar as propriedades do DB
    })
  
    await this._herois.sync()
  }
  
  async isConnected() {
    try {
      await this._driver.authenticate()
      return true
    } catch(error) {
      console.log(error)
      return false
    }
  }

  async create(item) {
    const { dataValues } = await this._herois.create(item, { raw: true })
    return dataValues
  }
  
  async read(item = {}) {
    return await this._herois.findAll({ where: item, raw: true })
  }
  
  async update(id, item) {
    console.log('item', item)
    console.log('id', id)
    const result =  await this._herois.update(item, { 
      where: { id }, 
      raw: true
    })
    console.log('result', result)
    return result
  }

  async delete(id) {
    const query = id ? { id } : {}
    return await this._herois.destroy({ where: query })
  }
}

module.exports = PostgreSQL