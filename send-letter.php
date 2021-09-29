<?php
$name = trim($_POST['fio']);
$position = trim($_POST['position']);
$company = trim($_POST['company']);
$email = trim($_POST['email']);
$phone = trim($_POST['phone']);
$comment = trim($_POST['comment']);
$link = trim($_POST['link']);
$file = $_FILES['file']['tmp_name'];
$fileName = $_FILES['file']['name'];


$data = [
    $name,
    $position,
    $company,
    $email,
    $phone,
    $comment,
    $file,
    $fileName,
    $link,
];
$message = 'Сообщение успешно отправлено';
$response = $data;
header('Content-type: application/json');
echo json_encode($response);