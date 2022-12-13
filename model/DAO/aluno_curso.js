/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Objetivo:        Arquivo responsável pela manipulação de dados com o Banco de Dados (insert, update, select, delete) 
 * Autor:           Miguel Antonio
 * Data_criação:    31/10/2022 (🎃 HALLOWEEN 🎃)                
 * Versão:          1.0
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const insertAlunoCurso = async function(alunoCurso){

    try{

        //import da classe prismaClient que é responsável pelas interações com o BD
        const { PrismaClient } = require('@prisma/client')

        //Instância da classe PrismaClient
        const prisma = new PrismaClient()

        let sql /* Structure Query Language */ = `insert into tbl_aluno_curso (id_aluno, id_curso, matricula, status_aluno)
                                                        values('${alunoCurso.id_aluno}', '${alunoCurso.id_curso}', '${alunoCurso.matricula}', '${alunoCurso.status_aluno}')`;

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

//Função para buscar os dados de curso referentes a um aluno
const selectAlunoCurso = async function(idAluno) {
    //import da classe prismaClient que é responsável pelas interações com o BD
    const { PrismaClient } = require('@prisma/client');

    //Instância da classe PrismaClient
    const prisma = new PrismaClient();

    let sql = `SELECT cast(tbl_curso.id as float) as id_curso, tbl_curso.nome as nome_curso, tbl_curso.sigla as sigla_curso, tbl_curso.carga_horaria, tbl_aluno_curso.matricula, tbl_aluno_curso.status_aluno
                    FROM tbl_aluno
                        INNER JOIN tbl_aluno_curso
                            ON tbl_aluno.id = tbl_aluno_curso.id_aluno
                        INNER JOIN tbl_curso
                            ON tbl_curso.id = tbl_aluno_curso.id_curso
                    WHERE tbl_aluno.id = ${idAluno}`;

    const rsAlunoCurso = await prisma.$queryRawUnsafe (sql);

    if (rsAlunoCurso.length > 0) {
        return rsAlunoCurso;
    } else {
        return false;
    }
}

module.exports = {
    insertAlunoCurso,
    selectAlunoCurso
}