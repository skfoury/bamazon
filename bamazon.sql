drop database if exists bamazon;

create database bamazon;

use bamazon;

create table products(
	item_id INT NOT NULL,
    product_name VARCHAR(100) NULL,
    department_name VARCHAR(100) NULL,
    price INT NOT NULL,
    stock_quantity INT,
    PRIMARY KEY (item_id)
);

insert into products(item_id,product_name,department_name,price,stock_quantity)
values (1,'Fortnite 2 trailer DVD (totally legit)','the dark web',5000,2),(2,'Pokeball','Pokemon Center',200,500),(3,'2014 FIFA World Cup genuine soccer ball','Brazilian Soccer House',600,1),(4,'Used N64','Retro Games HQ',50,24),(5,'Musket used in the Revolutionary War','private collection',30000,1),(6,'GameSphere (its spherical)','GameStart',300,2000),(7,'Allosaurus Skeleton','private collection',1000000,1),(8,'Fortnite 3 trailer VHS (even more legit)','the darker web',10000,3),(9,'Boston Bruins 2011 Stanley Cup Champions Pennant','Hockey Emporium',15,5),(10,'Rare Coca-Cola can from 1964','AntiquesUSA',30,6);

SELECT * FROM products;