<?php

//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

function sendMail($data)
{
  //Load Composer's autoloader
  require '../../vendor/autoload.php';
  require_once("../functions.php");

  $data = json_decode($data);
  //Create an instance; passing `true` enables exceptions
  $mail = new PHPMailer(true);

  try {
    // $persona = getReceptor($data['persona_id']);
    // answer_json($persona);
    //Server settings
    $mail->isSMTP();                                            //Send using SMTP
    $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
    $mail->Username   = 'mailer.sena@gmail.com';                     //SMTP username
    $mail->Password   = 'mailer123';                               //SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
    $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

    //Recipients
    $mail->setFrom('mailer.sena@gmail.com', 'Mailer');
    $mail->addAddress($data->receptor, 'Joe User');     //Add a recipient


    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = $data->titulo;
    $mail->Body    = $data->mensaje;
    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
    $mail->send();
  } catch (Exception $e) {
    $error = new stdClass;
    $error->error = true;
    $error->message = $mail->ErrorInfo;
  }
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  sendMail(file_get_contents("php://input"));
}
