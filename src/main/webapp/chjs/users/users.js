$(document).ready(function(){
	var addurl=$("#addurl").val();
	$(".box_1 div").click(function(){
		$(".box_1 div").attr("style","background-color: #ffffff;")
		$(this).attr("style","background-color: slategray;")
	});
	
	users();
	$("#view_1").click(function(){
		$('#search_data').textbox('setValue','');//切换后，清空输入框
		$('#box_search_button').unbind();//切换后，清空原有的查询事件
		users();//切换后，生成新的查询事件和数据表
		$('#box_db').datagrid('load', {loginname:''},'reload');//切换后，查询全部数据
		$("#box_type").val(0);
	})
	
	//新增按钮
	$("#add_").click(function(){
		$('#users_form').form('clear');//清空表单
		$("#loginname").textbox('readonly',false);
		$('#box_1_dialog').dialog('open');
	});
	
	//删除
	$('#del_').bind('click', function(){
		if($('#del_').val()==''){
			//EasyUI Messager 消息框,警示（alert）、确认（confirm）、提示（prompt）、进展（progress）等等
			$.messager.alert('Warning','请选择一条数据再删除！');
			return;
		}
		
		//EasyUI, Messager消息框,警示（alert）、确认（confirm）、提示（prompt）、进展（progress）等等
		$.messager.confirm('Confirm','请确认是否需要删除这条数据！',function(r){
		    if (r){
		    	var userid=$('#del_').val();
				$.ajax({
					type:"POST",
					url:addurl+"/users/usersdel",
					async:false,
					data:{userid:userid},
					cache:true,
					success: function(result){
						if(result==''){
							$.messager.alert('警告','没有权限');
						}else{
							$('#box_db').datagrid('reload');
						}
					},
					error:function(XMLResponse){
						alert(XMLResponse.responseText)
					}
				});   
		    }
		});
	});  
	
	//对话框，保存数据
	$('#box_1_dialog').dialog(
		{    
		title: '新增数据',    
	    width: 400,    
	    height: 500,    
	    closed: true,//true窗口关闭，false窗口打开
	    modal:true,//弹出后，只能操作本窗口
	    buttons:[{//对话框底部按钮
			text:'保存',
			handler:function(){
				if(!$("#users_form").form('validate')){//验证#dialog对话框中的所有内容是否验证通过
					return;
				}
				if($("#dialogtype").val()=='0'){
					$.ajax({
						type:"POST",
						url:addurl+"/users/usersadd",
						async:false,
						cache:true,
						data:$("#users_form").serialize(),
						success: function(result){
							if(result==''){
								$.messager.alert('警告','没有权限');
							}else
							if(result !='ok'){
								$.messager.alert('警告',result);
							}else{
								$('#box_1_dialog').dialog({closed: true});
								$('#box_db').datagrid('reload');
							}
						},
						error:function(XMLResponse){
							alert(XMLResponse.responseText)
						}
					});
				}else{
					$.ajax({
						type:"POST",
						url:addurl+"/users/usersupdate",
						async:false,
						cache:true,
						data:$("#users_form").serialize(),
						success: function(result){
							if(result==''){
								$.messager.alert('警告','没有权限');
							}else
							if(result !='ok'){
								$.messager.alert('警告',result);
							}else{
								$('#box_1_dialog').dialog({closed: true});
								$('#box_db').datagrid('reload');
								$("#dialogtype").val('0');
							}
						},
						error:function(XMLResponse){
							alert(XMLResponse.responseText)
						}
					});
				}
			}
		},{
			text:'关闭',
			handler:function(){
				$('#box_1_dialog').dialog({closed: true,});
			}
		}]
	});
	
	//easyui搜索
	//生成新的查询
	$("#box_search_button").bind('click',function(){
		$('#box_db').datagrid('load', {loginname:$('#search_data').textbox('getValue')},'reload');//将参数传给数据表格，当做查询条件到服务端获取数据
	})
});

function users(){
	var addurl=$("#addurl").val();
	//easyui表格
	$('#box_db').datagrid({  
		title:'用户管理',
		height:660, 
		width:1090,
//		top:10,
		pageSize:30,
	    url:addurl+'/users/usersquery',
	    singleSelect:true,//true单选，不配置或者false为多选
	    pagination:true,//翻页栏
	    rownumbers:true,//行序号显示
	    toolbar:'#box_button',//工具栏设置
	    columns:[[  
	        {field:'userid',hidden:true},
			{field:'loginname',title:'登录名',width:100,halign:'center'},
			{field:'username',title:'姓名',width:100,halign:'center'},
			{field:'password',title:'密码',width:50,halign:'center'},
			{field:'browserpath',title:'浏览器路径',width:350,halign:'center'},
			{field:'pa_screen',title:'pa审查地址',width:350,halign:'center'},
			{field:'pa_screen_win',title:'pa-win审查地址',width:350,halign:'center'},
			{field:'remark',title:'备注',width:350,halign:'center'}
	    ]],
	    
	    //双击获取行数据
	    onDblClickRow:function(index, row){  
	    	$("#dialogtype").val('1');
	    	$("#box_1_dialog #userid").val(row.userid);
	    	$("#box_1_dialog #loginname").textbox('readonly',true);
	    	$("#box_1_dialog #loginname").textbox('setValue',row.loginname);
	    	$("#box_1_dialog #username").textbox('setValue',row.username);
	    	$("#box_1_dialog #password").textbox('setValue',row.password);
	    	$("#box_1_dialog #browserpath").textbox('setValue',row.browserpath);
	    	$("#box_1_dialog #pa_screen").textbox('setValue',row.pa_screen);
	    	$("#box_1_dialog #pa_screen_win").textbox('setValue',row.pa_screen_win);
	    	$("#box_1_dialog #remark").textbox('setValue',row.remark);
	    	$('#box_1_dialog').dialog({closed: false});
	    },
	    //单击选择数据
	    onClickRow:function(index, row){  
			$('#del_').val(row.userid);
	    }
	});  
}