<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Login</title>
        <link href="css/eventos.css" rel="stylesheet" type="text/css">
    </head>
    <body>
        <?php
        $error="";
        include("Clases/BaseDatos.php"); //Incluyo el archivo BaseDatos.php

        if (isset($_POST["enviar"])){
            if (empty($_POST['usuario']) || empty($_POST['password'])){
                $error = "El usuario y la contraseña no pueden estar vacios!";
            }else{
                $login = htmlentities(addslashes($_POST["usuario"]));
                $password = htmlentities(addslashes($_POST["password"]));
                if (BaseDatos::verificaUsuario($login, $password)) {
                    session_start();
                    $_SESSION['usuario'] = $_POST['usuario'];
                    header("Location: eventos.php");
                } else {
                    $error = "Usuario o contraseña no válidos!";
                }
            }
        }
        ?>
        <div id='login'>
            <form action='<?php print $_SERVER['PHP_SELF']?>' method='post'>
                <fieldset>
                    <legend>Login</legend>
                    <div><span class='error'><?php echo $error; ?></span></div>    
                    <div class='campo'>
                        <label for='usuario' >Usuario:</label><br/>
                        <input type='text' name='usuario' id='usuario' maxlength="50" /><br/>
                    </div>
                    <div class='campo'>
                        <label for='password' >Contraseña:</label><br/>
                        <input type='password' name='password' id='password' maxlength="50" /><br/>
                    </div>
                    <div class='campo'>
                        <input type='submit' name='enviar' value='Enviar' class='boton'/>
                    </div>
                    <div class='campo'>
                        <a href="registro.php">Crear nuevo usuario</a>
                    </div>
                </fieldset>
            </form>
        </div>
    </body>
</html>