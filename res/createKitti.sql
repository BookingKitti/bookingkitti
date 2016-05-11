create table TicketsInfo(
  AirTicket_ID int primary key auto_increment,
  Departure varchar(50) not null,
  Airport varchar(50) not null,
  Destination varchar(50) not null,
  Depart_time datetime not null,
  Arrive_time datetime not null,
  Total int not null,
  Available int not null,
  Price int not null
) DEFAULT CHARSET=utf8;

create table UserAccount(
  AccountID int primary key auto_increment
) DEFAULT CHARSET=utf8;

create table TicketsComments(
  AirTickets_ID int,
  Score float not null,
  Account_ID int not null,
  Comments text not null,
  foreign key(Account_ID) references UserAccount(AccountID)
) DEFAULT CHARSET=utf8;

create table HotelInfo(
  Hotel_ID int primary key auto_increment,
  Hotel_Name varchar(20) not null,
  Province varchar(20) not null,
  City varchar(20) not null,
  Address varchar(20) not null,
  Stars int not null,
  Description text not null,
  PhoneNumber varchar(20) not null
) DEFAULT CHARSET=utf8;

create table RoomType(
 Hotel_ID int,
 Type char(10),
 Details text not null,
 Total int not null,
 primary key (Hotel_ID, Type),
 foreign key(Hotel_ID) references HotelInfo(Hotel_ID)
) DEFAULT CHARSET=utf8;

create table RoomInfo(
 Hotel_ID int,
 Type char(10),
 Room_date date,
 Available int,
 Price float,
 foreign key(Hotel_ID) references HotelInfo(Hotel_ID)
) DEFAULT CHARSET=utf8;

create table HotelPics(
	Hotel_ID int,
	File_Pos varchar(40),
	primary key (Hotel_ID, File_Pos),
	foreign key(Hotel_ID) references HotelInfo(Hotel_ID)
) DEFAULT CHARSET=utf8;


create table RoomTypePics(
	Hotel_ID int,
	Type char(10),
	File_Pos varchar(40),
	primary key (Hotel_ID, Type, File_Pos),
	foreign key(Hotel_ID, Type) references RoomType(Hotel_ID, Type)
) DEFAULT CHARSET=utf8;



create table HotelComments(
  Hotel_ID int,
  Scores float,
  Account_ID int,
  Comments text,
  foreign key(Account_ID) references UserAccount(AccountID),
  foreign key(Hotel_ID) references HotelInfo(Hotel_ID)
) DEFAULT CHARSET=utf8;
