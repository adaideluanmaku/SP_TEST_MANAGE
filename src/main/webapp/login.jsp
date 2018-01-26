<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" isELIgnored="false"%>
	<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    <%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%> 
<html>
<head>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery.min.js"></script>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/easyui/themes/default/easyui.css">
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/easyui/themes/icon.css">
<script type="text/javascript" src="${pageContext.request.contextPath}/easyui/jquery.easyui.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/easyui/themes/locale/easyui-lang-zh_CN.js"></script>

<script type="text/javascript" src="${pageContext.request.contextPath}/chsharework/check/textcheck.js"></script>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/chcss/login.css"/>
<script type="text/javascript" src="${pageContext.request.contextPath}/chjs/login.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>TEST-MANAGE</title>
</head>
<body>
<input id="addurl" type="hidden" value="${pageContext.request.contextPath}">
<div class="doc">
	<div class="logo_text">
		<h1>TEST-MANAGE</h1>
		<form id="denglu_form" action="${pageContext.request.contextPath}/login/denglu" method="POST" onkeydown="loginkey()">
			<table cellspacing="10" style="margin-bottom: 20px">
				<tr>
					<td style="text-align: left; width:80px">
						<div>登录名：</div>
					</td>
					<td style=" width:200px">
						<input id="loginname" name="loginname" type="text" value="">
					</td>
				</tr>
				<tr>
					<td>
						<div>密码：</div>
					</td>
					<td>
						<input id="password" name="password" type="password" value="">
					</td>
				</tr>
			</table>
			<a href="#" id="login" class="easyui-linkbutton" data-options="iconCls:'icon-ok',width:200,height:30">登录</a>
			<a href="#" id="zhuce" class="easyui-linkbutton" data-options="width:90,height:30">注册</a>
			<div id="err">${err}</div>
		</form>
	</div>
	<div id="zhuce_dialog" class="zhuce_dialog" style="text-align: center;">
		<form id="zhuce_form">
			<table cellspacing="15">
				<tr>
					<td style="width:100px">
						登录名：
					</td>
					<td style="width:100px">
						<input id="loginname" name="loginname" class="easyui-validatebox" required="true" validType="remote['${pageContext.request.contextPath}/login/checkloginname','loginname']"/>
					</td>
				</tr>
				<tr>
					<td>
						姓名：
					</td>
					<td>
						<input id="username" name="username" class="easyui-validatebox" required="true" validType="length[0,100]"/>
					</td>
				</tr>
				<tr>
					<td>
						密码：
					</td>
					<td>
						<input id="password" name="password" class="easyui-validatebox" required="true" validType="length[0,100]"/>
					</td>
				</tr>
			</table>
		</form>
		<div id="err"></div>
	</div>
</div>
</body>
</html>