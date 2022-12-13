/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Objetivo:        Arquivo responsável pela manipulação de recebimento, tratamento e retorno de dados entre API e model
 * Autor:           Miguel Antonio
 * Data_criação:    06/10/2022
 * Versão:          1.0
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../modulo/config.js');

const novoAluno = async function(aluno){

    //Validação de campos obrigatórios
    if(aluno.nome == '' || aluno.nome == undefined || aluno.foto == '' || aluno.foto == undefined || aluno.rg == '' || aluno.rg == undefined ||  aluno.cpf== '' || aluno.cpf == undefined || aluno.email == '' || aluno.email == undefined || aluno.data_nascimento == '' || aluno.data_nascimento == undefined ){
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS};
    
    //validação para verificar email válido
    } else if(!aluno.email.includes('@')){
        return {status: 400, message: MESSAGE_ERROR.INVALID_EMAIL};
    } else {

        //import da model de launo
        const novoAluno = require('../model/DAO/aluno.js');
        const novoAlunoCurso = require('../model/DAO/aluno_curso.js');

        //Chama a função para inserir um novo aluno (NA = Novo Aluno)
        const resultNA = await novoAluno.insertAluno(aluno);

        //Verifica se os dados do novo aluno foram inseridos no BD
        if (resultNA) {
            //Chama a função que verifica qual o id gerado para o novo aluno
            const idNovoAluno = await novoAluno.selectLastID();

            // console.log(idNovoAluno);

            if (idNovoAluno > 0) {

                //Cria um objeto JSON
                let alunoCurso = {};
                
                //Variável para armazenar o ano corrente completo
                let anoMatricula = new Date().getFullYear();

                //Cria a matrícula do aluno (id_aluno + id_curso + ano corrente).
                let numeroMatricula = `${idNovoAluno}${aluno.curso[0].id_curso}${anoMatricula}`; 

                //Cria um objeto JSON com todas as chaves e valores
                alunoCurso.id_aluno = idNovoAluno;
                alunoCurso.id_curso = aluno.curso[0].id_curso;
                alunoCurso.matricula = numeroMatricula;
                alunoCurso.status_aluno = 'Cursando';

                //Chama a função para inserir na tabela alunoCurso
                const resultNovoAlunoCurso = await novoAlunoCurso.insertAlunoCurso(alunoCurso);

                console.log(resultNovoAlunoCurso);

                if (resultNovoAlunoCurso) {
                    return {status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM};
                } else {
                    //Caso ocorra um erro nesse processo, obrigatóriamente deverá ser excluído do banco de dados o registro do aluno
                    excluirAluno(idNovoAluno)
                    return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
                }
            } else {
                //Caso ocorra um erro nesse processo, obrigatóriamente deverá ser excluído do banco de dados o registro do aluno
                excluirAluno(idNovoAluno)
                return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
            }
        } else {
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
        }

    }

}

const atualizarAluno = async function(aluno){

    // console.log(aluno);
    //Validação para o ID como campo obrigatório
    if(aluno.id == '' || aluno.id == undefined){
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID};
    }
    //Validação de campos obrigatórios
    else if(aluno.nome == '' || aluno.nome == undefined || aluno.foto == '' || aluno.foto == undefined || aluno.rg == '' || aluno.rg == undefined ||  aluno.cpf== '' || aluno.cpf == undefined || aluno.email == '' || aluno.email == undefined || aluno.data_nascimento == '' || aluno.data_nascimento == undefined ){
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS};
    
    //validação para verificar email válido
    } else if(!aluno.email.includes('@')){
        return {status: 400, message: MESSAGE_ERROR.INVALID_EMAIL};
    } else {

        //import da model de launo
        const attAluno = require('../model/DAO/aluno.js');

        //Chama a função para atualizar um novo aluno
        const result = await attAluno.updateAluno(aluno);

        if (result) {
            return {status: 200, message: MESSAGE_SUCCESS.UPDATE_ITEM};
        } else {
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
        }
    }
}

const excluirAluno = async function(id){

    //Validação de id
    if(id != '' && id != undefined){

        //Verificando se o ID exeste no BD
        const aluno = await buscarAluno(id)

        //Valida se foi encontrado um registro válido
        if (aluno) {

            const apagarAluno = require('../model/DAO/aluno.js');

            const result = await apagarAluno.deleteAluno(id);

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

const listarAluno = async function(){
    let dadosAlunosJSON = {};
    // let alunosCursoArray = [];

    const { selectAllAlunos } = require('../model/DAO/aluno.js');
    const { selectAlunoCurso } = require('../model/DAO/aluno_curso.js');

    const dadosAlunos = await selectAllAlunos();


    if (dadosAlunos) {

        const alunosCursoArray = dadosAlunos.map(async itemAluno => {
            //Busca os dados referentes ao curso do aluno
            const dadosAlunoCurso = await selectAlunoCurso(itemAluno.id);

            if (dadosAlunoCurso) {
                //Acrescenta uma chave 'curso' e coloca os dados do curso do aluno
                itemAluno.curso = dadosAlunoCurso;
            } else {
                itemAluno.curso = 'o curso deste aluno não foi encontrado';
            }

            return itemAluno;

        });

        dadosAlunosJSON.alunos = await Promise.all(alunosCursoArray);
        return dadosAlunosJSON;

    } else {
        return MESSAGE_ERROR.NOT_FOUND_DB;
    }
}

//Função que retorna um registro baseado no ID
const buscarAluno = async function(id) {

    if (id != '' && id != undefined) {
        
        let dadosAlunosJSON = {};

        //Import das models aluno e alunoCurso
        const { selectByIdAlunos } = require('../model/DAO/aluno.js');
        const { selectAlunoCurso } = require('../model/DAO/aluno_curso.js');

        const dadosAlunos = await selectByIdAlunos(id);

        if (dadosAlunos) {

            //Busca os dados referente ao curso do aluno
            const dadosAlunoCurso = await selectAlunoCurso(id);

            if (dadosAlunoCurso) {

                //Adiciona a chave curso dentro do objeto de dados do aluno e acrescenta os dados do curso do aluno
                dadosAlunos[0].curso = dadosAlunoCurso;

                dadosAlunosJSON.aluno = dadosAlunos;

                return dadosAlunosJSON;
            } else {
                dadosAlunosJSON.aluno = dadosAlunos;
                return dadosAlunosJSON;
            }
        } else {
            return false;
        }
    } else {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    }
}
// console.log(listarAluno())
module.exports = {
    listarAluno,
    novoAluno,
    atualizarAluno,
    excluirAluno,
    buscarAluno
}