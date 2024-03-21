<?php
include_once 'Task.class.php';

$task = new Task();
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['id'])) {
        $id = $_GET['id'];
        $taskData = $task->getTask_id($id);
        echo json_encode($taskData);
    } else {
        echo json_encode(array("error" => "ID parameter is missing"));
    }
}
?>
