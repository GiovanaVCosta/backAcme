create database db_acme_filmes_ab;

use db_acme_filmes_ab;

CREATE TABLE tbl_filme (
  id INT NOT NULL AUTO_INCREMENT primary key,
  titulo VARCHAR(100) NOT NULL,
  sinopse TEXT NOT NULL,
  data_lancamento DATE NOT NULL,
  data_relancamento DATE NULL,
  duracao TIME NOT NULL,
  foto_capa VARCHAR(150) NOT NULL,
  valor_unitario FLOAT NOT NULL,
  id_classificacao INT NOT NULL,
  FOREIGN KEY (id_classificacao) REFERENCES tbl_classificacao (id)
  );
 
  CREATE TABLE tbl_classificacao (
  id INT NOT NULL AUTO_INCREMENT primary key,
  sigla VARCHAR(2) NOT NULL,
  nome VARCHAR(45) NOT NULL,
  descricao VARCHAR(300) NOT NULL,
  icone VARCHAR(150) NOT NULL
  );
 
  CREATE TABLE tbl_filme_ator (
  id INT NOT NULL AUTO_INCREMENT primary key,
  id_filme INT NOT NULL,
  id_ator INT NOT NULL,
  FOREIGN KEY (id_filme) REFERENCES tbl_filme (id),
  FOREIGN KEY (id_ator) REFERENCES tbl_ator (id)
  );

CREATE TABLE tbl_ator (
  id INT NOT NULL AUTO_INCREMENT primary key,
  nome VARCHAR(100) NOT NULL,
  nome_artistico VARCHAR(100) NULL,
  foto VARCHAR(150) NOT NULL,
  data_nascimento DATE NOT NULL,
  data_falecimento DATE NULL,
  biografia TEXT NULL,
  sexo VARCHAR(1) NOT NULL,
  id_sexo INT NOT NULL,
  FOREIGN KEY (id_sexo) REFERENCES tbl_sexo (id)
  );
 
  CREATE TABLE tbl_filme_genero (
  id INT NOT NULL AUTO_INCREMENT primary key,
  id_filme INT NOT NULL,
  id_genero INT NOT NULL,
  FOREIGN KEY (id_filme) REFERENCES tbl_filme (id),
  FOREIGN KEY (id_genero) REFERENCES tbl_genero (id)
  );
 
  CREATE TABLE tbl_genero (
  id INT NOT NULL AUTO_INCREMENT primary key,
  nome VARCHAR(45) NOT NULL
  );
 
  CREATE TABLE tbl_sexo (
  id INT NOT NULL AUTO_INCREMENT primary key,
  sigla VARCHAR(1) NOT NULL,
  nome VARCHAR(20) NOT NULL
  );
 
  CREATE TABLE tbl_diretor (
  id INT NOT NULL AUTO_INCREMENT primary key,
  nome VARCHAR(45) NOT NULL,
  biografia VARCHAR(45) NULL,
  data_nascimento DATE NOT NULL,
  data_falecimento DATE NULL,
  foto VARCHAR(150) NOT NULL,
  id_sexo INT NOT NULL,
  FOREIGN KEY (id_sexo) REFERENCES tbl_sexo (id)
  );
 
  CREATE TABLE tbl_filme_diretor (
 
  id INT NOT NULL AUTO_INCREMENT primary key,
  diretor_id INT NOT NULL,
  filme_id INT NOT NULL,
 
    FOREIGN KEY (diretor_id) REFERENCES tbl_diretor (id),
    FOREIGN KEY (filme_id) REFERENCES tbl_filme (id)
    );
   
   CREATE TABLE tbl_nacionalidade (
  id INT NOT NULL AUTO_INCREMENT primary key,
  nome VARCHAR(45) NOT NULL
  );
 
CREATE TABLE tbl_ator_nacionalidade (
  id INT NOT NULL AUTO_INCREMENT primary key,
  id_ator INT NOT NULL,
  id_nacionalidade INT NOT NULL,
 
FOREIGN KEY (id_ator) REFERENCES tbl_ator (id),
FOREIGN KEY (id_nacionalidade) REFERENCES tbl_nacionalidade (id)
);
   
CREATE TABLE tbl_diretor_nacionalidade (
  id INT NOT NULL AUTO_INCREMENT primary key,
  id_nacionalidade INT NOT NULL,
  id_diretor INT NOT NULL,
 
    FOREIGN KEY (id_nacionalidade) REFERENCES tbl_nacionalidade (id),
   
    FOREIGN KEY (id_diretor) REFERENCES tbl_diretor (id)
    );
    
       
insert into tbl_nacionalidade(nome)values
('Brasileira'),
('Americana'),
('Mexicana'),
('Francesa'),
('Chinesa'),
('Japonesa'),
('Italiana'),
('Espanhola'),
('Argentina');

insert into tbl_sexo (sigla,nome) values
('F','Feminino'),
('M','Masculino');  

insert into tbl_genero (nome) values
('Ação'),
('Comédia'),
('Drama'),
('Ficção Científica'),
('Fantasia'),
('Romance'),
('Terror'),
('Suspense'),
('Animação'),
('Documentário'),
('Musical'),
('Aventura'),
('Crime'),
('Mistério'),
('Guerra'),
('Histórico'),
('Família');
 
insert into tbl_classificacao(sigla, nome, descricao, icone) values
('L', 'Livre', 'Apropriado para todas as idades.', 'https://img.odcdn.com.br/wp-content/uploads/2022/02/L-AUTO.jpg'),
('10', 'Para maiores de 10 anos', 'Apropriado para maiores de 10 anos.', 'https://img.odcdn.com.br/wp-content/uploads/2022/02/NR10-AUTO.jpg'),
('12', 'Para maiores de 12 anos', 'Apropriado para maiores de 12 anos.', 'https://img.odcdn.com.br/wp-content/uploads/2022/02/NR12-AUTO.jpg'),
('14', 'Para maiores de 14 anos', 'Apropriado para maiores de 14 anos.', 'https://img.odcdn.com.br/wp-content/uploads/2022/02/NR14-AUTO.jpg'),
('16', 'Para maiores de 16 anos', 'Apropriado para maiores de 16 anos.', 'https://img.odcdn.com.br/wp-content/uploads/2022/02/NR16-AUTO.jpg'),
('18', 'Para maiores de 18 anos', 'Apropriado para maiores de 18 anos.', 'https://img.odcdn.com.br/wp-content/uploads/2022/02/NR18-AUTO.jpg');


drop database  db_acme_filmes_ab;


select * from  tbl_filme;
select * from tbl_classificação;
select * from tbl_sexo;
select * from tbl_genero;
select * from tbl_nacionalidade;