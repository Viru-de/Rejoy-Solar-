<?php
/**
 * Hostinger MySQL Database Connection Helper (Optional)
 * 
 * Used if you choose to sync your Solar ERP data with Hostinger MySQL Database.
 */

header('Content-Type: application/json; charset=utf-8');

$host = getenv('DB_HOST') ?: 'localhost';
$dbname = getenv('DB_NAME') ?: '';
$user = getenv('DB_USER') ?: '';
$pass = getenv('DB_PASS') ?: (getenv('DB_PASSWORD') ?: '');

// Try reading from .env if variables not set
if (empty($dbname) && file_exists(__DIR__ . '/.env')) {
    $env = parse_ini_file(__DIR__ . '/.env');
    if ($env) {
        $host = $env['DB_HOST'] ?? $host;
        $dbname = $env['DB_NAME'] ?? $dbname;
        $user = $env['DB_USER'] ?? $user;
        $pass = $env['DB_PASS'] ?? ($env['DB_PASSWORD'] ?? $pass);
    }
}

if (empty($dbname) || empty($user)) {
    echo json_encode([
        'status' => 'STANDBY',
        'message' => 'Hostinger MySQL database configuration is optional. Solar ERP is operating in high-performance client storage mode with backup/export/import support. To connect MySQL, configure DB_HOST, DB_NAME, DB_USER, DB_PASSWORD in your Hostinger environment.'
    ]);
    exit;
}

try {
    $pdo = new PDO("mysql:host={$host};dbname={$dbname};charset=utf8mb4", $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
    echo json_encode([
        'status' => 'CONNECTED',
        'message' => 'Successfully connected to Hostinger MySQL database.',
        'database' => $dbname
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'ERROR',
        'message' => 'Database connection failed: ' . $e->getMessage()
    ]);
}
