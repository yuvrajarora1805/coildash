CREATE DATABASE IF NOT EXISTS coil_o_matic;
USE coil_o_matic;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role ENUM('operator', 'supervisor', 'section_head') NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS machines (
    id INT AUTO_INCREMENT PRIMARY KEY,
    machine_no VARCHAR(50) NOT NULL UNIQUE,
    status ENUM('running', 'idle', 'breakdown') DEFAULT 'idle',
    live_count INT DEFAULT 0,
    sensor_status VARCHAR(255) DEFAULT 'ok'
);

CREATE TABLE IF NOT EXISTS customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_code VARCHAR(50) NOT NULL UNIQUE,
    customer_name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS parts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    part_no VARCHAR(100) NOT NULL UNIQUE,
    part_name VARCHAR(255) NOT NULL,
    customer_id INT,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

CREATE TABLE IF NOT EXISTS approved_setup (
    id INT AUTO_INCREMENT PRIMARY KEY,
    part_id INT NOT NULL,
    helix DECIMAL(5,2),
    lo DECIMAL(5,2),
    od_id DECIMAL(5,2),
    nc DECIMAL(5,2),
    ends DECIMAL(5,2),
    FOREIGN KEY (part_id) REFERENCES parts(id)
);

CREATE TABLE IF NOT EXISTS process_cards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    card_no VARCHAR(100) NOT NULL UNIQUE,
    machine_id INT,
    operator_id INT,
    supervisor_id INT,
    section_head_id INT,
    part_id INT,
    shift ENUM('A', 'B', 'C'),
    date DATE,
    status ENUM('draft', 'pending_supervisor', 'approved', 'closed') DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (machine_id) REFERENCES machines(id),
    FOREIGN KEY (operator_id) REFERENCES users(id),
    FOREIGN KEY (supervisor_id) REFERENCES users(id),
    FOREIGN KEY (section_head_id) REFERENCES users(id),
    FOREIGN KEY (part_id) REFERENCES parts(id)
);

CREATE TABLE IF NOT EXISTS process_card_setup (
    id INT AUTO_INCREMENT PRIMARY KEY,
    process_card_id INT NOT NULL,
    actual_helix DECIMAL(5,2),
    actual_lo DECIMAL(5,2),
    actual_od_id DECIMAL(5,2),
    actual_nc DECIMAL(5,2),
    actual_ends DECIMAL(5,2),
    setup_date DATE,
    setup_time TIME,
    FOREIGN KEY (process_card_id) REFERENCES process_cards(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS material_traceability (
    id INT AUTO_INCREMENT PRIMARY KEY,
    process_card_id INT NOT NULL,
    coil_no VARCHAR(100),
    wire_grade VARCHAR(100),
    wire_dia DECIMAL(5,2),
    heat_no VARCHAR(100),
    uty_rm_no VARCHAR(100),
    coil_weight DECIMAL(10,2),
    gal_weight DECIMAL(10,2),
    FOREIGN KEY (process_card_id) REFERENCES process_cards(id) ON DELETE CASCADE
);

-- Seed some initial data
INSERT IGNORE INTO users (name, role, password_hash) VALUES 
('Raj Kumar', 'operator', 'hashed_pass_here'),
('Mohan Lal', 'supervisor', 'hashed_pass_here'),
('Mr. A.K. Sharma', 'section_head', 'hashed_pass_here');

INSERT IGNORE INTO machines (machine_no) VALUES ('S-01'), ('S-02'), ('S-03');
