<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');  //  Todo se devolverá en formato JSON.

//  Para poder hacer uso de la clase jwt:
require_once 'jwt.php';

$login = new BD_login();


//  Con esta línea recogemos los datos (en formato JSON), enviados por el cliente:
$datos = file_get_contents('php://input');  //  $datos es un string, y no un objeto php
//  Lo convertimos a un objeto php:
$objeto=json_decode($datos);

// print "<br>Datos: " . $datos;
// return;


// $objeto = new \stdClass;
// $objeto->servicio = "inicio_sesion";


if($objeto != null) {
    switch($objeto->servicio) {
			
			case "Comprobar_email":
				print ($login->comprobar_email($objeto->email));
				break;
				
			case "inicio_sesion":
				print ($login->inicio_sesion($objeto));
				break;

			case "enviarCorreoRecuperarClave":
				print ($login->enviarCorreoRecuperarClave($objeto));
				break;
				
    }
} else
	print '{"data":"Sin datos"}';



class BD_login {

	private $pdo;
	private $claveSecreta = 'Ciao bella ciao';

	public function __CONSTRUCT() {
		try {
			$opciones = array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8");
			$this->pdo = new PDO('mysql:host=localhost;dbname=redfenomenosparanormales', 'root', '', $opciones);
			$this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);                
		} catch(Exception $e) {
				die($e->getMessage());
		}
	}


//  TABLA USUARIOS:
	public function comprobar_email($email){
		try {
			$sc = "SELECT id FROM investigadores WHERE email = ?";
			$stm = $this->pdo->prepare($sc);
			$stm->execute(array($email));
			if ($stm->rowCount() == 0)
				return '{"estado":"libre"}';
			else
				return '{"estado":"ocupado"}';
		} catch (Exception $e) {
			die($e->getMessage());
		}
	}
	
	public function inicio_sesion($datos){
		//  Instanciamos un objeto de la clase jwt:
		$jwt = new jwt();
		$dur = 4; // Ponemos una duración del token de 1 hora.
	//	$dur = 0.50; // Ponemos una duración del token de media hora.
	//	$dur = 0.5/60; // Ponemos una duración del token de 1 minuto.
		
		$claveSecreta = 'Ciao bella ciao';
		try {
			$sc = "SELECT * FROM investigadores WHERE email = ?";
			$stm = $this->pdo->prepare($sc);
			$stm->execute(array($datos->email));
			if ($stm->rowCount() == 1) {
				$fila = $stm->fetch(PDO::FETCH_ASSOC);	
				if (($fila["email"] == $datos->email) && ($fila["clave"] == $datos->clave)) {
					//  Todo bien. Creamos el JWT:
					$miToken = $jwt->generarJWT($fila["id"], $fila["nombre"].$fila["apellidos"], $dur, $claveSecreta);
					//  Devolvemos los datos al cliente:
					return '{"id":' . $fila["id"] . ', 
						"nombre":"' . $fila["nombre"] . '", "apellidos":"' . $fila["apellidos"] . '", 
						"verificado":"' . $fila["verificado"] . '",
						"JWT":"' . $miToken . '"}';
				}	else
						return '{"estado":"NO"}';
			} else {
				return '{"estado":"NO"}';
			}
		} catch (Exception $e) {
			die($e->getMessage());
		}
	}

	public function generarCadenaRandom($length = 10) { 
		$cadena = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
		return substr(str_shuffle($cadena), 0, $length); 
	}

	//  PARA RECUPERAR LA CONTRASEÑA:
	
	public function enviarCorreoRecuperarClave($datos){
		//  Generamos un parámetro-código aleatorio:
		
		$url_enlace = "http://localhost/AJAX/ServidorProyectoIntegrado/recuperarPWD.php?codGen=";
		
		$cod = getdate()[0] . $this->generarCadenaRandom(15);
		
		$url_enlace .= $cod;
		$id_usuario = -1;
		
		//  Obtener el id del usuario según su correo:
		try {
			$sc = "SELECT id, email FROM investigadores WHERE email = ?";
			$stm = $this->pdo->prepare($sc);
			$stm->execute(array($datos->email));
			if ($stm->rowCount() == 1) {
				$fila = $stm->fetch(PDO::FETCH_ASSOC);
				if ($fila["email"] == $datos->email) {
					$id_usuario = $fila["id"];
				}
			}
		} catch (Exception $e) {
			die($e->getMessage());
			return '{"correo":"ERROR BUSCAR"}';
		} 
		
		if ($id_usuario == -1)
			return '{"correo":"ERROR BUSCAR"}';
		
		//  Insertar en la tabla: generar_clave
		try {
			$sql = "INSERT INTO generar_clave(id_investigador, email, codigo) VALUES (?, ?, ?)";
			$this->pdo->prepare($sql)->execute(array($id_usuario, $datos->email, $cod));
		} catch (Exception $e) {
				die($e->getMessage());
				return '{"correo":"ERROR INSERTAR"}';
		}
		
		//  Creamos el mensaje:
		$destinatario = $datos->email;
		$asunto = "Reestablecer contaseña"; 
		$cuerpo = ' 
		<html> 
		<head> 
			<meta charset="utf-8">
			<title>Reestablecer contraseña</title>
		</head> 
		<body> 
		<h1 style:"text-align: center;">Lista Personas</h1> 
		<h3>Reestablecer contraseña</h3> 
		<p>
		Para generar una nueva contraseña haga click en el siguiente enlace: <br>
		<a href="' . $url_enlace . '">GENERAR NUEVA CONTRASEÑA</a>
		</p>
		<p>
		<b>NOTA: </b>Si usted NO solicitó reestablecer su contraseña ignore este correo
		</p>
		</body> 
		</html>
		';
		
		return $this->enviarCorreoGMAIL($destinatario, $asunto, $cuerpo);
		
	}

	public function enviarCorreoGMAIL($destinatario, $asunto, $cuerpoHtml){
		
		require_once 'libphp-phpmailer/class.phpmailer.php';
		require_once 'libphp-phpmailer/class.smtp.php';
		
		$mail = new PHPMailer;
		
		$mail->isSMTP();
		$mail->SMTPDebug = 0;
		$mail->Host = 'smtp.gmail.com';
		$mail->Port = 587;  //  para tls.
		$mail->SMTPSecure = 'tls';
		$mail->SMTPAuth = true;
		
		$mail->Username = "manueljesus.fernandez@iesvelazquez.org";
		$mail->Password = "140211Mk";  //  Pon aquí la clave de tu correo.
		
		$mail->SMTPOptions = array(
			'ssl' => array(
				'verify_peer' => false,
				'verify_peer_name' => false,
				'allow_self_signed' => true
			)
		);
		
		//  Para los acentos:
		$mail->CharSet = 'utf-8';
		$mail->setFrom('manueljesus.fernandez@iesvelazquez.org', 'Fenomenos Para Normales');
		$mail->addReplyTo('manueljesus.fernandez@iesvelazquez.org', 'Fenomenos Para Normales');
		$mail->addAddress($destinatario);
		$mail->isHTML(true);
		$mail->Subject = $asunto;
		$mail->Body    = $cuerpoHtml;
		
		try {
			$res = $mail->send();
			if ($res)
				return '{"correo":"enviado"}';
			else
				return '{"correo":"ERROR ENVIO", "info":"' . $destinatario . ' M '  . $mail->ErrorInfo . '"}';
		} catch(Exception $e) {
			return '{"correo":"ERROR ENVIO"}';
		}
		
	} 
} 
?>


