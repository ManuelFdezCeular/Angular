<?php

header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

/*
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');  //  Todo se devolverá en formato JSON.
*/

require_once 'MiModelo.php';
$modelo = new Modelo();

$datos = file_get_contents('php://input'); 
$objeto = json_decode($datos);

if($objeto != null) {
    switch($objeto->accion) {
			case "FenomenosParanormales": 
				print json_encode($modelo->ListarFenomenosParanormales());
				break;

			case "AnadirInvestigador":  
				print json_encode($modelo->AnadeInvestigador($objeto->investigador));
				break;
			
			case "FiltrarFenPar":
				print json_encode($modelo->FiltrarFenomenosParanormales($objeto->lugar, $objeto->provincia, $objeto->comunidad));
				break;
			
			case "ListarComunidades":
				print json_encode($modelo->ListarComunidades());
				break;

			case "ListarProvincias":
				print json_encode($modelo->ListarProvinciasPorComunidad($objeto->codigo));
				break;

			case "ListarLocalidades":
				print json_encode($modelo->ListarLocalidadesPorProvincia($objeto->codigo));
				break;
    }  //  switch($objeto->accion)
}  //  if($objeto != null)
?>