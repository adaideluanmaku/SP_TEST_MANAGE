$(document).ready(function(){
	var addurl=$("#addurl").val()
	$(".box_1 div").click(function(){
		$(".box_1 div").attr("style","background-color: #ffffff;")
		$(this).attr("style","background-color: slategray;")
	});
	
	var int=null;
	var int1=null;
	testmessae();
	//浮动窗口
//	mousetitle();
//	int=setInterval(testmessae,3000);
	
	$("#view_1").click(function(){
//		clearInterval(int)
//		clearInterval(int1)//停止执行代码
//		int=setInterval(testmessae,3000);//定时执行代码
		testmessae();
//		mousetitle();
	});
	$("#view_2").click(function(){
//		clearInterval(int);
//		clearInterval(int1)
//		int1=setInterval(learnmessage,3000);
		learnmessage();
//		mousetitle();
	});
	
	$("#message_in").click(function(){
		if(getByteLen($("#user_message").val())>200){
			$(".message_in_err").text("输入小于200字符");
			return false;
		}
		$.ajax({
			type:"POST",
			url:$("#addurl").val()+"/log/insertusermessage",
			async:false,
			data:{message:$("#user_message").val()},
			success: function(result){
				$("#user_message").val("")
			},
			error:function(XMLResponse){
				alert(XMLResponse.responseText)
			}
		})
		return false;
	})
	
});

function testmessae(){
	$.ajax({
		type:"POST",
		url:$("#addurl").val()+"/log/testmessage",
		async:false,
		data:{},
		success: function(result){
			$(".box_2 div").remove();
			for(var i=0; i<result.testmng.length;i++){
				var testmng=result.testmng[i]
				if(testmng.testtext.length<=500){
					$(".box_2").append(
							'<div>'
							+'<h3>工程名：'+testmng.projectname+'   修改时间：'+testmng.inserttime+'</h3>'
							+'<p>案例名称：'+testmng.testname+'</p>'
							+'<p>案例编号：'+testmng.testno+'</p>'
							+'<p id="p2">逻辑描述：'+testmng.testtext+'</p>'
							+'<input type="hidden" value="'+testmng.testtext+'">'
							+'</div>'
					)
				}else{
					$(".box_2").append(
							'<div>'
							+'<h3>工程名：'+testmng.projectname+'   修改时间：'+testmng.inserttime+'</h3>'
							+'<p>案例名称：'+testmng.testname+'</p>'
							+'<p>案例编号：'+testmng.testno+'</p>'
							+'<p id="p2">逻辑描述：'+testmng.testtext.substring(0,500)+"........"+'</p>'
							+'<input type="hidden" value="'+testmng.testtext+'">'
							+'</div>'
					)
				}
				
			}
			$(".box_2 #num1").val(result.num);
		},
		error:function(XMLResponse){
			alert(XMLResponse.responseText)
		}
	})
	return false;
};

function learnmessage(){
	$.ajax({
		type:"POST",
		url:$("#addurl").val()+"/log/learnmessage",
		async:false,
		data:{},
		success: function(result){
			$(".box_2 div").remove();
			for(var i=0; i<result.learn.length;i++){
				var learn=result.learn[i]
				if(learn.learntext.length<=500){
					$(".box_2").append(
							'<div>'
							+'<h3>分类名称：'+learn.learngroup+'   修改时间：'+learn.inserttime+'</h3>'
							+'<p>标题：'+learn.learnname+'</p>'
							+'<p id="p2">内容：'+learn.learntext+'</p>'
							+'<input type="hidden" value="'+learn.learntext+'">'
							+'</div>'
					)
				}else{
					$(".box_2").append(
							'<div>'
							+'<h3>分类名称：'+learn.learngroup+'   修改时间：'+learn.inserttime+'</h3>'
							+'<p>标题：'+learn.learnname+'</p>'
							+'<p id="p2">内容：'+learn.learntext.substring(0,500)+"........"+'</p>'
							+'<input type="hidden" value="'+learn.learntext+'">'
							+'</div>'
					)
				}
				
			}
			$(".box_2 #num2").val(result.num);
		},
		error:function(XMLResponse){
			alert(XMLResponse.responseText)
		}
	})
	return false;
};


//字符和汉字长度算法,最总换算成字符长度
function getByteLen(val) {
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

function mousetitle(){
	//浮动提示窗口-触发事件
	$(".box_2 #p2").on("mouseover mouseout",function(){ 
//		if(event.type == "mouseover"){//鼠标悬浮
//			alert(1);
//		}else if(event.type == "mouseout"){//鼠标离开
//			alert(1);
//		}
		if(event.type == "mouseover"){//鼠标悬浮
			if($(this).text().length>10){//浮动窗口
				$(".box_2").append('<div id="title" style="max-width:800px;max-height:300px;position: absolute;top:0px;left:0px;background-color: #fff2e8;/*自动换行*/	word-wrap: break-word;border: 1px solid #c0c0c0;overflow-y:scroll;"></div>');
				$(this).mousemove(function(e) { 
					var xx = e.originalEvent.x || e.originalEvent.layerX || 0; 
					var yy = e.originalEvent.y || e.originalEvent.layerY || 0; 
					$("#title").css("left",xx+20+"px");
					$("#title").css("top",yy+15+"px");
					$("#title").text($(this).next().val());
				}); 
			}
		}else if(event.type == "mouseout" && $(this).next().val().length<=500){//鼠标离开
			$("#title").remove();
		}
	});  
}

