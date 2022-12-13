#Mostra todos os databases presentes no BD
show databases;

#Cria um database com o nome seguinte
#create database dbcontatos20222;

#Apaga um database e toda sua estrutura de tabelas e dados.		OBSERVAÇÃO: cuidado com este comando pois, senão especificar qual do database, ele apagará todos os outros presentes
drop database dbcontatos2022_2;


create database db_lion_school;

#Permite ativar a utilização de um database:
use db_lion_school;

#Para mostrar as tabelas de um database, depois de ativar sua utilização, usamos:
show tables;

#Permite criar uma tabela no database, com os dados que deseja guardar;
create table tbl_aluno (
	id int UNSIGNED not null auto_increment primary key,
    nome varchar(80) not null,
    foto varchar(150) not null,
    sexo varchar(1),
    rg varchar(15) not null,
    cpf varchar(18) not null,
    email varchar(256) not null,
    telefone varchar(18),
    celular varchar(18),
    data_nascimento date not null,
    unique index(id)
);

#Caso queira apagar uma tabela, utilizamos o drop table nomeDaTabela;
drop table tbl_aluno;

create table tbl_curso (
	id int UNSIGNED not null auto_increment primary key,
    nome varchar(80) not null,
    icone varchar(150) not null,
    carga_horaria int not null,
    sigla varchar(5) not null,
    unique index(id)
);

create table tbl_aluno_curso(
	id int UNSIGNED not null auto_increment primary key,
    #As chaves estrangeiras devem sempre conter int, not null e UNSIGNED, assim como na tabela que elas vieram
    id_aluno int UNSIGNED not null,
    id_curso int UNSIGNED not null,
    matricula varchar(20) not null,
    status_aluno varchar(1) not null,
    
    #Programação para definir uma chave estrangeira
    foreign key (id_aluno)#Define qual atributo será uma FK
		references tbl_aluno(id),#Define de onde virá a FK
	foreign key (id_curso)
		references tbl_curso(id),
	unique index(id)
);

#Permite visualizar todos os dados de todas as colunas de uma tabela
select * from tbl_aluno;

#
insert into tbl_aluno (nome,
					   foto,
                       sexo,
                       rg,
                       cpf,
                       email,
                       telefone,
                       celular,
                       data_nacimento)
	values ('José da Silva',
			'https://cdn-icons-png.flaticon.com/512/126/126486.png',
            'M',
            '34.456.666-1',
            '300.567.456-23',
            'josé@gmail.com',
            '011 4556-7777',
            '011 9 9765-6660',
            '2000-10-10');#Modelo universal de data: yyyy-mm-dd
            
insert into tbl_aluno   (nome,
					     foto,
                         sexo,
                         rg,
                         cpf,
                         email,
                         telefone,
                         celular,
                         data_nacimento)
	values 				('Maria Santos',
						 'https://cdn.icon-icons.com/icons2/2643/PNG/512/female_woman_person_people_avatar_icon_159366.png',
						 'F',
						 '45.809.142-2',
						 '123.456.789-00',
						 'mariasantos@gamil.com',
						 '011 5543-9170',
						 '011 9 9780-2205',
						 '1999-12-04');
                         
insert into tbl_aluno   (nome,
					     foto,
                         sexo,
                         rg,
                         cpf,
                         email,
                         telefone,
                         celular,
                         data_nascimento)
	values 				('Miguel Antonio',
						 'https://cdn.icon-icons.com/icons2/2643/PNG/512/female_woman_person_people_avatar_icon_159366.png',
						 'M',
						 '29.687.921-4',
						 '425.243.820-42',
						 'migbress12@gmail.com',
						 '011 4164-2076',
						 '011 9 4028-7832',
						 '2005-04-12');
                         

#Permite alterar o valor de um atributo da janela
	#OBS: Sempre devemos especificar qual será o registro que vai sofrer a alteração
	#OBS: Geralmente, sempre será a PK (id)
update tbl_aluno set rg = '19.960.968-4' where id = 1;
select * from tbl_aluno;

#Permite deletar um registro de uma tabela
	#OBS: Sempre especificar o registro que será deletado, ou toda a tabela TODA será deletada, geralmente com a PK
delete from tbl_aluno where id = 1;

select * from tbl_curso;

insert into tbl_curso(nome,
					  icone,
                      carga_horaria,
                      sigla)
			values('001 - Desenvolvimento de Sistemas',
				   'https://image.shutterstock.com/image-vector/api-interface-vector-icon-600w-659203513.jpg',
                   '1200',
                   'DS');

DELETE from tbl_curso WHERE id = '4';

SELECT id from tbl_aluno	#Pede o ID da tbl_aluno
	ORDER BY id DESC		#Ordena o ID em ordem decrescente
    LIMIT 1;				#Limita a quantidade de registros para 1, ou seja, ele recebe apenas o primeiro id, que é qual queremos
    
show databases;





