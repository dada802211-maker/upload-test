<?php
require_once './config/cors.php';
require_once './db/connection.php';

$id = $_POST['id'] ?? '';

$db = getDB();
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$stmt = $db->prepare("SELECT file_path FROM uploads WHERE id = :id");
$stmt->execute([':id' => $id]);
$file = $stmt->fetch();

if ($file) {
  $path = __DIR__ . '/uploads/zips/' . $file['file_path'];
  if (file_exists($path)) unlink($path);

  $stmt = $db->prepare("DELETE FROM uploads WHERE id = :id");
  $stmt->execute([':id' => $id]);
}

echo json_encode(['success' => true]);
