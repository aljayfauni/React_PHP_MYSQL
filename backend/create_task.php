<?php
include_once 'Task.class.php';

$task = new Task();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $title = $data['title'];
    $description = $data['description'];
    $status = $data['status'];


    $result = $task->createTask($title, $description,$status);

    if ($result) {
        echo json_encode(array("success" => true));
    } else {
        echo json_encode(array("success" => false));
    }
}
?>
