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

Date: 2018-02-07 20:02:45
*/


-- ----------------------------
-- View structure for MDC2_DICT_ALLERGEN_VIEW
-- ----------------------------
CREATE OR REPLACE FORCE VIEW "MDC2_DICT_ALLERGEN_VIEW" AS 
SELECT 'chview' AS hiscode ,allercode ,allername, updatedate FROM mc_dict_allergen mda;

-- ----------------------------
-- View structure for MDC2_DICT_COST_ITEM_VIEW
-- ----------------------------
CREATE OR REPLACE FORCE VIEW "MDC2_DICT_COST_ITEM_VIEW" AS 
SELECT 'chview' AS hiscode , mdc.itemcode AS itemcode ,mdc.itemname AS itemname ,3 AS itemtype, mdc.updatedate FROM    mc_dict_costitem mdc;

-- ----------------------------
-- View structure for MDC2_DICT_DEPT_VIEW
-- ----------------------------
CREATE OR REPLACE FORCE VIEW "MDC2_DICT_DEPT_VIEW" AS 
SELECT 'chview'AS hiscode, deptcode, deptname, is_clinic, is_inhosp, is_emergency, updatedate FROM mc_dict_dept;

-- ----------------------------
-- View structure for MDC2_DICT_DISEASE_VIEW
-- ----------------------------
CREATE OR REPLACE FORCE VIEW "MDC2_DICT_DISEASE_VIEW" AS 
SELECT 'chview'AS hiscode, discode, disname,mdd.updatedate FROM mc_dict_disease mdd;

-- ----------------------------
-- View structure for MDC2_DICT_DOCTOR_VIEW
-- ----------------------------
CREATE OR REPLACE FORCE VIEW "MDC2_DICT_DOCTOR_VIEW" AS 
SELECT 'chview'AS hiscode, doctorcode, doctorname, deptcode, deptname, ilevel, doctorlevel, is_clinic, prespriv, ilevel AS antilevel,updatedate FROM mc_dict_doctor;

-- ----------------------------
-- View structure for MDC2_DICT_DRUG_VIEW
-- ----------------------------
CREATE OR REPLACE FORCE VIEW "MDC2_DICT_DRUG_VIEW" AS 
SELECT 'chview'AS hiscode,a.drugcode, c.drug_unique_code, b.drugname, b.drugform, b.drugspec, c.approvalcode, c.comp_name, a.drugtype, a.DRUGGROUPCODE, a.DRUGGROUPNAME, a.DRGGRP_SEARCHCODE, c.doseunit, b.costunit, b.adddate, b.is_use, a.is_anti, a.antitype, a.antilevel, b.ddd, b.dddunit, a.is_basedrug,case when a.DRUGGROUPCODE<100 then 100/(a.DRUGGROUPCODE)+1.4 when a.DRUGGROUPCODE>100 and a.DRUGGROUPCODE<1000 then 1000/(a.DRUGGROUPCODE)+1.7 when  a.DRUGGROUPCODE>1000 and a.DRUGGROUPCODE<10000 then 10000/(a.DRUGGROUPCODE)+1.7 else 10.8 end as unitprice , c.updatedate FROM mc_dict_drug a, mc_dict_drug_sub b, mc_dict_drug_pass c where a.drugcode=b.drugcode and a.drugcode=c.drugcode;

-- ----------------------------
-- View structure for MDC2_DICT_EXAM_VIEW
-- ----------------------------
CREATE OR REPLACE FORCE VIEW "MDC2_DICT_EXAM_VIEW" AS 
SELECT 'chview' AS hiscode,examcode, mde.examname , mde.updatedate FROM mc_dict_exam mde;

-- ----------------------------
-- View structure for MDC2_DICT_FREQUENCY_VIEW
-- ----------------------------
CREATE OR REPLACE FORCE VIEW "MDC2_DICT_FREQUENCY_VIEW" AS 
SELECT 'chview' AS hiscode,mdf.frequency, mdf.updatedate FROM mc_dict_frequency mdf;

-- ----------------------------
-- View structure for MDC2_DICT_LAB_ITEM_VIEW
-- ----------------------------
CREATE OR REPLACE FORCE VIEW "MDC2_DICT_LAB_ITEM_VIEW" AS 
SELECT 'chview' AS hiscode,itemcode, itemname, updatedate FROM mc_dict_labsub;

-- ----------------------------
-- View structure for MDC2_DICT_LAB_VIEW
-- ----------------------------
CREATE OR REPLACE FORCE VIEW "MDC2_DICT_LAB_VIEW" AS 
SELECT 'chview' AS hiscode,labcode, labname, updatedate FROM mc_dict_lab;

-- ----------------------------
-- View structure for MDC2_DICT_OPERATION_VIEW
-- ----------------------------
CREATE OR REPLACE FORCE VIEW "MDC2_DICT_OPERATION_VIEW" AS 
SELECT 'chview' AS hiscode,operationcode,mdo.operationname, mdo.updatedate FROM mc_dict_operation mdo;

-- ----------------------------
-- View structure for MDC2_DICT_ROUTE_VIEW
-- ----------------------------
CREATE OR REPLACE FORCE VIEW "MDC2_DICT_ROUTE_VIEW" AS 
SELECT 'chview' AS hiscode,routecode, routename, updatedate FROM mc_dict_route;