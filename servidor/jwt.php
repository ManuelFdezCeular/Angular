<?php


class jwt {
	//  Le pasamos el ID del usuario, su nombre, y la duración (en horas):
	//  (si queremos que la duración sean minutos, le pasaremos una fracción,	
	//   esto es, 0.5 serán 30 minutos, 0.0166666666666667 será 1 minuto, 
	//   (0.0166666666666667 / 60) * 5 serán 5 segundos)
	public function generarJWT($id, $nombre, $duracion, $claveSecreta){
		 // Creamos el array cabecera: Codificamos (en base64) la cabecera (header) en json:
		$aCabecera = array('alg' => 'HS256', 'typ' => 'JWT');
		
		//  Codificamos (en base64) la cabecera (header) en json:
		$cabecera = base64_encode(json_encode($aCabecera));

		// Codificamos (en base64) el cuerpo (payload) y en json:
		$cuerpo = base64_encode(json_encode(array(
				'iat' => time(), // Tiempo que se inicia el token
				'exp' => time() + ($duracion * (60*60)), // Tiempo que expirará el token
				'datos' => [ // información del usuario
						'id' => $id,
						'nombre' => $nombre
				]
		)));

		// Concatenamos la cabecera y el cuerpo:
		$cabecera_cuerpo = $cabecera . '.' . $cuerpo;

		// Creamos la firma, un hash con el algoritmo s256 y la clave secreta. La firma también está codificada en base64:
		$firma = base64_encode(hash_hmac('sha256', $cabecera_cuerpo, $claveSecreta, true));

		// Devolvemos el JWT (concatenando la cabecera y cuerpo y la firma):
		return($cabecera_cuerpo . '.' . $firma);
		
	}  //  function generarJWT
	
	
	
	public function validarJWT($token, $claveSecreta){
		// Sacamos las diferentes partes del JWT: 
		$parte = explode('.', $token);
		
		//  Vemos si el formato del token es correcto:
		if (count($parte) == 3) {

			// Extraemos la firma del JWT (para, posteriormente, compararla y ver si el JWT es válido):
			$firmaRecibida = $parte[2];

			// Concatenamos los 2 primeros argumentos del JWT, el header (cabecera) y el payload (cuerpo):
			$cabecera_cuerpoRecibido = $parte[0] . '.' . $parte[1];

			// Creamos la nueva firma a partir de la cabecera (header) y el cuerpo (playload) mediante el método HMAC:
			$firmaCreada = base64_encode(hash_hmac('sha256', $cabecera_cuerpoRecibido, $claveSecreta, true));
			
			//  Obtenemos los datos recibidos del cuerpo (playload) del JWT:
			$datos = json_decode(base64_decode($parte[1]));
			if ($datos)
				$datos = $datos->datos;
			
			//  Obtenemos la fecha de caducidad:
			$exp = json_decode(base64_decode($parte[1]));
			if ($exp)
				$exp = $exp->exp;
			
			$info = "";
			if ($firmaCreada != $firmaRecibida)
				$info = "Token invalido";
			else 
				if (time() > $exp)
					$info = "Tiempo expirado"; 
			
			$valido = (($firmaCreada == $firmaRecibida) && (time() <= $exp));
		
		} else {
			$valido = false;
			$info = "Token invalido. ";
			$datos = null;
		}
	
		$res = new \stdClass;
		$res->valido = $valido;
		$res->info = $info;
		$res->datos = $datos;
		
		return $res;
	}  //  function validarJWT
	
	
	
	
	// Obtener la autorización del header. Authorization Bearer
	 
	function getAuthorizationHeader(){
			$headers = null;
			if (isset($_SERVER['Authorization'])) {
					$headers = trim($_SERVER["Authorization"]);
			}
			else 
				if (isset($_SERVER['HTTP_AUTHORIZATION'])) { //Nginx or fast CGI
					$headers = trim($_SERVER["HTTP_AUTHORIZATION"]);
			} else 
				if (function_exists('apache_request_headers')) {
					$requestHeaders = apache_request_headers();
					// Server-side fix for bug in old Android versions (a nice side-effect of this fix means we don't care about capitalization for Authorization)
					$requestHeaders = array_combine(array_map('ucwords', array_keys($requestHeaders)), array_values($requestHeaders));
					//print_r($requestHeaders);
					if (isset($requestHeaders['Authorization'])) {
							$headers = trim($requestHeaders['Authorization']);
					}
			}
			return $headers;
	}
	
	// Obtener el token del header:
	public function getBearerToken() {
			$headers = $this->getAuthorizationHeader();
			// HEADER: Get the access token from the header
			if (!empty($headers)) {
					if (preg_match('/Bearer\s(\S+)/', $headers, $matches)) {
							return $matches[1];
					}
			}
			return null;
	}

	

}  //  class jwt

	
?>


