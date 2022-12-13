/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* Objetivo:         Arquivo responsável pela manipulação de dados com o Banco de Dados (insert, update, select, delete)
* Autor:            Miguel Antonio
* Data_Criação:     27/10/2022
* Versão:           1.0
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */ 

//Função para listar TODOS os cursos existentes
const selectAllCursos = async function(){

    //Import da classe prismaClient que é responsável pelas interações com o BD
    const { PrismaClient, Prisma } = require('@prisma/client');

    //Instância da classe Prisma Client
    const prisma = new PrismaClient();

    //Criação de um objeto do tipo RecordSet para receber os dados no BD através do script SQL (select)
    const rsCursos = await prisma.$queryRaw `select cast(id as float) as id, nome, icone, carga_horaria, sigla from tbl_curso`;

    // console.log(rsCursos);
    //Verifica se o rsAlunos possui algum conteúdo, se não possuir nada, retorna falso
    if (rsCursos.length > 0) {
        return rsCursos;
    } else {
        return false;
    }

}
// console.log(selectAllCursos());

//Função para selecionar um registro baseado no ID
const selectCursoById = async function(id){

    const { PrismaClient } = require('@prisma/client');

    const prisma = new PrismaClient();

    let sql = `select cast(id as float) as id, nome, icone, carga_horaria, sigla from tbl_curso WHERE id = ${id}`;

    const rsCurso = await prisma.$queryRawUnsafe(sql);

    if (rsCurso.length > 0) {
        return rsCurso;
    } else {
        return false;
    }

}

const insertCurso = async function(curso){
    try {
        
        const { PrismaClient } = require('@prisma/client');
        const prisma = new PrismaClient();

        let sql = `insert into tbl_curso(nome,
                                        icone,
                                        carga_horaria,
                                        sigla)
                                    values(
                                        '${curso.nome}',
                                        '${curso.icone}',
                                        '${curso.carga_horaria}',
                                        '${curso.sigla}');`;

        // console.log(sql);

        const result = await prisma.$executeRawUnsafe(sql);

        if (result) {
            return true;
        } else {
            return flase;
        }

    } catch (error) {
        return false;
    }
};

const updateCurso = async function(curso){
    try {
        
        const {PrismaClient} = require('@prisma/client');
        const prisma = new PrismaClient();

        let sql = `UPDATE tbl_curso
                        SET
                            nome            = '${curso.nome}',
                            icone           = '${curso.icone}',
                            carga_horaria   = '${curso.carga_horaria}',
                            sigla           = '${curso.sigla}'
                        WHERE
                            id = '${curso.id}'`;

        const result = await prisma.$executeRawUnsafe(sql);

        if (result) {
            return true;
        } else {
            return false;
        }

    } catch (error) {
        return false;
    }
};

//Função para deletar um curso
const deleteCurso = async function(id){
    try {   
        const { PrismaClient } = require('@prisma/client');
        const prisma = new PrismaClient();

        let sql = `DELETE from tbl_curso WHERE id = ${id}`;

        // console.log(sql);

        const result = await prisma.$executeRawUnsafe (sql);

        // console.log(result);

        if (result) {
            return true;
        } else {
            return false;
        }

    } catch (error) {
        return false;
    }
}

module.exports = {
    selectAllCursos,
    selectCursoById,
    insertCurso,
    updateCurso,
    deleteCurso
}