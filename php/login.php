<?php
	include 'conn.php';
	if(isset($_POST['username']) && isset($_POST['password'])){
		$username = $_POST['username'];
		$password = md5($_POST['password']);
		$query = "select * from user where username='$username' and password='$password'";
		$result = mysql_query($query);
		if(mysql_fetch_array($result)){
			echo true;
		}else{
			echo false;
		}
	}
?>