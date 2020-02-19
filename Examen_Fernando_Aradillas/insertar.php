<?php
    session_start();
    if (!isset($_SESSION['usuario'])) {
        header("Location: login.php");  //Compruebo si existe una sesion iniciada y si me manda al login
    }
?>
<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Insertar_Evento</title>
        <link href="css/eventos.css" rel="stylesheet" type="text/css">
    </head>
    <body>
        <div id='borrar'>
            <form action='<?php print $_SERVER['PHP_SELF']?>' method='post'>
                <fieldset>
                    <legend>Añadir un evento a prueba</legend>   
                    <div class='campo'>
                        <label for='fecha' >Fecha (dd/mm/aaaa):</label><br/>
                        <input type='date' name='fecha' id='fecha'/><br/>
                    </div>
                    <div class='campo'>
                        <label for='hora' >Hora (hh:mm):</label><br/>
                        <input type='time' name='hora' id='hora'/><br/>
                    </div>
                    <div class='campo'>
                        <label for='descripcion' >Descripción:</label><br/>
                        <textarea name='descripcion' id='descripcion'></textarea>
                    </div>
                    <div class='campo'>
                        <input type='submit' name='enviar' value='Grabar' class='boton'/>
                    </div>
                </fieldset>
            </form>
            <div class='campo'>
                <a href="eventos.php"><button class="boton">Volver</button></a>
            </div>
        </div>
    </body>
</html>