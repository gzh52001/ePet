# Host: localhost  (Version: 5.5.53)
# Date: 2020-07-22 15:58:37
# Generator: MySQL-Front 5.3  (Build 4.234)

/*!40101 SET NAMES utf8 */;

#
# Structure for table "shoplist"
#

CREATE TABLE `shoplist` (
  `uid` int(11) DEFAULT NULL,
  `gid` int(11) NOT NULL,
  `goodname` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `goodqty` int(11) DEFAULT NULL,
  `goodtitle` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `goodprice` int(11) DEFAULT NULL,
  `goodimgurl` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `goodcheck` int(10) DEFAULT NULL,
  PRIMARY KEY (`gid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

#
# Data for table "shoplist"
#

INSERT INTO `shoplist` VALUES (1,105824,'加拿大原装进口 原始猎食渴望 六种鱼肉+美毛专用配方 全犬粮 11.4kg ',10,'加拿大原装进口 原始猎食渴望 六种鱼肉+美毛专用配方 全犬粮 11.4kg ',1180,'https://img2.epetbar.com/nowater/2020-07/20/10/26257a9c97ed9dfff0b9a5a625135506.jpg',0),(1,144363,'加拿大原装进口 爱肯拿Acana 无谷鸭肉巴特利梨配方全犬粮 11.4kg',2,'加拿大原装进口 爱肯拿Acana 无谷鸭肉巴特利梨配方全犬粮 11.4kg',900,'https://img2.epetbar.com/nowater/2020-07/20/09/9e4643228572fed791a39910e3acbd91.jpg',0),(1,167781,'谷登GOLDEN 猫用金装优加化毛膏 排毛球120g',7,'谷登GOLDEN 猫用金装优加化毛膏 排毛球120g',82,'https://img2.epetbar.com/nowater/2020-07/20/11/6a838d2b2538051f5a75988ba9a33db9.jpg',0),(1,210522,'美国原装进口 Instinct生鲜本能 无谷系列 鸡肉配方全犬粮 22.5磅(10.2kg)',4,'美国原装进口 Instinct生鲜本能 无谷系列 鸡肉配方全犬粮 22.5磅(10.2kg)',768,'https://img2.epetbar.com/nowater/2020-07/20/09/a0cc55e9fa091207487d038a9940e843.jpg',0),(1,228327,'加拿大原装进口纽顿 无谷低升糖系列 去骨鳟鱼&三文鱼全龄犬粮 1.82kg',4,'加拿大原装进口纽顿 无谷低升糖系列 去骨鳟鱼&三文鱼全龄犬粮 1.82kg',198,'https://img2.epetbar.com/nowater/2020-07/20/09/9e7d2f8a0f37d5cf88da0f628f629102.jpg',0),(1,250502,'卫仕 猫牛磺酸 复合牛磺酸片 200片',7,'卫仕 猫牛磺酸 复合牛磺酸片 200片',85,'https://img2.epetbar.com/nowater/2020-07/20/11/42763875866ca5aa4414a12958973c70.jpg',0);
