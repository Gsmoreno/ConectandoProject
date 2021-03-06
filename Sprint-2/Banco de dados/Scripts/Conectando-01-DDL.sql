--DDL
--CRIA��O BANCO DE DADOS (DB)

CREATE DATABASE Conectando;

--UTILIZAR O DB CRIADO
GO
USE Conectando;

--CRIAR AS TABELAS DO BANCO DE DADOS
GO
CREATE TABLE Tags (
	IdTags INT PRIMARY KEY IDENTITY,
	Nome VARCHAR (255) UNIQUE
);
GO
CREATE TABLE Endereco (
	IdEndereco INT PRIMARY KEY IDENTITY,
	UF CHAR (2) NOT NULL,
	Cidade VARCHAR (255) NOT NULL,
	CEP CHAR (8) NOT NULL,
	Bairro VARCHAR (255) NOT NULL,
	Rua VARCHAR (255) NOT NULL,
	Numero VARCHAR (255) NOT NULL,
	Complemento VARCHAR (255)
);
GO
CREATE TABLE Administrador (
	IdAdministrador INT PRIMARY KEY IDENTITY,
	Nome VARCHAR (255) NOT NULL,
	Email VARCHAR (255)NOT NULL UNIQUE,
	Senha VARCHAR (255) NOT NULL,
	RG CHAR (12) NOT NULL UNIQUE,
	CPF CHAR (11) NOT NULL UNIQUE,
	Foto VARCHAR (max)
);
GO
CREATE TABLE Curso (
	IdCurso INT PRIMARY KEY IDENTITY,
	Nome VARCHAR (255) NOT NULL
);
GO
CREATE TABLE Aluno (
	IdAluno INT PRIMARY KEY IDENTITY,
	Nome VARCHAR (255) NOT NULL,
	Email VARCHAR (255)NOT NULL UNIQUE,
	Senha VARCHAR (255) NOT NULL,
	RG CHAR (12) NOT NULL UNIQUE,
	CPF CHAR (11) NOT NULL UNIQUE,
	Foto VARCHAR (max),
	Whatsapp VARCHAR (255) NOT NULL,
	Semestre INT NOT NULL,
	FocoCarreira VARCHAR (255) NOT NULL,
	LinkPortifolio VARCHAR (255),
	NivelExp VARCHAR (255) NOT NULL,
	Deficiencia CHAR (3) NOT NULL,
	DescricaoDeficiencia VARCHAR (255),
	PrefPorte VARCHAR (255) NOT NULL,
	PrefRemoto CHAR (3) NOT NULL,
	PrefContrato VARCHAR (255) NOT NULL,
	IdEndereco INT FOREIGN KEY REFERENCES Endereco(IdEndereco),
	IdCurso INT FOREIGN KEY REFERENCES Curso(IdCurso),
);
GO
CREATE TABLE TagsAluno (
	IdAluno INT FOREIGN KEY REFERENCES Aluno(IdAluno),
	IdTags INT FOREIGN KEY REFERENCES Tags(IdTags),
	PRIMARY KEY CLUSTERED ([IdAluno],[IdTags])
);
GO
CREATE TABLE Empresa (
	IdEmpresa INT PRIMARY KEY IDENTITY,
	RazaoSocial VARCHAR (255) NOT NULL,
	NomeFantasia VARCHAR (255) NOT NULL,
	Email VARCHAR (255)NOT NULL UNIQUE,
	Senha VARCHAR (255) NOT NULL,
	CNPJ CHAR (14) NOT NULL UNIQUE,
	CNAE CHAR (7) NOT NULL UNIQUE,
	Whatsapp VARCHAR (255) NOT NULL,
	PorteEmpresa VARCHAR (255) NOT NULL,
	Foto VARCHAR (max) NOT NULL,
	Situacao INT NOT NULL DEFAULT (0),
	IdEndereco INT FOREIGN KEY REFERENCES Endereco(IdEndereco),
);
GO
CREATE TABLE Vaga (
	IdVaga INT PRIMARY KEY IDENTITY,
	Nome VARCHAR (255) NOT NULL,
	Area VARCHAR (255) NOT NULL,
	NivelExp VARCHAR (255) NOT NULL,
	TipoContrato VARCHAR (255) NOT NULL,
	Remoto CHAR (3) NOT NULL,
	Detalhes VARCHAR (255) NOT NULL,
	Requisitos VARCHAR (255) NOT NULL,
	Horario VARCHAR (255) NOT NULL,
	Salario DECIMAL NOT NULL,
	Beneficios VARCHAR (255) NOT NULL,
	Prazo DATE NOT NULL,
	LimiteAlunos INT,
	Situacao INT NOT NULL DEFAULT (1),
	IdEndereco INT FOREIGN KEY REFERENCES Endereco(IdEndereco),
	IdEmpresa INT FOREIGN KEY REFERENCES Empresa(IdEmpresa),
);
GO
CREATE TABLE TagsVaga (
	IdVaga INT FOREIGN KEY REFERENCES Vaga(IdVaga),
	IdTags INT FOREIGN KEY REFERENCES Tags(IdTags),
	PRIMARY KEY CLUSTERED ([IdVaga],[IdTags])
);
GO
CREATE TABLE Inscricao (
	IdInscricao INT PRIMARY KEY IDENTITY,
	DataInscricao DATE DEFAULT GETDATE(),
	IdAluno INT FOREIGN KEY REFERENCES Aluno(IdAluno),
	IdVaga INT FOREIGN KEY REFERENCES Vaga(IdVaga)
);

<<<<<<< HEAD
DROP DATABASE Conectando;
=======
<<<<<<< HEAD
DROP DATABASE Conectando;


=======
--ATUALIZAR FOTO type

ALTER TABLE Administrador
ALTER COLUMN Foto VARCHAR(max);
GO
ALTER TABLE Aluno
ALTER COLUMN Foto VARCHAR(max);
GO
ALTER TABLE Empresa
ALTER COLUMN Foto VARCHAR(max);

SELECT Foto FROM Aluno;

DROP DATABASE Conectando;
>>>>>>> fcd888da5bccbf5ac88bae5bdff43f38b75a1c21
>>>>>>> d180d8d4278408680bcc7f4e69171ec8630ca7b2
