<?php
include_once 'db_config.php';
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
class Task {
    private $conn;

    public function __construct() {
        $db = new DBConnection();
        $this->conn = $db->getConnection();
    }

    public function createTask($title, $description,$status) {
        $stmt = $this->conn->prepare("INSERT INTO task (title, description,status) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $title, $description,$status);
        $result = $stmt->execute();
        $stmt->close();
        return $result;
    }

    public function getTasks() {
        $tasks = [];
        $sql = "SELECT * FROM task";
        $result = $this->conn->query($sql);
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $tasks[] = $row;
            }
        }
        return $tasks;
    }

    public function getTask_id($id) {
        $sql = "SELECT * FROM task WHERE id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("i", $id);
        
        if (!$stmt->execute()) {
            return false;
        }
        
        $result = $stmt->get_result();
        $task = $result->fetch_assoc();
        
        $stmt->close();
        return $task;
    }
     
    public function updateTask($id, $title, $description,$status) {
        
        $stmt = $this->conn->prepare("UPDATE task SET title=?, description=?, status=?, updated_at=NOW() WHERE id=?");
        $stmt->bind_param("sssi", $title, $description,$status, $id);
        $result = $stmt->execute();
        $stmt->close();
        return $result;
    }
    
    public function deleteTask($id) {
        $stmt = $this->conn->prepare("DELETE FROM task WHERE id=?");
        $stmt->bind_param("i", $id);
        $result = $stmt->execute();
        $stmt->close();
        return $result;
    }
}
?>
