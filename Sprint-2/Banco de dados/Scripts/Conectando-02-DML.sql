--DML
--INSERÇÃO DE DADOS NAS TABELAS

--UTILIZAR O DB
USE Conectando;
GO

INSERT INTO Administrador (Nome, Email, Senha, RG, CPF)
VALUES ('ADM','adm@email.com','adm123','121212121212','23232323232');
GO
INSERT INTO Curso (Nome)
VALUES ('Desenvolvimento de sistemas'),
	   ('Redes de computadores'),
	   ('Multimídia')
GO
INSERT INTO Endereco (UF, Cidade, CEP, Bairro, Rua, Numero,Complemento)
VALUES ('SP','São Paulo','01202002','Campos Elíseos','Al. Barão Limeira','539',''),
	   ('SP','São Paulo','01202002','Campos Elíseos','Al. Barão Limeira','539','apto 2'),
	   ('SP','São Paulo','01202002','Campos Elíseos','Al. Barão Limeira','539','bloco D')
GO
INSERT INTO Aluno (Nome, Email, Senha, RG, CPF, Whatsapp, IdCurso, Semestre, FocoCarreira, LinkPortifolio, NivelExp, Deficiencia, PrefPorte, PrefRemoto, PrefContrato, IdEndereco)
VALUES ('FFG','ffg@email.com','ffg123','121212121212','23232323232','11999999999','1','3','FullStack','github.com','Pleno','Não','Grande','Não','Estágio','2');
GO
INSERT INTO Empresa (RazaoSocial, NomeFantasia, Email, Senha, CNPJ, CNAE, Whatsapp, PorteEmpresa, Foto, IdEndereco)
VALUES ('SERVICO NACIONAL DE APRENDIZAGEM INDUSTRIAL - SENAI','SENAI','senai@email.com','senai123','34343434343434', '4545454', '11999999999','Grande','Caminho invalido','1');
GO
INSERT INTO Vaga (Nome, Area, NivelExp, TipoContrato, Remoto, Detalhes, Requisitos, Horario, Salario, Beneficios, Prazo, LimiteAlunos, IdEndereco, IdEmpresa)
VALUES ('Backend C#','Desenvolvimento de sistemas','Pleno','Estágio','Não','A discutir no whats','Conhecimento em C#;Trabalho em equipe','09:00 às 15:00','1000.00','VR;VA','2020-12-30','100','3','1');
GO
INSERT INTO Tags (Nome)
VALUES ('HTML'),
	   ('CSS'),
	   ('JavaScript'),
	   ('ReactJS'),
	   ('React-Native'),
	   ('C#'),
	   ('ASP.NET'),
	   ('Cloud'),
	   ('Game');
GO
INSERT INTO TagsAluno (IdAluno, IdTags)
VALUES ('1','1'),
	   ('1','2'),
	   ('1','3'),
	   ('1','4'),
	   ('1','6'),
	   ('1','7');
GO
INSERT INTO TagsVaga (IdVaga, IdTags)
VALUES ('1','1'),
	   ('1','2'),
	   ('1','6'),
	   ('1','7');
GO