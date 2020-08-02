<?php 

function my_autoloader($class) {
    include 'class/' . $class . '.class.php';
}
spl_autoload_register('my_autoloader');
