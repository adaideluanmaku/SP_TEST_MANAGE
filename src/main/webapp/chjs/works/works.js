$(document).ready(function(){
	var addurl=$("#addurl").val();
	$(".box_1 div").click(function(){
		$(".box_1 div").attr("style","background-color: #ffffff;")
		$(this).attr("style","background-color: slategray;")
	});
	
	$('#year').combobox({
		width:100,
		valueField:'label',//实际值
	    textField:'value',//显示值
	    data: [{
	    	label:'0',
			value: '全选',
			"selected":true
		},{
	    	label:'2017',
			value: '2017',
		},{
			label:'2018',
			value: '2018'
		},{
			label:'2019',
			value: '2019'
		},{
			label:'2020',
			value: '2020'
		}]
	}); 
	
	$('#month').combobox({  
		width:100,
		valueField:'label',//实际值
	    textField:'value',//显示值
	    data: [{
	    	label:'0',
			value: '全选',
			"selected":true
		},{
	    	label:'01',
			value: '1',
		},{
			label:'02',
			value: '2'
		},{
			label:'03',
			value: '3'
		},{
			label:'04',
			value: '4'
		},{
			label:'05',
			value: '5'
		},{
			label:'06',
			value: '6'
		},{
			label:'07',
			value: '7'
		},{
			label:'08',
			value: '8'
		},{
			label:'09',
			value: '9'
		},{
			label:'10',
			value: '10'
		},{
			label:'11',
			value: '11'
		},{
			label:'12',
			value: '12'
		}]
	}); 
	
	//查询
	$("#box_12_search").bind('click',function(){
		var starttime='';
		if($('#year').combobox('getValue')!='0'){
			starttime=starttime+$('#year').combobox('getValue');
		}
		if($('#month').combobox('getValue')!='0'){
			starttime=starttime+'-'+$('#month').combobox('getValue')+'-';
		}
		prompt:'请输入标题内容.....',
		$('#box_12_dg').datagrid('load', {starttime:starttime,workname:$('#workname').textbox('getValue'),username:$('#username').textbox('getValue')},'reload');//将参数传给数据表格，当做查询条件到服务端获取数据
	})
	
	//easyui表格
	$('#box_12_dg').datagrid({  
		title:'工作计划',
		height:660, 
		width:1090,
//		top:10,
		pageSize:30,
	    url:addurl+'/works/workslist',
	    singleSelect:true,//true单选，不配置或者false为多选
	    pagination:true,//翻页栏
	    rownumbers:true,//行序号显示
	    toolbar:'#box_12_button',//工具栏设置
	    columns:[[  
	        {field:'workid',hidden:true},
			{field:'workname',title:'标题',width:150,halign:'center',sortable:true,
	        	formatter:function(value,row,index){
	        		var tooltil1=tooltil(row.workname,40);
                    return tooltil1;  
                }
	        },
			{field:'worktext',title:'工作内容',width:400,halign:'center',
	        	formatter:function(value,row,index){  
	        		var tooltil1=tooltil(row.worktext,40);
                    return tooltil1;  
                }
			},
			{field:'username',title:'姓名',width:80,halign:'center',
				formatter:function(value,row,index){  
	        		var tooltil1=tooltil(row.username,6);
                    return tooltil1;  
                }
			},
			{field:'starttime',title:'开始时间',width:80,halign:'center'},
			{field:'endtime',title:'结束时间',width:80,halign:'center'},
			{field:'inserttime',title:'创建日期',width:140,halign:'center'}
	    ]],
	    
	    //双击获取行数据
	    onDblClickRow:function(index, row){  
//	    	$('#dg_right').datagrid('load', {learngroupid: row.learngroupid},'reload')
	    	$("#dialogtype").val('1');
	    	$("#workid_").val(row.workid);
	    	
	    	//下拉单加载数据
			$('#add_select').combobox({    
				url:addurl+'/works/users',    
			    valueField:'userid',//实际值    
			    textField:'username',//显示值
			    required : true,//必填
			}); 
			
	    	$("#starttime_").textbox('setValue',row.starttime);
	    	$("#endtime_").textbox('setValue',row.endtime);
	    	$("#add_select").combobox('setValue',row.userid);
	    	$("#workname_").textbox('setValue',row.workname);
	    	$("#worktext_").textbox('setValue',row.worktext);
	    	$('#box_1_dialog').dialog({closed: false});
	    },
	    //单击选择数据
	    onClickRow:function(index, row){  
			$('#del').val(row.workid);
	    }
	});  
	
	//admin权限控制按钮显示
	if($("#loginname").val()!='admin'){
		$("#box_12_button").remove()
	}
	
	//新增按钮
	$("#add").click(function(){
		$('#workds_form').form('clear');//清空表单
		$('#box_1_dialog').dialog('open');
		//下拉单加载数据
		$('#add_select').combobox({    
			url:addurl+'/works/users',    
		    valueField:'userid',//实际值    
		    textField:'username',//显示值
		    required : true,//必填
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
		    	var workid=$('#del').val();
				$.ajax({
					type:"POST",
					url:addurl+"/works/worksdel",
					async:false,
					data:{workid:workid},
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
	
	//下拉单事件
	$('#add_select').combobox({
		onChange:function(newValue,oldValue){
//			
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
//		    href: 'javascript:;', //窗口默认请求地址
//		    toolbar:[{//对话框工具按钮功能
//				text:'编辑',
//				iconCls:'icon-edit',
//				handler:function(){alert('edit')}
//			},{
//				text:'帮助',
//				iconCls:'icon-help',
//				handler:function(){alert('help')}
//			}]
	    buttons:[{//对话框底部按钮
			text:'保存',
			handler:function(){
				if(!$("#workds_form").form('validate')){//验证#dialog对话框中的所有内容是否验证通过
					return;
				}
				if($("#dialogtype").val()=='0'){
					$.ajax({
						type:"POST",
						url:addurl+"/works/worksadd",
						async:false,
						cache:true,
						data:$("#workds_form").serialize(),
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
						url:addurl+"/works/worksupdate",
						async:false,
						cache:true,
						data:$("#workds_form").serialize(),
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
