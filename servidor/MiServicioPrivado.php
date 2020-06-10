<?php

header("Access-Control-Allow-Origin: *"); // allow request from all origin
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Methods: GET,HEAD,OPTIONS,POST,PUT");
header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, Authorization");

header('Content-Type: application/json');  //  Todo se devolverá en formato JSON.

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
*/
//  Definimos la variable global $idUsuairo:
$idUsuairo = $tokenValido->datos->id;

require_once 'MiModeloPrivado.php';
$modelo = new ModeloPrivado();

$datos = file_get_contents('php://input'); 
$objeto = json_decode($datos);

if($objeto != null) {
    switch($objeto->accion) {
			case "Investigadores": 
				print json_encode($modelo->ListarInvestigadores());
				break;
			
			case "Filtrar":
				print json_encode($modelo->FiltrarInvestigadores($objeto->nombre, $objeto->residencia));
				break;
			
			case "FiltrarArchivo":
				print json_encode($modelo->FiltrarArchivo($objeto->nombre, $objeto->lugar));
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
				
			case "AnadirFenPar":  
				print json_encode($modelo->AnadeFenomenoParanormal($objeto->fenomenoParanormal));
				break;
				
			case "BorrarInvestigador":  
				$resultado = ($modelo->BorrarInvestigador($objeto->id));
				if($resultado)
					print '{"borrado":"correcto"}';
				else
					print '{"borrado":"incorrecto"}';
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
				if($modelo->ModificaInvestigador($objeto->investigador))
					print '{"modificado":"correcto"}';
				else
					print '{"modificado":"incorrecto"}';
				break;
					
			case "ModificaFenPar": 
				if($modelo->ModificaFenPar($objeto->fenomenoParanormal))
					print '{"modificado":"correcto"}';
				else
					print '{"modificado":"incorrecto"}';
				break;

			case "ModificarDatosLogin":
				print json_encode($modelo->ModificarDatosLogin($objeto->clave, $objeto->email, $idUsuairo));
				break;
				
			default: 
				print '{"accion": "NO"}';
    }  //  switch($objeto->accion)
}  //  if($objeto != null)
