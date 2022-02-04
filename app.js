const express = require('express');
const contenedor = require('./UserManager.js');
const UserService = new contenedor();

let idea = {
  descripcion: 'string',
  autor: 'string',
}

// UserService.save(idea).then(result=>console.log(result))
// UserService.getAll().then(result=>console.log(result))
//UserService.getById(2).then(result=>console.log(result))
// UserService.deleteById(3).then(result=>console.log(result))
//UserService.deleteAll().then(result=>console.log(result))

const app = express();

const connectedServer = app.listen(8080,()=>{
  console.log('conectado');
})

// let AvailableProducts = [
//   Product1= 'string1',
//   Product2= 'string2',
//   Product3= 'string3'
// ]

app.get('/productos',(req,res)=>{
  UserService.getAll().then(result=>res.send(result))
})

app.get('/productoRandom',(req,res)=>{
  let randomProduct = Math.floor(Math.random() * (4 - 1)) + 1;
  // let randomProduct = 2;
  // res.send(`${randomProduct}`)
  UserService.getById(randomProduct).then(result=>res.send(result))
})