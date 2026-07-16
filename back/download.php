<?php
$file = $_GET['file'] ?? '';
$name = $_GET['name'] ?? 'download.zip';

$path = __DIR__ . '/uploads/zips/' . $file;

if (!file_exists($path)) {
  http_response_code(404);
  exit;
}

header('Content-Type: application/octet-stream');
header('Content-Disposition: attachment; filename="' . basename($name) . '"');
header('Content-Length: ' . filesize($path));

readfile($path);
exit;
