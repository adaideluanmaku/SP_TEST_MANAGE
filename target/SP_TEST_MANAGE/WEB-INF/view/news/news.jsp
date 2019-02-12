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

<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/chcss/news/news.css"/>
<script type="text/javascript" src="${pageContext.request.contextPath}/chjs/news/news.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>NEWS</title>
</head>
<body>
<input id="addurl" type="hidden" value="${pageContext.request.contextPath}">
<input id="userid" type="hidden" value="${userid}">
<div class="doc">
	<div class="box_1">
		<div id="view_1" style="background-color: slategray;">案例信息</div>
		<div id="view_2">学习笔记</div>
		<div id="view_3">news</div>
	</div>
	<div class="box_2"></div>
	<!-- 
	<div class="box_3">
		<div class="user_message_1">
			<input type="hidden" id="num" value="">			
		</div>
		
		<div class="user_message_2">
			<div class="message">
				<textarea id="user_message" ></textarea>
			</div>
			<div style="margin-top: 10px">
				<a id="message_in" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-ok',width:100">发送</a>
			</div>
			<div class="message_in_err"></div>
		</div>
	</div>
	 -->
</div>
<!-- 
	<div class="box_1">
		<div id="view_1" style="background-color: slategray;">案例信息</div>
		<div id="view_2">学习笔记</div>
		<div id="view_3">news</div>
	</div>
	<div class="box_2">
	</div>
	<div class="box_3">
		<div class="user_message_1">
			<input type="hidden" id="num" value="">			
		</div>
		<div class="user_message_2">
			<div class="message">
				<textarea id="user_message" style="width:255px;height:100%"></textarea>
			</div>
			<div class="message_in">发送消息</div>
			<div class="message_in_err"></div>
		</div>
	</div>
 -->

</body>
</html>