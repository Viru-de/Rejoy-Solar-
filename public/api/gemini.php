<?php
/**
 * Hostinger Production Gemini API Proxy Endpoint
 * 
 * Securely calls Google Gemini Generative Language API from Hostinger server-side.
 * The GEMINI_API_KEY remains strictly hidden on the server and is never sent to the browser.
 */

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

// Optional CORS support
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    }
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    }
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed. Only POST is accepted.']);
    exit;
}

// 1. Resolve GEMINI_API_KEY from environment or .env file
$apiKey = getenv('GEMINI_API_KEY');

if (!$apiKey && file_exists(__DIR__ . '/.env')) {
    $envLines = file(__DIR__ . '/.env', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($envLines as $line) {
        if (strpos(trim($line), '#') === 0) continue;
        list($k, $v) = array_pad(explode('=', $line, 2), 2, null);
        if (trim($k) === 'GEMINI_API_KEY') {
            $apiKey = trim(trim($v), "\"'");
            break;
        }
    }
}

// Check parent folder for .env if placed in public_html root or above
if (!$apiKey && file_exists(__DIR__ . '/../.env')) {
    $envLines = file(__DIR__ . '/../.env', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($envLines as $line) {
        if (strpos(trim($line), '#') === 0) continue;
        list($k, $v) = array_pad(explode('=', $line, 2), 2, null);
        if (trim($k) === 'GEMINI_API_KEY') {
            $apiKey = trim(trim($v), "\"'");
            break;
        }
    }
}

if (!$apiKey) {
    http_response_code(503);
    echo json_encode([
        'error' => 'GEMINI_API_KEY is not configured on the Hostinger server.',
        'help' => 'Set GEMINI_API_KEY in your Hostinger cPanel/hPanel environment variables or create a .env file in public_html with GEMINI_API_KEY=your_key.'
    ]);
    exit;
}

// 2. Parse incoming JSON body
$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!$data || empty($data['prompt'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing "prompt" field in request payload.']);
    exit;
}

$prompt = $data['prompt'];
$systemInstruction = $data['systemInstruction'] ?? 'You are an expert Solar EPC and CRM AI assistant.';
$model = $data['model'] ?? 'gemini-1.5-flash';

// 3. Prepare payload for Google Gemini API
$geminiUrl = "https://generativelanguage.googleapis.com/v1beta/models/{$model}:generateContent?key=" . urlencode($apiKey);

$payload = [
    'contents' => [
        [
            'role' => 'user',
            'parts' => [
                ['text' => $prompt]
            ]
        ]
    ],
    'generationConfig' => [
        'temperature' => 0.7,
        'maxOutputTokens' => 1500
    ]
];

if (!empty($systemInstruction)) {
    $payload['systemInstruction'] = [
        'parts' => [
            ['text' => $systemInstruction]
        ]
    ];
}

// 4. Send request via cURL
$ch = curl_init($geminiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json'
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

if ($curlError) {
    http_response_code(502);
    echo json_encode(['error' => 'cURL error communicating with Gemini API: ' . $curlError]);
    exit;
}

http_response_code($httpCode);
echo $response;
