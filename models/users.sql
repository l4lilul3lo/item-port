/* Be sure to have uuid-ossp extension installed in your database before creating users table: CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; */

CREATE TABLE users (
  user_id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  user_name varchar(32) UNIQUE NOT NULL,
  email varchar UNIQUE NOT NULL,
  password varchar NOT NULL,
);
