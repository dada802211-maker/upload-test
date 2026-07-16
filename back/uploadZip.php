<?php
// session_start();

require_once './config/cors.php';
require_once './db/connection.php';

header("Content-Type: application/json");

// 認証チェック（必要なら）
// $userId = $_SESSION['user']['id'] ?? 'guest';

if (!isset($_FILES['zip'])) {
  http_response_code(400);
  echo json_encode(['error' => 'No file']);
  exit;
}

$file = $_FILES['zip'];

// 保存先
$uploadDir = __DIR__ . '/uploads/zips/';
if (!is_dir($uploadDir)) {
  mkdir($uploadDir, 0777, true);
}

// 一意なファイル名
$id = bin2hex(random_bytes(16));
$fileName = $id . '.zip';
$filePath = $uploadDir . $fileName;

// 保存
if (!move_uploaded_file($file['tmp_name'], $filePath)) {
  http_response_code(500);
  echo json_encode(['error' => 'Upload failed']);
  exit;
}

$db = getDB();
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
// DB保存
$stmt = $db->prepare("
  INSERT INTO uploads (id, user_id, file_name, file_path)
  VALUES (:id, :user_id, :file_name, :file_path)
");

$stmt->execute([
  ':id' => $id,
  ':file_name' => $file['name'],
  ':file_path' => $fileName
]);

echo json_encode([
  'success' => true,
  'id' => $id
]);
