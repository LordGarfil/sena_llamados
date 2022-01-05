<?php

function catchErrors($message)
{
  $error = array([
    'error' => 'true',
    'message' => $message
  ]);
  return $error[0];
}

function answer_json($data){
  header('Content-Type: application/json');
  print(json_encode($data, JSON_PRETTY_PRINT));
}