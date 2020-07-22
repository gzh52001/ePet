# Host: localhost  (Version: 5.5.53)
# Date: 2020-07-22 18:55:55
# Generator: MySQL-Front 5.3  (Build 4.234)

/*!40101 SET NAMES utf8 */;

#
# Structure for table "mms_user"
#

DROP TABLE IF EXISTS `mms_user`;
CREATE TABLE `mms_user` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

#
# Data for table "mms_user"
#

/*!40000 ALTER TABLE `mms_user` DISABLE KEYS */;
INSERT INTO `mms_user` VALUES (1,'K5','z123456');
/*!40000 ALTER TABLE `mms_user` ENABLE KEYS */;
