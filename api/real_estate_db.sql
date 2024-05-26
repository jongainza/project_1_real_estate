DROP DATABASE IF EXISTS real_estate_db;

CREATE DATABASE real_estate_db;

\c real_estate_db

-- DROP TABLE IF EXISTS user;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(28)  NOT NULL UNIQUE,
    email TEXT   NOT NULL UNIQUE,
    password VARCHAR  NOT NULL,
    registration_date timestamp with time zone ,
    updated_date timestamp with time zone,
    photo TEXT 
   
    
);
-- DROP TABLE IF EXISTS property;

CREATE TABLE property (
    property_id SERIAL PRIMARY KEY,
    title TEXT   NOT NULL,
    info TEXT,
    street TEXT   NOT NULL,
    number TEXT   NOT NULL,
    city TEXT   NOT NULL,
    state TEXT   NOT NULL,
    country TEXT   NOT NULL,
    zip_code INTEGER   NOT NULL,
    price INTEGER   NOT NULL,
    bedrooms INTEGER   NOT NULL,
    bathrooms INTEGER   NOT NULL,
    garage BOOLEAN NOT NULL,
    user_id INTEGER   NOT NULL REFERENCES users ON DELETE CASCADE
    
     );

-- DROP TABLE IF EXISTS images;

    CREATE TABLE images (
    image_id SERIAL PRIMARY KEY,
    property_id INTEGER NOT NULL REFERENCES property ON DELETE CASCADE,
    image_url TEXT NOT NULL
);

-- Create ENUM type
CREATE TYPE bid_state AS ENUM ('active', 'cancelled', 'accepted', 'rejected');
-- DROP TABLE IF EXISTS bid;

CREATE TABLE bid (
    bid_id SERIAL PRIMARY KEY,
    amount INTEGER   NOT NULL,
    bid_date DATE  NOT NULL,
    user_id INTEGER   NOT NULL REFERENCES users ON DELETE CASCADE,
    property_id INTEGER   NOT NULL REFERENCES property ON DELETE CASCADE,
    state bid_state DEFAULT 'active' NOT NULL


);


-- DROP TABLE IF EXISTS transaction;

CREATE TABLE transaction (
    transaction_id SERIAL PRIMARY KEY,
    transaction_date DATE   NOT NULL,
    buyer_id INTEGER   NOT NULL REFERENCES users ON DELETE CASCADE,
    seller_id INTEGER   NOT NULL REFERENCES users ON DELETE CASCADE,
    property_id INTEGER   NOT NULL REFERENCES property ON DELETE CASCADE,
    bid_id INTEGER   NOT NULL REFERENCES bid ON  DELETE CASCADE
);
 




INSERT INTO users 
(username,email,password,registration_date)
VALUES
('jon','jon@gmail.com','jon','2024-03-27'),
('blanca','blanca@gmail.com','blanca','2020-02-27'),
('kerman','kerman@gmail.com','kerman','2021-05-27'),
('star','star@gmail.com','star','2019-10-27');


INSERT INTO property
(title,info,street,number,city,state,country,zip_code,price,bedrooms,bathrooms,garage,user_id)
VALUES
('beutiful house','remodeled house in hystoric district','persifer',1007,'Folsom','California','USA',95630,500000,2,1,true,1),
('american dream','all you can imagine','maple',3005,'Oakland','California','USA',95612,10000000,2,1,true,2),
('kermans playground','kermans fan area','ridley',23,'Orangevale','California','USA',95814,250000000,1,1,false,3),
('retreat house','beutiful pool','linda ave',696,'Oakland','California','USA',95616,30000000,4,3,false,4),
('mans cave','beutiful hause with men dreamed garage','bizkaia',14,'Barakaldp','Vizcaya','Spain' ,94140,500000,4,3,true,1);

INSERT INTO images
(property_id,image_url)
VALUES
(1,'asdas'),
(2,'zvzzv'),
(1,'agdsaf');
-- "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHApBYfk6eJoTBU9FnEvUNLjXhSiX1C14h5Q&s",
-- "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf2J_Ty8QdVqDk_BUwBmo8PRAon9ScV61PHQ&s",
-- "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj_P726zU54J-8QAZM_vis4gVMsx0eIHV1ag&s",
-- "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_qRLt87RaQmXp61Vyp68N1t-rDiKE7JcPK2TNx_AbUJXdoKgiLPQaOr2stg&s",
-- "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH84EF3pmsFhcCpbV6Djzw883TR7o_kTBL8yCTKAuCchRE7kf5LQXcj-HNsg&s",
-- "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvyrEE5AvKuNlzEiyc6f_CCeGaz7VrK8EQqg&s");


INSERT INTO bid
(amount,bid_date,user_id,property_id)
VALUES
(5000000,'2021-05-27',1,1);