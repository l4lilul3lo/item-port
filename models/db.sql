CREATE DATABASE itemport;

CREATE TABLE users(
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) UNIQUE NOT NULL,
  profile TEXT,
  image VARCHAR(255), -- url
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT DATE_TRUNC('minute', CURRENT_TIMESTAMP), 
  last_login TIMESTAMP DEFAULT NULL
);

CREATE TABLE carts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),                            
  user_id uuid REFERENCES users(id) ON DELETE CASCADE UNIQUE
);


CREATE TABLE cart_items (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  cart_id uuid REFERENCES carts(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id)
);

CREATE TABLE products (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title varchar(255) NOT NULL,
  price money NOT NULL,
  description TEXT,
  category varchar(255),
  image varchar(255) 
);

--