# Host: localhost  (Version: 5.5.53)
# Date: 2020-07-22 18:55:44
# Generator: MySQL-Front 5.3  (Build 4.234)

/*!40101 SET NAMES utf8 */;

#
# Structure for table "mms_goods"
#

DROP TABLE IF EXISTS `mms_goods`;
CREATE TABLE `mms_goods` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `price` varchar(255) DEFAULT NULL,
  `images` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

#
# Data for table "mms_goods"
#

/*!40000 ALTER TABLE `mms_goods` DISABLE KEYS */;
INSERT INTO `mms_goods` VALUES (1,'小狗子123213','50','123'),(4,'小鼠','123','https://123123'),(5,'小牛','123','https://123123'),(6,'小虎','123','https://123123'),(8,'小龙','123','https://123125656656'),(9,'小蛇','123','https://123123'),(14,'小熊仔','15888','https://123123'),(15,'小田鸡','231231','123124124'),(16,'23123131','123123','12313');
/*!40000 ALTER TABLE `mms_goods` ENABLE KEYS */;
