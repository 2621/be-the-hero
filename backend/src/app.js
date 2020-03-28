const express = require('express'); //importa express
const cors = require('cors');
const routes = require('./routes');
const {errors} = require('celebrate');

const app = express(); //instancia aplicação

app.use(cors());//desse jeito por enquanto qualquer frontend pode acessar
app.use(express.json());//indicar que estaremos usando json para o corpo das requesições
app.use(routes);
app.use(errors());

//app.listen(3333) //aplicação ouve a porta 3333, ou seja, acessa a aplicação por localhost:3333
//se pegar essa aplicação e colocar pra rodar,a aplicação vai ficar nesse endereço durante a execução dos testes, o que não queremos
module.exports = app;