/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Objetivo:        Arquivo responsável pela manipulação de dados com o Banco de Dados (insert, update, select, delete) 
 * Autor:           Miguel Antonio
 * Data_criação:    06/10/2022                
 * Versão:          1.0
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

//Função para inserir um novo registro no BD
const insertAluno = async function(aluno){

    try{

        //import da classe prismaClient que é responsável pelas interações com o BD
        const { PrismaClient } = require('@prisma/client')

        //Instância da classe PrismaClient
        const prisma = new PrismaClient()

        let sql /* Structure Query Language */ = `insert into tbl_aluno (nome,
                                                                         foto,
                                                                         rg,
                                                                         cpf,
                                                                         email,
                                                                         data_nascimento,
                                                                         sexo,
                                                                         telefone,
                                                                         celular)
                                                                         values(
                                                                            '${aluno.nome}',
                                                                            '${aluno.foto}',
                                                                            '${aluno.rg}',
                                                                            '${aluno.cpf}',
                                                                            '${aluno.email}',
                                                                            '${aluno.data_nascimento}',
                                                                            '${aluno.sexo}',
                                                                            '${aluno.telefone}',
                                                                            '${aluno.celular}')`;

        //Executa o script SQL no BD
            //executeRawUnsafe permite encaminhar uma variável contendo o script
        const result = await prisma.$executeRawUnsafe (sql);

        //Verifica se o script foi executado com sucesso no BD
        if (result) {
            return true;
        } else {
            return false;
        }
    } catch(error){
        return false;
    }

}

//Função para atualizar um registro no BD
const updateAluno = async function(aluno){
    try{

        //import da classe prismaClient que é responsável pelas interações com o BD
        const { PrismaClient } = require('@prisma/client')

        //Instância da classe PrismaClient
        const prisma = new PrismaClient()

        let sql /* Structure Query Language */ = `UPDATE tbl_aluno
                                                  SET
                                                      nome              = '${aluno.nome}',
                                                      foto              = '${aluno.foto}',
                                                      rg                = '${aluno.rg}',
                                                      cpf               = '${aluno.cpf}',
                                                      email             = '${aluno.email}',
                                                      data_nascimento   = '${aluno.data_nascimento}',
                                                      sexo              = '${aluno.sexo}',
                                                      telefone          = '${aluno.telefone}',
                                                      celular           = '${aluno.celular}'
                                                  WHERE
                                                    id = '${aluno.id}'`;
        // console.log(sql);
        //Executa o script SQL no BD
            //executeRawUnsafe permite encaminhar uma variável contendo o script
        const result = await prisma.$executeRawUnsafe (sql);

        //Verifica se o script foi executado com sucesso no BD
        if (result) {
            return true;
        } else {
            return false;
        }
    } catch(error){
        return false;
    }

}

//Função para deletar um registro no BD
const deleteAluno = async function(id){
    try{

        const {PrismaClient} = require('@prisma/client');
        const prisma = new PrismaClient();

        let sql = `DELETE from tbl_aluno WHERE id = '${id}'`;

        // console.log(sql);

        const result = await prisma.$executeRawUnsafe (sql);

        if (result) {
            return true;
        } else {
            return false;
        }
    } catch(error){
        return false;
    }
}

//Função para retornar todos os registros do BD
const selectAllAlunos = async function(){

    //import da classe prismaClient que é responsável pelas interações com o BD
    const { PrismaClient } = require('@prisma/client')

    //Instância da classe PrismaClient
    const prisma = new PrismaClient()

    //Criamos um objeto do tipo RecordSet (rsAlunos) para receber os dados no BD através do script SQL (select)
        //Ordena os dados da tabela de forma decrescente (desc).
    const rsAlunos = await prisma.$queryRaw `select cast(id as float) as id, nome, foto, sexo, rg, cpf, email, telefone, celular, data_nascimento from tbl_aluno order by id desc`

    //Verifica se o 'rsAlunos' possuí algum conteúdo, e se não tiver nada nela, a função retorna falso
    if (rsAlunos.length > 0) {
        return rsAlunos
    } else {
        return false
    }
}

//Função para retornar um registro baseado no ID
const selectByIdAlunos = async function(id){

    //import da classe prismaClient que é responsável pelas interações com o BD
    const { PrismaClient } = require('@prisma/client')

    //Instância da classe PrismaClient
    const prisma = new PrismaClient()

    let sql = `select cast(id as float) as id, 
                                            nome, 
                                            foto, 
                                            sexo, 
                                            rg, 
                                            cpf, 
                                            email, 
                                            telefone, 
                                            celular, 
                                            data_nascimento from tbl_aluno WHERE id = '${id}'`;

    //Criamos um objeto do tipo RecordSet (rsAlunos) para receber os dados no BD através do script SQL (select)
    const rsAluno = await prisma.$queryRawUnsafe(sql); 

    //Verifica se o 'rsAlunos' possuí algum conteúdo, e se não tiver nada nela, a função retorna falso
    if (rsAluno.length > 0) {
        return rsAluno
    } else {
        return false
    }
}

//Função para retornar o último id gerado no BD
const selectLastID = async function(){

    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    //
    let sql = `SELECT cast(id as FLOAT) as id FROM tbl_aluno
                    ORDER BY id desc limit 1`;

    const rsAluno = await prisma.$queryRawUnsafe(sql);

    //Verifica se o 'rsAlunos' possuí algum conteúdo, e se não tiver nada nela, a função retorna falso
    if (rsAluno) {
        return rsAluno[0].id;
    } else {
        return false;
    }
}

module.exports = {
    selectAllAlunos,
    insertAluno,
    updateAluno,
    deleteAluno,
    selectByIdAlunos,
    selectLastID
}