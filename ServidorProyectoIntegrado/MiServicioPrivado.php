<?php

header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

/*
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');  //  Todo se devolverá en formato JSON.
*/

require_once 'jwt.php';
$jwt = new jwt();
$claveSecreta = 'Ciao bella ciao';

//  Vamos a comprobar el JWT:
//  Obtenemos el JWT que nos ha debido de pasar el cliente (en la cabecera):
$token = $jwt->getBearerToken();
if (($token == null) || ($token == "")) {
	//  Devuelve información indicando que la sesión NO está creada:
	print '{"sesion":"NO"}';
	//  Finaliza la ejecución:
  return;
}

$tokenValido = $jwt->validarJWT($token, $claveSecreta);
// var_dump($tokenValido);

if (!$tokenValido->valido) {
	//  Devuelve información indicando que la sesión NO está creada:
	print '{"sesion":"NO"}';
	//  Finaliza la ejecución:
  return;
}


/*
	****************************************************************************

  ¡¡¡¡¡ SI LLEGAMOS AQUI ES PORQUE EL TOKEN ES VALIDO Y NO HA EXPIRADO !!!!

	****************************************************************************

require_once 'MiModelo.php';
$modelo = new ModeloPrivado();

$datos = file_get_contents('php://input'); 
$objeto = json_decode($datos);

if($objeto != null) {
    switch($objeto->accion) {
			case "Investigadores": 
				print json_encode($modelo->ListarInvestigadores());
				break;

			case "Estados":
				print json_encode($modelo->ListarEstados());
				break;
			
			case "Archivos":
				print json_encode($modelo->ListarArchivos());
				break;
				
			case "Investigador":
				print json_encode($modelo->ObtenerInvestigador($objeto->id));
				break;
				
			case "FenParInvestigador":
				print json_encode($modelo->ObtenerFenParInvestigador($objeto->id));
				break;	

			case "FenomenoParanormal":
				print json_encode($modelo->ObtenerFenPar($objeto->id));
				break;
			
			case "AnadirInvestigador":  
				print json_encode($modelo->AnadeInvestigador($objeto->investigador));
				break;
				
			case "AnadirFenPar":  
				print json_encode($modelo->AnadeFenomenoParanormal($objeto->fenomenoParanormal));
				break;
				
			case "BorrarInvestigador":  
				print json_encode($modelo->BorrarInvestigador($objeto->id));
				break;	
				
			case "BorrarFenPar":  
				print json_encode($modelo->BorrarFenPar($objeto->id));
				break;	
			
			case "BorrarArchivo":
				print json_encode($modelo->BorrarArchivo($objeto->id));
				break;

			case "ArchivarFenPar":
				print json_encode($modelo->ArchivarFenomenoParanormal($objeto->archivo));
				break;
				
			case "ModificarInvestigador": 
				print json_encode($modelo->ModificaInvestigador($objeto->investigador));
				break;
					
			case "ModificaFenPar": 
				print json_encode($modelo->ModificaFenPar($objeto->fenomenoParanormal));
				break;
    }  //  switch($objeto->accion)
}  //  if($objeto != null)
?>