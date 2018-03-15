var data_no_=0;//保存数据到数据库时根据数据库流水号更新数据
var PassClient=null;
var InputJsonInfoList=null;

//选中某行标记
var aller_work_row=-1;
var dis_work_row=-1;
var opr_work_row=-1;
var odr_work_row=-1;

var druginfo_work_row=-1;
var diseaseinfo_work_row=-1;
var otherrecipinfo_work_row=-1;
var examinfo_work_row=-1;
var labinfo_work_row=-1;

var addurl=$("#addurl").val();

$(document).ready(function(){
	var addurl=$("#addurl").val();
	
	//医嘱窗口
	$('#orders-div').dialog(
		{    
		title: "医嘱维护",    
	    width: 1000,    
	    height: 600,    
	    closed: true,//true窗口关闭，false窗口打开
	    modal:false,//弹出后，只能操作本窗口
	    maximizable:true,
	    buttons:[
//	             {
//			text:'清空',
//			handler:function(){
////				$('#orders-div').dialog({title:"新增医嘱"});
////				data_no_=0;
//				pat_clear();
//				json_clear();
//			}
//		},
		{
			text:'保存',
			handler:function(){
				if(data_no_<=0){
					$.messager.alert('警告','请先选择一行');    
					return;
				}
				var json=str_to_json();
				
				$.ajax({
					type:"POST",
					url:addurl+"/orders/testmng_json_update",
					async:false,
					data:{testid:data_no_,json:json},
					cache:true,
					success: function(result){
						if(result==''){
							$.messager.alert('警告','没有权限');
						}else {
							$.messager.alert('警告','保存成功'); 
							//操作子级（子类）iframe页面元素
							window.frames['iframe_box'].contentWindow.$('#box_2_3 #box_db').datagrid('reload');
							//操作子级（子类）iframe页面JS方法
//							$(window.parent.document).contents().find("#iframe_box")[0].contentWindow.JS方法;
							//document.getElementById("iframe_box").contentWindow.JS方法;
						} 
					},
					error:function(XMLResponse){
						alert(XMLResponse.responseText)
					}
				});   
				return false;
			}
		},{
			text:'关闭',
			handler:function(){
				$('#orders-div').dialog({closed: true});
				work_row_clear();
//				window.frames['iframe_box'].contentWindow.$('#box_2_3 #box_db').datagrid('reload');
			},
			
		}],
		//X关闭功能
		onClose:function(){
//			window.frames['iframe_box'].contentWindow.$('#box_2_3 #box_db').datagrid('reload');
			work_row_clear();
		},
	});
	
	
	//过敏原表格
	var aller_editIndex = undefined;
	
	$('#aller').datagrid({   
//	    url:'datagrid_data.json',  
		singleSelect:true,
	    columns:[[    
	        {field:'Index',title:'序号',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },    
	        {field:'AllerSource',title:'过敏原来源',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },    
	        {field:'AllerCode',title:'过敏原编号',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },
	        {field:'AllerName',title:'过敏原名称',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },
	        {field:'AllerSymptom',title:'过敏源症状',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        }
	    ]],
	    toolbar: [{
			iconCls: 'icon-add',
			handler: function(){
				$('#aller').datagrid('appendRow',{
					Index: '',
					AllerSource: 'USER',
					AllerCode: '',
					AllerName:'',
					AllerSymptom:''
				});
			}
		},{
			iconCls: 'icon-remove',
			handler: function(){
				if(aller_work_row<0){
					$.messager.alert('警告','请先选择一行');  
				}else{
					$('#aller').datagrid('deleteRow',aller_work_row);
					aller_work_row=-1;
				}
				
			}
		},{
			iconCls: 'icon-search',
			text:'过敏原字典表',
			handler: function(){
				if(aller_work_row<0){
					$.messager.alert('警告','请先选择一行');    
				}else{
					$('#db_aller_dict').datagrid({url:addurl+"/testmng/aller_dict",});
					$('#aller_dict').dialog({closed:false});
				}
			}
		}],
		
		//点击一个单元格启动编辑器启动编辑器
		onClickCell:function(index, field, value){
			aller_work_row=index;
			if (aller_endEditing()){
				$('#aller').datagrid('selectRow', index).datagrid('editCell', {index:index,field:field});
				//标记编辑的行编号
				aller_editIndex = index;
			}
		}
	});  
	
	//关闭行编辑
	function aller_endEditing(){
		if (aller_editIndex == undefined){return true}
		if ($('#aller').datagrid('validateRow', aller_editIndex)){
			$('#aller').datagrid('endEdit', aller_editIndex);
			aller_editIndex = undefined;
			return true;
		} else {
			return false;
		}
	}

	//过敏原字典表窗口
	$('#aller_dict').dialog(
		{    
		title: '新增数据',    
	    width: 600,    
	    height: 600,    
	    closed: true,//true窗口关闭，false窗口打开
	    modal:true,//弹出后，只能操作本窗口
	    buttons:[{
			text:'关闭',
			handler:function(){
				$('#aller_dict').dialog({closed: true,});
				work_row_clear();
			}
		}],
		//X关闭功能
		onClose:function(){
			work_row_clear();
		},
	});
	
	$("#aller_seach").click(function(){
		$("#db_aller_dict").datagrid('load',{allercode:$("#aller_search_data").textbox('getValue')},'reload');
	});
	
	$('#db_aller_dict').datagrid({   
		title:'过敏原字典表',
//		width:560,
		height:500, 
		pageSize:30,
//	    url:addurl+"/testmng/aller_dict",//空数据表格，别的地方调用时给URL赋值加载数据
	    singleSelect:true,//true单选，不配置或者false为多选
	    pagination:true,//翻页栏
	    rownumbers:true,//行序号显示
	    columns:[[    
	        {field:'hisname',title:'机构',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },    
	        {field:'allercode',title:'过敏原编号',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },    
	        {field:'allername',title:'过敏原名称',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },
	    ]],
	  //双击一个行
		onDblClickRow: function(index, row){
			$('#aller').datagrid('updateRow',{
				index: aller_work_row,
				row:{
					Index: aller_work_row+1,
					AllerSource: "USER",
					AllerCode: row.allercode,
					AllerName:row.allername,
					AllerSymptom:""
				}
			});
			
//			$('#aller_dict').dialog({closed:true})
		}
	});  
	
	//疾病信息表格
	var dis_editIndex = undefined;
	
	$('#dis').datagrid({   
//	    url:'datagrid_data.json',  
		singleSelect:true,
	    columns:[[    
	        {field:'RecipNo',title:'处方号',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },    
	        {field:'Index',title:'序号',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },    
	        {field:'DisSource',title:'疾病来源',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },
	        {field:'DiseaseCode',title:'疾病编号',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },
	        {field:'DiseaseName',title:'疾病名称',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },
	        {field:'DisTimeType',title:'诊断时间类型',width:100,align:'center',
	        	editor:{
	        		type:'combobox',
					options:{
						valueField:'label',
						textField:'value', 
						data: [{
							label: -1,
							value: '未知'
						},{
							label: 0,
							value: '出院诊断'
						},{
							label: 1,
							value: '入院诊断',
						}],
					}
				},
	        },
	        {field:'Ishospinfection',title:'院内继发感染',width:100,align:'center',
	        	editor:{
					type:'combobox',
					options:{
						valueField:'label',
						textField:'value', 
						data: [{
							label: -1,
							value: '未知'
						},{
							label: 0,
							value: '不是',
						},{
							label: 1,
							value: '是',
						}],
					}
				}
	        }
	    ]],
	    toolbar: [{
			iconCls: 'icon-add',
			handler: function(){
				$('#dis').datagrid('appendRow',{
					RecipNo: '',
					Index: '',
					DisSource: 'USER',
					DiseaseCode:'',
					DiseaseName:'',
					DisTimeType:0,
					Ishospinfection:-1
				});
			}
		},{
			iconCls: 'icon-remove',
			handler: function(){
				if(dis_work_row<0){
					$.messager.alert('警告','请先选择一行');  
				}else{
					$('#dis').datagrid('deleteRow',dis_work_row);
					dis_work_row=-1;
				}
				
			}
		},{
			iconCls: 'icon-search',
			text:'疾病字典表',
			handler: function(){
				if(dis_work_row<0){
					$.messager.alert('警告','请先选择一行');    
				}else{
					$('#db_dis_dict').datagrid({url:addurl+"/testmng/dis_dict",});
					$('#dis_dict').dialog({closed:false});
				}
			}
		}],
		
		//点击一个单元格启动编辑器
		onClickCell:function(index, field, value){
			dis_work_row=index;
//			if(field=='DisTimeType'){
//				return;
//			}
			if (dis_endEditing()){
				$('#dis').datagrid('selectRow', index).datagrid('editCell', {index:index,field:field});
				//标记编辑的行编号
				dis_editIndex = index;
			}
		}
		
	});  
	
	//关闭行编辑
	function dis_endEditing(){
		if (dis_editIndex == undefined){return true}
		if ($('#dis').datagrid('validateRow', dis_editIndex)){
			$('#dis').datagrid('endEdit', dis_editIndex);
			dis_editIndex = undefined;
			return true;
		} else {
			return false;
		}
	}
	
	//疾病字典表窗口
	$('#dis_dict').dialog(
		{    
		title: '新增数据',    
	    width: 600,    
	    height: 600,    
	    closed: true,//true窗口关闭，false窗口打开
	    modal:true,//弹出后，只能操作本窗口
	    buttons:[{
			text:'关闭',
			handler:function(){
				$('#dis_dict').dialog({closed: true,});
				work_row_clear();
			}
		}],
		//X关闭功能
		onClose:function(){
			work_row_clear();
		},
	});
	
	$("#dis_seach").click(function(){
		$("#db_dis_dict").datagrid('load',{discode:$("#dis_search_data").textbox('getValue')},'reload');
	});
	
	$('#db_dis_dict').datagrid({   
		title:'疾病字典表',
//		width:560,
		height:500, 
		pageSize:30,
//	    url:addurl+"/testmng/aller_dict",//空数据表格，别的地方调用时给URL赋值加载数据
	    singleSelect:true,//true单选，不配置或者false为多选
	    pagination:true,//翻页栏
	    rownumbers:true,//行序号显示
	    columns:[[    
	        {field:'hisname',title:'机构',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },    
	        {field:'discode',title:'疾病编号',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },    
	        {field:'disname',title:'疾病名称',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },
	    ]],
		//双击一个行
		onDblClickRow: function(index, row){
			$('#dis').datagrid('updateRow',{
				index: dis_work_row,
				row:{
//					RecipNo: 1,
					Index: dis_work_row+1,
					DisSource: 'USER',
					DiseaseCode:row.discode,
					DiseaseName:row.disname,
					DisTimeType:0,
					Ishospinfection:-1
				}
			});
			
//			$('#dis_dict').dialog({closed:true});
		},
	});  
	
	//手术信息表格
	var opr_editIndex = undefined;
	
	$('#opr').datagrid({   
//	    url:'datagrid_data.json',  
		singleSelect:true,
	    columns:[[    
	        {field:'Index',title:'序号',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },    
	        {field:'OprCode',title:'手术编号',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },    
	        {field:'OprName',title:'手术名称',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },
	        {field:'IncisionType',title:'切口类型',width:100,align:'center',
	        	editor:{
					type:'combobox',
					options:{
						valueField:'label',
						textField:'value', 
						data: [{
							label: '0',
							value: '0类'
						},{
							label: '1',
							value: '1类'
						},{
							label: '2',
							value: '2类',
						},{
							label: '3',
							value: '3类',
						},{
							label: '4',
							value: '其他',
						}],
					}
				}
	        },
	        {field:'OprStartDate',title:'手术开始时间',width:130,align:'center',
	        	editor:{
					type:'datetimebox',
				}
	        },
	        {field:'OprEndDate',title:'手术结束时间',width:130,align:'center',
	        	editor:{
					type:'datetimebox',
				}
	        },
	        {field:'OprMediTime',title:'手术用药时机',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },
	        {field:'OprTreatTime',title:'手术预防使用抗菌药物疗程',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        }
	    ]],
	    toolbar: [{
			iconCls: 'icon-add',
			handler: function(){
				$('#opr').datagrid('appendRow',{
					Index: '',
					OprCode: '',
					OprName: '',
					IncisionType:'1',
					OprStartDate:'2000-01-01 00:00:01',
					OprEndDate: '2000-01-01 00:00:01',
					OprMediTime:-1,
					OprTreatTime:0
				});
			}
		},{
			iconCls: 'icon-remove',
			handler: function(){
				if(opr_work_row<0){
					$.messager.alert('警告','请先选择一行');  
				}else{
					$('#opr').datagrid('deleteRow',opr_work_row);
					opr_work_row=-1;
				}
				
			}
		},{
			iconCls: 'icon-search',
			text:'手术字典表',
			handler: function(){
				if(opr_work_row<0){
					$.messager.alert('警告','请先选择一行');    
				}else{
					$('#db_opr_dict').datagrid({url:addurl+"/testmng/opr_dict",});
					$('#opr_dict').dialog({closed:false});
				}
				
			}
		}],
		
		//点击一个单元格启动编辑器
		onClickCell:function(index, field, value){
			opr_work_row=index;
			if (opr_endEditing()){
				$('#opr').datagrid('selectRow', index).datagrid('editCell', {index:index,field:field});
				//标记编辑的行编号
				opr_editIndex = index;
			}
		}
		
	});  
	
	//关闭行编辑
	function opr_endEditing(){
		if (opr_editIndex == undefined){return true}
		if ($('#opr').datagrid('validateRow', opr_editIndex)){
			$('#opr').datagrid('endEdit', opr_editIndex);
			opr_editIndex = undefined;
			return true;
		} else {
			return false;
		}
	}
	
	//手术字典表窗口
	$('#opr_dict').dialog(
		{    
		title: '新增数据',    
	    width: 600,    
	    height: 600,    
	    closed: true,//true窗口关闭，false窗口打开
	    modal:true,//弹出后，只能操作本窗口
	    buttons:[{
			text:'关闭',
			handler:function(){
				$('#opr_dict').dialog({closed: true,});
				work_row_clear();
			}
		}],
		//X关闭功能
		onClose:function(){
			work_row_clear();
		},
	});
	
	$("#opr_seach").click(function(){
		$("#db_opr_dict").datagrid('load',{oprcode:$("#opr_search_data").textbox('getValue')},'reload');
	});
	
	$('#db_opr_dict').datagrid({   
		title:'手术字典表',
//		width:560,
		height:500, 
		pageSize:30,
//	    url:addurl+"/testmng/aller_dict",//空数据表格，别的地方调用时给URL赋值加载数据
	    singleSelect:true,//true单选，不配置或者false为多选
	    pagination:true,//翻页栏
	    rownumbers:true,//行序号显示
	    columns:[[    
	        {field:'hisname',title:'机构',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },    
	        {field:'operationcode',title:'手术编号',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },    
	        {field:'operationname',title:'手术名称',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },
	    ]],
		//双击一个行
		onDblClickRow: function(index, row){
			$('#opr').datagrid('updateRow',{
				index: opr_work_row,
				row:{
					Index: opr_work_row+1,
					OprCode: row.operationcode,
					OprName: row.operationname,
					IncisionType:'1',
					OprStartDate:'',
					OprEndDate: '',
					OprMediTime:-1,
					OprTreatTime:0
				}
			});
			
//			$('#opr_dict').dialog({closed:true});
		},
	});  
	
	//药品信息表格
	var odr_editIndex = undefined;
	
	$('#odr').datagrid({   
//		width:2000,
//	    url:'datagrid_data.json',  
		singleSelect:true,
	    columns:[[    
	        {field:'RecipNo',title:'处方号',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },    
	        {field:'Index',title:'序号',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },    
	        {field:'OrderNo',title:'医嘱号',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },
	        {field:'DrugSource',title:'药品来源',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },
	        {field:'DrugUniqueCode',title:'药品唯一码',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },
	        {field:'DrugCode',title:'药品编码',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },
	        {field:'DrugName',title:'药品名称',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },
	        {field:'DoseUnit',title:'给药单位',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },
	        {field:'Form',title:'剂型',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },
	        {field:'Strength',title:'规格',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },
	        {field:'CompName',title:'厂家名称',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },
	        {field:'RouteSource',title:'给药途径来源',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },
	        {field:'RouteCode',title:'给药途径编码',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },
	        {field:'RouteName',title:'给药途径名称',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },
	        {field:'FreqSource',title:'频次来源',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },
	        {field:'Frequency',title:'频次',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },
	        {field:'DosePerTime',title:'量/次',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },
	        {field:'StartTime',title:'开嘱时间',width:130,align:'center',
	        	editor:{
					type:'datetimebox',
				}
	        },
	        {field:'EndTime',title:'停嘱时间',width:130,align:'center',
	        	editor:{
					type:'datetimebox',
				}
	        },
	        {field:'ExecuteTime',title:'执行时间',width:130,align:'center',
	        	editor:{
					type:'datetimebox',
				}
	        },
	        {field:'DeptCode',title:'科室编码',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },
	        {field:'DeptName',title:'科室名称',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },
	        {field:'DoctorCode',title:'开嘱医生编码',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },
	        {field:'DoctorName',title:'开嘱医生名称',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },
	        {field:'GroupTag',title:'成组标记',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },
	        {field:'IsTempDrug',title:'临时用药',width:100,align:'center',
	        	editor:{
					type:'combobox',
					options:{
						valueField:'label',
						textField:'value', 
						data: [{
							label: 0,
							value: '长期'
						},{
							label: 1,
							value: '临时',
						}],
					}
				}
	        },
	        {field:'OrderType',title:'医嘱类别标记',width:100,align:'center',
	        	editor:{
					type:'combobox',
					options:{
						valueField:'label',
						textField:'value', 
						data: [{
							label: 0,
							value: '在用',
						},{
							label: 1,
							value: '已作废',
						},{
							label: 2,
							value: '已停嘱',
						},{
							label: 3,
							value: '出院带药',
						}],
					}
				}
	        },
	        {field:'Pharmacists',title:'审核/调配药师',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },
	        {field:'Pharmacists_',title:'核对/发药药师',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },
	        {field:'Num',title:'药品开出数量',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },
	        {field:'NumUnit',title:'药品开出数量单位',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },
	        {field:'Cost',title:'费用',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },
	        {field:'Purpose',title:'用药目的',width:100,align:'center',
	        	editor:{
					type:'combobox',
					options:{
						valueField:'label',
						textField:'value', 
						data: [{
							label: 0,
							value: '默认',
						},{
							label: 1,
							value: '可能预防',
						},{
							label: 2,
							value: '可能治疗',
						},{
							label: 3,
							value: '预防',
						},{
							label: 4,
							value: '治疗',
						},{
							label: 5,
							value: '预防+治疗',
						}],
					}
				}
	        },
	        {field:'OprCode',title:'手术编号',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },
	        {field:'MediTime',title:'用药时机',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },
	        {field:'Remark',title:'医嘱备注信息',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        }
	    ]],
	    toolbar: [{
			iconCls: 'icon-add',
			handler: function(){
				$('#odr').datagrid('appendRow',{
	                RecipNo: "",
	                Index: $('#odr').datagrid('getData').total+1,
	                OrderNo:  $('#odr').datagrid('getData').total+1,
	                DrugSource: "USER",
	                DrugUniqueCode: "",
	                DrugCode: "",
	                DrugName: "",
	                DoseUnit: "",
	                Form: "",
	                Strength: "",
	                CompName: "",
	                RouteSource: "USER",
	                RouteCode: "",
	                RouteName: "",
	                FreqSource: "USER",
	                Frequency: "",
	                DosePerTime: "",
	                StartTime: "2000-01-01 00:00:01",
	                EndTime: "2000-01-01 00:00:01",
	                ExecuteTime: "2000-01-01 00:00:01",
	                DeptCode: "",
	                DeptName: "",
	                DoctorCode: "",
	                DoctorName: "",
	                GroupTag: "",
	                IsTempDrug:0 ,
	                OrderType:0,
	                Pharmacists: "",
	                Pharmacists_: "",
	                Num: "",
	                NumUnit: "",
	                Cost: "",
	                Purpose: 0,
	                OprCode: "",
	                MediTime: "",
	                Remark: ""
				});
			}
		},{
			iconCls: 'icon-remove',
			handler: function(){
				if(odr_work_row<0){
					$.messager.alert('警告','请先选择一行');  
				}else{
					$('#odr').datagrid('deleteRow',odr_work_row);
					odr_work_row=-1;
				}
				
			}
		},{
			iconCls: 'icon-search',
			text:'药品字典表',
			handler: function(){
				if(odr_work_row<0){
					$.messager.alert('警告','请先选择一行');
				}else{
					$('#db_odr_dict').datagrid({url:addurl+"/testmng/odr_dict",});
					$('#odr_dict').dialog({closed:false});
				}
			}
		
		},{
			iconCls: 'icon-search',
			text:'给药途径字典表',
			handler: function(){
				if(odr_work_row<0){
					$.messager.alert('警告','请先选择一行');
				}else{
					$('#db_route_dict').datagrid({url:addurl+"/testmng/route_dict",});
					$('#route_dict').dialog({closed:false});
				}
			}
		
		},{
			iconCls: 'icon-search',
			text:'给药频次字典表',
			handler: function(){
				if(odr_work_row<0){
					$.messager.alert('警告','请先选择一行');
				}else{
					$('#db_fre_dict').datagrid({url:addurl+"/testmng/fre_dict",});
					$('#fre_dict').dialog({closed:false});
				}
			}
		
		},{
			iconCls: 'icon-search',
			text:'科室字典表',
			handler: function(){
				if(odr_work_row<0){
					$.messager.alert('警告','请先选择一行');
				}else{
					$('#db_dept_dict').datagrid({url:addurl+"/testmng/dept_dict",});
					$('#dept_dict').dialog({closed:false});
				}
			}
		
		},{
			iconCls: 'icon-search',
			text:'医生字典表',
			handler: function(){
				if(odr_work_row<0){
					$.messager.alert('警告','请先选择一行');
				}else{
					$('#db_doc_dict').datagrid({url:addurl+"/testmng/doc_dict",});
					$('#doc_dict').dialog({closed:false});
				}
			}
		
		}],
		
		//点击一个单元格启动编辑器
		onClickCell:function(index, field, value){
			odr_work_row=index;
			if (odr_endEditing()){
				$('#odr').datagrid('selectRow', index).datagrid('editCell', {index:index,field:field});
				//标记编辑的行编号
				odr_editIndex = index;
			}
		}
		
	});  
	
	//关闭行编辑
	function odr_endEditing(){
		if (odr_editIndex == undefined){return true}
		if ($('#odr').datagrid('validateRow', odr_editIndex)){
			$('#odr').datagrid('endEdit', odr_editIndex);
			odr_editIndex = undefined;
			return true;
		} else {
			return false;
		}
	}
	
	//药品字典表窗口
	$('#odr_dict').dialog(
		{    
		title: '新增数据',    
	    width: 600,    
	    height: 600,    
	    closed: true,//true窗口关闭，false窗口打开
	    modal:true,//弹出后，只能操作本窗口
	    buttons:[{
			text:'关闭',
			handler:function(){
				$('#odr_dict').dialog({closed: true,});
				work_row_clear();
			}
		}],
		//X关闭功能
		onClose:function(){
			work_row_clear();
		},
	});
	
	$("#odr_seach").click(function(){
		$("#db_odr_dict").datagrid('load',{odrcode:$("#odr_search_data").textbox('getValue')},'reload');
	});
	
	$('#db_odr_dict').datagrid({   
		title:'药品字典表',
//		width:560,
		height:500, 
		pageSize:30,
//	    url:addurl+"/testmng/aller_dict",//空数据表格，别的地方调用时给URL赋值加载数据
	    singleSelect:true,//true单选，不配置或者false为多选
	    pagination:true,//翻页栏
	    rownumbers:true,//行序号显示
	    columns:[[    
	        {field:'hisname',title:'机构',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },    
	        {field:'drug_unique_code',title:'药品编号',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },    
	        {field:'drugname',title:'药品名称',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },    
	        {field:'drugform',title:'剂型',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },    
	        {field:'drugspec',title:'规格',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },    
	        {field:'comp_name',title:'厂家',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },    
	        {field:'doseunit',title:'给药单位',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        }
	        
	    ]],
		//双击一个行
		onDblClickRow: function(index, row){
			$('#odr').datagrid('updateRow',{
				index: odr_work_row,
				row:{
//					RecipNo: 1,
//	                Index: odr_work_row+1,
//	                OrderNo: odr_work_row+1,
	                DrugSource: "USER",
	                DrugUniqueCode: row.drug_unique_code,
	                DrugCode: "",
	                DrugName: row.drugname,
	                DoseUnit: row.doseunit,
	                Form: row.drugform,
	                Strength: row.drugspec,
	                CompName: row.comp_name,
	                }
			});
			
//			$('#odr_dict').dialog({closed:true})
		},
	});  
	
	//给药途径字典表窗口
	$('#route_dict').dialog(
		{    
		title: '新增数据',    
	    width: 600,    
	    height: 600,    
	    closed: true,//true窗口关闭，false窗口打开
	    modal:true,//弹出后，只能操作本窗口
	    buttons:[{
			text:'关闭',
			handler:function(){
				$('#route_dict').dialog({closed: true,});
				work_row_clear();
			}
		}],
		//X关闭功能
		onClose:function(){
			work_row_clear();
		},
	});
	
	$("#route_seach").click(function(){
		$("#db_route_dict").datagrid('load',{routecode:$("#route_search_data").textbox('getValue')},'reload');
	});
	
	$('#db_route_dict').datagrid({   
		title:'药品字典表',
//		width:560,
		height:500, 
		pageSize:30,
//	    url:addurl+"/testmng/aller_dict",//空数据表格，别的地方调用时给URL赋值加载数据
	    singleSelect:true,//true单选，不配置或者false为多选
	    pagination:true,//翻页栏
	    rownumbers:true,//行序号显示
	    columns:[[    
	        {field:'hisname',title:'机构',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },    
	        {field:'routecode',title:'给药途径编号',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },    
	        {field:'routename',title:'给药途径名称',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        } 
	    ]],
		//双击一个行
		onDblClickRow: function(index, row){
			$('#odr').datagrid('updateRow',{
				index: odr_work_row,
				row:{
	                RouteSource: "USER",
	                RouteCode: row.routecode,
	                RouteName: row.routename,
	                }
			});
			
//			$('#route_dict').dialog({closed: true,});
		},
	});  
	
	//频次字典表窗口
	$('#fre_dict').dialog(
		{    
		title: '新增数据',    
	    width: 600,    
	    height: 600,    
	    closed: true,//true窗口关闭，false窗口打开
	    modal:true,//弹出后，只能操作本窗口
	    buttons:[{
			text:'关闭',
			handler:function(){
				$('#fre_dict').dialog({closed: true,});
				work_row_clear();
			}
		}],
		//X关闭功能
		onClose:function(){
			work_row_clear();
		},
	});
	
	$("#fre_seach").click(function(){
		$("#db_fre_dict").datagrid('load',{frequency:$("#fre_search_data").textbox('getValue')},'reload');
	});
	
	$('#db_fre_dict').datagrid({   
		title:'药品字典表',
//		width:560,
		height:500, 
		pageSize:30,
//	    url:addurl+"/testmng/aller_dict",//空数据表格，别的地方调用时给URL赋值加载数据
	    singleSelect:true,//true单选，不配置或者false为多选
	    pagination:true,//翻页栏
	    rownumbers:true,//行序号显示
	    columns:[[    
	        {field:'hisname',title:'机构',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },    
	        {field:'frequency',title:'频次',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        } 
	    ]],
		//双击一个行
		onDblClickRow: function(index, row){
			$('#odr').datagrid('updateRow',{
				index: odr_work_row,
				row:{
	                FreqSource: "USER",
	                Frequency: row.frequency,
	                }
			});
//			$('#fre_dict').dialog({closed: true,});
		},
	});  
	
	//科室字典表窗口
	$('#dept_dict').dialog(
		{    
		title: '新增数据',    
	    width: 600,    
	    height: 600,    
	    closed: true,//true窗口关闭，false窗口打开
	    modal:true,//弹出后，只能操作本窗口
	    buttons:[{
			text:'关闭',
			handler:function(){
				$('#dept_dict').dialog({closed: true,});
				work_row_clear();
			}
		}],
		//X关闭功能
		onClose:function(){
			work_row_clear();
		},
	});
	
	$("#dept_seach").click(function(){
		$("#db_dept_dict").datagrid('load',{deptcode:$("#dept_search_data").textbox('getValue')},'reload');
	});
	
	$('#db_dept_dict').datagrid({   
		title:'药品字典表',
//		width:560,
		height:500, 
		pageSize:30,
//	    url:addurl+"/testmng/aller_dict",//空数据表格，别的地方调用时给URL赋值加载数据
	    singleSelect:true,//true单选，不配置或者false为多选
	    pagination:true,//翻页栏
	    rownumbers:true,//行序号显示
	    columns:[[    
	        {field:'hisname',title:'机构',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },    
	        {field:'deptcode',title:'科室编号',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },    
	        {field:'deptname',title:'科室名称',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        }
	    ]],
		//双击一个行
		onDblClickRow: function(index, row){
			if(odr_work_row >-1){
				$('#odr').datagrid('updateRow',{
					index: odr_work_row,
					row:{
		                DeptCode: row.deptcode,
		                DeptName: row.deptname,
		                }
				});
			}
			if(labinfo_work_row >-1){
				$('#labinfo').datagrid('updateRow',{
					index: labinfo_work_row,
					row:{
						deptcode: row.deptcode,
						deptname: row.deptname,
		                }
				});
			}
//			$('#dept_dict').dialog({closed: true,});
		},
	});  
	
	//医生字典表窗口
	$('#doc_dict').dialog(
		{    
		title: '新增数据',    
	    width: 600,    
	    height: 600,    
	    closed: true,//true窗口关闭，false窗口打开
	    modal:true,//弹出后，只能操作本窗口
	    buttons:[{
			text:'关闭',
			handler:function(){
				$('#doc_dict').dialog({closed: true,});
				work_row_clear();
			}
		}],
		//X关闭功能
		onClose:function(){
			work_row_clear();
		},
	});
	
	$("#doc_seach").click(function(){
		$("#db_doc_dict").datagrid('load',{doctorcode:$("#doc_search_data").textbox('getValue')},'reload');
	});
	
	$('#db_doc_dict').datagrid({   
		title:'药品字典表',
//		width:560,
		height:500, 
		pageSize:30,
//	    url:addurl+"/testmng/aller_dict",//空数据表格，别的地方调用时给URL赋值加载数据
	    singleSelect:true,//true单选，不配置或者false为多选
	    pagination:true,//翻页栏
	    rownumbers:true,//行序号显示
	    columns:[[    
	        {field:'hisname',title:'机构',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },    
	        {field:'doctorcode',title:'医生编号',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },    
	        {field:'doctorname',title:'医生名称',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        }
	    ]],
		//双击一个行
		onDblClickRow: function(index, row){
			if(odr_work_row >-1){
				$('#odr').datagrid('updateRow',{
					index: odr_work_row,
					row:{
		                DoctorCode:  row.doctorcode,
		                DoctorName:  row.doctorname,
		                }
				});
			}
			if(labinfo_work_row >-1){
				$('#labinfo').datagrid('updateRow',{
					index: labinfo_work_row,
					row:{
						doctorcode: row.doctorcode,
						doctorname: row.doctorname,
		                }
				});
			}
//			$('#doc_dict').dialog({closed: true,});
		},
	}); 
	
	
	//附加信息
	//补充药品信息
	var druginfo_editIndex = undefined;
	$('#druginfo').datagrid({   
//	    url:'datagrid_data.json',  
		singleSelect:true,
	    columns:[[   
			{field:'type',hidden:true,
				formatter: function(value,row,index){
					return "druginfo";
				}
			}, 
			{field:'index',title:'药品序号',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },    
	        {field:'driprate',title:'滴速',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },    
	        {field:'driptime',title:'滴注时间',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },
	        {field:'duration',title:'持续时间',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        }
	    ]],
	    toolbar: [{
			iconCls: 'icon-add',
			handler: function(){
				$('#druginfo').datagrid('appendRow',{
					type:"druginfo",
					index: '',
					driprate: '',
					driptime: '',
					duration:''
				});
			}
		},{
			iconCls: 'icon-remove',
			handler: function(){
				if(druginfo_work_row<0){
					$.messager.alert('警告','请先选择一行');  
				}else{
					$('#druginfo').datagrid('deleteRow',druginfo_work_row);
					druginfo_work_row=-1;
				}
				
			}
		}],
		
		//点击一个单元格启动编辑器
		onClickCell:function(index, field, value){
			druginfo_work_row=index;
			if (druginfo_endEditing()){
				$('#druginfo').datagrid('selectRow', index).datagrid('editCell', {index:index,field:field});
				//标记编辑的行编号
				druginfo_editIndex = index;
			}
		}
		
	});  
	
	//关闭行编辑
	function druginfo_endEditing(){
		if (druginfo_editIndex == undefined){return true}
		if ($('#druginfo').datagrid('validateRow', druginfo_editIndex)){
			$('#druginfo').datagrid('endEdit', druginfo_editIndex);
			druginfo_editIndex = undefined;
			return true;
		} else {
			return false;
		}
	}
	
	//补充诊断信息
	var diseaseinfo_editIndex = undefined;
	$('#diseaseinfo').datagrid({   
//	    url:'datagrid_data.json',  
		singleSelect:true,
	    columns:[[    
			{field:'type',hidden:true,
				formatter: function(value,row,index){
					return "diseaseinfo";
				}
			}, 
	        {field:'index',title:'诊断序号',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },    
	        {field:'starttime',title:'诊断开始时间',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },    
	        {field:'endtime',title:'诊断结束时间',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        }
	    ]],
	    toolbar: [{
			iconCls: 'icon-add',
			handler: function(){
				$('#diseaseinfo').datagrid('appendRow',{
					type:"diseaseinfo",
					index: '',
					starttime: '',
					endtime: ''
				});
			}
		},{
			iconCls: 'icon-remove',
			handler: function(){
				if(diseaseinfo_work_row<0){
					$.messager.alert('警告','请先选择一行');  
				}else{
					$('#diseaseinfo').datagrid('deleteRow',diseaseinfo_work_row);
					diseaseinfo_work_row=-1;
				}
				
			}
		}],
		
		//点击一个单元格启动编辑器
		onClickCell:function(index, field, value){
			diseaseinfo_work_row=index;
			if (diseaseinfo_endEditing()){
				$('#diseaseinfo').datagrid('selectRow', index).datagrid('editCell', {index:index,field:field});
				//标记编辑的行编号
				diseaseinfo_editIndex = index;
			}
		}
		
	});  
	
	//关闭行编辑
	function diseaseinfo_endEditing(){
		if (diseaseinfo_editIndex == undefined){return true}
		if ($('#diseaseinfo').datagrid('validateRow', diseaseinfo_editIndex)){
			$('#diseaseinfo').datagrid('endEdit', diseaseinfo_editIndex);
			diseaseinfo_editIndex = undefined;
			return true;
		} else {
			return false;
		}
	}
	
	//补充历史医嘱信息
	var otherrecipinfo_editIndex = undefined;
	$('#otherrecipinfo').datagrid({   
//	    url:'datagrid_data.json',  
		singleSelect:true,
	    columns:[[  
			{field:'type',hidden:true,
				formatter: function(value,row,index){
					return "otherrecipinfo";
				}
			},  
	        {field:'hiscode',title:'医院编码',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },    
	        {field:'index',title:'医嘱序号',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },    
	        {field:'recipno',title:'处方号',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },    
	        {field:'drugsource',title:'药品来源',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },    
	        {field:'druguniquecode',title:'药品唯一码',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },    
	        {field:'drugname',title:'药品名称',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },    
	        {field:'doseunit',title:'给药单位',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },    
	        {field:'routesource',title:'给药途径来源',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },    
	        {field:'routecode',title:'给药途径编码',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },    
	        {field:'routename',title:'给药途径名称',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        }
	    ]],
	    toolbar: [{
			iconCls: 'icon-add',
			handler: function(){
				$('#otherrecipinfo').datagrid('appendRow',{
					type:"otherrecipinfo",
					hiscode: '',
					index: '',
					recipno: '',
					drugsource: '',
					druguniquecode: '',
					drugname: '',
					doseunit: '',
					routesource: '',
					routecode: '',
					routename: ''
				});
			}
		},{
			iconCls: 'icon-remove',
			handler: function(){
				if(otherrecipinfo_work_row<0){
					$.messager.alert('警告','请先选择一行');  
				}else{
					$('#otherrecipinfo').datagrid('deleteRow',otherrecipinfo_work_row);
					otherrecipinfo_work_row=-1;
				}
				
			}
		}],
		
		//点击一个单元格启动编辑器
		onClickCell:function(index, field, value){
			otherrecipinfo_work_row=index;
			if (otherrecipinfo_endEditing()){
				$('#otherrecipinfo').datagrid('selectRow', index).datagrid('editCell', {index:index,field:field});
				//标记编辑的行编号
				otherrecipinfo_editIndex = index;
			}
		}
	});  
	
	//关闭行编辑
	function otherrecipinfo_endEditing(){
		if (otherrecipinfo_editIndex == undefined){return true}
		if ($('#otherrecipinfo').datagrid('validateRow', otherrecipinfo_editIndex)){
			$('#otherrecipinfo').datagrid('endEdit', otherrecipinfo_editIndex);
			otherrecipinfo_editIndex = undefined;
			return true;
		} else {
			return false;
		}
	}
	
	//补充检查信息
	var examinfo_editIndex = undefined;
	$('#examinfo').datagrid({   
//	    url:'datagrid_data.json',  
		singleSelect:true,
	    columns:[[   
			{field:'type',hidden:true,
				formatter: function(value,row,index){
					return "examinfo";
				}
			},  
	        {field:'requestno',title:'申请检查单号',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },    
	        {field:'labexamcode',title:'申请检查项目编码',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },    
	        {field:'labexamname',title:'申请检查项目名称',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },    
	        {field:'startdatetime',title:'申请检查时间',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },    
	        {field:'deptcode',title:'申请检查科室编码',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },    
	        {field:'deptname',title:'申请检查科室名称',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },    
	        {field:'doctorcode',title:'申请检查医生编码',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },    
	        {field:'doctorname',title:'申请检查医生名称',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        }
	    ]],
	    toolbar: [{
			iconCls: 'icon-add',
			handler: function(){
				$('#examinfo').datagrid('appendRow',{
					type:"examinfo",
					requestno: '',
					labexamcode: '',
					labexamname: '',
					startdatetime: '',
					deptcode: '',
					deptname: '',
					doctorcode: '',
					doctorname: '',
				});
			}
		},{
			iconCls: 'icon-remove',
			handler: function(){
				if(examinfo_work_row<0){
					$.messager.alert('警告','请先选择一行');  
				}else{
					$('#examinfo').datagrid('deleteRow',examinfo_work_row);
					examinfo_work_row=-1;
				}
				
			}
		}],
		
		//点击一个单元格启动编辑器
		onClickCell:function(index, field, value){
			examinfo_work_row=index;
			if (examinfo_endEditing()){
				$('#examinfo').datagrid('selectRow', index).datagrid('editCell', {index:index,field:field});
				//标记编辑的行编号
				examinfo_editIndex = index;
			}
		}
	});  
	
	//关闭行编辑
	function examinfo_endEditing(){
		if (examinfo_editIndex == undefined){return true}
		if ($('#examinfo').datagrid('validateRow', examinfo_editIndex)){
			$('#examinfo').datagrid('endEdit', examinfo_editIndex);
			examinfo_editIndex = undefined;
			return true;
		} else {
			return false;
		}
	}
	
	//补充检验信息
	var labinfo_editIndex = undefined;
	$('#labinfo').datagrid({   
//	    url:'datagrid_data.json',  
		singleSelect:true,
	    columns:[[    
			{field:'type',hidden:true,
				formatter: function(value,row,index){
					return "labinfo";
				}
			},  
	        {field:'requestno',title:'申请检验单号',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },    
	        {field:'labexamcode',title:'申请检验项目编码',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },
	        {field:'labexamname',title:'申请检验项目名称',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },
	        {field:'ch_labeltypedesc',title:'ch_损害类别',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },
	        {field:'ch_labresult',title:'ch_labresult',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },    
	        {field:'ch_resultflag',title:'ch_resultflag',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },
	        {field:'ch_range',title:'ch_range',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },
	        {field:'ch_unit',title:'ch_unit',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },    
	        {field:'ch_reporttime',title:'ch_reporttime',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },    
	        {field:'deptcode',title:'申请检验科室编码',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },    
	        {field:'deptname',title:'申请检验科室名称',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },    
	        {field:'doctorcode',title:'申请检验医生编码',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },    
	        {field:'doctorname',title:'申请检查医生名称',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        }
	    ]],
	    toolbar: [{
			iconCls: 'icon-add',
			handler: function(){
				$('#labinfo').datagrid('appendRow',{
					type:"labinfo",
					requestno: '',
					labexamcode: '',
					labexamname: '',
					ch_labeltypedesc:'',
					ch_reporttime: '',
					deptcode: '',
					deptname: '',
					doctorcode: '',
					doctorname: '',
					ch_resultflag:'',
					ch_labresult:'',
					ch_range:'',
					ch_unit:''
				});
			}
		},{
			iconCls: 'icon-remove',
			handler: function(){
				if(labinfo_work_row<0){
					$.messager.alert('警告','请先选择一行');  
				}else{
					$('#labinfo').datagrid('deleteRow',labinfo_work_row);
					labinfo_work_row=-1;
				}
				
			}
		},{
			iconCls: 'icon-search',
			text:'自定义检验检查',
			handler: function(){
				if(labinfo_work_row<0){
					$.messager.alert('警告','请先选择一行');    
				}else{
					$('#db_user_labitem').datagrid({url:addurl+"/testmng/user_labitem",});
					$('#user_labitem').dialog({closed:false});
				}
				
			}
		},{
			iconCls: 'icon-search',
			text:'科室字典表',
			handler: function(){
				if(labinfo_work_row<0){
					$.messager.alert('警告','请先选择一行');
				}else{
					$('#db_dept_dict').datagrid({url:addurl+"/testmng/dept_dict",});
					$('#dept_dict').dialog({closed:false});
				}
			}
		
		},{
			iconCls: 'icon-search',
			text:'医生字典表',
			handler: function(){
				if(labinfo_work_row<0){
					$.messager.alert('警告','请先选择一行');
				}else{
					$('#db_doc_dict').datagrid({url:addurl+"/testmng/doc_dict",});
					$('#doc_dict').dialog({closed:false});
				}
			}
		}],
		
		//点击一个单元格启动编辑器
		onClickCell:function(index, field, value){
			labinfo_work_row=index;
			if (labinfo_endEditing()){
				$('#labinfo').datagrid('selectRow', index).datagrid('editCell', {index:index,field:field});
				//标记编辑的行编号
				labinfo_editIndex = index;
			}
		}
	});  
	
	//关闭行编辑
	function labinfo_endEditing(){
		if (labinfo_editIndex == undefined){return true}
		if ($('#labinfo').datagrid('validateRow', labinfo_editIndex)){
			$('#labinfo').datagrid('endEdit', labinfo_editIndex);
			labinfo_editIndex = undefined;
			return true;
		} else {
			return false;
		}
	}
	
	//自定义检验检查表窗口
	$('#user_labitem').dialog(
		{    
		title: '新增数据',    
	    width: 600,    
	    height: 600,    
	    closed: true,//true窗口关闭，false窗口打开
	    modal:true,//弹出后，只能操作本窗口
	    buttons:[{
			text:'关闭',
			handler:function(){
				$('#user_labitem').dialog({closed: true,});
				work_row_clear();
			}
		}],
		//X关闭功能
		onClose:function(){
			work_row_clear();
		},
	});
	
	$("#labitem_seach").click(function(){
		$("#db_user_labitem").datagrid('load',{itemcode:$("#labitem_search_data").textbox('getValue')},'reload');
	});
	
	$('#db_user_labitem').datagrid({   
		title:'自定义检验检查表',
//		width:560,
		height:500, 
		pageSize:30,
//	    url:addurl+"/testmng/aller_dict",//空数据表格，别的地方调用时给URL赋值加载数据
	    singleSelect:true,//true单选，不配置或者false为多选
	    pagination:true,//翻页栏
	    rownumbers:true,//行序号显示
	    columns:[[    
	        {field:'hisname',title:'机构',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },   
	        {field:'labeltypedesc',title:'损害类别',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },
	        {field:'itemcode',title:'检验项编码',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },    
	        {field:'itemname',title:'检验项名称',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },    
	        {field:'labeldesc',title:'损害程度描述',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },    
	        {field:'range',title:'参考范围',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        },    
	        {field:'unit',title:'单位',width:100,align:'center',
	        	editor:{
					type:'textbox',
				}
	        }
	    ]],
		//双击一个行
		onDblClickRow: function(index, row){
			$('#labinfo').datagrid('updateRow',{
				index: labinfo_work_row,
				row:{
					labexamcode: row.itemcode,
					labexamname: row.itemname,
					ch_labeltypedesc:row.labeltypedesc
	                }
			});
//			$('#user_labitem').dialog({closed: true,});
		},
	}); 
	
});

//医嘱窗口标题赋值
function title(titlestr){
	$('#biaoti').text(titlestr);
}

//医嘱窗口客户端信息赋值
function cli(data_json){
	PassClient=data_json;
	$("#HospID").textbox('setValue',PassClient.HospID);
}

//医嘱窗口病人信息赋值
function pat(data_json){
	$('#PatCode').textbox('setValue',data_json.PatCode);
	$('#InHospNo').textbox('setValue',data_json.InHospNo);
	$('#VisitCode').textbox('setValue',data_json.VisitCode);
	$('#Name').textbox('setValue',data_json.Name);
	$('#Sex').combobox('setValue',data_json.Sex);
	$('#Birthday').textbox('setValue',data_json.Birthday);
	$('#HeightCM').textbox('setValue',data_json.HeightCM);
	$('#WeighKG').textbox('setValue',data_json.WeighKG);
	$('#DeptCode').textbox('setValue',data_json.DeptCode);
	$('#DeptName').textbox('setValue',data_json.DeptName);
	$('#DoctorCode').textbox('setValue',data_json.DoctorCode);
	$('#DoctorName').textbox('setValue',data_json.DoctorName);
	$('#PatStatus').combobox('setValue',data_json.PatStatus);
	$('#IsLactation').combobox('setValue',data_json.IsLactation);
	$('#IsPregnancy').combobox('setValue',data_json.IsPregnancy);
	$('#PregStartDate').textbox('setValue',data_json.PregStartDate);
	$('#HepDamageDegree').combobox('setValue',data_json.HepDamageDegree);
	$('#RenDamageDegree').combobox('setValue',data_json.RenDamageDegree);
	$('#UseTime').textbox('setValue',data_json.UseTime);
	$('#CheckMode').textbox('setValue',data_json.CheckMode);
	$('#IsDoSave').combobox('setValue',data_json.IsDoSave);
	$('#Age').textbox('setValue',data_json.Age);
	$('#PayClass').textbox('setValue',data_json.PayClass);
	$('#IsTestEtiology').combobox('setValue',data_json.IsTestEtiology);
	$('#InHospDate').textbox('setValue',data_json.InHospDate);
	$('#OutHospDate').textbox('setValue',data_json.OutHospDate);
	$('#IDCard').textbox('setValue',data_json.IDCard);
	$('#Telephone').textbox('setValue',data_json.Telephone);
}

//医嘱窗口过敏原信息赋值
function aller(data_json){
	var ScreenAllergens=data_json.ScreenAllergens;
	for(var i=0;i<ScreenAllergens.length;i++){
		var aller=ScreenAllergens[i];
		$('#aller').datagrid('appendRow',{
			Index: aller.Index,
			AllerSource: aller.AllerSource,
			AllerCode: aller.AllerCode,
			AllerName:aller.AllerName,
			AllerSymptom:aller.AllerSymptom
		});
	}
}

//医嘱窗口疾病信息赋值
function dis(data_json){
	var ScreenMedConds=data_json.ScreenMedConds;
	for(var i=0;i<ScreenMedConds.length;i++){
		var dis=ScreenMedConds[i];
		$('#dis').datagrid('appendRow',{
			RecipNo: dis.RecipNo,
			Index: dis.Index,
			DisSource: dis.DisSource,
			DiseaseCode:dis.DiseaseCode,
			DiseaseName:dis.DiseaseName,
			DisTimeType:parseInt(dis.DisTimeType),
			Ishospinfection:parseInt(dis.Ishospinfection)
		});
	}
}

//医嘱窗口手术信息赋值
function opr(data_json){
	var ScreenOperations=data_json.ScreenOperations;
	for(var i=0;i<ScreenOperations.length;i++){
		var opr=ScreenOperations[i];
		$('#opr').datagrid('appendRow',{
			Index: opr.Index,
			OprCode: opr.OprCode,
			OprName: opr.OprName,
			IncisionType:opr.IncisionType,
			OprStartDate:opr.OprStartDate,
			OprEndDate: opr.OprEndDate,
			OprMediTime:parseInt(opr.OprMediTime),
			OprTreatTime:parseInt(opr.OprTreatTime)
		});
	}
}

//医嘱窗口药品信息赋值
function odr(data_json){
	var ScreenDrugs=data_json.ScreenDrugs;
	for(var i=0;i<ScreenDrugs.length;i++){
		var odr=ScreenDrugs[i];
		$('#odr').datagrid('appendRow',{
			 RecipNo: odr.RecipNo,
             Index: odr.Index,
             OrderNo:parseInt(odr.OrderNo),
             DrugSource: odr.DrugSource,
             DrugUniqueCode: odr.DrugUniqueCode,
             DrugCode: odr.DrugCode,
             DrugName: odr.DrugName,
             DoseUnit: odr.DoseUnit,
             Form: odr.Form,
             Strength: odr.Strength,
             CompName: odr.CompName,
             RouteSource: odr.RouteSource,
             RouteCode: odr.RouteCode,
             RouteName: odr.RouteName,
             FreqSource: odr.FreqSource,
             Frequency: odr.Frequency,
             DosePerTime: odr.DosePerTime,
             StartTime: odr.StartTime,
             EndTime: odr.EndTime,
             ExecuteTime: odr.ExecuteTime,
             DeptCode: odr.DeptCode,
             DeptName: odr.DeptName,
             DoctorCode: odr.DoctorCode,
             DoctorName: odr.DoctorName,
             GroupTag: odr.GroupTag,
             IsTempDrug:parseInt(odr.IsTempDrug) ,
             OrderType:parseInt(odr.OrderType),
             Pharmacists: odr.Pharmacists,
             Pharmacists_: odr.Pharmacists_,
             Num: odr.Num,
             NumUnit: odr.NumUnit,
             Cost: odr.Cost,
             Purpose: parseInt(odr.Purpose),
             OprCode: odr.OprCode,
             MediTime: odr.MediTime,
             Remark: odr.Remark
		});
	}
}

//附加信息节点赋值
function jsoninfo(data_json){
//	InputJsonInfoList=data_json;
	var InputJsonInfos=data_json.InputJsonInfos;
	for(var i=0;i<InputJsonInfos.length;i++){
		var InputJsonInfo=InputJsonInfos[i];
		if(InputJsonInfo.type=="jsontype"){
			$('#jsontype').combobox('setValue',InputJsonInfo.screentype);
		}
		if(InputJsonInfo.type=="prtasktype"){
			$('#prtasktype').combobox('setValue',InputJsonInfo.urgent);
		}
		if(InputJsonInfo.type=="druginfo"){
			$('#druginfo').datagrid('appendRow',{
				type:"druginfo",
				index: InputJsonInfo.index,
				driprate: InputJsonInfo.driprate,
				driptime: InputJsonInfo.driptime,
				duration:InputJsonInfo.duration
			});
		}
		if(InputJsonInfo.type=="diseaseinfo"){
			$('#diseaseinfo').datagrid('appendRow',{
				type:"diseaseinfo",
				index: InputJsonInfo.index,
				starttime: InputJsonInfo.starttime,
				endtime: InputJsonInfo.endtime
			});
		}
		if(InputJsonInfo.type=="otherrecipinfo"){
			$('#otherrecipinfo').datagrid('appendRow',{
				type:"otherrecipinfo",
				hiscode: InputJsonInfo.hiscode,
				index: InputJsonInfo.index,
				recipno: InputJsonInfo.recipno,
				drugsource: InputJsonInfo.drugsource,
				druguniquecode: InputJsonInfo.druguniquecode,
				drugname: InputJsonInfo.drugname,
				doseunit: InputJsonInfo.doseunit,
				routesource: InputJsonInfo.routesource,
				routecode: InputJsonInfo.routecode,
				routename: InputJsonInfo.routename
			});
		}
		if(InputJsonInfo.type=="examinfo"){
			$('#examinfo').datagrid('appendRow',{
				type:"examinfo",
				requestno:InputJsonInfo.requestno,
				labexamcode: InputJsonInfo.labexamcode,
				labexamname: InputJsonInfo.labexamname,
				startdatetime: InputJsonInfo.startdatetime,
				deptcode: InputJsonInfo.deptcode,
				deptname: InputJsonInfo.deptname,
				doctorcode: InputJsonInfo.doctorcode,
				doctorname: InputJsonInfo.doctorname
			});
		}
		if(InputJsonInfo.type=="labinfo"){
			$('#labinfo').datagrid('appendRow',{
				type:"labinfo",
				requestno: InputJsonInfo.requestno,
				labexamcode: InputJsonInfo.labexamcode,
				labexamname: InputJsonInfo.labexamname,
				ch_reporttime: InputJsonInfo.ch_reporttime,
				deptcode: InputJsonInfo.deptcode,
				deptname: InputJsonInfo.deptname,
				doctorcode: InputJsonInfo.doctorcode,
				doctorname: InputJsonInfo.doctorname,
				ch_resultflag:InputJsonInfo.ch_resultflag,
				ch_labeltypedesc:InputJsonInfo.ch_labeltypedesc,
				ch_labresult:InputJsonInfo.ch_labresult,
				ch_range:InputJsonInfo.ch_range,
				ch_unit:InputJsonInfo.ch_unit
			});
		}
	}
	
}

//清理工作
function pat_clear(){
	
	$("#biaoti").text("");
	$("#HospID").textbox('setValue',"");
	
	$('#PatCode').textbox('setValue',"");
	$('#InHospNo').textbox('setValue',"");
	$('#VisitCode').textbox('setValue',"");
	$('#Name').textbox('setValue',"");
	$('#Sex').textbox('setValue',"");
	$('#Birthday').textbox('setValue',"");
	$('#HeightCM').textbox('setValue',"");
	$('#WeighKG').textbox('setValue',"");
	$('#DeptCode').textbox('setValue',"");
	$('#DeptName').textbox('setValue',"");
	$('#DoctorCode').textbox('setValue',"");
	$('#DoctorName').textbox('setValue',"");
	$('#PatStatus').textbox('setValue',"");
	$('#IsLactation').textbox('setValue',"");
	$('#IsPregnancy').textbox('setValue',"");
	$('#PregStartDate').textbox('setValue',"");
	$('#HepDamageDegree').textbox('setValue',"");
	$('#RenDamageDegree').textbox('setValue',"");
	$('#UseTime').textbox('setValue',"");
	$('#CheckMode').textbox('setValue',"");
	$('#IsDoSave').textbox('setValue',"");
	$('#Age').textbox('setValue',"");
	$('#PayClass').textbox('setValue',"");
	$('#IsTestEtiology').combobox('setValue',"");
	$('#InHospDate').textbox('setValue',"");
	$('#OutHospDate').textbox('setValue',"");
	$('#IDCard').textbox('setValue',"");
	$('#Telephone').textbox('setValue',"");
}

function json_clear(){
	$('#aller').datagrid('loadData',{total:0,rows:[]})
	$('#dis').datagrid('loadData',{total:0,rows:[]})
	$('#opr').datagrid('loadData',{total:0,rows:[]})
	$('#odr').datagrid('loadData',{total:0,rows:[]})
	
	//附件信息
	$('#jsontype').combobox('setValue',"1");
	$('#prtasktype').combobox('setValue',"0");
	$('#druginfo').datagrid('loadData',{total:0,rows:[]})
	$('#diseaseinfo').datagrid('loadData',{total:0,rows:[]})
	$('#otherrecipinfo').datagrid('loadData',{total:0,rows:[]})
	$('#examinfo').datagrid('loadData',{total:0,rows:[]})
	$('#labinfo').datagrid('loadData',{total:0,rows:[]})
}

//组织JSON串保存使用
function str_to_json(){
	var json = {};
	
	//保存客户端信息
	PassClient.HospID=$("#HospID").textbox('getValue');
	json["PassClient"]=PassClient;
	
	//保存病人信息
	var Patient={};
	Patient["PatCode"]=$('#PatCode').textbox('getValue');
	Patient["InHospNo"]=$('#InHospNo').textbox('getValue');
	Patient["VisitCode"]=$('#VisitCode').textbox('getValue');
	Patient["Name"]=$('#Name').textbox('getValue');
	Patient["Sex"]=$('#Sex').textbox('getValue');
	Patient["Birthday"]=$('#Birthday').textbox('getValue');
	Patient["HeightCM"]=$('#HeightCM').textbox('getValue');
	Patient["WeighKG"]=$('#WeighKG').textbox('getValue');
	Patient["DeptCode"]=$('#DeptCode').textbox('getValue');
	Patient["DeptName"]=$('#DeptName').textbox('getValue');
	Patient["DoctorCode"]=$('#DoctorCode').textbox('getValue');
	Patient["DoctorName"]=$('#DoctorName').textbox('getValue');
	Patient["PatStatus"]=parseInt($('#PatStatus').textbox('getValue'));
	Patient["IsLactation"]=parseInt($('#IsLactation').textbox('getValue'));
	Patient["IsPregnancy"]=parseInt($('#IsPregnancy').textbox('getValue'));
	Patient["PregStartDate"]=$('#PregStartDate').textbox('getValue');
	Patient["HepDamageDegree"]=parseInt($('#HepDamageDegree').textbox('getValue'));
	Patient["RenDamageDegree"]=parseInt($('#RenDamageDegree').textbox('getValue'));
	Patient["UseTime"]=$('#UseTime').textbox('getValue');
	Patient["CheckMode"]=$('#CheckMode').textbox('getValue');
	Patient["IsDoSave"]=parseInt($('#IsDoSave').textbox('getValue'));
	Patient["Age"]=$('#Age').textbox('getValue');
	Patient["PayClass"]=$('#PayClass').textbox('getValue');
	Patient["IsTestEtiology"]=parseInt($('#IsTestEtiology').combobox('getValue'));
	Patient["InHospDate"]=$('#InHospDate').textbox('getValue');
	Patient["OutHospDate"]=$('#OutHospDate').textbox('getValue');
	Patient["IDCard"]=$('#IDCard').textbox('getValue');
	Patient["Telephone"]=$('#Telephone').textbox('getValue');
	json["Patient"]=Patient;
	
	//保存过敏原信息
	var ScreenAllergenList={};
	ScreenAllergenList["ScreenAllergens"] = $('#aller').datagrid('getData').rows;
	json["ScreenAllergenList"]=ScreenAllergenList;
	
	//保存疾病信息
	var ScreenMedCondList={};
	var disrows=$('#dis').datagrid('getData').rows;
	var ScreenMedConds=new Array();
	for(var i=0;i<disrows.length;i++){
		var disrow=disrows[i];
		disrow["DisTimeType"]=parseInt(disrow.DisTimeType);
		disrow["Ishospinfection"]=parseInt(disrow.Ishospinfection);
		ScreenMedConds[i]=disrow;
	}
	ScreenMedCondList["ScreenMedConds"] =ScreenMedConds;
	json["ScreenMedCondList"]=ScreenMedCondList;
	
	//保存手术信息
	var ScreenOperationList={};
	var oprrows=$('#opr').datagrid('getData').rows;
	var ScreenOperations=new Array();
	for(var i=0;i<oprrows.length;i++){
		var oprrow=oprrows[i];
		oprrow["OprMediTime"]=parseInt(oprrow.OprMediTime);
		oprrow["OprTreatTime"]=parseInt(oprrow.OprTreatTime);
		ScreenOperations[i]=oprrow;
	}
	ScreenOperationList["ScreenOperations"] = ScreenOperations;
	json["ScreenOperationList"]=ScreenOperationList;
	
	//保存医嘱信息
	var ScreenDrugList={};
	var odrrows=$('#odr').datagrid('getData').rows;
	var ScreenDrugs=new Array();
	for(var i=0;i<odrrows.length;i++){
		var odrrow=odrrows[i];
		//字符串转整型
		odrrow["OrderNo"]=parseInt(odrrow.OrderNo);
		odrrow["IsTempDrug"]=parseInt(odrrow.IsTempDrug);
		odrrow["OrderType"]=parseInt(odrrow.OrderType);
		odrrow["Purpose"]=parseInt(odrrow.Purpose);
		if(odrrow.CompName==undefined){
			odrrow["CompName"]="";
		}
		if(odrrow.FreqSource==undefined){
			odrrow["FreqSource"]="USER";
		}
		if(odrrow.MediTime==undefined){
			odrrow["MediTime"]="";
		}
		if(odrrow.RouteSource==undefined){
			odrrow["RouteSource"]="USER";
		}
		
		ScreenDrugs[i]=odrrow;
	}
	ScreenDrugList["ScreenDrugs"] = ScreenDrugs;
	json["ScreenDrugList"]=ScreenDrugList;
	
	//保存附加信息
//	json["InputJsonInfoList"]=InputJsonInfoList;
	var InputJsonInfoList={};
	var InputJsonInfos=new Array();
	
	var jsontype={};
	jsontype["type"]="jsontype";
	jsontype["screentype"]=$('#jsontype').combobox('getValue');
	InputJsonInfos.push(jsontype);
	
	var prtasktype={};
	prtasktype["type"]="prtasktype";
	prtasktype["urgent"]=$('#prtasktype').combobox('getValue');
	InputJsonInfos.push(prtasktype);
	
	for(var i=0;i<$('#druginfo').datagrid('getData').rows.length;i++){
		if($('#druginfo').datagrid('getData').rows[i] != undefined){
			InputJsonInfos.push($('#druginfo').datagrid('getData').rows[i]);
		}
	}
	
	for(var i=0;i<$('#diseaseinfo').datagrid('getData').rows.length;i++){
		if($('#diseaseinfo').datagrid('getData').rows[i] != undefined){
			InputJsonInfos.push($('#diseaseinfo').datagrid('getData').rows[i]);
		}
	}
	
	for(var i=0;i<$('#otherrecipinfo').datagrid('getData').rows.length;i++){
		if($('#otherrecipinfo').datagrid('getData').rows[i] != undefined){
			InputJsonInfos.push($('#otherrecipinfo').datagrid('getData').rows[i]);
		}
	}
	
	for(var i=0;i<$('#examinfo').datagrid('getData').rows.length;i++){
		if($('#examinfo').datagrid('getData').rows[i] != undefined){
			InputJsonInfos.push($('#examinfo').datagrid('getData').rows[i]);
		}
	}
		
	for(var i=0;i<$('#labinfo').datagrid('getData').rows.length;i++){
		if($('#labinfo').datagrid('getData').rows[i] != undefined){
			InputJsonInfos.push($('#labinfo').datagrid('getData').rows[i]);
		}
	}
	
	InputJsonInfoList["InputJsonInfos"]=InputJsonInfos;
	json["InputJsonInfoList"]=InputJsonInfoList;
	
	return JSON.stringify(json);
};

//清除某行的选中标记
function work_row_clear(){
	aller_work_row=-1;
	dis_work_row=-1;
	opr_work_row=-1;
	odr_work_row=-1;
	
	druginfo_work_row=-1;
	diseaseinfo_work_row=-1;
	otherrecipinfo_work_row=-1;
	examinfo_work_row=-1;
	labinfo_work_row=-1;
}
//滚动条置低布局改变
function scrollToBottom(){
	var div = document.getElementById('content');
	div.scrollTop = div.scrollHeight;
}
function scrollToBottom1(){
	var div = document.getElementById('content1');
	div.scrollTop = div.scrollHeight;
}
//格式化日期
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

//清空聊天数据
function clearAll(){
	$("#websocket-div #content").empty();
}

//字符和汉字长度算法,最总换算成字符长度
function getByteLen(val) {
	var sum=1;
	for(var i=0;i<val.length;i++){
		if(val[i]==' '){
			sum=i+1;
		}
	}
	if(sum==val.length){
		return 0;
	}
	
	if(val==null){
		return 0;
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


//重新easyui的单字段编辑功能
$.extend($.fn.datagrid.methods, {
	editCell: function(jq,param){
		return jq.each(function(){
			var opts = $(this).datagrid('options');
			var fields = $(this).datagrid('getColumnFields',true).concat($(this).datagrid('getColumnFields'));
			for(var i=0; i<fields.length; i++){
				var col = $(this).datagrid('getColumnOption', fields[i]);
				col.editor1 = col.editor;
				if (fields[i] != param.field){
					col.editor = null;
				}
			}
			$(this).datagrid('beginEdit', param.index);
			for(var i=0; i<fields.length; i++){
				var col = $(this).datagrid('getColumnOption', fields[i]);
				col.editor = col.editor1;
			}
		});
	}
});

