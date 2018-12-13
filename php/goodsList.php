<?php  
	
	include "conn.php";

    $header=$_GET['header'];
	$result=mysql_query("select * from goods where header='$header'");
	
	$goodslist=array();
	for ($i=0; $i < mysql_num_rows($result); $i++) { 
		$goodslist[$i]=mysql_fetch_array($result,MYSQL_ASSOC);
	}

	echo json_encode($goodslist);

?>