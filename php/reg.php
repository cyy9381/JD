<?php
	require "conn.php";
	
	if(isset($_POST['username'])){
		$username=$_POST['username'];
		$query="select * from user where username='$username'";
		$result=mysql_query($query);
		if(mysql_fetch_array($result)){//如果有值代表用户名存在。
			echo 'false';
		}else{
			echo 'true';
		}
	}
	
	
	if(isset($_POST['submit']) && $_POST['submit']=="立即注册"){
		$user=$_POST['username'];
		$pass=md5($_POST['password']);
		$query="insert user values(NULL,'$user','$pass',NOW())";
		mysql_query($query);
		header('location:http://127.0.0.1/JD/src/login.html');
	}
?>

