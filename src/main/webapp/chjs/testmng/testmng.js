var VisitCode=null;//医院流水号,审查时使用
var addurl=null;
var testindex=-1;
var passorpa_hisdata=0;

$(document).ready(function(){
	
	addurl=$("#addurl").val();
	$(".box_1 div").click(function(){
		$(".box_1 div").attr("style","background-color: #ffffff;")
		$(this).attr("style","background-color: slategray;")
	});
	
	team();//默认加载team表
	$('.box_2').hide();
	$('#box_2_1').show();
	
	//菜单切换数据
	$("#view_1").click(function(){
		//清空按钮原有的值
		clearbutton();
		$('.box_2').hide();
		$('#box_2_1').show();
		$('#box_2_1 #search_data').textbox('setValue','');//切换后，清空输入框
//		$('#box_2_1 #box_search_button').unbind();//切换后，清空原有的查询事件
		team();//切换后，生成新的查询事件和数据表
		$('#box_2_1 #box_db').datagrid('load', {teamname:''},'reload');//切换后，查询全部数据
		$("#box_type").val(0);
	})
	
	$("#view_2").click(function(){
		clearbutton();
		$('.box_2').hide();
		$('#box_2_2').show();
		$('#box_2_2 #search_data').textbox('setValue','');
//		$('#box_2_2 #box_search_button').unbind();
		
		$('#box_2_2 #ComboBox_right').combobox({
		    url:addurl+"/testmng/teamgroup",    
		    valueField:'teamid',    
		    textField:'teamname',
		});
//		$('#box_2_2 #ComboBox_right').combobox('setValue', '全选');

		project();
		$('#box_2_2 #box_db').datagrid('load', {teamid:'',projectname:''},'reload');
		$("#box_type").val(1);
	})
	
	$("#view_3").click(function(){
		clearbutton();
		$('.box_2').hide();
		$('#box_2_3').show();
		$('#box_2_3 #search_data').textbox('setValue','');
//		$('#box_2_3 #box_search_button').unbind();
		
		$('#box_2_3 #ComboBox_right').combobox({//下拉单查询功能能 
			width:220,
		    url:addurl+"/testmng/projectgroup",    
		    valueField:'projectid',    
		    textField:'projectname',  
		});
		testmng();
		$('#box_2_3 #box_db').datagrid('load', {project:'',testname:''},'reload');
		$("#box_type").val(2);
		
	})
	
	//新增按钮
	$("#box_2_1 #add_").click(function(){
		//信息编辑入口，重置form表单
		$("#team_form").form('clear');
		$("#project_form").form('clear');
		$("#testmng_form").form('clear');
		$("#team_dialog #teamname").textbox({'readonly': false});
		$("#project_dialog #projectname").textbox({'readonly': false});
//		$("#testmng_dialog #testname").textbox({'readonly': false});
		
		$("#dialog_type").val(0);
		$("#team_dialog").dialog({
			closed:false
		})
	})
	
	//删除按钮
	$('#box_2_1 #del_').click(function(){
		var teamid=$('#box_2_1 #del_').val();
		if(teamid==''){
			//EasyUI Messager 消息框,警示（alert）、确认（confirm）、提示（prompt）、进展（progress）等等
			$.messager.alert('警告','请选择一条数据再删除！');
			return;
		}
//			var confirm=null;
		//EasyUI Messager 消息框,警示（alert）、确认（confirm）、提示（prompt）、进展（progress）等等
		$.messager.confirm('警告','将删除对应的项目和案例！确定？',function(r){
		    if (r){
				$.ajax({
					type:"POST",
					url:addurl+"/testmng/teamdel",
					async:false,
					data:{teamid:teamid},
					cache:true,
					success: function(result){
						if(result==''){
							$.messager.alert('警告','没有权限');
						}else
						if(result !='ok'){
							$.messager.alert('警告',result);
						}else{
							$('#box_2_1 #box_db').datagrid('reload');
						}
					},
					error:function(XMLResponse){
						alert(XMLResponse.responseText)
					}
				});   
		    }
		});
	});
	
	
	$("#box_2_2 #add_").click(function(){
		//信息编辑入口，重置form表单
		$("#team_form").form('clear');
		$("#project_form").form('clear');
		$("#testmng_form").form('clear');
		$("#team_dialog #teamname").textbox({'readonly': false});
		$("#project_dialog #projectname").textbox({'readonly': false});
//		$("#testmng_dialog #testname").textbox({'readonly': false});
		
		$("#dialog_type").val(0);
		$('#project_dialog #ComboBox_right').combobox({    
		    url:addurl+"/testmng/teamgroup",    
		    valueField:'teamid',    
		    textField:'teamname',
		});
		$("#project_dialog").dialog({
			closed:false
		})
	})
	
	$('#box_2_2 #del_').click(function(){
		var projectid=$('#box_2_2 #del_').val();
		if(projectid==''){
			//EasyUI Messager 消息框,警示（alert）、确认（confirm）、提示（prompt）、进展（progress）等等
			$.messager.alert('警告','请选择一条数据再删除！');
			return;
		}
//			var confirm=null;
		//EasyUI Messager 消息框,警示（alert）、确认（confirm）、提示（prompt）、进展（progress）等等
		$.messager.confirm('警告','将删除对应的所有案例！确定？',function(r){
		    if (r){
				$.ajax({
					type:"POST",
					url:addurl+"/testmng/projectdel",
					async:false,
					data:{projectid:projectid},
					cache:true,
					success: function(result){
						if(result==''){
							$.messager.alert('警告','没有权限');
						}else
						if(result !='ok'){
							$.messager.alert('警告',result);
						}else{
							$('#box_2_2 #box_db').datagrid('reload');
						}
					},
					error:function(XMLResponse){
						alert(XMLResponse.responseText)
					}
				});   
		    }
		});
	});
	
	//案例列表操作按钮
	$("#box_2_3 #add_").click(function(){
		//信息编辑入口，重置form表单
		$("#team_form").form('clear');
		$("#project_form").form('clear');
		$("#testmng_form").form('clear');
		$("#team_dialog #teamname").textbox({'readonly': false});
		$("#project_dialog #projectname").textbox({'readonly': false});
//		$("#testmng_dialog #testname").textbox({'readonly': false});
		
		$("#dialog_type").val(0);
		
		$('#testmng_dialog #ComboBox_right').combobox({    
		    url:addurl+"/testmng/projectgroup",    
		    valueField:'projectid',    
		    textField:'projectname',  
		});
		
		$('#testmng_dialog #ComboBox_status').combobox('setValue', 1);
		
		$('#testmng_dialog #selenium_share_status').combobox('setValue', 0);
		
		$("#testmng_dialog").dialog({
			closed:false
		})
	})
	
	//案例列表操作按钮
	$('#box_2_3 #del_').click(function(){
		var testid=$('#box_2_3 #del_').val();
		if(testid==''){
			//EasyUI Messager 消息框,警示（alert）、确认（confirm）、提示（prompt）、进展（progress）等等
			$.messager.alert('警告','请选择一条数据再删除！');
			return;
		}
//			var confirm=null;
		//EasyUI Messager 消息框,警示（alert）、确认（confirm）、提示（prompt）、进展（progress）等等
		$.messager.confirm('警告','会一起删除关联的selenium脚本，请确认是否需要删除这条数据！确定？',function(r){
		    if (r){
				$.ajax({
					type:"POST",
					url:addurl+"/testmng/testmngdel",
					async:false,
					data:{testid:testid},
					cache:true,
					success: function(result){
						if(result==''){
							$.messager.alert('警告','没有权限');
						}else
						if(result !='ok'){
							$.messager.alert('警告',result);
						}else{
							$('#box_2_3 #box_db').datagrid('reload');
						}
					},
					error:function(XMLResponse){
						alert(XMLResponse.responseText)
					}
				});   
		    }
		});
	});
	
	//案例列表操作按钮
	$('#box_2_3 #copy_').click(function(){
		var testid=$('#box_2_3 #copy_').val();
		if(testid==''){
			//EasyUI Messager 消息框,警示（alert）、确认（confirm）、提示（prompt）、进展（progress）等等
			$.messager.alert('警告','请选择一条数据再复制！');
			return;
		}
//			var confirm=null;
		//EasyUI Messager 消息框,警示（alert）、确认（confirm）、提示（prompt）、进展（progress）等等
		$.messager.confirm('警告','请确认是否需要复制这条数据！确定？',function(r){
		    if (r){
				$.ajax({
					type:"POST",
					url:addurl+"/testmng/testmngcopy",
					async:false,
					data:{testid:testid},
					cache:true,
					success: function(result){
						if(result==''){
							$.messager.alert('警告','没有权限');
						}else
						if(result !='ok'){
							$.messager.alert('警告',result);
						}else{
							$('#box_2_3 #box_db').datagrid('reload');
						}
					},
					error:function(XMLResponse){
						alert(XMLResponse.responseText)
					}
				});   
		    }
		});
	});
	
	//案例列表操作按钮，PA审查  案例功能
	$("#mm_pa #pa_java").click(function(){
		var testid=$("#mm_pa #pa_java").val();
		if(testid==''){
			//EasyUI Messager 消息框,警示（alert）、确认（confirm）、提示（prompt）、进展（progress）等等
			$.messager.alert('警告','请选择一条数据再审查！');
			return;
		}
		if(VisitCode=='' || VisitCode==null){
			//EasyUI Messager 消息框,警示（alert）、确认（confirm）、提示（prompt）、进展（progress）等等
			$.messager.alert('警告','选择的数据里面门诊/住院流水号为空！');
			return;
		}
		parent.onloading();
		$.ajax({
			type:"POST",
			url:addurl+"/testmng/pa_screen",
			async:false,
			data:{state:1,testid:testid,VisitCode:VisitCode},
			cache:true,
			success: function(result){
				parent.removeload();
				if(result != ''){
					$('#json_dialog #redisresult').html(result);
					$('#json_dialog').dialog({closed:false});
					$('#box_2_3 #box_db').datagrid('reload');
				}else{
					$.messager.alert('警告',"审查结束");
					$('#box_2_3 #box_db').datagrid('reload');
				}
//				if(result =='ok'){
//					$.messager.alert('警告',"审查结束");
//					$('#box_2_3 #box_db').datagrid('reload');
//				}else{
//					$.messager.alert('警告',result);
//				}
			},
			error:function(XMLResponse){
				alert(XMLResponse.responseText)
			}
		});   
	});
	
	//案例列表操作按钮，PA审查  案例功能
	$("#mm_pa #pa_win").click(function(){
		var testid=$("#mm_pa #pa_win").val();
		if(testid==''){
			//EasyUI Messager 消息框,警示（alert）、确认（confirm）、提示（prompt）、进展（progress）等等
			$.messager.alert('警告','请选择一条数据再审查！');
			return;
		}
		if(VisitCode=='' || VisitCode==null){
			//EasyUI Messager 消息框,警示（alert）、确认（confirm）、提示（prompt）、进展（progress）等等
			$.messager.alert('警告','选择的数据里面门诊/住院流水号为空！');
			return;
		}
		parent.onloading();
		$.ajax({
			type:"POST",
			url:addurl+"/testmng/pa_screen",
			async:false,
			data:{state:2,testid:testid,VisitCode:VisitCode},
			cache:true,
			success: function(result){
				parent.removeload();
				$.messager.alert('审查结束',result);
				$('#box_2_3 #box_db').datagrid('reload');
//				if(result !='ok'){
//					$.messager.alert('警告',result);
//				}else{
//					$.messager.alert('审查结束',result);
//					$('#box_2_3 #box_db').datagrid('reload');
//				}
			},
			error:function(XMLResponse){
				alert(XMLResponse.responseText)
			}
		});   
	});
	
	//案例列表操作按钮，PA审查  案例功能
	$("#mm_pa #pa_all").click(function(){
		var projectid=$("#mm_pa #pa_all").val();
		if(projectid==''){
			//EasyUI Messager 消息框,警示（alert）、确认（confirm）、提示（prompt）、进展（progress）等等
			$.messager.alert('警告','通过查询按钮搜索一个项目组再测试！');
			return;
		}
		$.messager.confirm('确认','您确认想要测试全部案例吗？',function(r){    
		    if (r){  
		    	parent.onloading();//加载loading 
		    	$.ajax({
					type:"POST",
					url:addurl+"/testmng/pa_screen_all",
					async:true,
					data:{projectid:projectid,search_data:$("#box_2_3 #search_data").textbox("getValue")},
					cache:true,
					success: function(result){
						parent.removeload();
						$.messager.alert('审查结束',result);
						$('#box_2_3 #box_db').datagrid('reload');
//						if(result !='ok'){
//							$.messager.alert('警告',result);
//						}else{
//							$.messager.alert('审查结束',result);
//							$('#box_2_3 #box_db').datagrid('reload');
//						}
					},
					error:function(XMLResponse){
						alert(XMLResponse.responseText)
					}
				});
		    	
		    	return false;
		    }    
		});  
	});
	
	//案例列表操作按钮，从redis读取pa审查结果
	$("#mm_pa #pa_screen_redis").click(function(){
		var testid=$("#mm_pa #pa_screen_redis").val();
		if(testid==''){
			//EasyUI Messager 消息框,警示（alert）、确认（confirm）、提示（prompt）、进展（progress）等等
			$.messager.alert('警告','请选择一条数据再审查！');
			return;
		}
		$.ajax({
			type:"POST",
			url:addurl+"/testmng/pa_screen_redis",
			async:false,
			data:{VisitCode:VisitCode},
			cache:true,
			success: function(result){
				if(result =='' || result==null){
//					$.messager.alert('警告',"未查到审查结果");
					$('#redis_dialog #redisresult').html("未从redis中查询到审查结果");
					$('#redis_dialog').dialog({closed:false});
				}else{
//					$.messager.alert('审查结果',result);
//					$('#box_2_3 #box_db').datagrid('reload');
					$('#redis_dialog #redisresult').html(result);
					$('#redis_dialog').dialog({closed:false});
				}
			},
			error:function(XMLResponse){
				alert(XMLResponse.responseText)
			}
		});   
	});
	
	//清空redis审查结果数据
	$('#pa_redis_clear').click(function(){
		$.ajax({
			type:"POST",
			url:addurl+"/testmng/pa_redis_clear_sd",
			async:false,
			cache:true,
			data:{},
			success: function(result){
				$.messager.alert('警告',result);
			},
			error:function(XMLResponse){
				alert(XMLResponse.responseText)
			}
		});
	});
	
	//selenium窗口功能按钮
	$("#script_dialog #add_").click(function(){
		$("#script_dialog_1 #scriptid").val('');
		
		if($('#mm_selenium #script_').val()==''){
			return;
		}
		$('#script_dialog_1 #scriptstatus').combobox('setValue',0);
		$('#script_dialog_1 #ComboBox_right').combobox('setValue',0);
		$("#script_dialog_1 #step").textbox('setValue','');
		$("#script_dialog_1 #scriptname").textbox('setValue','');
		$("#script_dialog_1 #xpath").textbox('setValue','');
		$("#script_dialog_1 #testvalue").textbox('setValue','');
		$("#script_dialog_1 #testurl").textbox('setValue','');
		
		$("#script_dialog_1 #testid").val($('#mm_selenium #script_').val())
//    	$('#script_dialog_1 #file_div').hide();
		
		//信息编辑入口，重置form表单
		$("#dialog_type").val(0);
		
		$("#script_dialog_1 #testno").textbox({'readonly':true});
//		script_ComboBox();
		$("#script_dialog_1").dialog({closed:false})
	})
	
	//script脚本类型下拉单
	$('#script_dialog_1 #ComboBox_right').combobox({    
	    valueField:'scripttype',    
	    textField:'scriptname',
	    data:[{    
	        "scripttype":0,    
	        "scriptname":"打开新web地址",
	        "selected":true
	    },{    
	        "scripttype":1,    
	        "scriptname":"输入值",
	    },{    
	        "scripttype":2,    
	        "scriptname":"批量输入值",
	    },{    
	    	 "scripttype":70,    
		        "scriptname":"关联公共脚本"   
	    },{    
	    	 "scripttype":71,    
		        "scriptname":"关联公共脚本-必运行"   
	    },{    
	    	 "scripttype":88,    
		        "scriptname":"点击"   
	    },{    
	    	 "scripttype":89,    
		        "scriptname":"断言-全等(页面源代码)"   
	    },{    
	    	 "scripttype":90,    
		        "scriptname":"断言-全等(图片)"   
	    },{    
	    	 "scripttype":98,    
		        "scriptname":"断言-全等"   
	    },{    
	    	 "scripttype":99,    
		        "scriptname":"断言-包含"   
	    },{    
	    	 "scripttype":100,    
		        "scriptname":"关闭当前窗口"   
	    },{    
	    	 "scripttype":102,    
		        "scriptname":"关闭所有窗口"   
	    },{    
	        "scripttype":3,    
	        "scriptname":"定位嵌入页iframe位置",
	    },{    
	        "scripttype":4,    
	        "scriptname":"切回到上级iframe位置",
	    },{    
	        "scripttype":5,    
	        "scriptname":"跳出iframe切回主文档",
	    },{    
	        "scripttype":111,    
	        "scriptname":"新开标签窗口",
	    },{    
	        "scripttype":112,    
	        "scriptname":"切换窗口",
	    },{    
	        "scripttype":10,    
	        "scriptname":"等待时间(毫秒)",
	    }],
	    onSelect: function(record){
	    	$('#script_dialog_1 #xpath').textbox({required:false});
	    	$('#script_dialog_1 #testurl').textbox({required:false})
	    	$('#script_dialog_1 #testvalue').textbox({required:false});
	    	$('#script_dialog_1 #selenium_link').linkbutton('disable');
	    	$('#script_dialog_1 #file_div').hide();
	    	
	    	if(record.scripttype == 70){
	    		$('#script_dialog_1 #selenium_link').linkbutton('enable');
	    		$('#script_dialog_1 #xpath').textbox({required:true});
	    	}
	    	
	    	if(record.scripttype == 71){
	    		$('#script_dialog_1 #selenium_link').linkbutton('enable');
	    	}
	    	
	    	if(record.scripttype == 0){
	    		$('#script_dialog_1 #testurl').textbox({required:true});
	    	}
	    	if(record.scripttype == 1 || record.scripttype == 2 || record.scripttype == 98 
	    			|| record.scripttype ==99 ){
	    		$('#script_dialog_1 #xpath').textbox({required:true});
	    		$('#script_dialog_1 #testvalue').textbox({required:true});
	    	}
	    	if(record.scripttype == 88 || record.scripttype == 3 || record.scripttype == 111
	    			|| record.scripttype == 112){
	    		$('#script_dialog_1 #xpath').textbox({required:true});
	    	}
	    	if(record.scripttype == 10 || record.scripttype == 89){
	    		$('#script_dialog_1 #testvalue').textbox({required:true});
	    	}
	    	if(record.scripttype == 90){
	    		$('#script_dialog_1 #file_div').show();
	    	}
		}

	});
	
	//关联公共脚本按钮
//	$('#script_dialog_1 #selenium_link').bind('click', function(){  
//		$('#script_dialog_2 #box_db').datagrid({url:addurl+"/testmng/testmng_share"});
//		$('#script_dialog_2 #box_db').datagrid('load', {projectid:$('#box_2_3 #ComboBox_right').combobox('getValue'),searchdate:$('#script_dialog_2 #search_data').textbox('getValue')},'reload');
//		$('#script_dialog_2').dialog({closed:false});
//    }); 

	//关联公共脚本
	//team_dialog对话框，保存数据
	$('#script_dialog_2').dialog(
		{    
		title: '新增数据',    
	    width: 600,    
	    height: 600,    
	    closed: true,//true窗口关闭，false窗口打开
	    modal:true,//弹出后，只能操作本窗口
	    buttons:[{//对话框底部按钮
			text:'清空关联',
			handler:function(){
				$("#script_dialog_1 #testvalue").textbox('setValue','');
			}
		},{
			text:'关闭',
			handler:function(){
				$('#script_dialog_2').dialog({closed: true,});
			}
		}]
	});  
	
	$("#script_dialog_2 #box_search_button").click(function(){
		$('#script_dialog_2 #box_db').datagrid('load', {projectid:$('#box_2_3 #ComboBox_right').combobox('getValue'),searchdate:$('#script_dialog_2 #search_data').textbox('getValue')},'reload');//将参数传给数据表格，当做查询条件到服务端获取数据
	})
	
	//关联脚本数据-案例选择
	$('#script_dialog_2 #box_db').datagrid({
		title:'案例',
		height:500, 
		width:500,
		pageSize:30,
//	    url:addurl+"/testmng/testmng",
	    singleSelect:true,//true单选，不配置或者false为多选
	    pagination:true,//翻页栏
	    rownumbers:true,//行序号显示
	    columns:[[  
	        {field:'testid',hidden:true},
	        {field:'projectid',hidden:true},
	        {field:'projectname',title:'项目名称',width:100,halign:'center'},
			{field:'testname',title:'案例名称',width:100,halign:'center',
				formatter: function(value,row,index){
					var tooltil1=tooltil(value,10);
                    return tooltil1;
				}
			},
			{field:'testno',title:'案例编号',width:80,halign:'center',sortable:true,order:"asc"},//排序
	    ]],
	    
	    //双击获取行数据
	    onDblClickRow:function(index, row){ 
	    	//累加数据
	    	var selenium_shares=null;
	    	if($("#script_dialog_1 #testvalue").textbox('getValue') != ''){
	    		selenium_shares=JSON.parse($("#script_dialog_1 #testvalue").textbox('getValue'));
	    	}else{
	    		selenium_shares=new Array();
	    	}
	    	var selenium_share={};
	    	if(selenium_shares==null){
	    		selenium_share["runno"]=1;
	    	}else{
	    		selenium_share["runno"]=selenium_shares.length+1;
	    	}
	    	selenium_share["projectid"]=row.projectid;
	    	selenium_share["projectname"]=row.projectname;
	    	selenium_share["testid"]=row.testid;
	    	selenium_share["testname"]=row.testname;
	    	selenium_share["testno"]=row.testno;
	    	selenium_shares.push(selenium_share);
	    	$("#script_dialog_1 #testvalue").textbox('setValue',JSON.stringify(selenium_shares))
	    	
	    	//单个数据
//	    	var selenium_shares=new Array();;
//	    	var selenium_share={};
//	    	selenium_share["projectid"]=row.projectid;
//	    	selenium_share["projectname"]=row.projectname;
//	    	selenium_share["testid"]=row.testid;
//	    	selenium_share["testname"]=row.testname;
//	    	selenium_shares.push(selenium_share);
//	    	$("#script_dialog_1 #testvalue").textbox('setValue',JSON.stringify(selenium_shares))
	    },
	    //单击选择数据
	    onClickRow:function(index, row){  
	    	
	    },
	    //在加载数据成功的时候触发，
	    onLoadSuccess:function(data){
	    },
	});  
	
	//删除一个脚本
	$('#script_dialog #del_').click(function(){
		var scriptid=$('#script_dialog #del_').val();
		if(scriptid==''){
			//EasyUI Messager 消息框,警示（alert）、确认（confirm）、提示（prompt）、进展（progress）等等
			$.messager.alert('警告','请选择一条数据再删除！');
			return;
		}
//			var confirm=null;
		//EasyUI Messager 消息框,警示（alert）、确认（confirm）、提示（prompt）、进展（progress）等等
		$.messager.confirm('警告','请确认是否需要删除这条数据！确定？',function(r){
		    if (r){
				$.ajax({
					type:"POST",
					url:addurl+"/testmng/scriptdel",
					async:false,
					data:{scriptid:scriptid},
					cache:true,
					success: function(result){
						if(result==''){
							$.messager.alert('警告','没有权限');
						}else
						if(result !='ok'){
							$.messager.alert('警告',result);
						}else{
							$('#script_dialog #box_db').datagrid('reload');
						}
					},
					error:function(XMLResponse){
						alert(XMLResponse.responseText)
					}
				});   
		    }
		});
	});
	
	//脚本按钮
	$("#mm_selenium #script_").click(function(){
		if($('#mm_selenium #script_').val()==''){
			$.messager.alert('警告','请选择一条数据再操作！');
			return;
		}
		script();
		
		$("#script_dialog_1 #ComboBox_right").combobox('setValue',0);
		
//		$('#script_dialog #box_db').datagrid('load', {testno:$("#script_dialog #testno").val(),scriptname:$("#script_dialog #search_data").textbox('getValue')},'reload');//将参数传给数据表格，当做查询条件到服务端获取数据
		$("#script_dialog").dialog({closed:false})
		
		//下载附件路径
		var testid=$("#mm_selenium #script_").val();
		var addr=addurl+"/testmng/seleniumdownfile?testid="+testid;
		$("#selenium_button1").attr("href",addr);
	});
	
	$("#mm_selenium #test_").click(function(){
		if($("#mm_selenium #test_").val()==''){
			$.messager.alert('警告','请选择一条数据再操作！');
			return;
		}
		$.messager.confirm('警告','开始测试案例'+$('#script_dialog_1 #testno').textbox('getValue')+'！确定？',function(r){
		    if (r){
		    	onloading();
				$.ajax({
					type:"POST",
					url:addurl+"/testmng/selenium_testone",
					async:true,
					data:{projectid:$('#box_2_3 #projectid').val(),testid:$("#mm_selenium #test_").val(),testno:$('#script_dialog_1 #testno').textbox('getValue')},
					cache:true,
					success: function(result){
						removeload();
						if(result==''){
							$.messager.alert('警告','没有权限');
						}else{
							if(result=='ok'){
								$.messager.alert('警告','测试结束');
							}else{
								$.messager.alert('警告',result);
							}
						}
						$('#box_2_3 #box_db').datagrid('reload');
					},
					error:function(XMLResponse){
						alert(XMLResponse.responseText)
					}
				}); 
				return false;
		    }
		});
	});
	
	$("#mm_selenium #selenium_all_").click(function(){
		if($("#mm_selenium #selenium_all_").val()==''){
			$.messager.alert('警告','请选择一条数据再操作！');
			return;
		}
		$.messager.confirm('警告','开始测试全部案例！确定？',function(r){
		    if (r){
		    	onloading();
				$.ajax({
					type:"POST",
					url:addurl+"/testmng/selenium_testall",
					async:true,
					data:{projectid:$("#mm_selenium #selenium_all_").val(),search_data:$("#box_2_3 #search_data").textbox("getValue")},
					cache:true,
					success: function(result){
						removeload();
						if(result==''){
							$.messager.alert('警告','没有权限');
						}else{
							if(result=='ok'){
								$.messager.alert('警告','测试结束');
							}else{
								$.messager.alert('警告',result);
							}
						}
						
						$('#box_2_3 #box_db').datagrid('reload');
					},
					error:function(XMLResponse){
						alert(XMLResponse.responseText)
					}
				});   
				return false;
		    }
		});
	});
	
	//team_dialog对话框，保存数据
	$('#team_dialog').dialog(
		{    
		title: '新增数据',    
	    width: 600,    
	    height: 600,    
	    closed: true,//true窗口关闭，false窗口打开
	    modal:true,//弹出后，只能操作本窗口
	    buttons:[{//对话框底部按钮
			text:'保存',
			handler:function(){
				if(!$("#team_form").form('validate')){//验证#dialog对话框中的所有内容是否验证通过,不一定非要form标签,直接引用ID就可以
					return;
				}
				if($("#dialog_type").val()==0){
					$.ajax({
						type:"POST",
						url:addurl+"/testmng/teamadd",
						async:false,
						cache:true,
						data:$("#team_form").serialize(),
						success: function(result){
							if(result==''){
								$.messager.alert('警告','没有权限');
							}else
							if(result !='ok'){
								$.messager.alert('警告',result);
							}else{
								$('#team_dialog').dialog({closed: true,});
								$('#box_2_1 #box_db').datagrid('reload');
							}
						},
						error:function(XMLResponse){
							alert(XMLResponse.responseText)
						}
					});
				}
				if($("#dialog_type").val()==1){
					$.ajax({
						type:"POST",
						url:addurl+"/testmng/teamupdate",
						async:false,
						cache:true,
						data:$("#team_form").serialize(),
						success: function(result){
							if(result==''){
								$.messager.alert('警告','没有权限');
							}else
							if(result !='ok'){
								$.messager.alert('警告',result);
							}else{
								$('#team_dialog').dialog({closed: true,});
								$('#box_2_1 #box_db').datagrid('reload');
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
				$('#team_dialog').dialog({closed: true,});
			}
		}]
	});  
	
	//对话框，保存数据
	$('#project_dialog').dialog(
		{    
		title: '新增数据',    
	    width: 600,    
	    height: 600,    
	    closed: true,//true窗口关闭，false窗口打开
	    modal:true,//弹出后，只能操作本窗口
//	    href: 'javascript:;', //窗口默认请求地址
//	    toolbar:[{//对话框工具按钮功能
//			text:'编辑',
//			iconCls:'icon-edit',
//			handler:function(){alert('edit')}
//		},{
//			text:'帮助',
//			iconCls:'icon-help',
//			handler:function(){alert('help')}
//		}]
	    
	    buttons:[{//对话框底部按钮
			text:'保存',
			handler:function(){
				if(!$("#project_form").form('validate')){//验证#dialog对话框中的所有内容是否验证通过,不一定非要form标签,直接引用ID就可以
					return;
				}
				if($("#dialog_type").val()==0){
					$.ajax({
						type:"POST",
						url:addurl+"/testmng/projectadd",
						async:false,
						cache:true,
						data:$("#project_form").serialize(),
						success: function(result){
							if(result==''){
								$.messager.alert('警告','没有权限');
							}else
							if(result !='ok'){
								$.messager.alert('警告',result);
							}else{
								$('#project_dialog').dialog({closed: true});
								$('#box_2_2 #box_db').datagrid('reload');
							}
						},
						error:function(XMLResponse){
							alert(XMLResponse.responseText)
						}
					});
				}
				if($("#dialog_type").val()==1){
					$.ajax({
						type:"POST",
						url:addurl+"/testmng/projectupdate",
						async:false,
						cache:true,
						data:$("#project_form").serialize(),
						success: function(result){
							if(result==''){
								$.messager.alert('警告','没有权限');
							}else
							if(result !='ok'){
								$.messager.alert('警告',result);
							}else{
								$('#project_dialog').dialog({closed: true});
								$('#box_2_2 #box_db').datagrid('reload');
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
				$('#project_dialog').dialog({closed: true,});
			}
		}]
	});
	
	//对话框，保存数据
	$('#testmng_dialog').dialog(
		{    
		title: '新增数据',    
	    width: 600,    
	    height: 600,    
	    closed: true,//true窗口关闭，false窗口打开
	    modal:true,//弹出后，只能操作本窗口
//	    href: 'javascript:;', //窗口默认请求地址
//	    toolbar:[{//对话框工具按钮功能
//			text:'编辑',
//			iconCls:'icon-edit',
//			handler:function(){alert('edit')}
//		},{
//			text:'帮助',
//			iconCls:'icon-help',
//			handler:function(){alert('help')}
//		}]
	    
	    buttons:[{//对话框底部按钮
			text:'保存',
			handler:function(){
				if(!$("#testmng_form").form('validate')){//验证#dialog对话框中的所有内容是否验证通过,不一定非要form标签,直接引用ID就可以
					return;
				}
				if($("#dialog_type").val()==0){
					$.ajax({
						type:"POST",
						url:addurl+"/testmng/testmngadd",
						async:false,
						cache:true,
						data:$("#testmng_form").serialize(),
						success: function(result){
							if(result==''){
								$.messager.alert('警告','没有权限');
							}else
							if(result !='ok'){
								$.messager.alert('警告',result);
							}else{
								$('#testmng_dialog').dialog({closed: true});
								$('#box_2_3 #box_db').datagrid('reload');
							}
						},
						error:function(XMLResponse){
							alert(XMLResponse.responseText)
						}
					});
				}
				if($("#dialog_type").val()==1){
					$.ajax({
						type:"POST",
						url:addurl+"/testmng/testmngupdate",
						async:false,
						cache:true,
						data:$("#testmng_form").serialize(),
						success: function(result){
							if(result==''){
								$.messager.alert('警告','没有权限');
							}else
							if(result !='ok'){
								$.messager.alert('警告',result);
							}else{
								$('#testmng_dialog').dialog({closed: true});
								$('#box_2_3 #box_db').datagrid('reload');
								
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
				$('#testmng_dialog').dialog({closed: true,});
			}
		}]
	});
	
	//script_dialog对话框，保存数据
	$('#script_dialog').dialog(
		{    
		title: '新增数据',    
	    width: 700,    
	    height: 600,    
	    closed: true,//true窗口关闭，false窗口打开
	    modal:true,//弹出后，只能操作本窗口
	    buttons:[{
			text:'关闭',
			handler:function(){
				$('#script_dialog').dialog({closed: true,});
				$('#script_dialog #search_data').textbox('setValue','');
			}
		}]
	});  
	
	$('#script_dialog_1').dialog(
		{    
		title: '新增数据',    
	    width: 600,    
	    height: 600,    
	    closed: true,//true窗口关闭，false窗口打开
	    modal:true,//弹出后，只能操作本窗口
	    buttons:[{//对话框底部按钮
			text:'保存',
			handler:function(){
				if(!$("#script_form").form('validate')){//验证#dialog对话框中的所有内容是否验证通过,不一定非要form标签,直接引用ID就可以
					return;
				}
				
				if($("#dialog_type").val()==0){
					$.ajax({
						type:"POST",
						url:addurl+"/testmng/scriptadd",
						async:false,
						cache:true,
						data:$("#script_form").serialize(),
						success: function(result){
							if(result==''){
								$.messager.alert('警告','没有权限');
							}else
							if(result !='ok'){
								$.messager.alert('警告',result);
							}else{
								$('#script_dialog_1').dialog({closed: true});
								$('#script_dialog #box_db').datagrid('reload');
							}
						},
						error:function(XMLResponse){
							alert(XMLResponse.responseText)
						}
					});
				}
				
				if($("#dialog_type").val()==1){
					$.ajax({
						type:"POST",
						url:addurl+"/testmng/scriptupdate",
						async:false,
						cache:true,
						data:$("#script_form").serialize(),
						success: function(result){
							if(result==''){
								$.messager.alert('警告','没有权限');
							}else
							if(result !='ok'){
								$.messager.alert('警告',result);
							}else{
								$('#script_dialog_1').dialog({closed: true});
								$('#script_dialog #box_db').datagrid('reload');
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
				
				$('#script_dialog_1').dialog({closed: true,});
			}
		}]
	});  
	
	
	//查询功能
	//easyui搜索
	//生成新的查询
	$("#box_2_1 #box_search_button").bind('click',function(){
		$('#box_2_1 #box_db').datagrid('load', {teamname:$('#box_2_1 #search_data').textbox('getValue')},'reload');//将参数传给数据表格，当做查询条件到服务端获取数据
	})
	//生成新的查询
	$("#box_2_2 #box_search_button").bind('click',function(){
		$('#box_2_2 #box_db').datagrid('load', {teamid:$('#box_2_2 #ComboBox_right').combobox('getValue'),projectname:$('#box_2_2 #search_data').textbox('getValue')},'reload');//将参数传给数据表格，当做查询条件到服务端获取数据
	})
	//生成新的查询
	$("#box_2_3 #box_search_button").bind('click',function(){
		//给审查全部案例赋值
		$("#mm_pa #pa_all").val($('#box_2_3 #ComboBox_right').combobox('getValue'));
		//给selenium测试所有案例赋值
		$("#mm_selenium #selenium_all_").val($('#box_2_3 #ComboBox_right').combobox('getValue'));
		$('#box_2_3 #box_db').datagrid('load', {projectid:$('#box_2_3 #ComboBox_right').combobox('getValue'),searchdate:$('#box_2_3 #search_data').textbox('getValue')},'reload');//将参数传给数据表格，当做查询条件到服务端获取数据
	})
	//生成新的查询
	$("#script_dialog #box_search_button").bind('click',function(){
		$('#script_dialog #box_db').datagrid('load', {testid:$("#mm_selenium #script_").val(),scriptname:$('#script_dialog #search_data').textbox('getValue')},'reload');//将参数传给数据表格，当做查询条件到服务端获取数据
	})

	
	//selenium附件上传
	$('#selenium_button').click(function (){
		$('#selenium_file').dialog('open');
	})
	//selenium删除附件
	$('#selenium_button2').click(function (){
		var addurl=$("#addurl").val();
		var testid=$("#mm_selenium #script_").val();
		alert(testid)
		$.ajax({
			type:'post',
			url:addurl+"/testmng/seleniumfile_del",
			async:true,
			data:{testid:testid},
	    	success: function(result){
			},
			error:function(XMLResponse){
				alert(XMLResponse.responseText)
			}
		});
		return false;
	})
	
	//selenium对话框
	$('#selenium_file').dialog(
		{    
		title: '附件上传',    
	    width: 400,    
	    height: 200,    
	    closed: true,//true窗口关闭，false窗口打开
	    modal:true,//弹出后，只能操作本窗口
	    buttons:[{//对话框底部按钮
			text:'关闭',
			handler:function(){
				$('#selenium_file').dialog({closed: true,});
				$('#selenium_file #form_file').form('clear');
			}
		}]
	});
	
	//redis查看结果窗口
	$('#redis_dialog').dialog(
			{    
			title: 'redis数据',    
		    width: 800,    
		    height: 600,    
		    closed: true,//true窗口关闭，false窗口打开
		    modal:true,//弹出后，只能操作本窗口
		    buttons:[{
				text:'关闭',
				handler:function(){
					$('#redis_dialog').dialog({closed: true,});
				}
			}]
		});  
	
	//案例测试json查看结果窗口
	$('#json_dialog').dialog(
			{    
			title: '审查结果对比',    
		    width: 800,    
		    height: 600,    
		    closed: true,//true窗口关闭，false窗口打开
		    modal:true,//弹出后，只能操作本窗口
		    buttons:[{
				text:'关闭',
				handler:function(){
					$('#json_dialog').dialog({closed: true,});
				}
			}]
		});  
	
	//上传附件
	//easyui-form提交
	$("#file_button").click(function(){
		//文件上传
		file_load();
		//进度条
		seleniumprogressbar_box();
		
	})
	
	//ORACLE 导数据窗口
	$("#mm_pa #hisdate_to_oracle").click(function(){
		$('#hisdate_to_oracle_dialog').dialog({closed: false})
		passorpa_hisdata=0;
	});
	$("#mm_pass #hisdate_to_oracle").click(function(){
		$('#hisdate_to_oracle_dialog').dialog({closed: false})
		passorpa_hisdata=1;
	});
	
	
	$("#hisdate_to_oracle_dialog #datetime1").textbox("setValue","2010-01-01"),
	$("#hisdate_to_oracle_dialog #hiscodes1").textbox({
		onChange:function(newValue, oldValue){
			if(newValue!=''){
				$("#hisdate_to_oracle_dialog #createview1").combobox("readonly",false);
			}else{
				$("#hisdate_to_oracle_dialog #createview1").combobox("setValue",0);
				$("#hisdate_to_oracle_dialog #createview1").combobox("readonly",true);
			}
			if(newValue!='' && $("#hisdate_to_oracle_dialog #sum_date1").textbox('getValue') !=''
				&& $("#hisdate_to_oracle_dialog #count1").textbox('getValue') != ''){
				$("#hisdate_to_oracle_dialog #mz1").combobox("readonly",false);
				$("#hisdate_to_oracle_dialog #zy1").combobox("readonly",false);
				$("#hisdate_to_oracle_dialog #cy1").combobox("readonly",false);
//				$("#hisdate_to_oracle_dialog #dict1").combobox("readonly",false);
			}else{
				$("#hisdate_to_oracle_dialog #mz1").combobox("setValue",0);
				$("#hisdate_to_oracle_dialog #zy1").combobox("setValue",0);
				$("#hisdate_to_oracle_dialog #cy1").combobox("setValue",0);
//				$("#hisdate_to_oracle_dialog #dict1").combobox("setValue",0);
				$("#hisdate_to_oracle_dialog #mz1").combobox("readonly",true);
				$("#hisdate_to_oracle_dialog #zy1").combobox("readonly",true);
				$("#hisdate_to_oracle_dialog #cy1").combobox("readonly",true);
//				$("#hisdate_to_oracle_dialog #dict1").combobox("readonly",true);
			}
		}
	});
	$("#hisdate_to_oracle_dialog #sum_date1").textbox({
		onChange:function(newValue, oldValue){
			if(newValue!='' && $("#hisdate_to_oracle_dialog #hiscodes1").textbox('getValue') !=''
				&& $("#hisdate_to_oracle_dialog #count1").textbox('getValue') != ''){
				$("#hisdate_to_oracle_dialog #mz1").combobox("readonly",false);
				$("#hisdate_to_oracle_dialog #zy1").combobox("readonly",false);
				$("#hisdate_to_oracle_dialog #cy1").combobox("readonly",false);
//				$("#hisdate_to_oracle_dialog #dict1").combobox("readonly",false);
			}else{
				$("#hisdate_to_oracle_dialog #mz1").combobox("setValue",0);
				$("#hisdate_to_oracle_dialog #zy1").combobox("setValue",0);
				$("#hisdate_to_oracle_dialog #cy1").combobox("setValue",0);
//				$("#hisdate_to_oracle_dialog #dict1").combobox("setValue",0);
				$("#hisdate_to_oracle_dialog #mz1").combobox("readonly",true);
				$("#hisdate_to_oracle_dialog #zy1").combobox("readonly",true);
				$("#hisdate_to_oracle_dialog #cy1").combobox("readonly",true);
//				$("#hisdate_to_oracle_dialog #dict1").combobox("readonly",true);
			}
		}
	});
	$("#hisdate_to_oracle_dialog #count1").textbox({
		onChange:function(newValue, oldValue){
			if(newValue!='' && $("#hisdate_to_oracle_dialog #hiscodes1").textbox('getValue') !=''
				&& $("#hisdate_to_oracle_dialog #sum_date1").textbox('getValue') != ''){
				$("#hisdate_to_oracle_dialog #mz1").combobox("readonly",false);
				$("#hisdate_to_oracle_dialog #zy1").combobox("readonly",false);
				$("#hisdate_to_oracle_dialog #cy1").combobox("readonly",false);
//				$("#hisdate_to_oracle_dialog #dict1").combobox("readonly",false);
			}else{
				$("#hisdate_to_oracle_dialog #mz1").combobox("setValue",0);
				$("#hisdate_to_oracle_dialog #zy1").combobox("setValue",0);
				$("#hisdate_to_oracle_dialog #cy1").combobox("setValue",0);
//				$("#hisdate_to_oracle_dialog #dict1").combobox("setValue",0);
				$("#hisdate_to_oracle_dialog #mz1").combobox("readonly",true);
				$("#hisdate_to_oracle_dialog #zy1").combobox("readonly",true);
				$("#hisdate_to_oracle_dialog #cy1").combobox("readonly",true);
//				$("#hisdate_to_oracle_dialog #dict1").combobox("readonly",true);
			}
		}
	});
	
	$("#hisdate_to_oracle_dialog #match_scheme1").textbox({
		onChange:function(newValue, oldValue){
			if(newValue!=''){
				$("#hisdate_to_oracle_dialog #dict1").combobox("readonly",false);
			}else{
				$("#hisdate_to_oracle_dialog #dict1").combobox("setValue",0);
				$("#hisdate_to_oracle_dialog #dict1").combobox("readonly",true);
			}
//			if(newValue!='' && $("#hisdate_to_oracle_dialog #hiscodes1").textbox('getValue') !=''
//				&& $("#hisdate_to_oracle_dialog #sum_date1").textbox('getValue') != ''
//					&& $("#hisdate_to_oracle_dialog #count1").textbox('getValue') != ''){
//				$("#hisdate_to_oracle_dialog #mz1").combobox("readonly",false);
//				$("#hisdate_to_oracle_dialog #zy1").combobox("readonly",false);
//				$("#hisdate_to_oracle_dialog #cy1").combobox("readonly",false);
////				$("#hisdate_to_oracle_dialog #dict1").combobox("readonly",false);
//			}else{
//				$("#hisdate_to_oracle_dialog #mz1").combobox("setValue",0);
//				$("#hisdate_to_oracle_dialog #zy1").combobox("setValue",0);
//				$("#hisdate_to_oracle_dialog #cy1").combobox("setValue",0);
////				$("#hisdate_to_oracle_dialog #dict1").combobox("setValue",0);
//				$("#hisdate_to_oracle_dialog #mz1").combobox("readonly",true);
//				$("#hisdate_to_oracle_dialog #zy1").combobox("readonly",true);
//				$("#hisdate_to_oracle_dialog #cy1").combobox("readonly",true);
////				$("#hisdate_to_oracle_dialog #dict1").combobox("readonly",true);
//			}
		}
	});
	
	$('#hisdate_to_oracle_dialog').dialog(
		{    
		title: "TOOLS",    
	    width: 1000,    
	    height: 600,    
	    closed: true,//true窗口关闭，false窗口打开
	    modal:false,//弹出后，只能操作本窗口
	    buttons:[{
			text:'test-导数据',
			handler:function(){
				parent.onloading();
				$.ajax({
					type:"POST",
					url:addurl+"/testmng/date_to_oracle",
					async:true,
					data:{hiscodes1:$("#hisdate_to_oracle_dialog #hiscodes1").textbox("getValue"), 
						datetime1:$("#hisdate_to_oracle_dialog #datetime1").textbox("getValue"),
						sum_date1:$("#hisdate_to_oracle_dialog #sum_date1").textbox("getValue"),
						count1:$("#hisdate_to_oracle_dialog #count1").textbox("getValue"),
						mz1:$("#hisdate_to_oracle_dialog #mz1").combobox("getValue"),
						zy1:$("#hisdate_to_oracle_dialog #zy1").combobox("getValue"),
						cy1:$("#hisdate_to_oracle_dialog #cy1").combobox("getValue"),
						dict1:$("#hisdate_to_oracle_dialog #dict1").combobox("getValue"),
						createview1:$("#hisdate_to_oracle_dialog #createview1").combobox("getValue"),
						trunca1:$("#hisdate_to_oracle_dialog #trunca1").combobox("getValue"),
						anlisum:$("#hisdate_to_oracle_dialog #anlisum").combobox("getValue"),
						match_scheme1:$("#hisdate_to_oracle_dialog #match_scheme1").textbox("getValue"),
						createTB1:$("#hisdate_to_oracle_dialog #createTB1").textbox("getValue"),
						passorpa_hisdata1:passorpa_hisdata},
						
					success: function(result){
						parent.removeload();
						if(result==''){
							$.messager.alert('警告',"没有权限");
						}else{
							$.messager.alert('警告',result);
						}
						
					},
					error:function(XMLResponse){
						parent.removeload();
						alert(XMLResponse.responseText)
					}
				});
				return false;
			}
		}],
		//X关闭功能
		onClose:function(){
		},
	});
	
	//对话框
	$('#dlg_right_file').dialog(
		{    
		title: '附件上传',    
	    width: 400,    
	    height: 200,    
	    closed: true,//true窗口关闭，false窗口打开
	    modal:true,//弹出后，只能操作本窗口
	    buttons:[{//对话框底部按钮
			text:'关闭',
			handler:function(){
				$('#dlg_right_file').dialog({closed: true,});
				$('#selenium_file #form_file').form('clear');
			}
		}]
	});
	
	
	//DIV用来显示图片使用
	$('#file_dialog_1').dialog({    
	    title: '文件加载',    
	    width: 800,
	    height: 400,  
	    closed: true,    
	    modal: true,
//	    fit:true,//强制自适应浏览器最大
	    resizable:true,//可拖拉
	    maximizable:true,//缩小放大按钮
	    buttons:[]
	});
});

function team(){
	var addurl=$("#addurl").val();
	//team-------------------------
	////生成新的easyui表格
	$('#box_2_1 #box_db').datagrid({
		title:'团队',
		height:660, 
		width:1090,
		pageSize:30,
	    url:addurl+"/testmng/team",
	    singleSelect:true,//true单选，不配置或者false为多选
	    pagination:true,//翻页栏
	    rownumbers:true,//行序号显示
	    toolbar:'#button_1',//工具栏设置
	    columns:[[  
			{field:'teamid',hidden:true},
			{field:'teamname',title:'团队名称',width:350,halign:'center'},
			{field:'remark',title:'备注',width:350,halign:'center',
				formatter: function(value,row,index){
					var tooltil1=tooltil(value,30);
                    return tooltil1;
				}
			}
	    ]],
	    
	    //双击获取行数据
	    onDblClickRow:function(index, row){
	    	//信息编辑入口，重置form表单
	    	$("#dialog_type").val(1);
	    	$("#team_dialog #teamname").textbox({'readonly': true});
	    	$("#team_dialog #teamid").val(row.teamid);
	    	$("#team_dialog #teamname").textbox('setValue',row.teamname);
	    	$("#team_dialog #remark").textbox('setValue',row.remark);
	    	$("#team_dialog").dialog({closed: false});
	    },
	    //单击选择数据
	    onClickRow:function(index, row){  
			$('#box_2_1 #del_').val(row.teamid);
	    },
	});  
	
	//显示菜单按钮
//	$('#mm').menu('show', {    
//		left: 200,    
//		top: 100    
//	});
}

function project(){
	var addurl=$("#addurl").val();
	//project-------------------------
	//生成新的easyui表格
	$('#box_2_2 #box_db').datagrid({
		title:'项目',
		height:660, 
		width:1090,
		pageSize:30,
	    url:addurl+"/testmng/project",
	    singleSelect:true,//true单选，不配置或者false为多选
	    pagination:true,//翻页栏
	    rownumbers:true,//行序号显示
	    toolbar:'#button_2',//工具栏设置
	    columns:[[  
			{field:'projectid',hidden:true},
			{field:'teamname',title:'团队名称',width:150,halign:'center'},
			{field:'projectname',title:'项目名称',width:350,halign:'center'},
			{field:'remark',title:'备注',width:400,halign:'center',
				formatter: function(value,row,index){
					var tooltil1=tooltil(value,400);
                    return tooltil1;
				}	
			}
	    ]],
	    
	    //双击获取行数据
	    onDblClickRow:function(index, row){
	    	$("#dialog_type").val(1);
	    	$('#project_dialog #ComboBox_right').combobox({    
			    url:addurl+"/testmng/teamgroup",    
			    valueField:'teamid',    
			    textField:'teamname',
			});
//	    	$("#project_dialog #projectname").textbox({'readonly': true});
	    	$("#project_dialog #projectid").val(row.projectid);
	    	$('#project_dialog #ComboBox_right').combobox('setValue', row.teamid);
	    	$("#project_dialog #projectname").textbox('setValue',row.projectname);
	    	$("#project_dialog #testurl").textbox('setValue',row.testurl);
	    	$("#project_dialog #browserpath").textbox('setValue',row.browserpath);
	    	$("#project_dialog #remark").textbox('setValue',row.remark);
	    	$("#project_dialog").dialog({closed: false}); 
	    },
	    //单击选择数据
	    onClickRow:function(index, row){  
			$('#box_2_2 #del_').val(row.projectid);
	    },
	});  
}

function testmng(){
	var addurl=$("#addurl").val();
	//testmng-------------------------
	//生成新的easyui表格
	$('#box_2_3 #box_db').datagrid({
		title:'案例',
		height:660, 
		width:1090,
		pageSize:30,
	    url:addurl+"/testmng/testmng",
	    singleSelect:true,//true单选，不配置或者false为多选
	    pagination:true,//翻页栏
	    rownumbers:true,//行序号显示
	    sortName:"testno",//允许排序字段
	    toolbar:'#button_3',//工具栏设置
	    columns:[[  
	        {field:'testid',title:'案例序号'},
	        {field:'projectname',title:'项目名称',width:100,halign:'center'},
			{field:'testresult',title:'测试结果',width:80,halign:'center',
	        	formatter: function(value,row,index){
					var tooltil1=tooltil(value,5);
                    return tooltil1;
				}
	        },
			{field:'testname',title:'案例名称',width:100,halign:'center',
				formatter: function(value,row,index){
					var tooltil1=tooltil(value,10);
                    return tooltil1;
				}
			},
			{field:'testno',title:'案例编号',width:80,halign:'center',sortable:true,order:"asc"},//排序
			{field:'testtext',title:'逻辑描述',width:250,halign:'center',
				formatter: function(value,row,index){
					var tooltil1=tooltil(value,10);
                    return tooltil1;
				}
			},
			{field:'testin',title:'输入条件',width:250,halign:'center',
				formatter: function(value,row,index){
					var tooltil1=tooltil(value,20);
                    return tooltil1;
//					return '<span style="color:red">'+tooltil1+'</span>';
				}
//				styler: function(value,row,index){
//					if (value.length > 50){
//						return 'text-overflow：ellipsis;overflow：hidden;';
//					}
//				}
			},
			{field:'testout',title:'预期结果',width:250,halign:'center',
				formatter: function(value,row,index){
					var tooltil1=tooltil(value,20);
                    return tooltil1;
				}
			},
			{field:'remark',title:'备注',width:100,halign:'center',
				formatter: function(value,row,index){
					var tooltil1=tooltil(value,20);
                    return tooltil1;
				}
			},
			{field:'selenium_share_status',title:'selenium公共脚本',width:100,halign:'center',
				formatter: function(value,row,index){
					if(value==0){
						return "否"
					}else{
						return "是"
					}
				}
			},
			{field:'status',title:'状态',width:50,halign:'center',
				formatter: function(value,row,index){
					if(value==1){
						return "启用"
					}else{
						return "停用"
					}
				}
			},
			{field:'username',title:'姓名',width:80,halign:'center'},
			{field:'inserttime',title:'创建日期',width:130,halign:'center'}
	    ]],
	    
	    //双击获取行数据
	    onDblClickRow:function(index, row){  
	    	$("#dialog_type").val(1);
	    	$('#testmng_dialog #ComboBox_right').combobox({    
			    url:addurl+"/testmng/projectgroup",    
			    valueField:'projectid',    
			    textField:'projectname',
			});
//	    	$("#testmng_dialog #testname").textbox({'readonly': true});
	    	$("#testmng_dialog #testid").val(row.testid);
	    	$('#testmng_dialog #ComboBox_status').combobox('setValue', row.status);
	    	$('#testmng_dialog #ComboBox_right').combobox('setValue', row.projectid);
	    	$('#testmng_dialog #selenium_share_status').combobox('setValue', row.selenium_share_status);
	    	$("#testmng_dialog #testname").textbox('setValue',row.testname);
	    	$("#testmng_dialog #testno").textbox('setValue',row.testno);
	    	$("#testmng_dialog #testtext").textbox('setValue',row.testtext);
	    	$("#testmng_dialog #testin").textbox('setValue',row.testin);
	    	$("#testmng_dialog #testout").textbox('setValue',row.testout);
	    	$("#testmng_dialog #testresult").textbox('setValue',row.testresult);
	    	$("#testmng_dialog #remark").textbox('setValue',row.remark);
	    	$("#testmng_dialog").dialog({closed: false});
	    },
	    //单击选择数据
	    onClickRow:function(index, row){  
	    	$('#box_2_3 #del_').val(row.testid);
	    	$("#mm_selenium #test_").val(row.testid);
	    	$('#box_2_3 #projectid').val(row.projectid);
	    	$("#mm_selenium #script_").val(row.testid);
	    	$('#box_2_3 #copy_').val(row.testid);
	    	$("#mm_pa #pa_java").val(row.testid);
	    	$("#mm_pa #pa_win").val(row.testid);
	    	$('#script_dialog_1 #testno').textbox('setValue',row.testno);
	    	$("#mm_pa #pa_screen_redis").val(row.testid);
	    	
	    	//调用父级（父类）页面的方法，调用test_manage.jsp页面的js方法
	    	testindex=index;//记录上次的选中行
    		parent.json_clear();
    		parent.pat_clear();
    		parent.work_row_clear();
    		
    		try { 
    			var obj = JSON.parse(row.testin);
    	    	
    	    	parent.title(row.testno);
    	    	parent.data_no_=row.testid;//数据在数据库中的编号，需要更新数据到数据库时使用
    	    	parent.cli(obj.PassClient);
    	    	parent.pat(obj.Patient);
    	    	parent.aller(obj.ScreenAllergenList);
    	    	parent.dis(obj.ScreenMedCondList);
    	    	parent.opr(obj.ScreenOperationList);
    	    	parent.odr(obj.ScreenDrugList);
    	    	parent.jsoninfo(obj.InputJsonInfoList);
    	    	
    	    	VisitCode=obj.Patient.VisitCode;//医院流水号,审查时使用
    		}catch (e) {
//    			alert(e.name + ": " + e.message);//异常保护
    		} 
	    	
	    },
	    //在加载数据成功的时候触发，
	    onLoadSuccess:function(data){
	    	if(testindex>=0){
	    		//保持上次的选中记录
	    		$('#box_2_3 #box_db').datagrid('selectRow',testindex);
	    		
	    		var row = $('#box_2_3 #box_db').datagrid('getSelected');
	    		parent.json_clear();
	    		parent.pat_clear();
	    		
	    		try { 
	    			var obj = JSON.parse(row.testin);
	    	    	
	    	    	parent.title(row.testno);
	    	    	parent.data_no_=row.testid;//数据在数据库中的编号，需要更新数据到数据库时使用
	    	    	parent.cli(obj.PassClient);
	    	    	parent.pat(obj.Patient);
	    	    	parent.aller(obj.ScreenAllergenList);
	    	    	parent.dis(obj.ScreenMedCondList);
	    	    	parent.opr(obj.ScreenOperationList);
	    	    	parent.odr(obj.ScreenDrugList);
	    	    	parent.jsoninfo(obj.InputJsonInfoList);
	    	    	
	    	    	VisitCode=obj.Patient.VisitCode;//医院流水号,审查时使用
	    		}catch (e) {
//	    			alert(e.name + ": " + e.message);//异常保护
	    		} 
	    	}
	    },
	});  
}

function script(){
	var addurl=$("#addurl").val();
	//testmng-------------------------
	//生成新的easyui表格
	$('#script_dialog #box_db').datagrid({
		//title:'学习记录',
		height:490, 
		width:680,
		pageSize:30,
	    url:addurl+"/testmng/script",
	    singleSelect:true,//true单选，不配置或者false为多选
	    pagination:true,//翻页栏
	    rownumbers:true,//行序号显示
	    toolbar:'#button_4',//工具栏设置
	    queryParams: {testid:$('#mm_selenium #script_').val(),scriptname:$('#script_dialog #search_data').textbox('getValue')},//生成表格时，额外的查询条件
	    columns:[[  
	        {field:'scriptid',hidden:true},
	        {field:'scriptstatus',title:'状态',width:100,halign:'center',
	        	formatter: function(value,row,index){
					if(value == 0){
						return "停用";
					}else{
						return "启用";
					}
//					var tooltil1=tooltil(value,10);
//                    return tooltil1;
				}	
	        },
	        {field:'scriptname',title:'脚本名称',width:100,halign:'center'},
			{field:'xpath',title:'页面定位',width:150,halign:'center'},
			{field:'testvalue',title:'输入值',width:120,halign:'center',
				formatter: function(value,row,index){
					if(value.length>200){
						return "页面源代码";
					}else{
						var tooltil1=tooltil(value,10);
	                    return tooltil1;
					}
//					var tooltil1=tooltil(value,10);
//                    return tooltil1;
				}
			},
			{field:'scripttype',title:'类型',width:100,halign:'center',
				formatter: function(value,row,index){
					if (row.scripttype==0){
						return "打开新web地址";
					}
					if (row.scripttype==1){
						return "输入值";
					}
					if (row.scripttype==2){
						return "批量输入值";
					}
					if (row.scripttype==3){
						return "定位嵌入页iframe位置";
					}
					if (row.scripttype==4){
						return "切回到上级iframe位置";
					}
					if (row.scripttype==5){
						return "跳出iframe切回主文档";
					}
					if (row.scripttype==70){
						return "关联公共脚本";
					}
					if (row.scripttype==71){
						return "关联公共脚本-必运行";
					}
					if (row.scripttype==88){
						return "点击";
					}
					if (row.scripttype==89){
						return "断言-全等(页面源代码)";
					}
					if (row.scripttype==90){
						return "断言-全等(图片)";
					}
					if (row.scripttype==98){
						return "断言-全等";
					}
					if (row.scripttype==99){
						return "断言-包含";
					}
					if (row.scripttype==100){
						return "关闭当前窗口";
					}
					if (row.scripttype==111){
						return "新开标签窗口";
					}
					if (row.scripttype==102){
						return "关闭所有窗口";
					}
					if (row.scripttype==112){
						return "切换窗口";
					}
					if (row.scripttype==10){
						return "等待时间(毫秒)";
					}
				}
			},
			{field:'step',title:'顺序',width:50,halign:'center'},
//			{field:'alltest_status',title:'批量测试执行',width:100,halign:'center',
//				formatter: function(value,row,index){
//					if (row.alltest_status==0){
//						return "否";
//					}
//					if (row.alltest_status==1){
//						return "是";
//					}
//				}
//			},
			{field:'testurl',title:'测试地址',width:300,halign:'center'},
			{field:'testno',title:'案例编号',width:100,halign:'center'},
	    ]],
	    
	    //双击获取行数据
	    onDblClickRow:function(index, row){  
	    	$("#dialog_type").val(1);
	    	$("#testmng_dialog_1 #testno").textbox({'readonly': true});
//	    	script_ComboBox();
	    	$("#script_dialog_1 #ComboBox_right").combobox('setValue',row.scripttype);
//	    	if($("#script_dialog_1 #alltest_status").combobox('getValue')==null || 
//	    	    	$("#script_dialog_1 #alltest_status").combobox('getValue')==''){
//	    		$("#script_dialog_1 #alltest_status").combobox('setValue',0);
//	    	}else{
//	    		$("#script_dialog_1 #alltest_status").combobox('setValue',row.alltest_status);
//	    	}
	    	$("#script_dialog_1 #scriptstatus").combobox('setValue',row.scriptstatus);
	    	$('#script_dialog_1 #scriptid').val(row.scriptid);
	    	$('#script_dialog_1 #testno').textbox('setValue', row.testno);
	    	$("#script_dialog_1 #step").textbox('setValue',row.step);
	    	$("#script_dialog_1 #scriptname").textbox('setValue',row.scriptname);
	    	$("#script_dialog_1 #xpath").textbox('setValue',row.xpath);
	    	$("#script_dialog_1 #testvalue").textbox('setValue',row.testvalue);
	    	$("#script_dialog_1 #testurl").textbox('setValue',row.testurl);
	    	$("#script_dialog_1").dialog({closed: false});
	    },
	    //单击选择数据
	    onClickRow:function(index, row){  
	    	$('#script_dialog #del_').val(row.scriptid);
	    },
	});  
}

//数据表-字符过长返回浮动提示
function tooltil(val,len){
	var lens=getByteLen(val);
	if(lens>len){
		return '<a href="#" title="'+val+'" class="easyui-tooltip" style="text-decoration:none;color: #000000;">'+val+'</a>';
	}else{
		return val;
	}
	
}

//字符数教研
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

function clearbutton(){
	$("#box_2_1 #del_").val('');
	$("#box_2_2 #del_").val('');
	$("#box_2_3 #del_").val('');
	$("#box_2_3 #copy_").val('');
	$("#mm_selenium #script_").val('');
	$("#mm_selenium #test_").val('');
	$("#mm_selenium #selenium_all_").val('');
	$("#mm_pa #pa_java").val('');
	$("#mm_pa #pa_win").val('');
	$("#mm_pa #pa_screen_redis").val('');
	$("#mm_pa #pa_all").val('');
}

//脚本下拉单
function script_ComboBox(){
//	$('#script_dialog_1 #ComboBox_right').combobox({    
//	    valueField:'scripttype',    
//	    textField:'scriptname',
//	    data:[{    
//	        "scripttype":0,    
//	        "scriptname":"输入新web地址",
//	        "selected":true
//	    },{    
//	        "scripttype":1,    
//	        "scriptname":"输入值",
//	    },{    
//	        "scripttype":2,    
//	        "scriptname":"批量输入值",
//	    },{    
//	    	 "scripttype":70,    
//		        "scriptname":"关联公共脚本"   
//	    },{    
//	    	 "scripttype":88,    
//		        "scriptname":"点击"   
//	    },{    
//	    	 "scripttype":98,    
//		        "scriptname":"断言-全等"   
//	    },{    
//	    	 "scripttype":99,    
//		        "scriptname":"断言-包含"   
//	    },{    
//	    	 "scripttype":100,    
//		        "scriptname":"关闭当前窗口"   
//	    },{    
//	    	 "scripttype":102,    
//		        "scriptname":"关闭所有窗口"   
//	    },{    
//	        "scripttype":3,    
//	        "scriptname":"定位嵌入页iframe位置",
//	    },{    
//	        "scripttype":101,    
//	        "scriptname":"新开标签窗口",
//	    }]
//	});
}

//上传文件
function file_load(){
	var addurl=$("#addurl").val();
	var imgPath = $("#selenium_file #seleniumfile1").filebox('getValue');
	if (imgPath == "") {
		$.messager.alert('警告', '请选择上传文件！');
		return false;
	}
	//判断上传文件的后缀名
   var strExtension = imgPath.substr(imgPath.lastIndexOf('.') + 1);
   if (strExtension != 'java') {
   	$.messager.alert('警告','请选择java文件！');
       return false;
   };
   
   $("#selenium_file #testid").val($("#mm_selenium #script_").val());
   
	$.ajax({
		type:'post',
		url:addurl+"/testmng/seleniumuploadfile",
		async:true,
		data:new FormData($('#selenium_file #form_file')[0]),
		processData:false,
        contentType:false,
    	success: function(result){
    		return;
		},
		error:function(XMLResponse){
			alert(XMLResponse.responseText)
		}
	});
	return false;
}

//文件上传下载专用进度条
function seleniumprogressbar_box() {  
	$("#progressbar").remove();
	$("#selenium_file").append('<div id="progressbar"></div>');
	
	progressstatus();
};  

function progressstatus(){
	//定时器
	var interval=null;
    //生成一个进度条，想要修改进度条的颜色去css文件中去修改  
    $('#progressbar').progressbar({  
//        width : 200,        //设置进度条宽度 默认400  
//        height : 15,        //设置进度条高度 默认22  
        value : 0,          //设置进度条值 默认0  
        text : '{value}%',  //设置进度条百分比模板 默认 {value}%  
        
        //在value改变的时候触发  
        onChange : function (newValue, oldValue) {  
//            console.log('新:' + newValue + ',旧:' + oldValue);  
            if(newValue>=100){
            	$('#progressbar').progressbar('setValue', 100);
//            	$.messager.alert('','上传结束');
            	clearInterval(interval);
//            	$("#progressbar").remove();
            }
        },  
    });  
	
	//定时器
    interval=setInterval(function () { 
    	var fileprogress=getProgress();
    	
//    	console.log('我要的数据：'+fileprogress);
        //getValue  setValue 分别是返回当前进度值  和 设置一个进度值  
        $('#progressbar').progressbar('setValue', fileprogress.split('%')[0].split('.')[0]);
//        if( $('#progressbar').progressbar('getValue')>=100){
//        	$("#progressbar").remove();
//        
//        }
    }, 1000);
    
//    console.log($('#progressbar').progressbar('options'));  
    //$('#box').progressbar('resize', 80);  没啥大用  
}

//从后台获取当前文件上传下载进度
function getProgress(){
	var addurl=$("#addurl").val();
	
	var progress=null;
	$.ajax({
		type:'post',
		url:addurl+"/testmng/progress",
		async:false,
		data:{},
    	success: function(result){
    		progress=JSON.parse(result);
		},
		error:function(XMLResponse){
			alert(XMLResponse.responseText)
		}
	});
	
	return progress.percent;
}

//关联公共脚本按钮
function selenium_link(){
	$('#script_dialog_2 #box_db').datagrid({url:addurl+"/testmng/testmng_share"});
	$('#script_dialog_2 #box_db').datagrid('load', {projectid:$('#box_2_3 #ComboBox_right').combobox('getValue'),searchdate:$('#script_dialog_2 #search_data').textbox('getValue')},'reload');
	$('#script_dialog_2').dialog({closed:false});
}

function files_button(){
	if($("#script_dialog_1 #scriptid").val()==''){
		$.messager.alert('警告','请先保存脚本后再上传图片！');
		return;
	}
	$('#dlg_right_file #scriptid').val($("#script_dialog_1 #scriptid").val());
	$('#dlg_right_file').dialog({closed: false});
	$("#progressbar").remove();
}

//上传附件
//easyui-form提交
function files_sub(){
	//文件上传
	scriptfile_load();
	//进度条
	seleniumprogressbar_box();
}

//上传文件
function scriptfile_load(){
	var addurl=$("#addurl").val();
	var imgPath = $("#dlg_right_file #file1").filebox('getValue');
	if (imgPath == "") {
		$.messager.alert('警告', '请选择上传文件！');
		return false;
	}
	//判断上传文件的后缀名
   var strExtension = imgPath.substr(imgPath.lastIndexOf('.') + 1);
   if (strExtension != 'jpg' && strExtension != 'gif'
   && strExtension != 'png' && strExtension != 'bmp') {
   	$.messager.alert('警告','请选择图片文件！');
       return false;
   };
	$.ajax({
		type:'post',
		url:addurl+"/testmng/fileadd",
		async:true,
		data:new FormData($('#dlg_right_file #form_file')[0]),
		processData:false,
        contentType:false,
    	success: function(result){
    		return;
		},
		error:function(XMLResponse){
			alert(XMLResponse.responseText)
		}
	});
	return false;
}

function scriptsearchfile(){
	$("#file_dialog_1 #scriptid").val($("#script_dialog_1 #scriptid").val());
	$.ajax({
		type:'post',
		url:addurl+"/testmng/scriptreadfile",
		async:false,
		cache:true,
		data:{scriptid:$("#file_dialog_1 #scriptid").val()},
    	success: function(result){
    		if(result.linkfile != undefined){
    			$("#file_dialog_1 #file_img").attr("src","data:image/gif;base64,"+result.linkfile);
	    		$('#file_dialog_1').dialog({closed:false});
	    		$("#file_dialog_1 #fileid").val(result.fileid);
    		}else{
    			$.messager.alert('警告','未找到附件');
    		}
		},
		error:function(XMLResponse){
			alert(XMLResponse.responseText)
		}
	});
}

//文件上传下载专用进度条
function seleniumprogressbar_box() {  
	$("#progressbar").remove();
	$("#dlg_right_file").append('<div id="progressbar"></div>');
	
	progressstatus();
};  