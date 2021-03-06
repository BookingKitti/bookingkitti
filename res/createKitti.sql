use paykitty;

create table UserAccount(
  AccountID int primary key auto_increment
);

create table TicketsInfo(
  AirTicket_ID int primary key auto_increment,
  Flight_Company varchar(50),
  Flight_No char(6) not null,
  Departure varchar(50) not null,
  #Airport varchar(50) not null,
  Stopover varchar(50),
  Destination varchar(50) not null,
  Depart_time datetime not null,
  Stopover_time datetime,
  Arrive_time datetime not null,
  Total int not null,#>=0
  Available int not null,#>=0
  Price int not null, #>=0
  Discount decimal(3, 2),
  Seller_ID int
) DEFAULT CHARSET=utf8;

create table HotelInfo(
  Hotel_ID int primary key auto_increment,
  Hotel_Name varchar(20) not null,
  Province varchar(20) not null,
  City varchar(20) not null,
  Address varchar(20) not null,
  Stars int not null,
  Description text not null,
  PhoneNumber varchar(20) not null,
  Discount decimal(3, 2),
  Score float,
  Heat int,
  Seller_ID int
) DEFAULT CHARSET=utf8;

create table RoomType(
 Hotel_ID int,
 Type char(100),
 Details text not null,
 Total int not null,
 primary key (Hotel_ID, Type),
 foreign key(Hotel_ID) references HotelInfo(Hotel_ID) on delete cascade
) DEFAULT CHARSET=utf8;

create table RoomInfo(
 Hotel_ID int,
 Type char(100),
 Room_date date,
 Available int,
 Price float,
 primary key (Hotel_ID, Type, Room_date),
 foreign key(Hotel_ID) references HotelInfo(Hotel_ID) on delete cascade
) DEFAULT CHARSET=utf8;

create table HotelPics(
	Hotel_ID int,
	File_Pos varchar(40),
	primary key (Hotel_ID, File_Pos),
	foreign key(Hotel_ID) references HotelInfo(Hotel_ID) on delete cascade
) DEFAULT CHARSET=utf8;


create table RoomTypePics(
	Hotel_ID int,
	Type char(100),
	File_Pos varchar(40),
	primary key (Hotel_ID, Type, File_Pos),
	foreign key(Hotel_ID, Type) references RoomType(Hotel_ID, Type) on delete cascade
) DEFAULT CHARSET=utf8;

create table HotelComments(
  Comment_ID int primary key auto_increment, #add comment id
  Hotel_ID int,
  Scores float,
  Account_ID int,
  Comments text,
  foreign key(Account_ID) references UserAccount(AccountID) on delete cascade,
  foreign key(Hotel_ID) references HotelInfo(Hotel_ID) on delete cascade
) DEFAULT CHARSET=utf8;


create table HotelOrderHistory(
  User_ID int,
  Hotel_ID int,
  Finish_Time datetime,
  price float,
  primary key (User_ID, Hotel_ID, Finish_Time),
  foreign key(Hotel_ID) references HotelInfo(Hotel_ID) on delete cascade
) DEFAULT CHARSET=utf8;

create table AirTicketOrderHistory(
  User_ID int,
  AirTicket_ID int,
  Finish_Time datetime,
  price float,
  primary key (User_ID, AirTicket_ID, Finish_Time),
  foreign key(AirTicket_ID) references TicketsInfo(AirTicket_ID) on delete cascade
) DEFAULT CHARSET=utf8;

















delimiter //
CREATE TRIGGER trig_ticketsinfo_check BEFORE INSERT ON TicketsInfo
FOR EACH ROW BEGIN
IF NEW.Total < 0 || NEW.Available < 0 || NEW.Price < 0 THEN
insert into TicketsInfo values('1');#set a random error sql sentence to generate an error
END IF;
END //

CREATE TRIGGER trig_hotelinfo_check BEFORE INSERT ON HotelInfo
FOR EACH ROW BEGIN
IF NEW.Stars < 0 || NEW.Stars > 5 THEN
insert into HotelInfo values('1');#set a random error sql sentence to generate an error
END IF;
END //

CREATE TRIGGER trig_roomtype_check BEFORE INSERT ON RoomType
FOR EACH ROW BEGIN
IF NEW.Total < 0 THEN
insert into RoomType values('1');#set a random error sql sentence to generate an error
END IF;
END //

CREATE TRIGGER trig_roominfo_check BEFORE INSERT ON RoomInfo
FOR EACH ROW BEGIN
IF NEW.Available < 0 || NEW.Price < 0 THEN
insert into RoomType values('1');#set a random error sql sentence to generate an error
END IF;
END //

CREATE TRIGGER trig_hotelcomments_check BEFORE INSERT ON HotelComments
FOR EACH ROW BEGIN
IF NEW.Scores <= 0 || NEW.Scores > 5.0 THEN
insert into TicketsComments values('1');#set a random error sql sentence to generate an error
END IF;
END //

CREATE TRIGGER trig_hotel_avail_check BEFORE UPDATE ON RoomInfo
FOR EACH ROW BEGIN
IF NEW.Available < 0 THEN
set NEW.Available = 0;
insert into HotelInfo values('1');
END IF;
END //


CREATE TRIGGER trig_air_avail_check BEFORE UPDATE ON TicketsInfo
FOR EACH ROW BEGIN
IF NEW.Available < 0 THEN
set NEW.Available = 0;
insert into TicketsInfo values('1');
END IF;
END //

CREATE TRIGGER trig_roomtype_pics AFTER INSERT ON RoomType
FOR EACH ROW BEGIN
insert into RoomTypePics values(NEW.Hotel_ID, NEW.Type, 'avatar/zzefault_room.png');
END //

delimiter ;
