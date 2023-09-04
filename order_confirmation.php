<?php
// Error Checking
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Establish a database connection
$servername = "sql200.epizy.com";
$username = "epiz_34284036";
$password = "ufVnqA9MLOFiB";
$dbname = "epiz_34284036_Scalzini";
$total = 0;

$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve form data
$customerName = $_POST['customer_name'];
$customerEmail = $_POST['customer_email'];
$phoneNumber = $_POST['phone_number'];
$deliveryAddress = $_POST['delivery_address'];
$pizzaString = $_POST['pizzaString'];

// Check if the customer_email already exists in the clients table
$checkQuery = "SELECT customer_email FROM clients WHERE customer_email = ?";
$stmtCheck = $conn->prepare($checkQuery);
$stmtCheck->bind_param("s", $customerEmail);
$stmtCheck->execute();
$stmtCheck->store_result();

if ($stmtCheck->num_rows > 0) {
    // The customer_email already exists, remove the record
    $removeQuery = "DELETE FROM clients WHERE customer_email = ?";
    $stmtRemove = $conn->prepare($removeQuery);
    $stmtRemove->bind_param("s", $customerEmail);
    $stmtRemove->execute();
    $stmtRemove->close();
}

// Prepare and execute INSERT statement for clients table
$stmt = $conn->prepare("INSERT INTO clients (customer_name, customer_email, phone_number, delivery_address) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $customerName, $customerEmail, $phoneNumber, $deliveryAddress);
$stmt->execute();

// Prepare and execute INSERT statement for orders table
$stmt2 = $conn->prepare("INSERT INTO orders (delivery_address, customer_email, previous_order) VALUES (?, ?, ?)");
$stmt2->bind_param("sss", $deliveryAddress, $customerEmail, $pizzaString);
$stmt2->execute();

// Return a response
echo "Pizza string received: " . $pizzaString;

// Close the database connection
$stmt->close();
$stmt2->close();
$conn->close();

// Redirect the user to a thank you page or display a confirmation message
header("Location: thank_you.html");
echo "Your order has been placed successfully.";
?>
