create table TicketsInfo(
  AirTicket_ID int primary key auto_increment,
  Departure varchar(50),
  Airport varchar(50),
  Destination varchar(50),
  Depart_time datetime,
  Arrive_time datetime,
  Total int,
  Available int,
  Price int);

create table UserAccount(
  AccountID int primary key auto_increment);

create table TicketsComments(
  AirTickets_ID int,
  Score float,
  Account_ID int,
  Comments text,
  foreign key(Account_ID) references UserAccount(AccountID));

create table HotelInfo(
  Hotel_ID int primary key auto_increment,
  Hotel_Name varchar(20) not null,
  Province varchar(20) not null,
  City varchar(20) not null,
  Address varchar(20) not null,
  Stars int not null,
  Description text not null,
  PhoneNumber varchar(20) not null
);

create table RoomType(
 Hotel_ID int,
 Type char(10),
 Details text,
 Total int,
 foreign key(Hotel_ID) references HotelInfo(Hotel_ID)
);

create table RoomInfo(
 Hotel_ID int,
 Type char(10),
 Room_date date,
 Available int,
 Price float,
 foreign key(Hotel_ID) references HotelInfo(Hotel_ID)
);

create table HotelComments(
  Hotel_ID int,
  Scores float,
  Account_ID int,
  Comments text,
  foreign key(Account_ID) references UserAccount(AccountID));
  foreign key(Hotel_ID) references Hote
);
