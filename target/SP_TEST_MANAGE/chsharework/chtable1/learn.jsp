<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" isELIgnored="false" %>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %> 
    <%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery.min.js"></script>

<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/chcss/learn/learn.css"/>
<script type="text/javascript" src="${pageContext.request.contextPath}/chjs/learn/learn.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>LEARN</title>
</head>
<body>
<input id="addurl" type="hidden" value="${pageContext.request.contextPath}">
<div class="tsearch">
	<div class="search_text"><input type="text" id="teamname" placeholder="请在这里输入名称" value=""></div>
	<div class="search_submit"><input type="button" value="查询"></div>
	<div class="search_insert"><input type="button" value="新增"></div>
</div>
<div class="table_box">
	<table class="table">
		<thead class="thead"><tr><th>123</th><th>123</th><th>123</th><th>123</th><th>123</th><th>123</th><th>123</th><th>123</th><th>123</th><th>123</th></tr></thead>
		<tbody class="tbody">
		<c:forEach begin="0" end="10">
		<tr><td>123</td><td>123</td><td>123</td><td>123</td><td>123</td><td>123</td><td>123</td><td>123</td><td>123</td><td>123</td></tr>
		</c:forEach>
		</tbody>
		<tfoot class="tfoot">
			<tr>
        		<td>
	        		<div id="up">上一页</div><div id="down">下一页</div>
	        		<div class="datamsg">
	        		共sss条，每页<input class="datanum" type="text" value="20" >条，
	        		<span id="pagenum">1</span>/<span id="pagecount">sss</span>
	        		</div>
        		</td>
        	</tr>
		</tfoot>
	</table>
</div>
</body>
</html>