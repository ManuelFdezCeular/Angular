<?php 
class Evento {
    protected $id;
    protected $nombre;
    protected $hora;
    protected $dia;
    protected $asunto;

    public function getid() {return $this->id; }
    
    public function getnombre() {return $this->nombre; }
    
    public function gethora() {return $this->hora; }
    
    public function getdia() {return $this->dia; }
    
    public function getasunto() {return $this->asunto; }
    
    public function __construct($row) {
        $this->id = $row['id_evento'];
        $this->nombre = $row['nombre'];
        $this->hora = $row['hora'];
        $this->dia = $row['dia'];
        $this->asunto = $row['evento'];
    }
}
?>