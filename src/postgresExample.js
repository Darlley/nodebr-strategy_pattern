const { Sequelize, DataTypes } = require("sequelize")

const sequelize = new Sequelize('postgres', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
  quoteIdentifiers: false, // não altere o padrão pré definido 
  operatorsAliases: false // não mostre logs de operações inválidas
})

async function main(){
  const Herois = sequelize.define('herois', {
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

  await Herois.sync()
  // await Herois.create({
  //   nome: 'Naruto',
  //   poder: 'Rasengan'
  // })
  const result = await Herois.findAll({ raw: true, attributes: ["nome"] })
  console.log(result)
}

main()