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
			case "Investigadores": 
				print json_encode($modelo->ListarInvestigadores());
				break;
				
			case "FenomenosParanormales": 
				print json_encode($modelo->ListarFenomenosParanormales());
				break;
				
			case "Investigador":
				print json_encode($modelo->ObtenerInvestigador($objeto->id));
				break;
				
			case "FenParInvestigador":
				print json_encode($modelo->ObtenerFenParInvestigador($objeto->id));
				break;	
			
			case "AnadirInvestigador":  
				print json_encode($modelo->AnadeInvestigador($objeto));
				break;
				
			case "AnadirFenPar":  
				print json_encode($modelo->AnadeFenomenoParanormal($objeto));
				break;
				
			case "BorrarInvestigador":  
				print json_encode($modelo->BorraInvestigador($objeto->id));
				break;	
				
			case "BorrarFenPar":  
				print json_encode($modelo->BorraFenPar($objeto->id));
				break;	
				
			case "ModificarInvestigador": 
				print json_encode($modelo->ModificaInvestigador($objeto->id));
				break;
					
			case "ModificaFenPar": 
				print json_encode($modelo->ModificaFenPar($objeto->id));
				break;
    }  //  switch($objeto->accion)
}  //  if($objeto != null)
?>
