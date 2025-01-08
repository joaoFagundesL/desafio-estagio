# Demo

[Funcionamento](./demo.mkv)

# Pré-requisitos

- Node.js

- MySQL

# Clonando o repositório

```bash
git clone https://github.com/joaoFagundesL/desafio-estagio
cd desafio-estagio
```

# Criando Database

**Por padrão o user é `root` e a senha é `123`. Você pode alterar essas informações
no arquivo `./config/db.js`**

```mysql
CREATE DATABASE blog_db;
```

Rode o seguinte script para criar a tabela e informações necessárias:

```mysql

-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema blog_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema blog_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `blog_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ;
USE `blog_db` ;

-- -----------------------------------------------------
-- Table `blog_db`.`Blog`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `blog_db`.`Blog` (
  `idBlog` INT(11) NOT NULL AUTO_INCREMENT,
  `publicationDate` DATE NOT NULL,
  `title` VARCHAR(45) NOT NULL,
  `body` VARCHAR(400) NOT NULL,
  PRIMARY KEY (`idBlog`))
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
```

# Instalando dependências

```bash
npm install
```

# Arquivo .env

Crie um arquivo .env com as seguintes config:

```bash
PORT = 5050
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=123
DB_NAME=blog_db
```

Mude o user e password de acordo com as suas credenciais. A porta e o nome do banco
não devem ser alterados.

# Rodar

```bash
npm run server
```
