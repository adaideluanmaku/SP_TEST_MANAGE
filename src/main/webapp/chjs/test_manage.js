$(document).ready(function(){
	//样式和效果
	$("#menus1_1").attr('style','border-bottom:4px solid #FF0099');
	$(".menus1 div").click(function(){
		if($(this).attr("id")=="menus1_8"){
			return false;
		}
		$(".menus1 div").attr('style','border-bottom:');
		$(".menus2 div").attr('style','border-bottom:');
		$(this).attr('style','border-bottom:4px solid #FF0099');
	});
	$(".menus2 #menus1_5").click(function(){
		$(".menus1 div").attr('style','border-bottom:');
		$(this).attr('style','border-bottom:4px solid #FF0099');
	});
	
	//跳转地址
	var addurl=$("#addurl").val();
	$("#menus1_1").click(function(){
		$("#menus1_1 #log").text("");
		$(".iframe_box").attr("src",addurl+"/log/log?userid="+$("#userid").val());
	});
	
	$("#menus1_2").click(function(){
		$(".iframe_box").attr("src",addurl+"/testmng/testmanage");
	});
	
	$("#menus1_3").click(function(){
		$(".iframe_box").attr("src",addurl+"/learn/learn");
	});
	
//	$("#menus1_4").click(function(){
//		$(".iframe_box").attr("src","http://172.18.3.146:8098/pass_java_anli");
//	});
	
	$("#menus1_5").click(function(){
		var loginname=$("#loginname").val();
		$(".iframe_box").attr("src",addurl+"/users/users");
	});
	
	$("#menus1_6").click(function(){
		$(".iframe_box").attr("src",addurl+"/login/logout");
	});
	
	$("#menus1_7").click(function(){
		$("#menus1_7 #work").text("");
		$(".iframe_box").attr("src",addurl+"/works/works");
	});
	
	$("#menus1_8").click(function(){
		//清空菜单消息提示
		$('#user-div').val(1);
		
		//清空菜单未读消息提示
		$("#menus1_8 #new").text("");
		$("title").text("SP_TEST_MANAGE");
		
		$('#user-div').dialog({closed: false});
	});
	
	$("#menus1_9").click(function(){
		//先清空数据
		$("#broadcast-div #content1").empty();
		
		var userid=$("#userid").val();
		//清空菜单消息提示
		$('#broadcast-div').val(1);
		
		$.ajax({
			type:"POST",
			url:addurl+"/websocket/sysmessages",
			async:false,
			cache:true,
			data:{userid:userid},
			success: function(result){
				var result=eval(result)
				for(var i=0;i<result.length;i++){
					var data=result[i];
					if(data.touserid==userid){
						$("#broadcast-div #content1").append('<label style="color: white;">'+data.loginname+"&nbsp;"+data.inserttime+'</label><div class="msgtype">'+data.message+'</div>');
					}
				}
				//按钮提示未读消息
				$("#menus1_9 #new").text("");
				$("title").text("SP_TEST_MANAGE");
				
				$('#broadcast-div').dialog({closed: false});
				//聊天记录布局处理后,在布局完成后再来调整滚动条
				scrollToBottom1();
			},
			error:function(XMLResponse){
				alert(XMLResponse.responseText)
			}
		});
		return false;
	});
	
	$("#menus1_10").click(function(){
//		$('#orders-div').val(1);
		$('#orders-div').dialog({closed: false});
	});
	
	$("#menus1_11").click(function(){
//		$('#orders-div').val(1);
		$('#tools-div').dialog({closed: false});
	});
	
	//USER列表窗口
	$('#tools-div').dialog(
		{    
		title: '工具箱',    
	    width: 200,    
	    height: 600,  
	    left:1200,
	    closed: true,//true窗口关闭，false窗口打开
	    modal:false,//弹出后，只能操作本窗口
	    buttons:[{
			text:'关闭',
			handler:function(){
				$('#tools-div').dialog({closed: true});
			}
		}],
		//X关闭增加自己的功能
		onClose:function(){
			$('#tools-div').val(0)
		},
	});
});