/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Para manipular o acesso ao BD, podemos utilizar o Prisma. Para instalá-lo, devemos rodar os seguintes comandos na mesma ordem:  
 * npm install prisma --save
 * npx prisma
 * npx prisma init
 * npm install @prisma/client
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Objetivo:            API responsável pela manipulação de dados de Back-end (GET, PUT, POST, DELETE)
 * Autor:               Miguel Antonio
 * Data_criação:        10/10/2022
 * Versão:              1.0
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

//Import das bibliotecas
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('./modulo/config.js');
const e = require('express');

const app = express();

//Configuração de cors para liberar o acesso à API
app.use((request, response, next) => {
    response.header ('AccesS-Control-Allow-Origin', '*');
    response.header ('AccesS-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    app.use(cors());
    next();
});

//Criamos um objeto que permite receber um json no body das requisições
const jsonParser = bodyParser.json();

/*
    Rotas para CRUD (Create, Read, Update, Delete) de alunos
    Data: 10/10/2022
 */

//EndPoint para LISTAR todos os alunos
app.get('/v1/alunos', cors(), async function(request, response){

    let statusCode;
    let message;

    //Import do arquivos controllerAluno
    const controllerAluno = require('./controller/controllerAluno.js');

    //Retorna todos os alunos existentes no BD
    const dadosAlunos = await controllerAluno.listarAluno();

    //Valida se existe retorno de dados
    if (dadosAlunos) {
        //Status 200
        statusCode = 200;
        message = dadosAlunos;
    } else {
        //Status 404
        statusCode = 404;
        message = MESSAGE_ERROR.NOT_FOUND_DB;
    }

    // console.log(message)

    //Retorna os dados da API
    response.status(statusCode);
    response.json(message);
});

//EndPoint para inserir um novo aluno
app.post('/v1/aluno', cors(), jsonParser, async function(request, response){
    let statusCode;
    let message;
    let headerContentType;

    //Recebe um tipo de content-type que foi enviado no header da requisição
        //application/json
    headerContentType = request.headers['content-type'];

    // console.log(headerContentType);

    //Validar se o content-type é do tipo application/json
    if (headerContentType == 'application/json') {
        //Recebe do corpo da mensagem o conteúdo 
        let dadosBody = request.body;

        //Realiza uma conversão de dados para conseguir comparar o json vazio
            //O comando transforma o JSON em String
        if (JSON.stringify(dadosBody) != '{}') {
            
            //Import do arquivo da controller de aluno
            const controllerAluno = require('./controller/controllerAluno.js');

            //Chama a função novoAluno da controller e encaminha os dados do Body
            const novoAluno = await controllerAluno.novoAluno(dadosBody);

                statusCode = novoAluno.status;
                message = novoAluno.message;

        } else {
            statusCode = 400;
            message = MESSAGE_ERROR.EMPTY_BODY;
        }



    } else {
        statsCode = 415;
        message = MESSAGE_ERROR.CONTENT_TYPE;
    }

    response.status(statusCode)
    response.json(message)

});

//EndPoint para atualizar um aluno existente
app.put('/v1/aluno/:id', cors(), jsonParser, async function(request, response){
    let statusCode;
    let message;
    let headerContentType;
    let id = request.params.id;

    //Recebe um tipo de content-type que foi enviado no header da requisição
        //application/json
    headerContentType = request.headers['content-type'];

    // console.log(headerContentType);

    //Validar se o content-type é do tipo application/json
    if (headerContentType == 'application/json') {
        //Recebe do corpo da mensagem o conteúdo 
        let dadosBody = request.body;

        //Realiza uma conversão de dados para conseguir comparar o json vazio
            //O comando transforma o JSON em String
        if (JSON.stringify(dadosBody) != '{}') {

            //Validação do ID na requisição
            if (id != '' && id != undefined) {
                
                //Inserindo o ID no JSON que chegou do corpo da requisição
                dadosBody.id = id;

                //Import do arquivo da controller de aluno
                const controllerAluno = require('./controller/controllerAluno.js');

                //Chama a função novoAluno da controller e encaminha os dados do Body
                const novoAluno = await controllerAluno.atualizarAluno(dadosBody);

                    statusCode = novoAluno.status;
                    message = novoAluno.message;
            } else {
                statusCode = 400;
                message = MESSAGE_ERROR.REQUIRED_ID;
            }

        } else {
            statusCode = 400;
            message = MESSAGE_ERROR.EMPTY_BODY;
        }
    } else {
        statsCode = 415;
        message = MESSAGE_ERROR.CONTENT_TYPE;
    }

    response.status(statusCode)
    response.json(message)

});

//EndPoint para excluir um aluno existente
app.delete('/v1/aluno/:id', cors(), jsonParser, async function(request, response){
    let statusCode;
    let message;
    let id = request.params.id;

    if (id != '' && id != undefined) {

        //Import do arquivo da controller de aluno
        const controllerAluno = require('./controller/controllerAluno.js');

        const buscarAluno = await controllerAluno.buscarAluno(id);

        //Chama a função excluirAluno da controller
        const aluno = await controllerAluno.excluirAluno(id);

        statusCode = aluno.status;
        message = aluno.message;

    } else {
        statusCode = 400;
        message = MESSAGE_ERROR.REQUIRED_ID
    }
    response.status(statusCode)
    response.json(message)

});

//EndPoint para buscar um aluno pelo ID
app.get('/v1/aluno/:id', cors(), async function(request, response){
    let id = request.params.id;
    let statusCode;
    let message;

    if (id != '' && id != undefined) {

        //Import do arquivos controllerAluno
        const controllerAluno = require('./controller/controllerAluno.js');

        //Retorna todos os alunos existentes no BD
        const dadosAlunos = await controllerAluno.buscarAluno(id);

        //Valida se existe retorno de dados
        if (dadosAlunos) {
            //Status 200
            statusCode = 200;
            message = dadosAlunos;
        } else {
            //Status 404
            statusCode = 404;
            message = MESSAGE_ERROR.NOT_FOUND_DB;
        }
    } else {
        statusCode = 400;
        message = MESSAGE_ERROR.REQUIRED_ID;
    }

    // console.log(message)

    //Retorna os dados da API
    response.status(statusCode);
    response.json(message);
});

//Endpoint para Listar todos os cursos
app.get('/v1/cursos', cors(), async function(request, response){
    let statusCode;
    let message;

    const controllerCurso = require('./controller/controllerCurso.js');

    const cursos = await controllerCurso.listarCursos();

    if (cursos) {
        statusCode = 200;
        message = cursos;
    } else {
        statusCode = 404;
        message = MESSAGE_ERROR.NOT_FOUND_DB;
    }
    response.status(statusCode);
    response.json(message);
});

//EndPoint para buscar um curso pelo ID
app.get('/v1/curso/:id', cors(), async function(request, response){
    let id = request.params.id;
    let statusCode;
    let message;

    if (id != '' && id != undefined) {
        const controllerCurso = require('./controller/controllerCurso.js');

        const dadosCurso = await controllerCurso.buscarCurso(id);

        if (dadosCurso) {
            statusCode = 200;
            message = dadosCurso;
        } else {
            statusCode = 400;
            message = MESSAGE_ERROR.NOT_FOUND_DB;
        }
    } else {
        statusCode = 400;
        message = MESSAGE_ERROR.REQUIRED_ID;
    }

    response.status(statusCode);
    response.json(message);

});

//EndPoint para adicionar um novo curso
app.post('/v1/curso', cors(), jsonParser, async function(request, response){
    let statusCode;
    let message;
    let headerContentType;

    headerContentType = request.headers['content-type'];

    if (headerContentType != 'application/json') {

        statusCode = 415;
        message = MESSAGE_ERROR.CONTENT_TYPE;

    } else {
        let dadosBody = request.body;

        if (JSON.stringify(dadosBody) != '{}') {
            
            const curso = require('./controller/controllerCurso.js');
            const novoCurso = await curso.novoCurso(dadosBody);

            statusCode = novoCurso.status;
            message = novoCurso.message;

        } else {
            statusCode = 400;
            message = MESSAGE_ERROR.EMPTY_BODY;
        }
    }

    response.status(statusCode);
    response.json(message);

});

//EndPoint para ataulizar um registro de curso
app.put('/v1/curso/:id', cors(), jsonParser, async function(request, response){

    let statusCode;
    let message;
    let headerContentType;
    let id = request.params.id; //Pega o id que foi inserido na URL

    headerContentType = request.headers['content-type'];

    if (headerContentType != 'application/json') {

        statusCode = 415;
        message = MESSAGE_ERROR.CONTENT_TYPE;

    } else {
        let dadosBody = request.body;

        if (JSON.stringify(dadosBody) != '{}') {

            if (id != '' && id != undefined) {
                
                dadosBody.id = id;  //Adiciona ao body o id inserido na url

                const curso = require('./controller/controllerCurso.js');
                const attCurso = await curso.atualizarCurso(dadosBody);

                statusCode = attCurso.status;
                message = attCurso.message;

            } else {
                statusCode = 400;
                message = MESSAGE_ERROR.REQUIRED_ID;
            }

        } else {
            statusCode = 400;
            message = MESSAGE_ERROR.EMPTY_BODY;
        }
    }

    response.status(statusCode);
    response.json(message);

});

//EndPoint para excluir um curso existente
app.delete('/v1/curso/:id', cors(), jsonParser, async function(request, response){
    let stautsCode;
    let message;
    let id = request.params.id;

    if (id != '' && id != undefined) {
        const controllerCurso = require('./controller/controllerCurso.js');

        const buscarCurso = await controllerCurso.buscarCurso(id);

        const excluirCurso = await controllerCurso.excluirCurso(id);

        statusCode = excluirCurso.status;
        message = excluirCurso.message;
    } else {
        stautsCode = 400;
        message = MESSAGE_ERROR.REQUIRED_ID;
    }

    response.status(statusCode);
    response.json(message);

});





app.listen(8080, function(){
    console.log('Servidor aguardando requisições')
});