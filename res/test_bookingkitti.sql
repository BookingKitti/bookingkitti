
insert into HotelInfo values(35 ,'RuJia','Guangdong','Shenzhen','Luohu',5,'Nice','30624700');
insert into HotelInfo values(36 ,'Hanting','Zhejiang','Shenzhen','Luohu',5,'Nice','30624700');
insert into HotelInfo values(37 ,'Jingson','Guangdong','Shenzhen','Luohu',5,'Nice','30624700');
insert into HotelInfo values(38 ,'Shengfeng','Guangdong','Shenzhen','Luohu',5,'Nice','30624700');
insert into HotelInfo values(39 ,'Heyi','Guangdong','Shenzhen','Luohu',5,'Nice','30624700');

create table RoomType(
 Hotel_ID int,
 Type char(10),
 Details text,
 Total int,
 foreign key(Hotel_ID) references HotelInfo(Hotel_ID)
);

insert into RoomInfo values(35, 'HIGH', '2016/03/03', 12, 800.0);
insert into RoomInfo values(35, 'MEDIUM', '2016/03/03', 12, 600.0);
insert into RoomInfo values(35, 'LOW', '2016/03/03', 12, 300.0);

insert into RoomInfo values(36, 'HIGH', '2016/03/03', 12, 1000.0);
insert into RoomInfo values(36, 'MEDIUM', '2016/03/03', 12, 700.0);
insert into RoomInfo values(36, 'LOW', '2016/03/03', 12, 200.0);

insert into RoomType values(35, 'HIGH', 'good', 80);
insert into RoomType values(35, 'MEDIUM', 'bad', 50);
insert into RoomType values(35, 'LOW', 'medium', 100);

