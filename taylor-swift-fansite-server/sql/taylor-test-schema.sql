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

create table app_user (
    app_user_id int primary key auto_increment,
    username varchar(50) not null unique,
    password_hash varchar(2048) not null,
    disabled bit not null default(0)
);

create table app_role (
    app_role_id int primary key auto_increment,
    `name` varchar(50) not null unique
);

create table app_user_role (
    app_user_id int not null,
    app_role_id int not null,
    constraint pk_app_user_role
        primary key (app_user_id, app_role_id),
    constraint fk_app_user_role_user_id
        foreign key (app_user_id)
        references app_user(app_user_id),
    constraint fk_app_user_role_role_id
        foreign key (app_role_id)
        references app_role(app_role_id)
);

delimiter //
create procedure set_known_good_state()
begin

	delete from song;
    alter table song auto_increment = 1;
    delete from gossip;
	alter table gossip auto_increment = 1;
    
insert into song (title,length,youTubeUrl,spotifyUrl,releaseYear) 
values
("Bad Blood", "3:30", "testUrl.com", "testSpotifyUrl.com",2019),
("I Knew You Were Trouble", "3:40", "testUrl.com", "testSpotifyUrl.com", 2018),
("You Belong With Me", "3:20", "testUrl.com", "testSpotifyUrl.com", 2014);

insert into gossip (deets)
values
("Taylor wrote Bad Blood about Kim Kardashian"),
("Taylor dated Taylor Lautner");

end //
-- 4. Change the statement terminator back to the original.
delimiter ;


insert into app_role (`name`) values
    ('USER'),
    ('ADMIN');

-- passwords are set to "P@ssw0rd!"
insert into app_user (username, password_hash, disabled)
    values
    ('john@smith.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 0),
    ('sally@jones.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 0);

insert into app_user_role
    values
    (1, 2),
    (2, 1);

insert into song (title,length,youTubeUrl,spotifyUrl,releaseYear) 
values
("Bad Blood", "3:30", "testUrl.com", "testSpotifyUrl.com",2019),
("I Knew You Were Trouble", "3:40", "testUrl.com", "testSpotifyUrl.com", 2018),
("You Belong With Me", "3:20", "testUrl.com", "testSpotifyUrl.com", 2014);

insert into gossip (deets)
values
("Taylor wrote Bad Blood about Kim Kardashian"),
("Taylor dated Taylor Lautner");
    