<?php
	
	require_once("bookedapi.php");
	session_start();
	$refNumber = $_POST['ref'];

	$username = 'task2g2';
	$password = 'cherpoghbam';
	$bookedApiUrl =
	'http://fiji.rocksclusters.org/cloud-scheduler/Web/Services/index.php';
	$bookedapiclient = new bookedapiclient($username, $password, $bookedApiUrl);
	$bookedapiclient-> authenticate(true);
	    
	$allReservations = $bookedapiclient->getReservation($refNumber);
	echo(json_encode($allReservations));


?>