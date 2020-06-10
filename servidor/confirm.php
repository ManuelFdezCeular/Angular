<?php

if (!isset($_GET["codGen"])) {
	print '{"data":"Sin ID"}';
	return;
}
$cod = $_GET["codGen"];

if(($cod != null) && ($cod != "")) {
	
	//  NOS CONECTAMOS:
	try {
		$opciones = array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8");
		$pdo = new PDO('mysql:host=localhost;dbname=redFenomenosParanormales', 'root', '', $opciones);
		$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);  
	} catch(Exception $e) {
		die($e->getMessage());
		$pdo = null;
		print "Error de conexión. Error: " . $e->getMessage();
	}
	
	if($pdo == null) {
		print "<br> No se ha podido conectar. ";
		return;
	}
	$id_usuario = -1;
	$email = "";
	
	//  Buscamos en la tabla: generar_clave. Para obtener el id_usuario
	try {
		$sc = "SELECT id_investigador, email, codigo FROM generar_clave WHERE codigo = ?";
		$stm = $pdo->prepare($sc);
		$stm->execute(array($cod));
		if ($stm->rowCount() == 1) {
			$fila = $stm->fetch(PDO::FETCH_ASSOC);
			if ($fila["codigo"] == $cod) {
				$id_usuario = $fila["id_investigador"];
				$email = $fila["email"];
			}
		}
	} catch (Exception $e) {
		die($e->getMessage());
		print 'Error búsqueda. Error: ' . $e->getMessage();
	}
	
	if (($id_usuario == -1) || ($email == "")){
		print "Código asociado no encontrado.";
		return;
	}
	

	//  Actualizamos al usuario con esa nueva clave:
	$cambiada = false;
	try {
		$sql = "UPDATE investigadores SET verificado = 1 WHERE id = ?";
		$pdo->prepare($sql)->execute(array($id_usuario));
		$cambiada = true;
	} catch (Exception $e) {
		die($e->getMessage());
		print 'Error update. Error: ' . $e->getMessage();
	}
	
	//  Si todo ha ido bien, borramos el registro. YA NO NOS SIRVE.
	if ($cambiada) {
		try {
			$sql = "DELETE from generar_clave WHERE id_investigador = ?";
			$pdo->prepare($sql)->execute(array($id_usuario));
		} catch (Exception $e) {
			die($e->getMessage());
		}
	}
	
	$cuerpoHTML = ' 
		<html> 
		<head> 
			<meta charset="utf-8">
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<title>Correo confirmado</title> 
		</head> 
		<body> 
			<h1 style:"text-align: center; color: maroon">Fenomenos Para Normales</h1> 
			<h3>Dirección de correo confirmada</h3>
			<p>
				Su dirección de correo electrónico ha sido confirmada.
			</p>
			<p style="color: blue;">
				Que pase un buen día.
			</p>
		</body> 
		</html> 
		';
	
	print $cuerpoHTML;
	   
} else {
	print 'NO DATA';
}  // if(($cod != null) && ($cod != ""))

	
?>