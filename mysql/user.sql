# Host: localhost  (Version: 5.5.53)
# Date: 2020-07-22 18:54:48
# Generator: MySQL-Front 5.3  (Build 4.234)

/*!40101 SET NAMES utf8 */;

#
# Structure for table "user"
#

CREATE TABLE `user` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `userpass` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `age` varchar(255) DEFAULT NULL,
  `feedtime` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT 'https://img2.epetbar.com/dogs/1.jpg',
  PRIMARY KEY (`uid`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

#
# Data for table "user"
#

INSERT INTO `user` VALUES (1,'xiaohonghong','11111','男','12','Mon, 22 Jul 2019 06:24:12 GMT','https://img2.epetbar.com/dogs/1.jpg'),(2,'小呆瓜','111111','女','11',NULL,'https://img2.epetbar.com/dogs/1.jpg'),(3,'lalala','Do4s6/B1oumbXvzF89FoWID5LCdT9ZJedXrOsOV1SFnA344+HW6vVSJZYspsCFs3DK7mp20tlDY+lxgnYCYNaQ7usuRnH8doTOYyJ94vs9K7QUwixT0HABb72SoG/e2kootqZcMrFEOkUIKrSySGo2mXMAs3VqYkgl+JFt09W0g=','男','56',NULL,'http://localhost:6767/uploads/logo-1595294034985.jpg'),(4,'test','mfuc3dJfsPnVe3tWFerj0xkOFW0jxB3lc/ngretynEndydkH7jpBKG0TODfjF6XnDNpeRZyC5ADqi0XAwNM7mqT3HB6PWH/GjXF7XzLtzVZTxpqMJv4AAL9WG1xoL9kITW6c3A2Nn4/7/SoJQR5q/L1iodmThcYTe1LKn2cie6k=','女',NULL,'Mon, 22 Jul 2019 06:24:12 GMT','https://img2.epetbar.com/dogs/1.jpg'),(7,'xxx','A7V/aSopIoPKbGQGIIcIw+OfGfAil7kvRTcwl/6nPhcPJ/a1fl68rkmfroUeHeesccwocVpBL33WUuyZkiUJLoRZM4j23QmxNn/sP6HK2Iwp3MfWJxvwe/hH3Lb6eIESduEgqK/V9iOywbTT7SCnibGLLtxrUzszEaBzoAJAT2I=','男','25','Tue, 21 Jan 2020 07:56:04 GMT','https://img2.epetbar.com/dogs/1.jpg'),(9,'aa222','d41d8cd98f00b204e9800998ecf8427e','女',NULL,NULL,'https://img2.epetbar.com/dogs/1.jpg'),(10,'123','d41d8cd98f00b204e9800998ecf8427e','男','35','Sat, 21 Mar 2020 08:36:11 GMT','https://img2.epetbar.com/dogs/1.jpg'),(12,'lala','d41d8cd98f00b204e9800998ecf8427e','女','45',NULL,'https://img2.epetbar.com/dogs/1.jpg'),(13,'what','d41d8cd98f00b204e9800998ecf8427e','男',NULL,'Sat, 21 Mar 2020 08:36:11 GMT','https://img2.epetbar.com/dogs/1.jpg'),(14,'ssss','d41d8cd98f00b204e9800998ecf8427e','男','33','Mon, 12 Jul 2019 06:24:12 GMT','https://img2.epetbar.com/dogs/1.jpg'),(15,'yaya','2acf01dd1e92b56b76e300eab2c10217','女','21','Tue, 21 Jan 2020 07:56:04 GMT','http://localhost:6767/uploads/logo-1595319988711.jpg'),(16,'Siaa','698d51a19d8a121ce581499d7b701668','女','19','Sat, 21 Mar 2020 08:36:11 GMT','https://img2.epetbar.com/dogs/1.jpg'),(17,'0-7的弓箭手','f379eaf3c831b04de153469d1bec345e','男','29','Mon, 22 Jul 2019 06:24:12 GMT','http://localhost:6767/uploads/no-pic-1595399133040.jpg');
