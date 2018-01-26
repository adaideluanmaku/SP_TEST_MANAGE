$(document).ready(function(){
	//team表格操作
	$(".tsearch .search_submit").click(function(){
		var datanumbak = $(".tsearch .datanum").val();
		$.ajax({
			type:"POST",
			url:$("#addurl").val()+"/testmng/team",
			async:false,
			data:{teamname:$(".tsearch #teamname").val(),limit:'limit '+0+','+$(".left_team .datanum").val()},
			success: function(result){
				$(".table_box .table").remove();
				$(".table_box").append($(result).find(".table_box .table"));
				$(".table_box .datanum").val(datanumbak);
			},
			error:function(XMLResponse){
				alert(XMLResponse.responseText)
			}
		});
		return false;
	});
	
	$(".table_box").on("click","#up",function(){
		if($(".left_box .datamsg #pagenum").text()==1){
			return;
		}
		var start=(Number($(".table_box .datamsg #pagenum").text())-1)*$(".table_box .datanum").val()-$(".table_box .datanum").val();
		var pagenumbak=Number($(".table_box .datamsg #pagenum").text())-1;
		var datanumbak = $(".table_box .datanum").val();
		$.ajax({
			type:"POST",
			url:$("#addurl").val()+"/testmng/team",
			async:false,
			data:{teamname:$(".table_box #teamname").val(),limit:'limit '+start+','+datanumbak},
			success: function(result){
				$(".table_box .table").remove();
				$(".table_box").append($(result).find(".table_box .table"));
				
				$(".table_box .datamsg #pagenum").text(pagenumbak);
				$(".table_box .datanum").val(datanumbak);
			},
			error:function(XMLResponse){
				alert(XMLResponse.responseText)
			}
		});
		return false;
	});
	
	$(".table_box").on("click","#down",function(){
		if($(".table_box .datamsg #pagenum").text()==$(".table_box .datamsg #pagecount").text()){
			return;
		}
		var start=(Number($(".table_box .datamsg #pagenum").text())+1)*$(".table_box .datanum").val()-$(".table_box .datanum").val();
		var pagenumbak=Number($(".table_box .datamsg #pagenum").text())+1;
		var datanumbak = $(".table_box .datanum").val();
		$.ajax({
			type:"POST",
			url:$("#addurl").val()+"/testmng/team",
			async:false,
			data:{teamname:$(".left_box #teamname").val(),limit:'limit '+start+','+datanumbak},
			success: function(result){
				$(".table_box .table").remove();
				$(".table_box").append($(result).find(".table_box .table"));
				$(".table_box .datamsg #pagenum").text(pagenumbak);
				$(".table_box .datanum").val(datanumbak);
			},
			error:function(XMLResponse){
				alert(XMLResponse.responseText)
			}
		});
		return false;
	});
});
