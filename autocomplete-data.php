<?php
header('Access-Control-Allow-Origin: *');
header("Content-type: text/json;charset=utf-8;");

$pathUrl = "http://www.rafaelfrazao.com.br/apps/autocomplete/img/";

$var[] = array(
	"id" => 10,
	"img" => $pathUrl."gates.jpg",
	"name" => "Bill Gates",
	"info" => "Microsoft"
);
$var[] = array(
	"id" => 20,
	"img" => $pathUrl."jobs.jpg",
	"name" => "Steve Jobs",
	"info" => "Apple"
);
$var[] = array(
	"id" => 30,
	"img" => $pathUrl."larry.jpg",
	"name" => "Larry Page",
	"info" => "Google"
);
$var[] = array(
	"id" => 40,
	"img" => $pathUrl."mark.jpg",
	"name" => "Mark Zuckerberg",
	"info" => "Facebook"
);
$var[] = array(
	"id" => 50,
	"img" => $pathUrl."robert.jpg",
	"name" => "Robert Downey Jr",
	"info" => "Iron Man"
);
$var[] = array(
	"id" => 60,
	"img" => $pathUrl."eike.jpg",
	"name" => "Eike Batista",
	"info" => "Falling"
);

echo json_encode($var);