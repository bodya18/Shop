create database shop;
use shop;
create table product
(
	title varchar(255) not null,
    id int auto_increment primary key not null,
    article int not null,
    image varchar(255) not null    
);

create table dimensionProduct
(
	dimension varchar(255) not null,
    id int auto_increment primary key not null,
    count int not null,
    price int not null,
    productId int not null,
    FOREIGN KEY (productId)  REFERENCES product (id) on delete cascade
);

create table _order
(
	number varchar(255) not null,
    address varchar(255) not null,
    id int auto_increment primary key not null,
    dimensionProductId int not null,
    FOREIGN KEY (dimensionProductId)  REFERENCES dimensionProduct (id) on delete cascade
);