drop database if exists taylor;
create database taylor;
use taylor;

create table song(
	id int primary key auto_increment,
    title varchar(50) not null,
    length varchar(10) not null,
    youTubeUrl varchar(200),
    spotifyUrl varchar(200),
    releaseYear int not null
);

create table gossip(
	id int primary key auto_increment,
    deets varchar(2048) not null
);