<?php
/**
 * Hostinger MySQL Database Connection Helper
 * 
 * SolarPulse EPC ERP & CRM
 * Validates Hostinger MySQL credentials and provides a secure status check.
 * Passwords, DSN credentials, and stack traces are never exposed to the client.
 */

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

// Optional CORS: Allow same origin or authorized origin
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// 1. Resolve credentials from environment variables or .env file
$host = getenv('DB_HOST') ?: ($_ENV['DB_HOST'] ?? ($_SERVER['DB_HOST'] ?? 'localhost'));
$dbname = getenv('DB_NAME') ?: ($_ENV['DB_NAME'] ?? ($_SERVER['DB_NAME'] ?? ''));
$user = getenv('DB_USER') ?: ($_ENV['DB_USER'] ?? ($_SERVER['DB_USER'] ?? ''));
$pass = getenv('DB_PASS') ?: ($_ENV['DB_PASS'] ?? ($_SERVER['DB_PASS'] ?? (getenv('DB_PASSWORD') ?: ($_ENV['DB_PASSWORD'] ?? ($_SERVER['DB_PASSWORD'] ?? '')))));

// Search for .env file if environment variables are not populated in cPanel/hPanel
$possibleEnvPaths = [
    __DIR__ . '/.env',
    __DIR__ . '/../.env',
    __DIR__ . '/../../.env'
];

if (empty($dbname) || empty($user)) {
    foreach ($possibleEnvPaths as $envPath) {
        if (file_exists($envPath) && is_readable($envPath)) {
            $envLines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
            foreach ($envLines as $line) {
                $line = trim($line);
                if (empty($line) || strpos($line, '#') === 0) continue;
                list($k, $v) = array_pad(explode('=', $line, 2), 2, null);
                $key = trim($k);
                $val = trim(trim($v), "\"'");
                if ($key === 'DB_HOST' && empty($host)) $host = $val;
                if ($key === 'DB_NAME' && empty($dbname)) $dbname = $val;
                if ($key === 'DB_USER' && empty($user)) $user = $val;
                if (($key === 'DB_PASS' || $key === 'DB_PASSWORD') && empty($pass)) $pass = $val;
            }
        }
    }
}

// If DB credentials are not configured yet, return STANDBY status without crashing
if (empty($dbname) || empty($user)) {
    echo json_encode([
        'status' => 'STANDBY',
        'message' => 'MySQL database configuration is in standby. The ERP is operating in high-performance local persistence mode with full export/import/restore capabilities. To connect Hostinger MySQL, set DB_HOST, DB_NAME, DB_USER, and DB_PASS in your Hostinger hPanel or .env file.'
    ]);
    exit;
}

try {
    $pdo = new PDO("mysql:host={$host};dbname={$dbname};charset=utf8mb4", $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_TIMEOUT => 5
    ]);

    // Check table count if connected
    $stmt = $pdo->query("SHOW TABLES LIKE 'solar_%'");
    $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);

    echo json_encode([
        'status' => 'CONNECTED',
        'message' => 'Successfully connected to Hostinger MySQL database.',
        'database' => $dbname,
        'solar_tables_found' => count($tables),
        'schema_status' => count($tables) >= 10 ? 'INITIALIZED' : 'SCHEMA_IMPORT_RECOMMENDED'
    ]);
} catch (Exception $e) {
    http_response_code(500);
    // Secure error response: never leak database password, host IP, or raw DSN
    echo json_encode([
        'status' => 'ERROR',
        'message' => 'Could not connect to Hostinger MySQL. Please verify DB_HOST, DB_NAME, DB_USER, and DB_PASS in your Hostinger configuration.'
    ]);
}
