const express = require('express'); //importa express
const cors = require('cors');
const routes = require('./routes');

const app = express(); //instancia aplicação

app.use(cors());//desse jeito por enquanto qualquer frontend pode acessar
app.use(express.json());//indicar que estaremos usando json para o corpo das requesições
app.use(routes);


app.listen(3333) //aplicação ouve a porta 3333, ou seja, acessa a aplicação por localhost:3333

