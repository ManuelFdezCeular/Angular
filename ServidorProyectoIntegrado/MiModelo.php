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
			$query = "Select * from fenomenosparanormales";
			$stm = $this->pdo->prepare($query);
			$stm->execute();
			return ($stm->fetchAll(PDO::FETCH_ASSOC));
		}catch(Exception $e){
			die($e->getMessage());
		}
	}
}  //  class Modelo
?>

