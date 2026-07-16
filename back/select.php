<?php
require_once './config/cors.php';
require_once './db/connection.php';

header("Content-Type: application/json");
$db = getDB();
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$stmt = $db->prepare("
  SELECT id, file_name, file_path, created_at
  FROM uploads
  ORDER BY created_at DESC;
");
$stmt->execute();
