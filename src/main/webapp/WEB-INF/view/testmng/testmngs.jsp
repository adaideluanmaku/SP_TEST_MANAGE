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

<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/chcss/testmng/testmng.css"/>
<script type="text/javascript" src="${pageContext.request.contextPath}/chjs/testmng/testmng.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/chjs/loading/loading.js"></script>
 
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>TEST_MNG</title>
</head>
<body>
<input id="addurl" type="hidden" value="${pageContext.request.contextPath}">
<div class="doc">
	<div class="box_1">
		<div id="view_1" style="background-color: slategray;">团队维护</div>
		<div id="view_2">项目维护</div>
		<div id="view_3">案例维护</div>
	</div>
	<div id="box_2_1" class="box_2">
		<div class="search" >
			<div style="float: left; margin-right: 10px"><input id="search_data" class="easyui-textbox" style="width:200px" prompt="请输入团队名称"></div>
			<a id="box_search_button" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search'">查询</a>
		</div>
		<!-- 表格 -->
		<div id="box_db"></div>
		<!-- 表格功能按钮 -->
		<div id="button_1">
			<a href="javascript:void(0)" id="add_" class="easyui-linkbutton" iconCls="icon-add" plain="true">Add</a>
			<a href="javascript:void(0)" id="del_" class="easyui-linkbutton" iconCls="icon-remove" plain="true">delete</a>
		</div>
	</div>
	<div id="box_2_2" class="box_2">
		<div class="search" >
			<!-- 下拉单 -->
			<div id="ComboBox" style="float: left; margin-right: 10px"><input id="ComboBox_right" class="easyui-combobox" /></div>
			<div style="float: left; margin-right: 10px"><input id="search_data" class="easyui-textbox" style="width:200px" prompt="请输入项目名称"></div>
			<a id="box_search_button" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search'">查询</a>
		</div>
		<!-- 表格 -->
		<div id="box_db"></div>
		<!-- 表格功能按钮 -->
		<div id="button_2">
			<a href="javascript:void(0)" id="add_" class="easyui-linkbutton" iconCls="icon-add" plain="true">Add</a>
			<a href="javascript:void(0)" id="del_" class="easyui-linkbutton" iconCls="icon-remove" plain="true">delete</a>
		</div>
	</div>
	<div id="box_2_3" class="box_2">
		<div class="search" >
			<!-- 下拉单 -->
			<div id="ComboBox" style="float: left; margin-right: 10px"><input id="ComboBox_right" class="easyui-combobox" /></div>
			<div style="float: left; margin-right: 10px"><input id="search_data" class="easyui-textbox" style="width:200px" prompt="请输入案例名称、案例编号....."></div>
			<a id="box_search_button" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search'">查询</a>
		</div>
		<!-- 表格 -->
		<div id="box_db"></div>
		<!-- 表格功能按钮-->
		<div id="button_3">
			<a href="javascript:void(0)" id="add_" class="easyui-linkbutton" iconCls="icon-add" plain="true">Add</a>
			<a href="javascript:void(0)" id="del_" class="easyui-linkbutton" iconCls="icon-remove" plain="true">delete</a>
			<a href="javascript:void(0)" id="copy_" class="easyui-linkbutton" iconCls="icon-remove" plain="true">copy</a>
			<a href="javascript:void(0)" class="easyui-menubutton" data-options="menu:'#mm_selenium',iconCls:'icon-edit'" >selenium功能</a>
			<a href="javascript:void(0)" class="easyui-menubutton" data-options="menu:'#mm_pa',iconCls:'icon-edit'" >PA功能</a>
			
			<input type="hidden" id="projectid" value="">
			
		</div> 
	</div>
</div>
<div id="mm_selenium" style="width:150px;">
	<a href="javascript:void(0)" id="script_" class="easyui-linkbutton" iconCls="icon-remove" plain="true">selenium-script</a>
	<a href="javascript:void(0)" id="test_" class="easyui-linkbutton" iconCls="icon-remove" plain="true">selenium-testone</a>
	<a href="javascript:void(0)" id="selenium_all_" class="easyui-linkbutton" iconCls="icon-remove" plain="true">selenium_testall</a>
</div>
<div id="mm_pa" style="width:180px;">
	<a href="javascript:void(0)" id="pa_java" class="easyui-linkbutton" iconCls="icon-remove" plain="true">pa-screen-one-java</a>
	<a href="javascript:void(0)" id="pa_screen_redis" class="easyui-linkbutton" iconCls="icon-remove" plain="true">pa-screen-redis</a>
	<a href="javascript:void(0)" id="pa_all" class="easyui-linkbutton" iconCls="icon-remove" plain="true">pa-screen-all</a>
	<a href="javascript:void(0)" id="pa_redis_clear" class="easyui-linkbutton" iconCls="icon-remove" plain="true">pa-screen-redis-clear</a>
	<a href="javascript:void(0)" id="hisdate_to_oracle" class="easyui-linkbutton" iconCls="icon-remove" plain="true">hisdate_to_oracle</a>
	<a href="javascript:void(0)" id="pa_win" class="easyui-linkbutton" iconCls="icon-remove" plain="true">pa-screen-one-win</a>
</div>
<div id="mm_pass" style="width:180px;">
	<a href="javascript:void(0)" id="hisdate_to_oracle" class="easyui-linkbutton" iconCls="icon-remove" plain="true">pass_hisdate_to_oracle</a>
</div>
			
<!-- 对话框 -->
<!-- 区分dialog保存时，0为新增，1为更新 -->
<input id="dialog_type" type="hidden" value="0">
<div id="team_dialog">
	<!-- 文本框 -->
	<div style="margin-bottom:20px; text-align: center; padding-top:10px;">
		<form id="team_form">
		<input id="teamid" type="hidden" name="teamid" value="">
		<table>
			<tr>
				<td style="text-align: left;">
					团队名称 :
				</td>
			</tr>
			<tr>
				<td style="text-align: left;">
					<input id="teamname" name="teamname" class="easyui-textbox" required="true" validType="length[1,100]" style="width:200px;height:32px;">
				</td>
			</tr>
			<tr>
				<td style="text-align: left;">
					<div>备注 : </div>
				</td >
			</tr>
			<tr>
				<td style="text-align: left;">
				 	<input id="remark" name="remark" class="easyui-textbox" multiline="true" style="width:550px;height:100px;">
				</td>
			</tr>
		</table>
		</form>
	</div>
</div>
<!-- 对话框 -->
<div id="project_dialog">
	<!-- 文本框 -->
	<div style="margin-bottom:20px; text-align: center; padding-top:10px;">
		<form id="project_form">
		<input id="projectid" type="hidden" name="projectid" value="">
		<table>
			<tr>
				<td style="text-align: left;">
				<!-- 下拉单 -->
				<input id="ComboBox_right" required="true" name="teamid" class="easyui-combobox"/> 
				</td>
			</tr>
			<tr>
				<td style="text-align: left;">
					<div >项目名称 : </div>
				</td>
			</tr>
			<tr>
				<td style="text-align: left;">
					<input id="projectname" name="projectname" class="easyui-textbox" required="true" validType="length[1,100]" style="width:200px;height:32px;">
				</td>
			</tr>
			<tr>
				<td style="text-align: left;">
					<div>备注 : </div>
				</td >
			</tr>
			<tr>
				<td style="text-align: left;">
				 	<input id="remark" name="remark" class="easyui-textbox" multiline="true" style="width:550px;height:100px;">
				</td>
			</tr>
		</table>
		</form>
	</div>
</div>
<!-- 对话框 -->
<div id="testmng_dialog">
	<!-- 文本框 -->
	<div style="margin-bottom:20px; text-align: center; padding-top:10px;">
		<form id="testmng_form">
		<input id="testid" type="hidden" name="testid" value="">
		<table>
			<tr>
				<td style="text-align: left;">
				<!-- 下拉单 -->
				<input id="ComboBox_right" required="true" name="projectid" class="easyui-combobox"/> 
				</td>
			</tr>
			<tr>
				<td style="text-align: left;">
				<!-- 案例状态 -->
				<select id="ComboBox_status" class="easyui-combobox" name="status" style="width:100px;">   
				    <option value="1">启用</option>   
				    <option value="0">停用</option>   
				</select>  
				</td>
			</tr>
			<tr>
				<td style="text-align: left;">
					<div >selenium公共脚本 : </div>
				</td>
			</tr>
			<tr>
				<td style="text-align: left;">
					<select id="selenium_share_status" class="easyui-combobox" name="selenium_share_status" style="width:100px;">   
				    <option value="0">否</option> 
				    <option value="1">是</option>  
				</select>  
				</td>
			</tr>
			<tr>
				<td style="text-align: left;">
					<div >案例名称 : </div>
				</td>
			</tr>
			<tr>
				<td style="text-align: left;">
					<input id="testname" name="testname" class="easyui-textbox" required="true" validType="length[1,100]" style="width:400px;height:32px;">
				</td>
			</tr>
			<tr>
				<td style="text-align: left;">
					<div>案例编号 :1-1(格式范例)</div>
				</td >
			</tr>
			<tr>
				<td style="text-align: left;">
				 	<input id="testno" name="testno" class="easyui-textbox" multiline="true" required="true" style="width:200px;height:32px;">
				</td>
			</tr>
			<tr>
				<td style="text-align: left;">
					<div>逻辑描述 : </div>
				</td >
			</tr>
			<tr>
				<td style="text-align: left;">
				 	<input id="testtext" name="testtext" class="easyui-textbox" multiline="true" validType="length[1,10000]" style="width:550px;height:100px;">
				</td>
			</tr>
			<tr>
				<td style="text-align: left;">
					<div>输入条件 : </div>
				</td >
			</tr>
			<tr>
				<td style="text-align: left;">
				 	<input id="testin" name="testin" class="easyui-textbox" multiline="true" style="width:550px;height:250px;">
				</td>
			</tr>
			<tr>
				<td style="text-align: left;">
					<div>预期结果 : </div>
				</td >
			</tr>
			<tr>
				<td style="text-align: left;">
				 	<input id="testout" name="testout" class="easyui-textbox" multiline="true" style="width:550px;height:100px;">
				</td>
			</tr>
			<tr>
				<td style="text-align: left;">
					<div>备注 : </div>
				</td >
			</tr>
			<tr>
				<td style="text-align: left;">
				 	<input id="remark" name="remark" class="easyui-textbox" multiline="true" style="width:550px;height:100px;">
				</td>
			</tr>
		</table>
		</form>
	</div>
</div>
<!-- 对话框 -->
<div id="script_dialog">
	<div class="search1" >
		<div style="float: left; margin-right: 10px"><input id="search_data" class="easyui-textbox" style="width:200px" prompt="请输入脚本名称"></div>
		<a id="box_search_button" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search'">查询</a>
		<a id="selenium_button" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-save'">上传selenium脚本</a>
		<a id="selenium_button1" href="" class="easyui-linkbutton" data-options="iconCls:'icon-save'">下载selenium脚本</a>
		<a id="selenium_button2" href="" class="easyui-linkbutton" data-options="iconCls:'icon-save'">删除selenium脚本</a>
	</div>
	<!-- 表格 -->
	<div id="box_db"></div>
	<!-- 表格功能按钮-->
	<div id="button_4">
		<a href="javascript:void(0)" id="add_" class="easyui-linkbutton" iconCls="icon-add" plain="true">Add</a>
		<a href="javascript:void(0)" id="del_" class="easyui-linkbutton" iconCls="icon-remove" plain="true">delete</a>
	</div> 
</div>
 
<div id="script_dialog_1">
	<div style="margin-bottom:20px; text-align: center; padding-top:10px;">
		<form id="script_form">
		<input type="hidden" id="testid" name="testid" value="">
		<input type="hidden" id="scriptid" name="scriptid" value="">
		<table>
			<tr>
				<td style="text-align: left;">
					<input id="ComboBox_right" required="true" name="scripttype" class="easyui-combobox"/> 
				</td>
				<td style="text-align: left;">
					<a id="selenium_link" href="#" onClick="selenium_link()" class="easyui-linkbutton" data-options="iconCls:'icon-search'">选择关联selenium案例</a>  
				</td>
			</tr>
		</table>
		<table>
			<tr>
				<td style="text-align: left;">
					<div >脚本状态 : </div>
				</td>
			</tr>
			<tr>
				<td style="text-align: left;">
					<select id="scriptstatus" class="easyui-combobox" name="scriptstatus" style="width:200px;">   
					    <option value="0">停用</option>   
					    <option value="1">启用</option>
					</select>  
				</td>
			</tr>
			<tr>
				<td style="text-align: left;">
					<div >案例编号 : </div>
				</td>
			</tr>
			<tr>
				<td style="text-align: left;">
					<input id="testno" name="testno" class="easyui-textbox" required="true" style="width:200px;height:32px;" readonly="true" >
				</td>
			</tr>
			<tr>
				<td style="text-align: left;">
					<div>步骤 :(只能写数字) </div>
				</td >
			</tr>
			<tr>
				<td style="text-align: left;">
				 	<input id="step" name="step" class="easyui-textbox" multiline="true" style="width:200px;height:32px;">
				</td>
			</tr>
			<tr>
				<td style="text-align: left;">
					<div>步骤名称 : </div>
				</td >
			</tr>
			<tr>
				<td style="text-align: left;">
				 	<input id="scriptname" name="scriptname" class="easyui-textbox" multiline="true" style="width:400px;height:32px;">
				</td>
			</tr>
			<tr>
				<td style="text-align: left;">
					<div>页面定位 :(如果是新标签页面、切换窗口、关联案例脚本，请输入页面URL) </div>
				</td >
			</tr>
			<tr>
				<td style="text-align: left;">
				 	<input id="xpath" name="xpath" class="easyui-textbox" multiline="true" validType="length[1,1000]" style="width:550px;height:100px;">
				</td>
			</tr>
			<tr>
				<td style="text-align: left;">
					<div>输入值 : </div>
				</td >
			</tr>
			<tr>
				<td style="text-align: left;">
				 	<input id="testvalue" name="testvalue" class="easyui-textbox" multiline="true" style="width:550px;height:100px;">
				</td>
			</tr>
			<tr>
				<td style="text-align: left;">
					<div id="file_div">
					<span>上传 : </span>
					<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-ok'" onclick="files_button()">选择图片</a>
					<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search'" onclick="scriptsearchfile()">查看图片</a>
					<span>新的脚本需要保存后才能上传图片</span>
					</div>
				</td >
			</tr>
			<tr>
				<td style="text-align: left;">
					<div >测试页面地址 : </div>
				</td>
			</tr>
			<tr>
				<td style="text-align: left;">
					<input id="testurl" name="testurl" class="easyui-textbox" validType="length[1,1000]" style="width:400px;height:32px;">
				</td>
			</tr>
		</table>
		</form>
	</div>
</div>

<!-- 关联公共脚本使用 -->
<div id="script_dialog_2">
	<div style="float: left; margin-right: 10px"><input id="search_data" class="easyui-textbox" style="width:200px" prompt="请输入案例名称、案例编号....."></div>
	<a id="box_search_button" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search'">查询</a>
	<div id="box_db"></div>
</div>


<!-- redis查询对话框 -->
<div id="redis_dialog">
	<div id="redisresult" style="word-wrap: break-word;"></div>
</div>
<!-- 案例测试结果对话框 -->
<div id="json_dialog">
	<div id="redisresult" style="word-wrap: break-word;"></div>
</div>
<!-- 对话框 -->
<div id="selenium_file">
	<!-- 进度条 -->
	<!-- 文本框 -->
	<div style="margin-bottom:20px; text-align: center; padding-top:10px;">
		<table>
			<tr>
				<td style="text-align: left;">
					<div>附件 : </div>
				</td >
			</tr>
			<tr>
				<td>
				<!-- 上传附件 -->
				<form id="form_file" enctype="multipart/form-data" method="POST">
					<input id="testid" type="hidden" value="" name="testid">
			        <div>  
			            <input id="seleniumfile1" name="learnfile1" class="easyui-filebox" style="width:300px">
			            <!-- <input type="submit" value="提交"> -->
			            <a id="file_button" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-ok'">提交</a>
			        </div>  
			 	</form>
			 	<div style="margin: 0 auto; color: red">只能java脚本</div>
				</td>
			</tr>
		</table>
	</div>
</div>
<!-- 附件显示查看或者下载 -->
<a id="file_dialog" href=""></a>

<!-- HIS DATE TO ORACLE TOOL DIALOG -->
<div id="hisdate_to_oracle_dialog">
<h1>将数据导入到ORACLE数据库，模拟HIS数据。</h1><br>
<h1>N家HISCODE*数据集*单天循环次数*天数=总数</h1>
	<table style="padding-top: 15px;">
		<tr>
			<td >
				N家机构：<input id="hiscodes1" class="easyui-textbox" validType="length[1,10000]" style="width:300px;height:25px; float: left">
			</td>
			<td >
				开始时间：<input  id="datetime1" type= "text" class= "easyui-datebox" style="width:100px;height:25px; float: left">
			</td>
		</tr>
		<tr>
			<td >
				范例：单：HISCODE001。多：HISCODE001,HISCODE002
			</td>
			<td >
				范例：2012-01-01
			</td>
		</tr>
	</table>
	<table style="padding-top: 15px;">
		<tr>
			<td >
				循环1次数据集：
				<select id="anlisum" class="easyui-combobox" name="PatStatus" style="width:200px;">   
				    <option value="1" selected="selected">23条PASS各模块案例</option> 
				    <option value="2">2235条PASS全案例</option>  
				    <option value="3">343条PA全案例</option>
				</select>  
			</td>
		</tr>
	</table>
	<table style="padding-top: 15px;">
		<tr>
			<td style="text-align: right;">
				单天循环次数：<input id="count1" class="easyui-textbox" validType="length[1,10000]" style="width:100px;height:25px; float: left">
			</td>
			<td style="text-align: right;">
				循环天数：<input id="sum_date1" class="easyui-textbox" validType="length[1,10000]" style="width:100px;height:25px; float: left">
			</td>
		</tr>
	</table>
	<table style="padding-top: 15px;">
		<tr>
			<td style="text-align: right;">
				重新创建所有表和结构：
				<select id="createTB1" class="easyui-combobox" style="width:100px;">   
				    <option value="0" selected="selected">关</option>   
				    <option value="1">开</option>   
				</select>  
			</td>
		</tr>
		<tr>
			<td style="text-align: right;">
				创建视图：
				<select id="createview1" class="easyui-combobox" style="width:100px;" readonly="true">   
				    <option value="0" selected="selected">关</option>   
				    <option value="1">开</option>   
				</select>  
			</td>
			<td style="text-align: right;">
				先清空业务表：
				<select id="trunca1" class="easyui-combobox" style="width:100px;">   
				    <option value="0" selected="selected">关</option>   
				    <option value="1">开</option>   
				</select>  
			</td>
		</tr>
		<tr>
			<td style="text-align: right;">
				门诊数据：
				<select id="mz1" class="easyui-combobox" style="width:100px;"  readonly="true">   
				    <option value="0" selected="selected">关</option>   
				    <option value="1">开</option>   
				</select>  
			</td >
			<td style="text-align: right;">
				住院数据：
				<select id="zy1" class="easyui-combobox" style="width:100px;"  readonly="true">   
				    <option value="0" selected="selected">关</option>   
				    <option value="1">开</option>   
				</select>  
			</td>
			<td style="text-align: right;">
				出院数据：
				<select id="cy1" class="easyui-combobox" style="width:100px;"  readonly="true">   
				    <option value="0" selected="selected">关</option>   
				    <option value="1">开</option>   
				</select>  
			</td>
		</tr>
	</table>
	<table style="padding-top: 20px;">
		<tr>
			<td >
				配对方案编号：
				<input  id="match_scheme1" type= "text" class= "easyui-textbox" style="width:100px;height:25px; float: left"> 
			</td>
			<td style="text-align: right;">
				字典表数据：
				<select id="dict1" class="easyui-combobox" style="width:100px;"  readonly="true">   
				    <option value="0" selected="selected">关</option>   
				    <option value="1">开</option>   
				</select>  
			</td>
		</tr>
		<tr>
			<td >
				范例：单：4 。多：4,5,6
			</td>
		</tr>
	</table>
</div>
<div id="dlg_right_file">
	<!-- 进度条 -->
	<!-- 文本框 -->
	<div style="margin-bottom:20px; text-align: center; padding-top:10px;">
		<table>
			<tr>
				<td style="text-align: left;">
					<div>附件 : </div>
				</td >
			</tr>
			<tr>
				<td>
				<!-- 上传附件 -->
				<form id="form_file" enctype="multipart/form-data" method="POST">
					<input id="scriptid" type="hidden" value="" name="scriptid">
			        <div>  
			            <input id="file1" name="file1" class="easyui-filebox" style="width:300px">
			            <!-- <input type="submit" value="提交"> -->
			            <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-ok'" onclick="files_sub()">提交</a>
			        </div>  
			 	</form>
			 	<div style="margin: 0 auto; color: red">只能上传图片</div>
				</td>
			</tr>
		</table>
	</div>
</div>
<!-- 附件显示查看或者下载 -->
<div id="file_dialog_1" class="easyui-resizable">
	<input id="scriptid" type="hidden" value="">
	<input id="fileid" type="hidden" value="">
	<img id="file_img" src="">
	<p id="file_p"></p>
</div>
</body>
</html>