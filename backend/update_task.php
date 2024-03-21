<?php
include_once 'Task.class.php';
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
$task = new Task();

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    
    $data = json_decode(file_get_contents("php://input"));
    $id = $data->id;
    $title = $data->title;
    $description = $data->description;
    $status = $data->status;

    $result = $task->updateTask($id, $title,$description,$status);

    if ($result) {
        echo json_encode(array("success" => true));
    } else {
        echo json_encode(array("success" => false));
    }
}
?>
