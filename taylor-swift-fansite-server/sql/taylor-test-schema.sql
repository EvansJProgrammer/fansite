drop database if exists taylor_test;
create database taylor_test;
use taylor_test;

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

insert into song (title,length,youTubeUrl,spotifyUrl,releaseYear) 
values
("Bad Blood", "3:30", "testUrl.com", "testSpotifyUrl.com",2019),
("I Knew You Were Trouble", "3:40", "testUrl.com", "testSpotifyUrl.com", 2018),
("You Belong With Me", "3:20", "testUrl.com", "testSpotifyUrl.com", 2014);

insert into gossip (deets)
values
("Taylor wrote Bad Blood about Kim Kardashian"),
("Taylor dated Taylor Lautner")
