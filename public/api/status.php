<?php
/**
 * Hostinger Health & Production Status Endpoint
 */

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

$response = [
    'status' => 'ONLINE',
    'app' => 'SolarPulse EPC ERP & CRM',
    'version' => '1.0.0',
    'environment' => 'Hostinger Production',
    'php_version' => PHP_VERSION,
    'server_time' => date('c'),
    'features' => [
        'spa_routing' => true,
        'client_persistence' => 'localStorage / JSON sync',
        'gemini_proxy' => file_exists(__DIR__ . '/gemini.php'),
        'database_helper' => file_exists(__DIR__ . '/db.php')
    ]
];

echo json_encode($response, JSON_PRETTY_PRINT);
