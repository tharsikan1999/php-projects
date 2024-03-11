<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$db = new mysqli('localhost', 'root', '', 'crud');

// Check for database connection errors
if ($db->connect_error) {
    http_response_code(500);
    echo json_encode(array("error" => "Database connection failed: " . $db->connect_error));
    exit();
}

//Get all students
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT * FROM students";
    $result = $db->query($sql);

    if ($result->num_rows > 0) {
        $rows = array();

        while ($row = $result->fetch_assoc()) {
            $rows[] = $row;
        }

        echo json_encode($rows);
    } else {
        echo json_encode(array());
    }
}

// Add a student
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    // Validate input data
    if (!isset($data['firstname']) || !isset($data['lastname']) || !isset($data['age']) || !isset($data['phone_no'])) {
        http_response_code(400);
        echo json_encode(array("error" => "Invalid input data"));
        exit();
    }

    // Check for database connection
    if ($db->connect_error) {
        die("Connection failed: " . $db->connect_error);
    }

    $firstname = $db->real_escape_string($data['firstname']);
    $lastname = $db->real_escape_string($data['lastname']);
    $age = $db->real_escape_string($data['age']);
    $phone_no = $db->real_escape_string($data['phone_no']);

    $sql = "INSERT INTO students (firstname, lastname, age, phone_no) VALUES ('$firstname', '$lastname', '$age', '$phone_no')";

    if ($db->query($sql) === TRUE) {
        echo json_encode(array("message" => "Student added successfully"));
    } else {
        http_response_code(500);
        echo json_encode(array("error" => "Error adding student: " . $db->error));
        exit();
    }
}


// Update a student
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $id = basename($_SERVER['PATH_INFO']);
    $id = $db->real_escape_string($id);


    if (!is_numeric($id)) {
        http_response_code(400);
        echo json_encode(array("error" => "Invalid ID"));
        exit();
    }

    $data = json_decode(file_get_contents("php://input"), true);

    // Validate input data
    if (!isset($data['firstname']) || !isset($data['lastname']) || !isset($data['age']) || !isset($data['phone_no'])) {
        http_response_code(400);
        echo json_encode(array("error" => "Invalid input data"));
        exit();
    }

    $firstname = $db->real_escape_string($data['firstname']);
    $lastname = $db->real_escape_string($data['lastname']);
    $age = $db->real_escape_string($data['age']);
    $phone_no = $db->real_escape_string($data['phone_no']);

    $sql = "UPDATE students SET firstname='$firstname', lastname='$lastname', age='$age', phone_no='$phone_no' WHERE student_no=?";

    $stmt = $db->prepare($sql);
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        echo json_encode(array("message" => "Student updated successfully"));
    } else {
        http_response_code(500);
        echo json_encode(array("error" => "Error updating student: " . $stmt->error));
        exit();
    }
}



//delete a student

// Delete a student
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $id = basename($_SERVER['PATH_INFO']);
    $id = $db->real_escape_string($id);


    if (!is_numeric($id)) {
        http_response_code(400);
        echo json_encode(array("error" => "Invalid ID"));
        exit();
    }

    $sql = "DELETE FROM students WHERE student_no=?";

    $stmt = $db->prepare($sql);
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        echo "Student deleted successfully";
    } else {
        http_response_code(500);
        echo json_encode(array("error" => "Error deleting student: " . $stmt->error));
        exit();
    }
}





// Close the database connection
$db->close();
