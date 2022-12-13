/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Objetivo:        Arquivo responsável pela manipulação de recebimento, tratamento e retorno de dados entre API e model
 * Autor:           Miguel Antonio
 * Data_criação:    27/10/2022
 * Versão:          1.0
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../modulo/config.js');

const listarCursos = async function(){
    let dadosCursosJSON = {};

    const curso = require('../model/DAO/curso.js');

    const dadosCursos = await curso.selectAllCursos();

    // console.log(dadosCursos);
    if (dadosCursos) {
        dadosCursosJSON.cursos = dadosCursos;
        return dadosCursosJSON;
    } else {
        return MESSAGE_ERROR.NOT_FOUND_DB;
    }
}

//Função para inserir um novo curso
const novoCurso = async function(curso){

    if (curso.nome == '' || curso.nome == undefined || curso.icone == '' || curso.icone == undefined || curso.carga_horaria == '' || curso.carga_horaria == undefined || curso.sigla == '' || curso.sigla == undefined) {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS};
    } else {
        
        const model = require('../model/DAO/curso.js');

        const novoCurso = await model.insertCurso(curso);

        // console.log(novoCurso)

        if (novoCurso) {
            return {status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM};
        } else {
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
        }
    }
}

//Função para atualizar um curso selecionado pelo id
const atualizarCurso = async function(curso){

    if(curso.id == '' || curso.id == undefined){
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID};
    } else if (curso.nome == '' || curso.nome == undefined || curso.icone == '' || curso.icone == undefined || curso.carga_horaria == '' || curso.carga_horaria == undefined || curso.sigla == '' || curso.sigla == undefined) {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS};
    } else {

        const attCurso = require('../model/DAO/curso.js');
        const atualizar = await attCurso.updateCurso(curso);

        if (atualizar) {
            return {status: 200, message: MESSAGE_SUCCESS.UPDATE_ITEM};
        } else {
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
        }
    }
}

const excluirCurso = async function(id){

    if (id != '' && id != undefined) {
        
        const curso = await buscarCurso(id);

        if (curso) {
            const apagarCurso = require('../model/DAO/curso.js');

            const result = await apagarCurso.deleteCurso(id);

            // console.log(result);

            if (result) {
                return {status: 200, message: MESSAGE_SUCCESS.DELETE_ITEM};
            } else {
                return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
            }
        } else {
            return {status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB};
        }
    } else {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID};
    }
}

//Função que retorna um registro baseado no ID
const buscarCurso = async function(id){
    
    if (id != '' && id != undefined) {
        
        let dadosCursoJSON = {};

        const { selectCursoById } = require('../model/DAO/curso.js');

        const dadosCurso = await selectCursoById(id);

        if (dadosCurso) {
            dadosCursoJSON.curso = dadosCurso;
            return dadosCursoJSON;
        } else {
            return false;
        }
    } else {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID};
    }
}



module.exports = {
    listarCursos,
    novoCurso,
    atualizarCurso,
    buscarCurso,
    excluirCurso
}