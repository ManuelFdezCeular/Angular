<?php

class ModeloPrivado {

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
	
	
	//  LISTAR Y OBTENER:

	public function ListarInvestigadores() {
		try {
			$query = "Select * from investigadores";
			$stm = $this->pdo->prepare($query);
			$stm->execute();
			return ($stm->fetchAll(PDO::FETCH_ASSOC));
		}catch(Exception $e){
			die($e->getMessage());
		}
	}

	public function ListarEstados(){
		try {
			$query = "Select * from estados";
			$stm = $this->pdo->prepare($query);
			$stm->execute();
			return ($stm->fetchAll(PDO::FETCH_ASSOC));
		}catch(Exception $e){
			die($e->getMessage());
		}
	}

	public function ListarArchivos(){
		try {
			$query = "Select a.id, a.investigador_id, a.explicacion, a.fechaArchivo, a.lugarArchivo, 
			inv.nombre, inv.apellidos from archivo a join investigadores inv on (a.investigador_id = inv.id)";
			$stm = $this->pdo->prepare($query);
			$stm->execute();
			return ($stm->fetchAll(PDO::FETCH_ASSOC));
		}catch(Exception $e){
			die($e->getMessage());
		}
	}

	public function ObtenerInvestigador($id){
		try {
			$query = "Select * from investigadores where id = ?";
			$stm = $this->pdo->prepare($query);
			$stm->execute(array($id));
			return ($stm->fetch(PDO::FETCH_OBJ));
		}catch(Exception $e){
			die($e->getMessage());
		}
	}

	public function ObtenerFenParInvestigador($id){
		try {
			$query = "Select fp.id, fp.investigador_id, fp.descripcion, fp.fechaOcurrencia, fp.lugarOcurrencia, fp.estado_id, 
			e.nombreEstado from fenomenosparanormales fp join estados e on (fp.estado_id = e.id) where fp.investigador_id = ?";
			$stm = $this->pdo->prepare($query);
			$stm->execute(array($id));
			return ($stm->fetchAll(PDO::FETCH_ASSOC));
		}catch(Exception $e){
			die($e->getMessage());
		}
	}

	public function ObtenerFenPar($id){
		try{
			$query = "Select * from fenomenosparanormales where id = ?";
			$stm = $this->pdo->prepare($query);
			$stm->execute(array($id));
			return ($stm->fetch(PDO::FETCH_OBJ));
		}catch(Exception $e){
			die($e->getMessage());
		}
	}

	//  AÑADIR (INSERTAR):
	
	public function AnadeInvestigador($investigador) {
		try {
			$query = "INSERT INTO investigadores (nombre, apellidos, clave, dni, telefono, email, residencia) 
							VALUES (?, ?, ?, ?, ?, ?, ?)";
			$this->pdo->prepare($query)->execute(array(
							$investigador->nombre, 
							$investigador->apellidos,
							$investigador->clave,
							$investigador->dni,
							$investigador->telefono,
							$investigador->email, 
							$investigador->residencia));
			return true;
		} catch (Exception $e) {
				die($e->getMessage());
				return false;
		}
	}
	
	public function AnadeFenomenoParanormal($fenPar) {
		try {
			$query = "INSERT INTO fenomenosparanormales (investigador_id, descripcion, fechaOcurrencia, lugarOcurrencia, provinciaOcurrencia, comunidadAutonoma, estado_id) 
							VALUES (?, ?, ?, ?, ?, ?, ?)";
			$this->pdo->prepare($query)->execute(array(
							$fenPar->investigador_id, 
							$fenPar->descripcion, 
							$fenPar->fechaOcurrencia,
                            $fenPar->lugarOcurrencia,
                            $fenPar->provinciaOcurrencia,
							$fenPar->comunidadAutonoma,
							$fenPar->estado_id));
			return true;
		} catch (Exception $e) {
				die($e->getMessage());
				return false;
		}
	}
	
	//  BORRAR (ELIMINAR):
	
	public function BorrarInvestigador($id) {
		try {
			$stm = $this->pdo->prepare("DELETE FROM investigadores WHERE id = ?");                      
            $stm->execute(array($id));
            return true;
		} catch(Exception $e) {
            die($e->getMessage());
            return false;
		}
	}

	public function ArchivarFenomenoParanormal($archivo) {
		try {
			$query = "INSERT INTO archivo (investigador_id, explicacion, fechaArchivo, lugarArchivo)
						VALUES (?, ?, ?, ?)";
			$stm = $this->pdo->prepare($query);
			$stm->execute(array(
				$archivo->investigador_id, 
				$archivo->explicacion,
				$archivo->fechaArchivo,
				$archivo->lugarArchivo));
			return true;
		} catch(Exception $e) {
            die($e->getMessage());
			return false;
		}
	}
	
	public function BorrarFenPar($id) {
		try {
			$stm = $this->pdo->prepare("DELETE FROM fenomenosparanormales WHERE id = ?");                      
			$stm->execute(array($id));
			return true;
		} catch(Exception $e) {
			die($e->getMessage());
			return false;
		}
	}

	public function BorrarArchivo($id) {
		try {
			$stm = $this->pdo->prepare("DELETE FROM archivo WHERE id = ?");
			$stm->execute(array($id));
			return true;
		} catch(Exception $e) {
			die($e->getMessage());
			return false;
		}
	}
	
	//  MODIFICAR (ACTUALIZAR):
	
	
	public function ModificaInvestigador($investigador) {
		try {
			$query = "UPDATE investigadores SET 
									nombre = ?, 
									apellidos = ?,
									dni = ?,
									telefono = ?,
									email = ?,
									residencia = ?
							WHERE id = ?";	
			$this->pdo->prepare($query)->execute(array(
                            $investigador->nombre, 
							$investigador->apellidos,
							$investigador->dni,
							$investigador->telefono,
							$investigador->email, 
                            $investigador->residencia,
							$investigador->id));
			return true;
		} catch (Exception $e) {
			die($e->getMessage());
			return false;
		}
	}
	
	public function ModificaFenPar($fenPar) {
		try {
			$query = "UPDATE fenomenosparanormales SET 
									investigador_id	= ?, 
									descripcion = ?,
									fechaOcurrencia = ?, 
									lugarOcurrencia = ?,
                                    provinciaOcurrencia = ?,
                                    comunidadAutonoma = ?,
									estado_id = ?
							WHERE id = ?";
			$this->pdo->prepare($query)->execute(array(
                            $fenPar->investigador_id, 
                            $fenPar->descripcion, 
                            $fenPar->fechaOcurrencia,
                            $fenPar->lugarOcurrencia,
                            $fenPar->provinciaOcurrencia,
							$fenPar->comunidadAutonoma,
							$fenPar->estado_id,
							$fenPar->id));
			return true;
		} catch (Exception $e) {
			die($e->getMessage());
			return false;
		}
	}
}  //  class Modelo
?>

