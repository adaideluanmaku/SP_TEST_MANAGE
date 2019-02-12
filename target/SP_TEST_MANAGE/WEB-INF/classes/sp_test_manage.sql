/*
Navicat MySQL Data Transfer

Source Server         : 172.18.7.160_3306
Source Server Version : 50718
Source Host           : 172.18.7.160:3306
Source Database       : sp_test_manage

Target Server Type    : MYSQL
Target Server Version : 50718
File Encoding         : 65001

Date: 2018-01-29 09:12:20
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for files
-- ----------------------------
DROP TABLE IF EXISTS `files`;
CREATE TABLE `files` (
  `fileid` int(10) NOT NULL AUTO_INCREMENT,
  `learnid` int(10) DEFAULT NULL,
  `learnfile` longblob,
  PRIMARY KEY (`fileid`)
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for learn
-- ----------------------------
DROP TABLE IF EXISTS `learn`;
CREATE TABLE `learn` (
  `learnid` int(10) NOT NULL AUTO_INCREMENT,
  `learngroupid` int(10) NOT NULL,
  `learnname` varchar(200) NOT NULL,
  `learntext` mediumtext,
  `inserttime` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`learnid`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for learn_type
-- ----------------------------
DROP TABLE IF EXISTS `learn_type`;
CREATE TABLE `learn_type` (
  `learngroupid` int(10) NOT NULL AUTO_INCREMENT,
  `learngroup` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`learngroupid`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for project
-- ----------------------------
DROP TABLE IF EXISTS `project`;
CREATE TABLE `project` (
  `projectid` int(10) NOT NULL AUTO_INCREMENT,
  `projectname` varchar(200) NOT NULL,
  `remark` varchar(200) DEFAULT NULL,
  `teamid` int(10) NOT NULL,
  PRIMARY KEY (`projectid`,`projectname`,`teamid`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for script
-- ----------------------------
DROP TABLE IF EXISTS `script`;
CREATE TABLE `script` (
  `scriptid` int(10) NOT NULL AUTO_INCREMENT,
  `xpath` varchar(1000) DEFAULT NULL,
  `testvalue` text,
  `scripttype` int(10) DEFAULT NULL,
  `scriptname` varchar(200) DEFAULT NULL,
  `step` int(10) DEFAULT NULL,
  `testid` int(10) DEFAULT NULL,
  `testurl` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`scriptid`)
) ENGINE=InnoDB AUTO_INCREMENT=7639 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for seleniumfiles
-- ----------------------------
DROP TABLE IF EXISTS `seleniumfiles`;
CREATE TABLE `seleniumfiles` (
  `fileid` int(10) NOT NULL AUTO_INCREMENT,
  `testid` int(10) DEFAULT NULL,
  `seleniumfile` blob,
  `filename` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`fileid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sys_message
-- ----------------------------
DROP TABLE IF EXISTS `sys_message`;
CREATE TABLE `sys_message` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `userid` int(10) DEFAULT NULL,
  `loginname` varchar(200) DEFAULT NULL,
  `message` varchar(200) DEFAULT NULL,
  `inserttime` varchar(100) DEFAULT NULL,
  `messagestate` int(10) DEFAULT '0',
  `touserid` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1688 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sys_url
-- ----------------------------
DROP TABLE IF EXISTS `sys_url`;
CREATE TABLE `sys_url` (
  `urlid` int(10) NOT NULL AUTO_INCREMENT,
  `url` varchar(200) DEFAULT NULL,
  `urltype` int(10) DEFAULT NULL,
  `modulename` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`urlid`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sys_users
-- ----------------------------
DROP TABLE IF EXISTS `sys_users`;
CREATE TABLE `sys_users` (
  `userid` int(10) NOT NULL AUTO_INCREMENT,
  `loginname` varchar(100) NOT NULL,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `upanddown` int(10) DEFAULT '0',
  `browserpath` varchar(200) DEFAULT NULL,
  `remark` varchar(10000) DEFAULT NULL,
  `pa_screen` varchar(200) DEFAULT NULL,
  `pa_screen_win` varchar(200) DEFAULT NULL,
  `urlid` varchar(200) DEFAULT NULL,
  `state` int(10) DEFAULT '1',
  `level` int(10) DEFAULT '1',
  PRIMARY KEY (`userid`,`loginname`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for team
-- ----------------------------
DROP TABLE IF EXISTS `team`;
CREATE TABLE `team` (
  `teamid` int(10) NOT NULL AUTO_INCREMENT,
  `teamname` varchar(200) NOT NULL,
  `remark` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`teamid`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for testmng
-- ----------------------------
DROP TABLE IF EXISTS `testmng`;
CREATE TABLE `testmng` (
  `testid` int(10) NOT NULL AUTO_INCREMENT,
  `status` int(10) DEFAULT '1',
  `projectid` int(10) NOT NULL,
  `testname` varchar(200) NOT NULL,
  `testno` varchar(200) NOT NULL,
  `testtext` mediumtext,
  `testin` mediumtext,
  `testout` mediumtext,
  `testresult` mediumtext,
  `remark` varchar(200) DEFAULT NULL,
  `inserttime` varchar(100) DEFAULT NULL,
  `userid` int(10) DEFAULT NULL,
  `selenium_share_status` int(10) DEFAULT NULL,
  PRIMARY KEY (`testid`,`projectid`,`testname`)
) ENGINE=InnoDB AUTO_INCREMENT=1286 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for user_message
-- ----------------------------
DROP TABLE IF EXISTS `user_message`;
CREATE TABLE `user_message` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `loginname` varchar(200) DEFAULT NULL,
  `message` text,
  `userid` int(10) DEFAULT NULL,
  `inserttime` varchar(100) DEFAULT NULL,
  `touserid` int(10) DEFAULT NULL,
  `messagestate` int(10) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=465 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for works
-- ----------------------------
DROP TABLE IF EXISTS `works`;
CREATE TABLE `works` (
  `workid` int(10) NOT NULL AUTO_INCREMENT,
  `workname` varchar(200) DEFAULT NULL,
  `worktext` varchar(200) DEFAULT NULL,
  `userid` int(10) DEFAULT NULL,
  `inserttime` varchar(100) DEFAULT NULL,
  `starttime` varchar(100) DEFAULT NULL,
  `endtime` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`workid`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;
