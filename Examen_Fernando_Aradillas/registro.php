<?php
    include("Clases/BaseDatos.php"); //Incluyo el archivo BaseDatos.php
?>

<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Registro</title>
        <link href="css/eventos.css" rel="stylesheet" type="text/css">
    </head>
    <body>
        <?php
            $error="";

            if (isset($_POST["registrar"])){
                $login = htmlentities(addslashes($_POST["usuario"]));
                $password = htmlentities(addslashes($_POST["password"]));
                $cpassword = htmlentities(addslashes($_POST["cpassword"]));

                if (empty($login) || empty($password) || empty($cpassword)){ 
                    $error = "El usuario y la contraseña no pueden estar vacios!";
                }else if (($password)!=($cpassword)){ 
                    $error = "No coinciden las contraseñas!";
                }else{
                    if (BaseDatos::grabarUsuario($login, $password)) {
                        $error ="Usuario registrado. <br><a href='login.php'>Clikear para iniciar sesión!</a>";
                    } else {
                        $error = "Usuario ya existe!";
                    }
                }
            }

        ?>
        <div id='login'>
            <form action='<?php print $_SERVER['PHP_SELF']?>' method='post'>
                <fieldset>
                    <legend>Registro</legend>
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
                        <label for='password' >Confirma Contraseña:</label><br/>
                        <input type='password' name='cpassword' id='cpassword' maxlength="50" /><br/>
                    </div>
                    <div class='campo'>
                        <input type='submit' name='registrar' class="boton" value='Registrar' />
                    </div>
                </fieldset>
            </form>
        </div>
    </body>
</html>