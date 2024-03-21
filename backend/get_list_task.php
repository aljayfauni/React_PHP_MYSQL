<?php
include_once 'Task.class.php';

$task = new Task();
$tasks = $task->getTasks();

echo json_encode($tasks);
?>
