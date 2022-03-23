/* Be sure to have uuid-ossp extension installed in your database before creating users table: CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; */

CREATE TABLE users(
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) UNIQUE NOT NULL,
  profile TEXT,
  image VARCHAR(255), -- url
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT DATE_TRUNC('minute', CURRENT_TIMESTAMP), 
  last_login TIMESTAMP DEFAULT NULL,
  active BOOLEAN DEFAULT FALSE
);
