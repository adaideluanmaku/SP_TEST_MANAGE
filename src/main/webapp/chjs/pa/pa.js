$(document).ready(function(){
	var addurl=$("#addurl").val();
	$(".box_1 div").click(function(){
		$(".box_1 div").attr("style","background-color: #ffffff;")
		$(this).attr("style","background-color: slategray;")
	});
	
	//查询
	$("#box_12_search").bind('click',function(){
		prompt:'请输入标题内容.....',
		$('#box_12_dg').datagrid('load', {anliname:$('#serchdata').textbox('getValue')},'reload');//将参数传给数据表格，当做查询条件到服务端获取数据
	})
	
	//easyui表格
	$('#box_12_dg').datagrid({  
		title:'工作计划',
		height:660, 
		width:1090,
//		top:10,
		pageSize:30,
	    url:addurl+'/pa/padata',
	    singleSelect:true,//true单选，不配置或者false为多选
	    pagination:true,//翻页栏
	    rownumbers:true,//行序号显示
	    toolbar:'#box_12_button',//工具栏设置
	    columns:[[
	        {field:'id',hidden:true},
	        {field:'anlitype',title:'案例类型',width:150,halign:'center',sortable:true,},
			{field:'anliname',title:'案例名称',width:150,halign:'center',sortable:true,},
			{field:'gatherbaseinfo',title:'输入串',width:400,halign:'center'},
			{field:'version',title:'版本号',width:80,halign:'center'}
	    ]],
	    
	    //双击获取行数据
	    onDblClickRow:function(index, row){  
	    	//用户后台区别更新还是新增
	    	$("#dialogtype").val('1');
	    	
	    	$('#version').combobox({    
	    	    valueField:'id',    
	    	    textField:'text', 
				data:[{    
					"id":1609,    
					"text":"1609"   
				},{    
					"id":1612,    
					"text":"1612"
				}]
	    	}); 
	    	
//	    	$("#add_select").combobox('setValue',row.anliname);
	    	$("#id").val(row.id);
	    	$("#version").combobox('setValue',row.version);
	    	$("#anlitype").textbox('textbox').attr('readonly',true);
	    	$("#anlitype").textbox('setValue',row.anlitype);
	    	$("#anliname").textbox('setValue',row.anliname);
	    	$("#gatherbaseinfo").textbox('setValue',row.gatherbaseinfo);
	    	$('#box_1_dialog').dialog({closed: false});
	    },
	    //单击选择数据
	    onClickRow:function(index, row){  
			$('#del').val(row.id);
	    }
	});  
	
	//admin权限控制按钮显示
	if($("#loginname").val()!='admin'){
		$("#box_12_button").remove()
	}
	
	//新增按钮
	$("#add").click(function(){
		//用户后台区别更新还是新增
    	$("#dialogtype").val('0');
		$('#pa_form').form('clear');//清空表单
		$('#box_1_dialog').dialog('open');
		
		//下拉单加载数据
		$('#version').combobox({    
    	    valueField:'id',    
    	    textField:'text', 
    	    required : true,//必填
			data:[{    
				"id":1609,    
				"text":"1609"   
			},{    
				"id":1612,    
				"text":"1612"
			}]
    	}); 
	});
	//删除
	$('#del').bind('click', function(){
		if($('#del').val()==''){
			//EasyUI Messager 消息框,警示（alert）、确认（confirm）、提示（prompt）、进展（progress）等等
			$.messager.alert('Warning','请选择一条数据再删除！');
			return;
		}
		
		//EasyUI, Messager消息框,警示（alert）、确认（confirm）、提示（prompt）、进展（progress）等等
		$.messager.confirm('Confirm','请确认是否需要删除这条数据！',function(r){
		    if (r){
		    	var id=$('#del').val();
				$.ajax({
					type:"POST",
					url:addurl+"/pa/padel",
					async:false,
					data:{id:id},
					cache:true,
					success: function(result){
						$('#box_12_dg').datagrid('reload');
					},
					error:function(XMLResponse){
						alert(XMLResponse.responseText)
					}
				});   
		    }
		});
	});  
	
//	//下拉单初始化生成
	$('#version').combobox({
		valueField: 'id',    
        textField: 'text'
        [{    
            "id":1609,    
            "text":"1609"   
        },{    
            "id":1612,    
            "text":"1612"
        }],
        //点击事件
		onChange:function(newValue,oldValue){
//			alert(oldValue);
//			alert(newValue);
		}
	})
	
	//对话框，保存数据
	$('#box_1_dialog').dialog(
		{    
		title: '新增数据',    
	    width: 600,    
	    height: 500,    
	    closed: true,//true窗口关闭，false窗口打开
	    modal:true,//弹出后，只能操作本窗口
	    buttons:[{//对话框底部按钮
			text:'保存',
			handler:function(){
				if(!$("#pa_form").form('validate')){//验证#dialog对话框中的所有内容是否验证通过
					return;
				}
				if($("#dialogtype").val()=='0'){
					$.ajax({
						type:"POST",
						url:addurl+"/pa/paadd",
						async:false,
						cache:true,
						data:$("#pa_form").serialize(),
						success: function(result){
							$('#box_1_dialog').dialog({closed: true});
							$('#box_12_dg').datagrid('reload');
						},
						error:function(XMLResponse){
							alert(XMLResponse.responseText)
						}
					});
				}else{
					$.ajax({
						type:"POST",
						url:addurl+"/pa/pasave",
						async:false,
						cache:true,
						data:$("#pa_form").serialize(),
						success: function(result){
							$('#box_1_dialog').dialog({closed: true});
							$('#box_12_dg').datagrid('reload');
							$("#dialogtype").val('0');
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
});

//数据表-字符过长返回浮动提示
function tooltil(val,len){
	var lens=getByteLen(val);
	if(lens>len){
		return '<a href="#" title="'+val+'" class="easyui-tooltip" style="text-decoration:none;color: #FFFFFF">'+val.substring(0,len)+'....'+'</a>';
	}else{
		return val;
	}
	
}

//字符数计算
function getByteLen(val) {
	if(val==null){
		return
	}
	var len = 0;
	for (var i = 0; i < val.length; i++) {
		var a = val.charAt(i);
		if (a.match(/[^\x00-\xff]/ig) != null) {
			len += 2;
		}else {
			len += 1;
		}
	}
	return len;
}
