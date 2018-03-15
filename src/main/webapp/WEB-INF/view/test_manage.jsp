<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" isELIgnored="false" %>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %> 
    <%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery.min.js"></script>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/easyui/themes/default/easyui.css">
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/easyui/themes/icon.css">
<script type="text/javascript" src="${pageContext.request.contextPath}/easyui/jquery.easyui.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/easyui/themes/locale/easyui-lang-zh_CN.js"></script>

<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/chcss/test_manage.css"/>
<script type="text/javascript" src="${pageContext.request.contextPath}/chjs/test_manage.js"></script>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/chcss/websocket/websocket-connect.css"/>
<script type="text/javascript" src="${pageContext.request.contextPath}/chjs/websocket/websocket-connect.js"></script>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/chcss/userorders/userorders.css"/>
<script type="text/javascript" src="${pageContext.request.contextPath}/chjs/userorders/userorders.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/chjs/loading/loading.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>TEST_MANAGE</title>
</head>
<body>
<input id="addurl" type="hidden" value="${pageContext.request.contextPath}">
<input id="userid" type="hidden" value="${userid}">
<input id="loginname" type="hidden" value="${loginname}">

<div class="doc">
	<div class="hd">
		<div class="menus1">
			<div id="menus1_1">首页<c:out value="${aaa }"></c:out><label id="log" style="color:red;position: absolute;top:-7px;"></label></div>
			<div id="menus1_2">案例</div>
			<div id="menus1_3">学习</div>
			<!-- <div id="menus1_4">PASS</div> -->
			<div id="menus1_7">工作计划<label id="work" style="color:red;position: absolute;top:-7px;"></label></div>
			<div id="menus1_8">聊天室<label id="new" style="color:red;position: absolute;top:-7px;"></label></div>
			<div id="menus1_10">医嘱工具<label id="new" style="color:red;position: absolute;top:-7px;"></label></div>
			<div id="menus1_11">工具箱</div>
		</div>
		<div class="menus2">
			<div id="menus1_9" class="menus1_9">系统广播<label id="new" style="color:red;position: absolute;top:-7px;"></label></div>
			<div>用户:${loginname} </div>
			<div id="menus1_5" class="menus1_5">账号管理</div>
			<div id="menus1_6" class="menus1_6">退出</div>
		</div>
	</div>
	<div class="bd">
		<iframe id="iframe_box" src="${pageContext.request.contextPath}/log/log" frameborder="0" scrolling="no" class="iframe_box" ></iframe>
	</div>
	
	<!-- websocket窗口 -->
	<!-- 用户列表 -->
	<div id="user-div" class="user-div"></div>
	<!-- 聊天窗口 -->
	<div id="websocket-div">
		<input id="touid" type="hidden" value="">
		<div class="websocket-msg">
			<!-- 标题 -->
			<label id="websocket-msg-touser" style="font-size: 20px"></label>
			
			<!-- 内容-->
			<input id="touid" type="hidden" value="">
			<div id="content" class="content"></div>
			<div style="float: left">
				<input id="usermsg" class="easyui-textbox" multiline="true" validType="length[1,10000]" style="width:460px;height:50px; float: left" onkeydown="send_msg(event)">
			</div>
			<div style="width:120px; float:right">
				<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-ok',width:110" onclick="sendMsg()" style="float:right">发送</a>
				<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-ok',width:110" onclick="clearAll()" style="float:right">清空</a>
			</div>
			
		</div>
	</div>
	<!-- 广播窗口 -->
	<div id="broadcast-div">
		<div class="websocket-msg1">
			<!-- 内容-->
			<div id="content1" class="content"></div>
			<c:if test="${loginname=='admin' }">
				<div style="float: left">
					<input id="usermsg1" class="easyui-textbox" multiline="true" validType="length[1,10000]" style="width:460px;height:50px; float: left" onkeydown="send_sysmsg(event)">
				</div>
			
				<div style="width:120px; float:right">
					<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-ok',width:110" onclick="sendsysMsg()" style="float:right">发送</a>
					<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-ok',width:110" onclick="sendsysreload()" style="float:right">强刷用户页面</a>
				</div>
			</c:if>
		</div>
	</div>
	
	<!-- 医嘱窗口 -->
	<div id="orders-div">
	<input id="data_no" type="hidden" name="data_no" value="">
	<table>
		<tr>
			<td><p1 style="color: blue" >(到案例工作目录点击案例读取数据或手动写入数据)<p1></td>
			<td style="width:200px;text-align:left">案例编号：<span id="biaoti" style="font-size:20px;color:red"></span></td>
			<td style="width:200px;text-align:left">机构号：<input id="HospID" class="easyui-textbox" validType="length[1,10000]" style="width:100px;height:25px; "></td>
		</tr>
	</table>
	
	<p>病人基本信息</p>
		<table>
			<tr>
				<td >
					病人号：<input id="PatCode" class="easyui-textbox" validType="length[1,10000]" style="width:100px;height:25px; float: left">
				</td>
				<td>
					门诊/住院号：<input id="InHospNo" class="easyui-textbox" validType="length[1,10000]" style="width:100px;height:25px; float: left">
				</td>
				<td >
					门诊/住院唯一标识：<input id="VisitCode" class="easyui-textbox" validType="length[1,10000]" style="width:100px;height:25px; float: left">
				</td>
				<td >
					姓名：<input id="Name" class="easyui-textbox" validType="length[1,10000]" style="width:100px;height:25px; float: left">
				</td>
			</tr>
			
			<tr>
				<td >
					性别：
					<select id="Sex" class="easyui-combobox" name="PatStatus" style="width:100px;">   
					    <option value="" selected="selected">无</option>   
					    <option value="男">男</option>
					    <option value="女">女</option>   
					    <option value="male">male</option>
					    <option value="female">female</option>
					    <option value="m">m</option>
					    <option value="f">f</option>
					</select>  
				</td>
				<td>
					出生日期：
					<input  id="Birthday" name="Birthday" type= "text" class= "easyui-datebox" style="width:100px;height:25px; float: left">
				</td>
				<td>
					身高cm：<input id="HeightCM" class="easyui-textbox" validType="length[1,10000]" style="width:100px;height:25px; float: left">
				</td>
				<td>
					体重kg：<input id="WeighKG" class="easyui-textbox" validType="length[1,10000]" style="width:100px;height:25px; float: left">
				</td>
			</tr>
			
			<tr>
				<td>
					科室编号：<input id="DeptCode" class="easyui-textbox" validType="length[1,10000]" style="width:100px;height:25px; float: left">
				</td>
				<td>
					科室名称：<input id="DeptName" class="easyui-textbox" validType="length[1,10000]" style="width:100px;height:25px; float: left">
				</td>
				<td>
					医生编号：<input id="DoctorCode" class="easyui-textbox" validType="length[1,10000]" style="width:100px;height:25px; float: left">
				</td>
				<td>
					医生姓名：<input id="DoctorName" class="easyui-textbox" validType="length[1,10000]" style="width:100px;height:25px; float: left">
				</td>
			</tr>
			
			<tr>
				<td>
					病人状态：
					<select id="PatStatus" class="easyui-combobox" name="PatStatus" style="width:100px;">   
					    <option value="1" selected="selected">住院</option>   
					    <option value="2">门诊</option>   
					    <option value="3">急诊</option>  
					    <option value="0">出院</option>  
					</select>  
				</td>
				<td>
					是否哺乳：
					<select id="IsLactation" class="easyui-combobox" style="width:100px;">   
					    <option value="-1" selected="selected">无法获取哺乳状态</option>   
					    <option value="0">不是</option>   
					    <option value="1">是</option>   
					</select>  
				</td>
				<td>
					是否妊娠：
					<select id="IsPregnancy" class="easyui-combobox" style="width:100px;">   
					    <option value="-1" selected="selected">无法获取妊娠状态</option>   
					    <option value="0">不是</option>   
					    <option value="1">是</option>   
					</select>  
				</td>
				<td>
					妊娠开始时间：
					<input  id="PregStartDate" name="PregStartDate" type= "text" class= "easyui-datebox" style="width:100px;height:25px; float: left">
				</td>
			</tr>
			
			<tr>
				<td>
					肝损害程度：
					<select id="HepDamageDegree" class="easyui-combobox" style="width:100px;">   
					    <option value="-1" selected="selected">无法获取肝损害状态</option>   
					    <option value="0">无肝损害</option>   
					    <option value="1">存在肝损害，但损害程度不明确</option> 
					    <option value="2">轻度肝损害</option>   
					    <option value="3">中度肝损害</option>
					    <option value="4">重度肝损害</option>   
					</select> 
				</td>
				<td>
					肾损害程度：
					<select id="RenDamageDegree" class="easyui-combobox" style="width:100px;">   
					    <option value="-1" selected="selected">无法获取肾损害状态</option>   
					    <option value="0">无肾损害</option>   
					    <option value="1">存在肾损害，但损害程度不明确</option> 
					    <option value="2">轻度肾损害</option>   
					    <option value="3">中度肾损害</option>
					    <option value="4">重度肾损害</option>   
					</select> 
				</td>
				<td>
					审查时间：
					<input  id="UseTime" name="UseTime" type= "text" class= "easyui-datebox" style="width:100px;height:25px; float: left">
				</td>
				<td>
					审查模式：<input id="CheckMode" class="easyui-textbox" validType="length[1,10000]" style="width:100px;height:25px; float: left">
				</td>
			</tr>
			
			<tr>
				<td>
					采集：
					<select id="IsDoSave" class="easyui-combobox" style="width:100px;">   
					    <option value="1" selected="selected">采集</option>   
					    <option value="2">不采</option>   
					</select>  
				</td>
				<td>
					年龄：<input id="Age" class="easyui-textbox" validType="length[1,10000]" style="width:100px;height:25px; float: left">
				</td>
				<td>
					费别：<input id="PayClass" class="easyui-textbox" validType="length[1,10000]" style="width:100px;height:25px; float: left">
				</td>
				<td>
					病原学检查：
					<select id="IsTestEtiology" class="easyui-combobox" style="width:100px;">   
					    <option value="0" selected="selected">未做过</option>   
					    <option value="1">做过</option>   
					</select>  
				</td>
			</tr>
			
			<tr>
				<td>
					住院时间：
					<input  id="InHospDate" name="InHospDate" type= "text" class= "easyui-datebox" style="width:100px;height:25px; float: left">
				</td>
				<td>
					出院时间：<input id="OutHospDate" name="OutHospDate" class="easyui-textbox" validType="length[1,10000]" style="width:100px;height:25px; float: left">
				</td>
				<td>
					身份证：<input id="IDCard" class="easyui-textbox" validType="length[1,10000]" style="width:100px;height:25px; float: left">
				</td>
				<td>
					联系方式：<input id="Telephone" class="easyui-textbox" validType="length[1,10000]" style="width:100px;height:25px; float: left">
				</td>
			</tr>
		</table>
		
		<p>过敏原信息</p>
		<table id="aller"></table>
		
		<p>疾病信息</p>
		<table id="dis"></table>
		
		<p>手术信息</p>
		<table id="opr"></table>
		
		<p>药品信息</p>
		<table id="odr"></table>
		
		<p style="background-color: #8991ef">附加信息</p>
		<p>信息类型</p>
		<select id="jsontype" class="easyui-combobox" style="width:100px;">   
		    <option value="1" selected="selected">补充信息</option>   
		    <option value="2">完整的审查输入信息</option>   
		</select>  
		
		<p>任务类型</p>
		<select id="prtasktype" class="easyui-combobox" style="width:100px;">   
		    <option value="0" selected="selected">普通</option>   
		    <option value="1">加急</option>   
		</select>  
		
		<p>补充药品信息</p>
		<table id="druginfo"></table>
		
		<p>补充诊断信息</p>
		<table id="diseaseinfo"></table>
		
		<p>补充历史医嘱信息</p>
		<table id="otherrecipinfo"></table>
		
		<p>补充检查信息</p>
		<table id="examinfo"></table>
		
		<p>补充检验信息</p>
		<table id="labinfo"></table>
		
	</div>
</div>
<!-- 过敏原字典表 -->
<div id="aller_dict">
	<div>
		<input id="aller_search_data" class="easyui-textbox" style="width:300px" prompt="请输入编号......">
		<a id="aller_seach" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search'" >查询</a>  
	</div>
	<div id="db_aller_dict"></div>
</div>

<!-- 疾病字典表 -->
<div id="dis_dict">
	<div>
		<input id="dis_search_data" class="easyui-textbox" style="width:300px" prompt="请输入编号......">
		<a id="dis_seach" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search'" >查询</a>  
	</div>
	<div id="db_dis_dict"></div>
</div>

<!-- 手术字典表 -->
<div id="opr_dict">
	<div>
		<input id="opr_search_data" class="easyui-textbox" style="width:300px" prompt="请输入编号......">
		<a id="opr_seach" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search'" >查询</a>  
	</div>
	<div id="db_opr_dict"></div>
</div>

<!-- 药品字典表 -->
<div id="odr_dict">
	<div>
		<input id="odr_search_data" class="easyui-textbox" style="width:300px" prompt="请输入编号......">
		<a id="odr_seach" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search'" >查询</a>  
	</div>
	<div id="db_odr_dict"></div>
</div>

<!-- 给药途径字典表 -->
<div id="route_dict">
	<div>
		<input id="route_search_data" class="easyui-textbox" style="width:300px" prompt="请输入编号......">
		<a id="route_seach" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search'" >查询</a>  
	</div>
	<div id="db_route_dict"></div>
</div>

<!-- 频次字典表 -->
<div id="fre_dict">
	<div>
		<input id="fre_search_data" class="easyui-textbox" style="width:300px" prompt="请输入编号......">
		<a id="fre_seach" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search'" >查询</a>  
	</div>
	<div id="db_fre_dict"></div>
</div>

<!-- 科室字典表 -->
<div id="dept_dict">
	<div>
		<input id="dept_search_data" class="easyui-textbox" style="width:300px" prompt="请输入编号......">
		<a id="dept_seach" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search'" >查询</a>  
	</div>
	<div id="db_dept_dict"></div>
</div>

<!-- 医生字典表 -->
<div id="doc_dict">
	<div>
		<input id="doc_search_data" class="easyui-textbox" style="width:300px" prompt="请输入编号......">
		<a id="doc_seach" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search'" >查询</a>  
	</div>
	<div id="db_doc_dict"></div>
</div>

<!-- 自定义检验检查表 -->
<div id="user_labitem">
	<div>
		<input id="labitem_search_data" class="easyui-textbox" style="width:300px" prompt="请输入编号......">
		<a id="labitem_seach" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search'" >查询</a>  
	</div>
	<div id="db_user_labitem"></div>
</div>

<!-- 工具箱 -->
<div id="tools-div" style="text-align: center; padding-top: 10px">
	<div>
		<a href="http://172.18.3.146:8087/SP_TEST_TOOLS/All/datatojson" target="1">pa-win审查结果查询</a>
		<p></p><br> 
		<a href="http://172.18.3.146:8098/pass_java_anli" target="1">pass-win测试程序</a>
		
	</div> 
</div>
</body>
</html>