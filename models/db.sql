CREATE DATABASE itemport;

CREATE TABLE users(
  user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_name VARCHAR(255) UNIQUE NOT NULL,
  user_profile TEXT,
  user_image VARCHAR(255), -- url to image stored in local files
  user_email VARCHAR(255) UNIQUE NOT NULL,
  user_password VARCHAR(255) NOT NULL,
  user_registered TIMESTAMP, 
  user_last_login TIMESTAMP DEFAULT NULL
);

CREATE TABLE carts (
  cart_id PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users (user_id) ON DELETE CASCADE
);

CREATE TABLE cart_items (
  item_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  cart_id uuid REFERENCES carts (cart_id) ON DELETE CASCADE,
  product_id uuid REFERENCES products (product_id)
);

CREATE TABLE products (
  product_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_name varchar(255) NOT NULL,
  product_summary varchar(255),
  product_image varchar(255) -- url to image stored in local files
);

--