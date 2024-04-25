-- Insert dummy businesses
INSERT INTO Business (name, description)
VALUES
  ('Tech Innovators Inc.', 'A leading tech company specializing in innovative solutions.'),
  ('Green Energy Solutions', 'A company focused on sustainable energy solutions.'),
  ('Creative Design Studio', 'An agency offering design and branding services.'),
  ('Global Finance Group', 'A multinational finance company.'),
  ('Health First Medical', 'A healthcare provider with a patient-first approach.'),
  ('Fresh Foods Market', 'A local market offering fresh produce and groceries.'),
  ('Quality Construction Co.', 'A construction company known for quality work.'),
  ('Smart Home Technologies', 'A company specializing in smart home products.'),
  ('Adventure Travel Co.', 'A travel agency focusing on adventure and exploration.'),
  ('FutureTech Labs', 'A startup focused on futuristic technologies.');

-- Insert dummy customers
INSERT INTO Customer (business_id, first_name, last_name, email, phone)
VALUES
  (1, 'John', 'Doe', 'john.doe@example.com', '555-1234'),
  (2, 'Jane', 'Smith', 'jane.smith@example.com', '555-2345'),
  (3, 'Michael', 'Johnson', 'michael.johnson@example.com', '555-3456'),
  (4, 'Emily', 'Brown', 'emily.brown@example.com', '555-4567'),
  (5, 'James', 'Williams', 'james.williams@example.com', '555-5678'),
  (6, 'Patricia', 'Jones', 'patricia.jones@example.com', '555-6789'),
  (7, 'Robert', 'Garcia', 'robert.garcia@example.com', '555-7890'),
  (8, 'Linda', 'Martinez', 'linda.martinez@example.com', '555-8901'),
  (9, 'David', 'Davis', 'david.davis@example.com', '555-9012'),
  (10, 'Mary', 'Rodriguez', 'mary.rodriguez@example.com', '555-0123'),
  (1, 'William', 'Lopez', 'william.lopez@example.com', '555-1123'),
  (2, 'Barbara', 'Hernandez', 'barbara.hernandez@example.com', '555-2223'),
  (3, 'Richard', 'Gonzalez', 'richard.gonzalez@example.com', '555-3323'),
  (4, 'Susan', 'Wilson', 'susan.wilson@example.com', '555-4423'),
  (5, 'Joseph', 'Anderson', 'joseph.anderson@example.com', '555-5523'),
  (6, 'Jessica', 'Thomas', 'jessica.thomas@example.com', '555-6623'),
  (7, 'Charles', 'Taylor', 'charles.taylor@example.com', '555-7723'),
  (8, 'Karen', 'Moore', 'karen.moore@example.com', '555-8823'),
  (9, 'Christopher', 'Jackson', 'christopher.jackson@example.com', '555-9923'),
  (10, 'Nancy', 'Lee', 'nancy.lee@example.com', '555-0023');

-- Insert dummy addresses
INSERT INTO Address (customer_id, street, city, state, zip, country)
VALUES
  (1, '123 Main St', 'New York', 'NY', '10001', 'USA'),
  (2, '456 Elm St', 'Los Angeles', 'CA', '90001', 'USA'),
  (3, '789 Pine St', 'Chicago', 'IL', '60601', 'USA'),
  (4, '101 Maple St', 'Houston', 'TX', '77001', 'USA'),
  (5, '202 Oak St', 'Phoenix', 'AZ', '85001', 'USA'),
  (6, '303 Birch St', 'Philadelphia', 'PA', '19101', 'USA'),
  (7, '404 Cedar St', 'San Antonio', 'TX', '78201', 'USA'),
  (8, '505 Walnut St', 'San Diego', 'CA', '92101', 'USA'),
  (9, '606 Chestnut St', 'Dallas', 'TX', '75201', 'USA'),
  (10, '707 Spruce St', 'San Jose', 'CA', '95101', 'USA'),
  (11, '808 Fir St', 'Austin', 'TX', '73301', 'USA'),
  (12, '909 Ash St', 'Jacksonville', 'FL', '32201', 'USA'),
  (13, '1010 Cedar Ave', 'San Francisco', 'CA', '94101', 'USA'),
  (14, '1111 Maple Ave', 'Indianapolis', 'IN', '46201', 'USA'),
  (15, '1212 Willow St', 'Columbus', 'OH', '43201', 'USA'),
  (16, '1313 Poplar St', 'Fort Worth', 'TX', '76101', 'USA'),
  (17, '1414 Beech St', 'Charlotte', 'NC', '28201', 'USA'),
  (18, '1515 Cherry St', 'Detroit', 'MI', '48201', 'USA'),
  (19, '1616 Elm St', 'El Paso', 'TX', '79901', 'USA'),
  (20, '1717 Cypress St', 'Memphis', 'TN', '38101', 'USA');
