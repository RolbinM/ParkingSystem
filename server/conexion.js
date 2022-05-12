const mongoose = require('mongoose');
const objetobd = mongoose.connection

mongoose.connect ('mongodb+srv://root:sa@cluster0.l5srz.mongodb.net/ParkingTec?retryWrites=true&w=majority')


// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

objetobd.on('connected',()=>{console.log('Connexion correcta')});
objetobd.on('error',()=>{console.log('Connexion fallida')});


module.exports = mongoose