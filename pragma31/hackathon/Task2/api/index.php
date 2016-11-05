<?php
    session_start();
    require_once 'bookedapi.php';
    $username = 'task2g2';
    $password = 'student task2g2';
    $bookedApiUrl =
    'http://fiji.rocksclusters.org/cloud-scheduler/Web/Services/index.php';
    $bookedapiclient = new bookedapiclient($username, $password);
    $bookedapiclient-> authenticate(true);

    // get user information given user id 
    function GetUser($bookedapiclient, $userid) {
      $userInfo = $bookedapiclient->getUser($userid);
    print_r($userInfo);
    }
    GetUser($bookedapiclient, 1);
?>