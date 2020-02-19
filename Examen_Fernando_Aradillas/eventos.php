<?php
    include("Clases/BaseDatos.php");  //Incluyo el archivo BaseDatos.php
    session_start();

    if (!isset($_SESSION['usuario'])) {
        header("Location: login.php");  //Compruebo si existe una sesion iniciada y si me manda al login
    }
?>
<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Eventos</title>
        <link href="css/eventos.css" rel="stylesheet" type="text/css">
        <style>
            h1{
                text-align: center;
            }
        </style>
    </head>    
    <body>
        <div>
            <div>
                <h1>Eventos de prueba</h1> 
            </div>
            <div>
                <table>
                    <thead>
                        <th>Nº</th>
                        <th>Día</th>
                        <th>Hora</th>
                        <th>Asunto</th>
                        <th>Editar</th>
                        <th>Borrar</th>
                    </thead>
                    <tbody>
                        <?php
                            $eventos = BaseDatos::listarEvento($_SESSION['usuario']);

                            foreach($eventos as $row) {
                                echo "<tr><form id=".$row->getid()." action='eventos.php' method='post'>";
                                echo "<td>".$row->getid()."</td>";
                                echo "<td>".$row->getdia()."</td>";
                                echo "<td>".$row->gethora()."</td>";
                                echo "<td>".$row->getasunto()."</td>";
                                echo "<td><a href='editar.php'><img src='img/editar.png'></a></td>";
                                echo "<td><a href='eliminar.php'><img src='img/eliminar.png'></a></td>";
                                echo "</form>";
                                echo "</tr>";
                            }
                        ?>
                        <tr><td colspan="5"><a href="insertar.php"><button class="boton"><h1>Insertar un Evento</h1></button></a></td><td><a href="cerrarSesion.php"><img src="img/salir.png"></a></td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    </body>
</html>