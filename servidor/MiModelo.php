<?php

class Modelo {

	private $pdo;

	public function __CONSTRUCT() {
		try {
			$opciones = array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8");
			$this->pdo = new PDO('mysql:host=localhost;dbname=redFenomenosParanormales', 'root', '', $opciones);
			$this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);                
		} catch(Exception $e) {
				die($e->getMessage());
		}
	}

	public function ListarFenomenosParanormales(){
		try {
			$query = "SELECT * FROM fenomenosparanormales";
			$stm = $this->pdo->prepare($query);
			$stm->execute();
			return ($stm->fetchAll(PDO::FETCH_ASSOC));
		}catch(Exception $e){
			die($e->getMessage());
		}
	}

	public function AnadeInvestigador($investigador) {
		try {
			$query = "INSERT INTO investigadores (nombre, apellidos, clave, dni, telefono, email, residencia, imagen) 
							VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
			$this->pdo->prepare($query)->execute(array(
							$investigador->nombre, 
							$investigador->apellidos,
							$investigador->clave,
							$investigador->dni,
							$investigador->telefono,
							$investigador->email, 
							$investigador->residencia,
							$investigador->imagen));

				//  Obtenemos el id que le ha dado al usuario:
			$id_usuario = $this->pdo->lastInsertId();

			//  Generamos la entrada en la tabla generar_clave:
			//  Primero el código:
			$cod = getdate()[0] . $id_usuario . $this->generarCadenaRandom(15);
			
			//  Insertar en la tabla: generar_clave
			try {
				$sql = "INSERT INTO generar_clave(id_investigador, email, codigo) VALUES (?, ?, ?)";
				$this->pdo->prepare($sql)->execute(array($id_usuario, $investigador->email, $cod));
			} catch (Exception $e) {
					die($e->getMessage());
					return '{"correo":"ERROR INSERTAR", "id_investigador": "' . $id_usuario . '"}';
			}
			
			//  Enviar el correo para confirmar clave:
			return $this->enviarCorreoConfirmar_email($cod, $investigador->email);
		} catch (Exception $e) {
				die($e->getMessage());
				return false;
		}
	}

	public function FiltrarFenomenosParanormales($lugar, $provincia, $comunidad){
		try {
			$query = "SELECT * FROM fenomenosparanormales
						WHERE lugarOcurrencia LIKE :lugar 
							AND provinciaOcurrencia LIKE :provincia 
							AND comunidadAutonoma LIKE :comunidad";
			$stm = $this->pdo->prepare($query);
			$stm->execute(array(
				':lugar' => '%' . $lugar . '%',
				':provincia' => '%' . $provincia . '%',
				':comunidad' => '%' . $comunidad . '%'
			));
			return ($stm->fetchAll(PDO::FETCH_ASSOC));
		}catch(Exception $e){
			die($e->getMessage());
		}
	}

	public function ListarComunidades(){
		try {
			$query = "SELECT * FROM comunidades";
			$stm = $this->pdo->prepare($query);
			$stm->execute();

			return ($stm->fetchAll(PDO::FETCH_ASSOC));
		}catch(Exception $e){
			die($e->getMessage());
		}
	}

	public function ListarProvinciasPorComunidad($codigoComunidad){
		try {
			$query = "SELECT * FROM provincias 
						WHERE codigo_comunidad = ?";
			$stm = $this->pdo->prepare($query);
			$stm->execute(array($codigoComunidad));

			return ($stm->fetchAll(PDO::FETCH_ASSOC));
		}catch(Exception $e){
			die($e->getMessage());
		}
	}

	public function ListarLocalidadesPorProvincia($codigoProvincia){
		try {
			$query = "SELECT * FROM localidades 
						WHERE codigo_provincia = ?";
			$stm = $this->pdo->prepare($query);
			$stm->execute(array($codigoProvincia));

			return ($stm->fetchAll(PDO::FETCH_ASSOC));
		}catch(Exception $e){
			die($e->getMessage());
		}
	}

	/*
	
		PARA INSERTAR USUARIO Y MANDARLE UN CORREO PARA QUE CONFIRME SU EMAIL:
	
	*/
	
	// Generar código aleatorio con número de fecha-hora-minutos-segundos 
	public function generarCadenaRandom($length = 10) { 
		$cadena = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
		return substr(str_shuffle($cadena), 0, $length); 
	}
	
	public function enviarCorreoConfirmar_email($cod, $email) {
		
		//  Creamos el link para confirmar:
		$url_enlace = 'http://'.$_SERVER['HTTP_HOST'].dirname($_SERVER['PHP_SELF']);
		$url_enlace .= '/confirm.php?codGen=';
		$url_enlace .= $cod;

		//  Creamos el mensaje:
			$asunto = "Confirmar correo"; 
			$cuerpo = ' 
			<html> 
			<head> 
				<meta charset="utf-8">
				<meta name="viewport" content="width=device-width, initial-scale=1">
				<title>Confirmar correo</title>
			</head>
			<body> 
			<h1 style:"text-align: center; color: red">Fenómenos Para Normales</h1> 
			<h3>Confirmación de correo</h3> 
			<p>
			Para confirmar su correo haga click en el siguiente enlace: 
			<a href="' . $url_enlace . '">confirmar email</a>
			</p>
			<p>
			<b style:"color: blue">Si usted NO solicitó el alta en Fenómenos Para Normales ignore este correo</b>
			</p>
			</body> 
			</html>
			';
					
			return $this->enviarCorreoGMAIL($email, $asunto, $cuerpo);
			
		
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
} //  class Modelo
?>

