$(document).ready(function(){
	var addurl=$("#addurl").val();
	$(".box_1 div").click(function(){
		$(".box_1 div").attr("style","background-color: #ffffff;")
		$(this).attr("style","background-color: slategray;")
	});
	
	learngroup();
	$('.box_2 #ComboBox').hide();//隐藏掉下拉单
	$("#view_1").click(function(){
		$('#search_data').textbox('setValue','');//切换后，清空输入框
		$('#search_data').textbox({prompt:'请输入分类名称'});//切换后，修改提示语
//		$('#box_search_button').unbind();//切换后，清空原有的查询事件
		learngroup();//切换后，生成新的查询事件和数据表
		$('.box_2 #ComboBox').hide();//隐藏掉下拉单
		$('#box_db').datagrid('load', {learngroup:''},'reload');//切换后，查询全部数据
		$("#box_type").val(0);
	})
	$("#view_2").click(function(){
		$('#search_data').textbox('setValue','');
		$('#search_data').textbox({prompt:'请输入标题'});
//		$('#box_search_button').unbind();
		
		$('.box_2 #ComboBox').show();//下拉单查询功能能
		$('.box_2 #ComboBox_right').combobox({
		    url:addurl+"/learn/learngroupbox",    
		    valueField:'learngroupid',    
		    textField:'learngroup',
		});
		
		learn();
		$('#box_db').datagrid('load', {learngroupid:0,learnname:''},'reload');
		$("#box_type").val(1);
	})
	
	//新增按钮点击事件
	$("#add_").click(function(){
		if($("#box_type").val()==0){
			$('#learngroup_dialog').form('clear');
			$('#learngroup_dialog').dialog('open')
		}
		if($("#box_type").val()==1){
			//打开对话框后，加载下拉单数据
			$('#learn_dialog #ComboBox_right').combobox({
			    url:addurl+"/learn/learngroupbox",    
			    valueField:'learngroupid',    
			    textField:'learngroup',
			});
			
			$("#learn_dialog_type").val(0);
			$("#learn_dialog #learnname").textbox({readonly:false});
			$('#learn_dialog').form('clear');
			
			$('#learn_dialog').dialog('open');
		}
	});
	//删除按钮点击事件
	$('#del_').bind('click', function(){
		if($("#box_type").val()==0){
			if($('#del_').val()==''){
				//EasyUI Messager 消息框,警示（alert）、确认（confirm）、提示（prompt）、进展（progress）等等
				$.messager.alert('Warning','请选择一条数据再删除！');
				return;
			}
			var confirm=null;
			//EasyUI Messager 消息框,警示（alert）、确认（confirm）、提示（prompt）、进展（progress）等等
			$.messager.confirm('Confirm','会连带删除这个分类下所有数据！继续？',function(r){
			    if (r){
			    	var learngroupid=$('#del_').val();
					$.ajax({
						type:"POST",
						url:$("#addurl").val()+"/learn/learngroupdel",
						async:false,
						cache:true,
						data:{learngroupid:learngroupid},
						success: function(result){
							if(result==''){
								$.messager.alert('警告','没有权限');
							}else
							if(result !='ok'){
								$.messager.alert('警告',result);
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
		}
		if($("#box_type").val()==1){
			if($('#del_').val()==''){
				//EasyUI Messager 消息框,警示（alert）、确认（confirm）、提示（prompt）、进展（progress）等等
				$.messager.alert('Warning','请选择一条数据再删除！');
				return;
			}
			var confirm=null;
			
			//EasyUI Messager 消息框,警示（alert）、确认（confirm）、提示（prompt）、进展（progress）等等
			$.messager.confirm('Confirm','请确认是否需要删除这条数据！',function(r){
			    if (r){
			    	var learnid=$('#del_').val();
					$.ajax({
						type:"POST",
						url:addurl+"/learn/learnlistdel",
						async:false,
						data:{learnid:learnid},
						cache:true,
						success: function(result){
							if(result==''){
								$.messager.alert('警告','没有权限');
							}else
							if(result !='ok'){
								$.messager.alert('警告',result);
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
		}
	});  
	
	//对话框
	$('#learngroup_dialog').dialog({    
		title: '新增数据',    
	    width: 400,    
	    height: 200,    
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
				if(!$("#dlg_left").form('validate')){//验证dialog对话框中的所有内容是否验证通过
					return;
				}
				var learngroup=$("#learngroup").val();
				$.ajax({
					type:"POST",
					url:$("#addurl").val()+"/learn/learngroupadd",
					async:false,
					cache:true,
					data:{learngroup:learngroup},
					success: function(result){
						if(result==''){
							$.messager.alert('警告','没有权限');
						}else
						if(result !='ok'){
							$.messager.alert('警告',result);
						}else{
							$('#learngroup_dialog').dialog({closed: true,});
							$('#box_db').datagrid('reload');
						}
						
					},
					error:function(XMLResponse){
						alert(XMLResponse.responseText)
					}
				});
			}
		},{
			text:'关闭',
			handler:function(){
				$('#learngroup_dialog').dialog({closed: true,});
			}
		}]
	});
	
	//对话框，保存数据
	$('#learn_dialog').dialog(
		{    
		title: '新增数据',    
	    width: 600,    
	    height: 600,    
	    closed: true,//true窗口关闭，false窗口打开
	    modal:true,//弹出后，只能操作本窗口
	    buttons:[{//对话框底部按钮
			text:'保存',
			handler:function(){
				if(!$("#learn_from").form('validate')){//验证#dialog对话框中的所有内容是否验证通过,不一定非要form标签,直接引用ID就可以
					return;
				}
				if($("#learn_dialog #learn_dialog_type").val()==0){
					$.ajax({
						type:"POST",
						url:addurl+"/learn/learnlistadd",
						async:false,
						cache:true,
						data:$("#learn_from").serialize(),
						success: function(result){
							if(result==''){
								$.messager.alert('警告','没有权限');
							}else
							if(result !='ok'){
								$.messager.alert('警告',result);
							}else{
								$('#learn_dialog').dialog({closed: true,});
								$('#box_db').datagrid('reload');
							}
							
						},
						error:function(XMLResponse){
							alert(XMLResponse.responseText)
						}
					});
				}
				if($("#learn_dialog #learn_dialog_type").val()==1){
					$.ajax({
						type:"POST",
						url:addurl+"/learn/learnlistupdate",
						async:false,
						cache:true,
						data:$("#learn_from").serialize(),
						success: function(result){
							if(result==''){
								$.messager.alert('警告','没有权限');
							}else
							if(result !='ok'){
								$.messager.alert('警告',result);
							}else{
								$('#learn_dialog').dialog({closed: true,});
								$('#box_db').datagrid('reload');
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
				$('#learn_dialog').dialog({closed: true,});
			}
		}]
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
				$('#form_file').form('clear');
			}
		}]
	});
	
	//上传附件
	//easyui-form提交
	$("#file_button").click(function(){
		//文件上传
		file_load();
		//进度条
		progressbar_box();
		
	})
	
	//DIV用来显示图片使用
	$('#file_dialog').dialog({    
	    title: '文件加载',    
	    width: 800,
	    height: 400,  
	    closed: true,    
	    modal: true,
//	    fit:true,//强制自适应浏览器最大
	    resizable:true,//可拖拉
	    maximizable:true,//缩小放大按钮
	    buttons:[{
			text:'删除',
			handler:function(){
				var learnid=$("#file_dialog #learnid").val();
				var fileid=$("#file_dialog #fileid").val();
				$.ajax({
		    		type:'post',
		    		url:addurl+"/learn/learnreadfile_del",
		    		async:false,
					cache:true,
					data:{learnid:learnid,fileid:fileid},
			    	success: function(result){
			    		if(result.learnfile != undefined){
			    			$("#file_img").attr("src","data:image/gif;base64,"+result.learnfile);
				    		$("#file_dialog #fileid").val(result.fileid);
			    		}else{
			    			$('#file_dialog').dialog({closed:true});
			    		}
					},
					error:function(XMLResponse){
						alert(XMLResponse.responseText)
					}
		    	});
			}
		},{//对话框底部按钮
			text:'上一个',
			handler:function(){
				var learnid=$("#file_dialog #learnid").val();
				var fileid=$("#file_dialog #fileid").val();
				$.ajax({
		    		type:'post',
		    		url:addurl+"/learn/learnreadfile_upandow",
		    		async:false,
					cache:true,
					data:{learnid:learnid,fileid:fileid,button:'up'},
			    	success: function(result){
			    		if(result.learnfile != undefined){
			    			$("#file_img").attr("src","data:image/gif;base64,"+result.learnfile);
				    		var fileid=$("#file_dialog #fileid").val(result.fileid);
			    		}
					},
					error:function(XMLResponse){
						alert(XMLResponse.responseText)
					}
		    	});
			}
	    },{
			text:'下一个',
			handler:function(){
				var learnid=$("#file_dialog #learnid").val();
				var fileid=$("#file_dialog #fileid").val();
				$.ajax({
		    		type:'post',
		    		url:addurl+"/learn/learnreadfile_upandow",
		    		async:false,
					cache:true,
					data:{learnid:learnid,fileid:fileid,button:'down'},
			    	success: function(result){
			    		if(result.learnfile != undefined){
			    			$("#file_img").attr("src","data:image/gif;base64,"+result.learnfile);
//			    			$("#file_p").text(result.learnfile);
				    		var fileid=$("#file_dialog #fileid").val(result.fileid);
			    		}
					},
					error:function(XMLResponse){
						alert(XMLResponse.responseText)
					}
		    	});
			}
		}]
	});
	
	//easyui搜索
	//生成新的查询
	$("#box_search_button").bind('click',function(){
		if($("#box_type").val()==0){
			$('#box_db').datagrid('load', {learngroup:$('#search_data').textbox('getValue')},'reload');//将参数传给数据表格，当做查询条件到服务端获取数据
		}
		if($("#box_type").val()==1){
			$('#box_db').datagrid('load', {learngroupid:$('.box_2 #ComboBox_right').textbox('getValue'),learnname:$('#search_data').textbox('getValue')},'reload');//将参数传给数据表格，当做查询条件到服务端获取数据
		}
	})
	
	//生成新的查询
//	$("#box_search_button").bind('click',function(){
//		$('#box_db').datagrid('load', {learngroupid:$('.box_2 #ComboBox_right').textbox('getValue'),learnname:$('#search_data').textbox('getValue')},'reload');//将参数传给数据表格，当做查询条件到服务端获取数据
//	})
	
	
});

function learngroup(){
	var addurl=$("#addurl").val();
	//生成新的easyui表格
	$('#box_db').datagrid({
		title:'学习记录',
		height:660, 
		width:1090,
		pageSize:30,
	    url:addurl+"/learn/learngrouplist",
	    singleSelect:true,//true单选，不配置或者false为多选
	    pagination:true,//翻页栏
	    rownumbers:true,//行序号显示
	    toolbar:'#button_',//工具栏设置
	    columns:[[  
	  			{field:'learngroup',title:'分类',width:350,halign:'center'}
	  	    ]],
	    //双击获取行数据
	    onDblClickRow:function(index, row){
//	    	$('#dg_right').datagrid('load', {learngroupid: row.learngroupid},'reload')
	    },
	    //单击选择数据
	    onClickRow:function(index, row){  
	    	$('#del_').val(row.learngroupid);
	    },
	});
}

function learn(){
	var addurl=$("#addurl").val();
	//生成新的easyui表格
	$('#box_db').datagrid({
		title:'学习记录',
		height:660, 
		width:1090,
		pageSize:30,
	    url:addurl+"/learn/learnlist",
	    singleSelect:true,//true单选，不配置或者false为多选
	    pagination:true,//翻页栏
	    rownumbers:true,//行序号显示
	    toolbar:'#button_',//工具栏设置
	    columns:[[  
			{
				field:'learnid',//列对应后台字段名
				hidden:true//隐藏字段
			},
			{field:'learngroup',title:'分类',width:100,halign:'center'},
	        {
	        	field:'learnname',//列对应后台字段名
	        	title:'标题',//显示标题
	        	width:250,//列宽度
	        	halign:'center',//内容居中
//	        	sortable:'true',//排序开关
//	        	sortOrder:true,//默认排序
//	        	order:'asc'
	        },    
	        {field:'learntext',title:'内容',width:350,halign:'center'}, 
	        //增加自定义列
	        {field:'fujian',title:'附件', width:60,halign:'center',align:'center',
				formatter: function(value,row,index){
					row.fujian = row.learnid;//给新增自定义的字符赋值
					return '上传';
				}
			},
	        //增加自定义列
	        {field:'chakan',title:'查看附件', width:100,halign:'center',align:'center',
				formatter: function(value,row,index){
					row.chakan = row.learnid//给新增自定义的字符赋值
					return '查看附件';
				}
			}
	    ]],
	    //双击获取行数据
	    onDblClickRow:function(index, row){
	    	$("#learn_dialog_type").val(1);
	    	//打开对话框后，加载下拉单数据
			$('#learn_dialog #ComboBox_right').combobox({
			    url:addurl+"/learn/learngroupbox",    
			    valueField:'learngroupid',    
			    textField:'learngroup',
			});
			$("#learn_dialog #learnid").val(row.learnid);
			$("#learn_dialog #ComboBox_right").textbox('setValue',row.learngroupid);
			$("#learn_dialog #learnname").textbox('setValue',row.learnname);
			$("#learn_dialog #learnname").textbox({readonly:true});
			$("#learn_dialog #learntext").textbox('setValue',row.learntext);
	    	$('#learn_dialog').dialog({closed: false})
	    },
	    //单击选择数据
	    onClickRow:function(index, row){  
	    	$('#del_').val(row.learnid);
	    },
	    //单击一行单列事件
	    onClickCell:function(index, field, value){
	    	if(field=="fujian"){
	    		$('#dlg_right_file #learnid').val(value);
		    	$('#dlg_right_file').dialog('open');
	    	}
	    	if(field=="chakan"){
	    		$("#file_dialog #learnid").val(value);
		    	$.ajax({
		    		type:'post',
		    		url:addurl+"/learn/learnreadfile",
		    		async:false,
					cache:true,
					data:{learnid:value},
			    	success: function(result){
			    		if(result.learnfile != undefined){
			    			$("#file_img").attr("src","data:image/gif;base64,"+result.learnfile);
				    		$('#file_dialog').dialog({closed:false});
				    		$("#learnid").val(value);
				    		$("#fileid").val(result.fileid);
			    		}else{
			    			$.messager.alert('警告','未找到附件');
			    		}
					},
					error:function(XMLResponse){
						alert(XMLResponse.responseText)
					}
		    	});
	    	}
	    },
	});
}

//上传文件
function file_load(){
	var addurl=$("#addurl").val();
	var imgPath = $("#learnfile1").filebox('getValue');
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
		url:addurl+"/learn/learnuploadfile",
		async:true,
		data:new FormData($('#form_file')[0]),
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

//开启进度条
function progressbar_box() {  
	$("#progressbar").remove();
	$("#dlg_right_file").append('<div id="progressbar"></div>')
	
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
};  

//从后台获取当前文件上传下载进度
function getProgress(){
	var addurl=$("#addurl").val();
	var progress=null;
	$.ajax({
		type:'post',
		url:addurl+"/learn/progress",
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

