<?php
require_once './config/cors.php';
require_once './db/connection.php';

$db = getDB(); // ← ★これ追加！！
header("Content-Type: application/json");

$stmt = $db->query("
  SELECT id, file_name, file_path, created_at
  FROM uploads
  ORDER BY created_at DESC
");

$data = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($data);
