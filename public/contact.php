<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';
require 'PHPMailer/Exception.php';

$data = json_decode(file_get_contents("php://input"), true);

$firstName = $data["firstName"] ?? '';
$lastName  = $data["lastName"] ?? '';
$email     = $data["email"] ?? '';
$message   = $data["message"] ?? '';

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host = 'smtp.office365.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'chrizelle.feliciano@virtualviewing.com';     // Your Outlook work email
    $mail->Password = 'YOUR_OUTLOOK_APP_PASSWORD'; // IMPORTANT!!
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;

    $mail->setFrom('chrizelle.feliciano@virtualviewing.com, 'MiHub Contact Form');
    $mail->addAddress('info@mihub.ai');

    $mail->Subject = "New Contact Form Message";
    $mail->Body = "
Name: $firstName $lastName
Email: $email

Message:
$message
";

    $mail->send();

    echo json_encode(["status" => "success"]);
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => $mail->ErrorInfo]);
}
