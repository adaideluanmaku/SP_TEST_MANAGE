$(document).ready(function(){
	var addurl=$("#addurl").val();
	
	//jquery submit form表单提交
	$("#login").click(function(){
		$("#denglu_form").submit();
//		$.ajax({
//			type: "POST",
//			url:addurl+"/login/denglu",
//			async:false,
//			data:$("#denglu_form").serialize(),
//			success: function(result) {
//				$(".logo_text #err").text($(result).find(".logo_text #err").text());
//			},
//			error:function(XMLResponse){
//				alert(XMLResponse.responseText)
//			}
//		});
//		return true;
	})
	
	$("#zhuce").click(function(){
		$('#zhuce_dialog').dialog({closed: false})
	})
	
	//对话框
	$('#zhuce_dialog').dialog({    
		title: '账户注册', 
	    width: 400,    
	    height: 300,    
	    closed: true,//true窗口关闭，false窗口打开
	    modal:true,//弹出后，只能操作本窗口
	    buttons:[{//对话框底部按钮
			text:'注册',
			handler:function(){
				$("#err").text('');
				if(!$("#zhuce_form").form('validate')){//验证dialog对话框中的所有内容是否验证通过
					return;
				}
				$.ajax({
					type: "POST",
					url:addurl+"/login/zhuce",
					async:false,
					data:$("#zhuce_form").serialize(),
					success: function(result) {
						$("#err").text(result)
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
				$('#zhuce_dialog').dialog({closed: true});
			}
		}]
	});    
	
});

function loginkey(event){
	$("#denglu_form").keydown(function(e){
		if (e.keyCode == 13){	// 当按下回车键时接受输入的值。
			$("#login").click();
		}
	});
}
//当前页面跳出iframe范围（用于session过期后）
if(window !=top){  
    top.location.href=location.href;  
}