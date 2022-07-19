DROP DATABASE IF EXISTS healthcare_db;
CREATE DATABASE healthcare_db;

CREATE TABLE provider (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL
    address VARCHAR(30) NOT NULL
);

USE healthcare_db; 