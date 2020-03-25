/*Métodos HTTP:
    GET: Buscar/listar uma informação do backend
    POST: Criar uma info no backend
    PUT: Alterar uma info do backend
    DELETE: Deletar uma info do backend
*/

/*Tipos de parâmetros:
    Query Parms: nomedos, eviados na rota após o símbolo de "?" (filtros, paginação)
        request.query
    Route Parms: utilizados para idenficar recursos
        request.params
    Request Body: corpo da rquesição, utilizado para criarou alterar recursos
        request.body
*/

app.get('/', (request,response) => {
    const params = request.body; //acessar os parametros que vem através das query, requesições
    console.log(params);
    
     // return response.send('Hello World'); n vai ser esse o caso pois não retornaremos textos, e sim objetos ou algo assim
    return response.json({
        evento: 'Primeiro Projeto',
        aluna: 'Milena Ruy'
    })
 })//coloca o recurso ((raiz, nesse caso), que estará no endereço da rota (localhost:3333/)) e uma função em seguida
 //se rodar com o node index.js com o método POST ao invés de GET, não vai aparecer nada, para outros métodos, rodar do Insomnia!