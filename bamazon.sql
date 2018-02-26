DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price INT default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Light Saber", "Weapons", 2500, 49);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("X-Wing", "Vehicles", 12500, 17);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Death Star", "Real Estate", 1900500, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Blaster-Rebel", "Weapons", 450, 111);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Blaster-Imperial", "Weapons", 763, 89);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("T16(discontinued)", "Vehicles", 470, 89);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("T17", "Vehicles", 763, 89);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hoth Base", "Real Estate", 285000, 1);
