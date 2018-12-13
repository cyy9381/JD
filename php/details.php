<?php  
	
	include "conn.php";
	
	$id=$_GET['sid'];

	$result=mysql_query("select * from product where sid=$id ");
	
	$prolist=mysql_fetch_array($result,MYSQL_ASSOC);
	
	echo json_encode($prolist);

?>