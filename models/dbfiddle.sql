CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  profile TEXT,
  image VARCHAR(255), -- url to image stored in local files
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT DATE_TRUNC('minute', CURRENT_TIMESTAMP), 
  last_login TIMESTAMP DEFAULT NULL
);

CREATE TABLE carts (
  id SERIAL PRIMARY KEY,                             
  user_id integer REFERENCES users(id) ON DELETE CASCADE UNIQUE -- a user can have only have one cart. Meaning the foreign key must be unique
);

INSERT INTO users (name, email, password)
VALUES ('john', 'john@gmail.com', 'johhny'), ('sarah', 'sarah@gmail.com', 'sarah');

INSERT INTO carts (user_id)
VALUES (1), (2);

CREATE TABLE cart_items (
  id SERIAL PRIMARY KEY,
  cart_id integer REFERENCES carts(id) ON DELETE CASCADE, 
  product_id integer
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  title varchar(255) NOT NULL,
  price money,
  discription varchar(255),
  category varchar(255),
  image varchar(255)
);

INSERT INTO products (name, price)
VALUES ('box', 1.95), ('knife', 7.49), ('ipod', 200.45);

INSERT INTO cart_items (cart_id, product_id)
VALUES (1, 1), (1, 3), (2, 2), (2, 1);