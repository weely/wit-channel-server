let users = `create table if not exists users(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  wxchat_id VARCHAR(100) NOT NULL,
  pass VARCHAR(40) NOT NULL,
  PRIMARY KEY ( id )
 );`;

 let services = `create table if not exists services(
  id INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY ( id )
 );`;

 let orders = `create table if not exists orders(
  id INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY ( id )
 );`;