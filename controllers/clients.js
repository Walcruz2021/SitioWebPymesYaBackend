// const Cliente = require('../models/cliente')
// const Perro = require('../models/perro')

// const searchClient = async (name) => {
//   const client = await Cliente.findOne({ name: `${name}` })
//   return client || null
// }

// const searchallClients = async () => {
// //     const clients=await Cliente.find();
// // return clients?clients:null
//   Cliente.find({}, function (err, clientes) {
//     Perro.populate(clientes, { path: 'perro' }, function (err, clientes) {
//       res.status(200).send(clientes)
//     })
//   })
// }

// module.exports = {
//   searchClient,
//   searchallClients
// }
