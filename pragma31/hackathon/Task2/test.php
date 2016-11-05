<?php	
	require_once 'bookedapi.php';
	session_start();

	$username = 'task2g2';
	$password = 'CHANGED';
	$bookedApiUrl =
	'http://fiji.rocksclusters.org/cloud-scheduler/Web/Services/index.php';
	$bookedapiclient = new bookedapiclient($username, $password);
	$bookedapiclient-> authenticate(true);
	    
	$allReservations = $bookedapiclient->getReservation();
	echo(json_encode($allReservations));
?>
