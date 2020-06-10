<?php

/*
echo "sha3-256: <br> " . hash('sha3-256' , '12345');
print "<br><br>";

echo "sha3-512: <br> " . hash('sha3-512' , '12345');
print "<br><br>";


echo "sha3-256 (base64): <br> " . base64_encode(hash('sha3-256' , '12345'));
print "<br><br>";

echo "sha3-512 (base64): <br> " . base64_encode(hash('sha3-512' , '12345'));
print "<br><br>";
return;
*/



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
	
	//  Buscamos en la tabla: generar_clave. Para obtener el id_investigador
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
	
	//  Generamos la nueva clave:
	$claveNueva = generarClave();
	
	$claveNueva_sha3_256 = base64_encode(hash('sha3-256' , $claveNueva));
	
	
	//  Actualizamos al usuario con esa nueva clave:
	$cambiada = false;
	try {
		$sql = "Update investigadores SET clave = ? Where id = ?";
		$pdo->prepare($sql)->execute(array($claveNueva_sha3_256, $id_usuario));
		$cambiada = true;
	} catch (Exception $e) {
		die($e->getMessage());
		print 'Error update. Error: ' . $e->getMessage();
	}
	
	//  Si todo ha ido bien, borramos el registro. YA NO NOS SIRVE.
	if ($cambiada) {
		try {
			$sql = "delete from generar_clave Where id_investigador = ?";
			$pdo->prepare($sql)->execute(array($id_usuario));
		} catch (Exception $e) {
			die($e->getMessage());
		}
	}
	//  Todo ha ido bien. Informamos de alguna manera al usuario:
	
	$cuerpoEmail = ' 
		<html> 
		<head> 
			<meta charset="utf-8">
			<title>Contraseña cambiada</title> 
		</head> 
		<body> 
		<h1 style:"text-align: center;">Fenómenos Para Normales</h1> 
		<h3>Su contraseña ha sido cambiada</h3>
		<p>
		Su nueva contraseña es: <b>' . $claveNueva . '<b> 
		</p>
		<p>
		<b>Puede volver a cambiar su contraseña entrando en su cuenta y accediendo a Modificar Datos dentro de su perfil </b>
		</p>
		</body> 
		</html> 
		';
		
	//  mandamos el correo:
//	$res = enviarCorreo($email, "Clave cambiada.", $cuerpoEmail);
	
	$res = enviarCorreoGMAIL($email, "Clave cambiada.", $cuerpoEmail);
		
	$cuerpoPag = ' 
		<html> 
		<head> 
			<meta charset="utf-8">
			<title>Contraseña cambiada</title> 
		</head> 
		<body> 
		<h1 style:"text-align: center;">Fenómenos Para Normales</h1> 
		<h3>Su contraseña ha sido cambiada</h3>
		<p>Se ha enviado un correo a ' . $email . ' con su nueva clave.
		</p>
		
		<p>
		<b>Puedes volver a cambiar tu contraseña en su cuenta y accediendo a Modificar Datos dentro de su perfil </b>
		</p>
		</body> 
		</html> 
		';
	
	print $cuerpoPag;
	
	   
} else {
	print 'NO DATA';
}  // if(($cod != null) && ($cod != ""))

function generarClave($length = 11) { 
	$cadena = "@#$%&/?-_0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return substr(str_shuffle($cadena), 0, $length); 
} 
	
	function enviarCorreoGMAIL($destinatario, $asunto, $cuerpoHtml){
		
		require_once 'libphp-phpmailer/class.phpmailer.php';
		require_once 'libphp-phpmailer/class.smtp.php';
		
		$mail = new PHPMailer;
		
		$aConfigEmail = parse_ini_file("config.ini", true)['email'];
		
		$mail->isSMTP();
		$mail->SMTPDebug = 0;
		$mail->Host = 'smtp.gmail.com';
		$mail->Port = 587;  //  para tls.
		$mail->SMTPSecure = 'tls';
		$mail->SMTPAuth = true;
		
		$mail->Username = $aConfigEmail['username'];
		$mail->Password = $aConfigEmail['password'];
		
		$mail->SMTPOptions = array(
			'ssl' => array(
				'verify_peer' => false,
				'verify_peer_name' => false,
				'allow_self_signed' => true
			)
		);
		
		//  Para los acentos:
		$mail->CharSet = 'utf-8';
		
		//Recipients
		$mail->setFrom($aConfigEmail['username'], 'Fenómenos Para Normales');
		$mail->addReplyTo($aConfigEmail['username'], 'Fenómenos Para Normales');
		$mail->addAddress($destinatario);
		
		//Content
		$mail->isHTML(true);  // Set email format to HTML
		$mail->Subject = $asunto;
		$mail->Body    = $cuerpoHtml;
	//	$mail->AltBody = $cuerpoTexto;
		
		try {
			$res = $mail->send();
			if ($res)
				return '{"correo":"enviado"}';
			else
				return '{"correo":"ERROR ENVIO"}';
			//	return '{"correo":"ERROR ENVIO", "info":"' . $destinatario . ' M '  . $mail->ErrorInfo . '"}';
		} catch(Exception $e) {
			$error = json_encode($e);
			return '{"correo":"ERROR ENVIO", "error":"' . $error . '"}';
		}
		
	}  //  function enviaCorreoGMAIL
	
	
	
	
?>
