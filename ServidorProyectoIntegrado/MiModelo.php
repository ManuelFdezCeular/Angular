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
	
	
	//  LISTAR Y OBTENER:

	public function ListarInvestigadores() {
		try {
			$query = "Select nombre, apellidos, residencia from investigadores";
			$stm = $this->pdo->prepare($query);
			$stm->execute();
			return ($stm->fetchAll(PDO::FETCH_ASSOC));
		}catch(Exception $e){
			die($e->getMessage());
		}
	}

	public function ListarFenomenosParanormales(){
		try {
			$query = "Select descripcion, fechaOcurrencia, lugarOcurrencia from fenomenosparanormales";
			$stm = $this->pdo->prepare($query);
			$stm->execute();
			return ($stm->fetchAll(PDO::FETCH_ASSOC));
		}catch(Exception $e){
			die($e->getMessage());
		}
	}

	public function ObtenerInvestigador($id){
		try {
			$query = "Select inv.id, inv.nombre, inv.apellidos, inv.residencia from investigadores inv join fenomenosparanormales fP on(inv.id = fP.investigador_id) where inv.id = ?";
			$stm = $this->pdo->prepare($query);
			$stm->execute();
			return ($stm->fetchAll(PDO::FETCH_ASSOC));
		}catch(Exception $e){
			die($e->getMessage());
		}
	}

	public function ObtenerFenParInvestigador($id){
		try {
			$query = "Select fP.id, fP.descripcion, fP.fechaOcurrencia, fP.lugarOcurrencia from fenomenosparanormales fP join investigadores inv on(fP.investigador_id = inv.id) where fP.investigador_id = ?";
			$stm = $this->pdo->prepare($query);
			$stm->execute();
			return ($stm->fetchAll(PDO::FETCH_ASSOC));
		}catch(Exception $e){
			die($e->getMessage());
		}
	}

	//  AÑADIR (INSERTAR):
	
	public function AnadeInvestigador($investigador) {
		try {
			$sql = "INSERT INTO investigadores (nombre, apellidos, residencia) 
							VALUES (?, ?, ?)";
			$this->pdo->prepare($sql)->execute(array(
							$investigador->nombre, 
							$investigador->apellidos, 
							$investigador->residencia));
			return true;
		} catch (Exception $e) {
				die($e->getMessage());
				return false;
		}
	}
	
	public function AnadeFenomenoParanormal($fenPar) {
		try {
			$sql = "INSERT INTO fenomenosparanormales (investigador_id, descripcion, fechaOcurrencia, lugarOcurrencia, provinciaOcurrencia, comunidadAutonoma) 
							VALUES (?, ?, ?, ?, ?, ?)";
			$this->pdo->prepare($sql)->execute(array(
							$fenPar->investigador_id, 
							$fenPar->descripcion, 
							$fenPar->fechaOcurrencia,
                            $fenPar->lugarOcurrencia,
                            $fenPar->provinciaOcurrencia,
                            $fenPar->comunidadAutonoma));
			return true;
		} catch (Exception $e) {
				die($e->getMessage());
				return false;
		}
	}
	
	//  BORRAR (ELIMINAR):
	
	public function BorraInvestigador($id) {
		try {
			$stm = $this->pdo->prepare("DELETE FROM investigadores WHERE id = ?");                      
            $stm->execute(array($id));
            return true;
		} catch(Exception $e) {
            die($e->getMessage());
            return false;
		}
	}
	
	public function BorraFenPar($id) {
		try {
			$stm = $this->pdo->prepare("DELETE FROM fenomenosparanormales WHERE id = ?");                      
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
			$sql = "UPDATE investigadores SET 
									nombre = ?, 
									apellidos = ?,
									residencia = ?
							WHERE id = ?";	
			$this->pdo->prepare($sql)->execute(array(
                            $investigador->nombre, 
                            $investigador->apellidos, 
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
			$sql = "UPDATE fenomenosparanormales SET 
									investigador_id	= ?, 
									descripcion = ?,
									fechaOcurrencia = ?, 
									lugarOcurrencia = ?,
                                    provinciaOcurrencia = ?,
                                    comunidadAutonoma = ?
							WHERE id = ?";
			$this->pdo->prepare($sql)->execute(array(
                            $fenPar->investigador_id, 
                            $fenPar->descripcion, 
                            $fenPar->fechaOcurrencia,
                            $fenPar->lugarOcurrencia,
                            $fenPar->provinciaOcurrencia,
                            $fenPar->comunidadAutonoma,
							$fenPar->id));
			return true;
		} catch (Exception $e) {
			die($e->getMessage());
			return false;
		}
	}
}  //  class Modelo
?>

