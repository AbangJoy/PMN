<?php


$link = @mysqli_connect("localhost", "root", "", "aplikasi_fitness");
if(mysqli_connect_errno()){
    die(mysqli_connect_error());
}
    

?>