-- Create a database
CREATE DATABASE business_management;

-- Use the created database
USE business_management;

-- Create Business table
CREATE TABLE Business (
  business_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Customer table with a foreign key referencing Business
CREATE TABLE Customer (
  customer_id INT AUTO_INCREMENT PRIMARY KEY,
  business_id INT,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(15),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (business_id) REFERENCES Business(business_id) ON DELETE CASCADE
);

-- Create Address table with a foreign key referencing Customer
CREATE TABLE Address (
  address_id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT,
  street VARCHAR(255),
  city VARCHAR(255),
  state VARCHAR(255),
  zip VARCHAR(10),
  country VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES Customer(customer_id) ON DELETE CASCADE
);
