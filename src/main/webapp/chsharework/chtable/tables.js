$(document).ready(function(){
	//服务端回传数据
//	Map map=new HashMap();
//	map.put("datasnum", datasnum);
//	map.put("pagecount", pagecount);
//	map.put("rslist", rslist);
//	map.put("columnNames", columnNames);
	
	//表格配置
	var addurl=$("#addurl").val()//从页面获取请求地址
	var jsonobj= JSON.parse($("#pagedata").val());//从页面获取列表数据
	var columnnames_=$("#columnnames").val();//从页面获取字段名
	var searchname='username';//查询条件名称
	//表格配置结束
	
	var columnNames=jsonobj.columnNames; //字段名
	var datanum=jsonobj.datasnum;//总数据量
	var pagecount=jsonobj.pagecount+1;//默认总页数，后台退位取整
	var pagenums=1;//默认当前页编号
	var pagedata=20;//默认单页显示总数
	
	//拼接表格字段名
	columnnames_=columnnames_.split(",");
	var columnname_='';
	for(var i=0;i<columnnames_.length;i++){
		columnname_=columnname_+'<div>'+columnnames_[i]+'</div>';
	}
	var a='<div class="hd">'
		+'<div class="inputtext"><input type="text" name="'+searchname+'" value=""></div>'
		+'<div class="inputsubmit"><input type="button" value="查询"></div>'
		+'</div>'
	$(".pagetable").append(a);
	
	//查询按钮form提交
	$(".inputsubmit input").click(function(){
		var searchval=$(".inputtext input").val();//查询条件
		var data='{"limits":"0,'+pagedata+'","'+searchname+'":"'+searchval+'"}';
		data=JSON.parse(data);
		$.ajax({
			type: "POST",
			url:addurl,
			async:false,
			data:data,
			success: function(result) {
				var jsonobj= JSON.parse(result);
				pagenums=1;
				pagecount=jsonobj.pagecount+1;
				datanum=jsonobj.datasnum;
				
				new pagecss(pagenums,pagecount,jsonobj);
				$(".inputtext input").val(searchval);
				$(".fanyemess").text('总页数：'+pagecount+' 数据总数：'+datanum);
			},
			error:function(XMLResponse){
				alert(XMLResponse.responseText)
			}
		});
		return false;
	});
	
	//翻页按钮form提交
	$("#1").attr("style","background-color:blue")
	$(".pagetable").on("click","#fanyeanniu_",function(){
		var data=null;
		var searchval=$(".inputtext input").val();//查询条件
		pagenum=$(this).text();
		
		if(pagenum==1){
//			格式1：data={a:'1',b:'1'}
//			或者2:data='{"a":"1","b":"1"}'  data=JSON.parse(data);
			data='{"limits":"'+(pagenum-1)+','+pagedata+'","'+searchname+'":"'+searchval+'"}';
		}else if(pagenum=='上一页'){
			pagenum=pagenums-1;
			if(pagenum<2){
				pagenum=1
				data='{"limits":"'+(pagenum-1)+','+pagedata+'","'+searchname+'":"'+searchval+'"}';
			}else{
				data='{"limits":"'+(pagenum*pagedata-pagedata)+','+pagedata+'","'+searchname+'":"'+searchval+'"}';
			}
		}else if(pagenum=='下一页'){
			pagenum=pagenums+1;
			if(pagenum>pagecount){
				pagenum=pagecount;
			}
			data='{"limits":"'+(pagenum*pagedata-pagedata)+','+pagedata+'","'+searchname+'":"'+searchval+'"}';
		}else if(pagenum>pagecount){
			return;
		}else{
			data='{"limits":"'+(pagenum*pagedata-pagedata)+','+pagedata+'","'+searchname+'":"'+searchval+'"}';
		}
		data=JSON.parse(data);
		pagenums=pagenum;
		$.ajax({
			type: "POST",
			url:addurl,
			async:false,
			data:data,
			success: function(result) {
				var jsonobj= JSON.parse(result);
				datanum=jsonobj.datasnum;
				new pagecss(pagenums,pagecount,jsonobj);
				$(".fanyemess").text('总页数：'+pagecount+' 数据总数：'+datanum);
			},
			error:function(XMLResponse){
				alert(XMLResponse.responseText)
			}
		});
		return false;
	});
	
	//公共方法,当前页数，总页数，数据对象
	var pagecss= function(pagenums,pagecount,jsonobj){
		
		//更新数据列表
		var rslist=jsonobj.rslist;
		$(".c_left").remove();
		a='';
		
		//将取值方法放入一个数组中
		var columnName1=new Array();
		for(var i=0;i<columnNames.length;i++){
			columnName1.push('rslist[i].'+columnNames[i]);
		}
		
		//拼接表格字段数据
		for(var i=0;i<rslist.length;i++){
			var columnName='';
			for(var i1=0;i1<columnName1.length;i1++){
				columnName=columnName+'<div id="'+columnName1[i1].split(".")[1]+'"><span>'+eval(columnName1[i1])+'</span></div>'
			};
			a=a+'<div id="data'+i+'"class="data">'
					+'<div class="column1">'+((pagenums-1)*pagedata+i+1)+'</div>'
					+columnName
				+'</div>';
		}
		a= '<div class="c_left">'
				+'<div class="datahd">'
					+'<div class="column1">序号</div>'
					+columnname_
				+'</div>'
				+'<div class="datas">'
				+a
				+'</div>'
			+'</div>';
		$(".pagetable").append(a);
		
		//更新翻页
		$(".fanye").remove();
		a='';
		if(pagecount<10){
			for(var i=0;i<pagecount;i++){
				a=a+'<div id="fanyeanniu_">'+(i+1)+'</div>';
			}
		}else{
			pagenums=Number(pagenums);
			if(pagenums>5){
				for(var i=0;i<10;i++){
					if(i<6){
						a='<div id="fanyeanniu_">'+(pagenums-i)+'</div>'+a;
					}else{
						if((pagenums+i-5)>pagecount){
							continue;
						}
						a=a+'<div id="fanyeanniu_">'+(pagenums+i-5)+'</div>';
					}
				}
			}else{
				for(var i=0;i<pagecount;i++){
					a=a+'<div id="fanyeanniu_">'+(i+1)+'</div>';
				}
			}
		}
		
		a='<div class="fanye">'
			+'<div class="fanyeanniu">'
			+'<div id="fanyeanniu_" class="fanyeanniu1">上一页</div>'
			+a
			+'<div id="fanyeanniu_" class="fanyeanniu1">下一页</div>'
			+'</div>'
			+'<div class="fanyemess">总页数：${pagecount+1 } 数据总数：${datasnum}</div>'
			+'</div>';
			
		$(".pagetable").append(a);
		$(".fanyemess").text('总页数：'+pagecount+' 数据总数：'+datanum);
//		$("#"+pagenums).attr("style","background-color:blue")//翻页变色
		//自动根据表格宽度设置翻页DIV宽度
		$(".fanye").css("width",$(".data").width());
		
	}
	
	new pagecss(1,pagecount,jsonobj);//初始加载生成表,如果有on事件绑定，需要将代码放在表格生成之后
	
	//浮动提示窗口-触发事件
//	$(".data div span").on("mouseover mouseout",function(){ 
	$(document).on("mouseover mouseout",".data div span",function(){ 
//		if(event.type == "mouseover"){//鼠标悬浮
//			alert(1);
//		}else if(event.type == "mouseout"){//鼠标离开
//			alert(1);
//		}
		
		if(event.type == "mouseover"){//鼠标悬浮
			if($(this).text().length>10){//浮动窗口
				$("pagetable").append('<div id="title" style="max-width:400px;max-height:200px;position: absolute;'
						+'top:0px;left:0px;background-color: #fff2e8;/*自动换行*/	word-wrap: break-word;' 
						+'overflow: hidden;text-overflow: ellipsis;'
						+'border: 1px solid #c0c0c0;"></div>');
				$(this).mousemove(function(e) { 
					var xx = e.originalEvent.x || e.originalEvent.layerX || 0; 
					var yy = e.originalEvent.y || e.originalEvent.layerY || 0; 
					//如果提示框在body最下面超过页面高度，则靠上显示
					var bodyheight=document.body.offsetHeight;
					if((yy+10+200)<bodyheight){
						$("#title").css("left",xx+20+"px");
						$("#title").css("top",yy+10+"px");
					}else{
						$("#title").css("left",xx+20+"px");
						$("#title").css("top",yy+10-200+"px");
					}
					$("#title").text($(this).text());
				}); 
			}
		}else if(event.type == "mouseout"){//鼠标离开
			$("#title").remove();
		}
	});  
	
	//表格生成结束
	
	
//		$(".datas").on("click","#aaa",function(){
//			alert($("#data0 #loginname").text());
//			//new 一个新的对象
//			var a=new user();
//			//直接执行方法
//			user();
//		});
//	
//	var user = function(){
//	    // 公共变量
//	   alert(2)
//	}
	
});