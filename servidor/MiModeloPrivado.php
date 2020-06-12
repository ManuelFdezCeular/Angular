<?php

class ModeloPrivado
{

	private $pdo;

	public function __CONSTRUCT()
	{
		try {
			$opciones = array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8");
			$this->pdo = new PDO('mysql:host=localhost;dbname=redFenomenosParanormales', 'root', '', $opciones);
			$this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		} catch (Exception $e) {
			die($e->getMessage());
		}
	}


	//  LISTAR Y OBTENER:

	public function ListarInvestigadores()
	{
		try {
			$query = "SELECT * FROM investigadores";
			$stm = $this->pdo->prepare($query);
			$stm->execute();
			return ($stm->fetchAll(PDO::FETCH_ASSOC));
		} catch (Exception $e) {
			die($e->getMessage());
		}
	}

	public function FiltrarInvestigadores($nombre, $residencia)
	{
		try {
			$query = "SELECT * FROM investigadores
						WHERE (CONCAT(nombre, ' ', apellidos) LIKE :search) 
						AND (residencia LIKE :residencia)";

			$stm = $this->pdo->prepare($query);
			$stm->execute(array(
				':search' => '%' . $nombre . '%',
				':residencia' => '%' . $residencia . '%'
			));
			return ($stm->fetchAll(PDO::FETCH_ASSOC));
		} catch (Exception $e) {
			die($e->getMessage());
		}
	}

	public function FiltrarArchivo($nombre, $lugar)
	{
		try {
			$query = "SELECT a.id, a.investigador_id, a.explicacion, a.fechaArchivo, a.lugarArchivo, 
			inv.nombre, inv.apellidos FROM archivo a 
						JOIN investigadores inv 
						ON (a.investigador_id = inv.id) 
						WHERE (CONCAT(inv.nombre, ' ', inv.apellidos) LIKE :search) 
						AND (a.lugarArchivo LIKE :lugar)";
			$stm = $this->pdo->prepare($query);
			$stm->execute(array(
				':search' => '%' . $nombre . '%',
				':lugar' => '%' . $lugar . '%'
			));
			return ($stm->fetchAll(PDO::FETCH_ASSOC));
		} catch (Exception $e) {
			die($e->getMessage());
		}
	}

	public function ListarEstados()
	{
		try {
			$query = "SELECT * FROM estados";
			$stm = $this->pdo->prepare($query);
			$stm->execute();
			return ($stm->fetchAll(PDO::FETCH_ASSOC));
		} catch (Exception $e) {
			die($e->getMessage());
		}
	}

	public function ListarArchivos()
	{
		try {
			$query = "SELECT a.id, a.investigador_id, a.explicacion, a.fechaArchivo, a.lugarArchivo, 
			inv.nombre, inv.apellidos FROM archivo a JOIN investigadores inv ON (a.investigador_id = inv.id)";
			$stm = $this->pdo->prepare($query);
			$stm->execute();
			return ($stm->fetchAll(PDO::FETCH_ASSOC));
		} catch (Exception $e) {
			die($e->getMessage());
		}
	}

	public function ObtenerInvestigador($id)
	{
		try {
			$query = "SELECT * FROM investigadores WHERE id = ?";
			$stm = $this->pdo->prepare($query);
			$stm->execute(array($id));
			return ($stm->fetch(PDO::FETCH_OBJ));
		} catch (Exception $e) {
			die($e->getMessage());
		}
	}

	public function ObtenerFenParInvestigador($id)
	{
		try {
			$query = "SELECT fp.id, fp.investigador_id, fp.descripcion, fp.fechaOcurrencia, fp.lugarOcurrencia, fp.estado_id, 
			e.nombreEstado FROM fenomenosparanormales fp JOIN estados e ON (fp.estado_id = e.id) WHERE fp.investigador_id = ?";
			$stm = $this->pdo->prepare($query);
			$stm->execute(array($id));
			return ($stm->fetchAll(PDO::FETCH_ASSOC));
		} catch (Exception $e) {
			die($e->getMessage());
		}
	}

	public function ObtenerFenPar($id)
	{
		try {
			$query = "SELECT * FROM fenomenosparanormales WHERE id = ?";
			$stm = $this->pdo->prepare($query);
			$stm->execute(array($id));
			return ($stm->fetch(PDO::FETCH_OBJ));
		} catch (Exception $e) {
			die($e->getMessage());
		}
	}

	//  AÑADIR (INSERTAR):

	public function AnadeFenomenoParanormal($fenPar)
	{
		try {
			$query = "INSERT INTO fenomenosparanormales (investigador_id, descripcion, fechaOcurrencia, lugarOcurrencia, provinciaOcurrencia, comunidadAutonoma, latitud, longitud, estado_id) 
							VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
			$this->pdo->prepare($query)->execute(array(
				$fenPar->investigador_id,
				$fenPar->descripcion,
				$fenPar->fechaOcurrencia,
				$fenPar->lugarOcurrencia,
				$fenPar->provinciaOcurrencia,
				$fenPar->comunidadAutonoma,
				$fenPar->latitud,
				$fenPar->longitud,
				$fenPar->estado_id
			));
			return true;
		} catch (Exception $e) {
			die($e->getMessage());
			return false;
		}
	}

	//  BORRAR (ELIMINAR):

	public function BorrarInvestigador($id)
	{
		try {
			$query1 = "SELECT id FROM fenomenosparanormales WHERE investigador_id = ?";
			$stm1 = $this->pdo->prepare($query1);
			$stm1->execute(array($id));
			$registroPrimeraQuery = $stm1->rowCount();

			$query2 = "SELECT id FROM archivo WHERE investigador_id = ?";
			$stm2 = $this->pdo->prepare($query2);
			$stm2->execute(array($id));
			$registroSegundaQuery = $stm2->rowCount();

			if(($registroPrimeraQuery != 0) || ($registroSegundaQuery != 0))
				return false;
			else {
				$stm = $this->pdo->prepare("DELETE FROM investigadores WHERE id = ?");
				$stm->execute(array($id));
				return true;
			}
		} catch (Exception $e) {
			die($e->getMessage());
			return false;
		}
	}

	public function ArchivarFenomenoParanormal($archivo)
	{
		try {
			$query = "INSERT INTO archivo (investigador_id, explicacion, fechaArchivo, lugarArchivo)
						VALUES (?, ?, ?, ?)";
			$stm = $this->pdo->prepare($query);
			$stm->execute(array(
				$archivo->investigador_id,
				$archivo->explicacion,
				$archivo->fechaArchivo,
				$archivo->lugarArchivo
			));
			return true;
		} catch (Exception $e) {
			die($e->getMessage());
			return false;
		}
	}

	public function BorrarFenPar($id)
	{
		try {
			$stm = $this->pdo->prepare("DELETE FROM fenomenosparanormales WHERE id = ?");
			$stm->execute(array($id));
			return true;
		} catch (Exception $e) {
			die($e->getMessage());
			return false;
		}
	}

	public function BorrarArchivo($id)
	{
		try {
			$stm = $this->pdo->prepare("DELETE FROM archivo WHERE id = ?");
			$stm->execute(array($id));
			return true;
		} catch (Exception $e) {
			die($e->getMessage());
			return false;
		}
	}

	//  MODIFICAR (ACTUALIZAR):


	public function ModificaInvestigador($investigador)
	{
		try {
			$query = "UPDATE investigadores SET 
									nombre = ?, 
									apellidos = ?,
									dni = ?,
									telefono = ?,
									email = ?,
									residencia = ?,
									imagen = ?
							WHERE id = ?";
			$this->pdo->prepare($query)->execute(array(
				$investigador->nombre,
				$investigador->apellidos,
				$investigador->dni,
				$investigador->telefono,
				$investigador->email,
				$investigador->residencia,
				$investigador->imagen,
				$investigador->id
			));
			return true;
		} catch (Exception $e) {
			die($e->getMessage());
			return false;
		}
	}

	public function ModificaFenPar($fenPar)
	{
		try {
			$query = "UPDATE fenomenosparanormales SET 
									investigador_id	= ?, 
									descripcion = ?,
									fechaOcurrencia = ?, 
									lugarOcurrencia = ?,
                                    provinciaOcurrencia = ?,
                                    comunidadAutonoma = ?,
									latitud = ?,
									longitud = ?,
									estado_id = ?
							WHERE id = ?";
			$this->pdo->prepare($query)->execute(array(
				$fenPar->investigador_id,
				$fenPar->descripcion,
				$fenPar->fechaOcurrencia,
				$fenPar->lugarOcurrencia,
				$fenPar->provinciaOcurrencia,
				$fenPar->comunidadAutonoma,
				$fenPar->latitud,
				$fenPar->longitud,
				$fenPar->estado_id,
				$fenPar->id
			));
			return true;
		} catch (Exception $e) {
			die($e->getMessage());
			return false;
		}
	}

	public function ModificarDatosLogin($clave, $id)
	{
		try {
			$query = "UPDATE investigadores SET
									clave = ?
							WHERE id = ?";
			$this->pdo->prepare($query)->execute(array($clave, $id));
			return true;
		} catch (Exception $e) {
			die($e->getMessage());
			return false;
		}
	}
}  //  class Modelo
