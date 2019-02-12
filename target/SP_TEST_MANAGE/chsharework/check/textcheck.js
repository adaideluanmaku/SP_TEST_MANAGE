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


