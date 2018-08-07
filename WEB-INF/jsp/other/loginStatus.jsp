<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<script>
		var token = "${centralToken}"
		if(!token){
			token = "${sessionScope.centralToken}"
		}
		if(token){
			parent.location.reload()
		}
	</script>
</head>
<body>
	
</body>
</html>