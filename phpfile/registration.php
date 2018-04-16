<?php  header("Access-Control-Allow-Origin: *"); ?>

<?php 

$conn = new mysqli("localhost", "root", "", "aplikasi_fitness");

if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
} 



		$name = $_POST['name'];
		$email = $_POST['email'];
		$password = $_POST['password'];
	
$sql = "INSERT INTO user (nama_user, email, password)	VALUES ('$name', '$email', '$password')";
if ($conn->query($sql) === TRUE) {
echo "Success!";
} else {
   echo "Error: ".$conn->error;}
		$conn->close();
 ?>


?>
