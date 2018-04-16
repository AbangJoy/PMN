<?php  header("Access-Control-Allow-Origin: *"); ?>

<?php

$conn = new mysqli("localhost", "root", "", "aplikasi_fitness");

$email=$_POST['email'];
$password=$_POST['password'];

if ($conn->connect_error) {
    echo "Error Connection";
} else {
    $hasil=$conn->query("select * from user where email = '$email' and password = '$password';");
    if ($hasil->num_rows > 0) {
        echo 1;
    }
    else{
    	echo 0;
	}
}
?>