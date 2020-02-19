<?php
require_once('Evento.php'); //Incluyo el archivo Eventos.php

    //Clase BaseDatos
    class BaseDatos {
        
        
        //Metodo para ejecutar las consultas
        protected static function ejecutarConsulta($sql){
            $opc = array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8");
            $dsn = "mysql:host=localhost;dbname=eventos_velazquez";
            $usuario = 'alumno';
            $contrasena = 'velazquez';
            $eventos_velazquez = new PDO($dsn, $usuario, $contrasena, $opc);
            $resultado = null;
            if (isset($eventos_velazquez)) $resultado = $eventos_velazquez->query($sql);
            return $resultado;
        }
        
        
        //Metodo para verifucar los usuarios
        public static function verificaUsuario($usu,$pas){
            $sql = "SELECT * FROM usuarios ";
            $sql .= "WHERE nombre='$usu' ";
            $sql .= "AND clave='$pas';";
            $resultado = self::ejecutarConsulta ($sql);
            $verificado = false;
            if(isset($resultado)) {
                $fila = $resultado->fetch();
            if($fila !== false) $verificado=true;
            }
            return $verificado;
        }
        
        
        //Metodo para insertar los usuarios
        public static function grabarUsuario($usu, $pas) {
            $sql = "INSERT INTO usuarios (nombre,clave) VALUES ('$usu', '$pas')";
            $resultado = self::ejecutarConsulta($sql);
            $verificado = false;
            if (isset($resultado)) {
                $fila = $resultado->fetch();
            if ($fila !== false) $verificado = true;
            }
            return $verificado;
        }
        
        
        //Metodo para listar los eventos
        public static function listarEvento($usu){
            $sql = "SELECT * FROM eventos where nombre='$usu';";
            $resultado = self::ejecutarConsulta ($sql);
            $eventos = array();
            if($resultado) {
                $row = $resultado->fetch();
                while ($row != null) {
                    $eventos[] = new Evento($row);
                    $row = $resultado->fetch();
                }
            }
            return $eventos;
        }
        
        
        public static function grabarEvento($usu,$hor,$dia,$asu){}
        public static function modificarEvento($id,$usu,$hor,$dia,$asu){}
        public static function editarEvento($indice){}
        
        
        
        //Metodo para borrar los eventos
        
        
        //La tengo echa pero no me dio tiempo a implementarla en el archivo eliminar.php
        
        public static function borrarEvento($indice){
            $sql = "DELETE FROM eventos WHERE id_evento='".$indice."';";
            $resultado = self::ejecutarConsulta($sql);
            $verificado = false;
            if (isset($resultado)) {
                $fila = $resultado->fetch();
            if ($fila !== false) $verificado = true;
        }
        return $verificado;
        }
    }
?>
