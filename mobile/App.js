import 'intl/';
import 'intl/locale-data/jsonp/pt-BR';

import React from 'react';
//React-native é diferente do que html
//Para qualquer tipo de texto, vai ser a tag /Text/, não h1 etc
//o estilo não vem por 'id' em outra p
    //não há herança de estilo, não dá para fazer a estilização do texto com o container acima.
     //o display já é flex, por padrão
     //flex: 1,//ocupar a tela toda, não só o tamanho do texto

import Routes from './src/routes';

export default function App() {
  return (
    <Routes/>
  );
}