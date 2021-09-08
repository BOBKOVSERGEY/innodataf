<?php
$name = trim($_POST['fio']);
$position = trim($_POST['position']);
$company = trim($_POST['company']);
$email = trim($_POST['email']);
$phone = trim($_POST['phone']);
$comment = trim($_POST['comment']);


$data = [
    $name,
    $position,
    $company,
    $email,
    $phone,
    $comment,
];
$message = 'Сообщение успешно отправлено';
$response = ['message' => $data];
header('Content-type: application/json');
echo json_encode($response);