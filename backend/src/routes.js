//Armazena as rotas da aplicação
const express  = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');


const routes = express.Router();

//A validação precisa sempre vir ANTES do controller, é como se fosse indo na ordem da linha

routes.post('/sessions', SessionController.create);

//rota para listar todas as ONGs do banco de dados
routes.get('/ongs', OngController.index);
routes.post('/ongs', celebrate({
    //a chave do objeto é uma variável-> precisa colocar os []
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),//se for setar como numero, não dá para usar 'min' e 'max'
        city: Joi.string().required(),
        uf: Joi.string().length(2),
    })
}), OngController.create);

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(), //não tem problema ficar em letra minúscula, vai ser convertido pra isso de qlqr jeito
    }).unknown(),
}), ProfileController.index);


routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),//para passar sempre um número pra paǵina
    })
}), IncidentController.index);

routes.post('/incidents', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(), //não tem problema ficar em letra minúscula, vai ser convertido pra isso de qlqr jeito
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required(),})
}), IncidentController.create);

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}) , IncidentController.delete);//para deletar é necessário saber o id que se quer deletar

//deixar rotas disponíveis para serem usadas
 module.exports = routes;