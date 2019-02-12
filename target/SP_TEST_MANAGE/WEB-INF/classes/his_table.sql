/*
Navicat Oracle Data Transfer
Oracle Client Version : 12.2.0.1.0

Source Server         : 172.18.7.154_passpa
Source Server Version : 110200
Source Host           : 172.18.7.154:1521
Source Schema         : PASSPA

Target Server Type    : ORACLE
Target Server Version : 110200
File Encoding         : 65001

Date: 2018-02-07 15:16:42
*/

-- ----------------------------
-- Table structure for T_MC_OUTHOSP_TEMPERATURE
-- ----------------------------
DROP TABLE "T_MC_OUTHOSP_TEMPERATURE";
CREATE TABLE "T_MC_OUTHOSP_TEMPERATURE" (
"HISCODE" NVARCHAR2(128) NULL ,
"CASEID" NVARCHAR2(64) NULL ,
"PATIENTID" NVARCHAR2(32) NULL ,
"VISITID" NVARCHAR2(32) NULL ,
"TAKETIME" NVARCHAR2(20) NULL ,
"TEMPERATURE" NUMBER NULL 
)
LOGGING
NOCOMPRESS
NOCACHE

;