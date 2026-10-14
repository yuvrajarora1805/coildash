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
    sensor_status VARCHAR(255) DEFAULT 'ok',
    last_seen TIMESTAMP NULL
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
    status ENUM('draft', 'pending_supervisor', 'setup_approved', 'pending_section_head', 'approved', 'closed') DEFAULT 'draft',
    press_reading VARCHAR(50),
    temp_reading VARCHAR(50),
    volt_reading VARCHAR(50),
    quality_verified_by VARCHAR(100),
    quality_verified_at TIMESTAMP NULL,
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
    uts_rm_no VARCHAR(100),
    coil_weight DECIMAL(10,2),
    gal_weight DECIMAL(10,2),
    FOREIGN KEY (process_card_id) REFERENCES process_cards(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS setup_approvals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    process_card_id INT NOT NULL,
    approver_id INT NOT NULL,
    action ENUM('approved', 'rejected') NOT NULL,
    remarks TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (process_card_id) REFERENCES process_cards(id) ON DELETE CASCADE,
    FOREIGN KEY (approver_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS process_card_inspections (
    id INT AUTO_INCREMENT PRIMARY KEY,
    process_card_id INT NOT NULL,
    stage ENUM('first_off', 'last_off') NOT NULL,
    sample_no INT NOT NULL,
    fl VARCHAR(50),
    od_id VARCHAR(50),
    nc VARCHAR(50),
    ends VARCHAR(50),
    helix VARCHAR(50),
    visual VARCHAR(50),
    sample_time TIME,
    sign VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (process_card_id) REFERENCES process_cards(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS process_card_observations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    process_card_id INT NOT NULL,
    row_no INT NOT NULL,
    start_lo VARCHAR(50), start_od VARCHAR(50), start_nc VARCHAR(50), start_ends VARCHAR(50),
    mid_lo VARCHAR(50), mid_od VARCHAR(50), mid_nc VARCHAR(50), mid_ends VARCHAR(50),
    end_lo VARCHAR(50), end_od VARCHAR(50), end_nc VARCHAR(50), end_ends VARCHAR(50),
    qty INT DEFAULT 0,
    operator_sign VARCHAR(100),
    supervisor_sign VARCHAR(100),
    section_head_sign VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (process_card_id) REFERENCES process_cards(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS process_card_rejections (
    id INT AUTO_INCREMENT PRIMARY KEY,
    process_card_id INT NOT NULL,
    cchl_coil_no VARCHAR(100),
    part_no VARCHAR(100),
    job_setting INT DEFAULT 0,
    id_od INT DEFAULT 0,
    nc INT DEFAULT 0,
    wire_bend INT DEFAULT 0,
    power_cut INT DEFAULT 0,
    total_rej INT DEFAULT 0,
    wire_cut_fit INT DEFAULT 0,
    remarks TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (process_card_id) REFERENCES process_cards(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS process_card_abnormalities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    process_card_id INT NOT NULL,
    stage ENUM('first_off', 'last_off') NOT NULL,
    defect_type VARCHAR(100),
    downtime_mins INT DEFAULT 0,
    scrap_qty INT DEFAULT 0,
    suspect_qty INT DEFAULT 0,
    tooling_adjustments TEXT,
    quarantine_tag VARCHAR(100),
    description TEXT,
    severity ENUM('minor', 'moderate', 'critical') DEFAULT 'minor',
    reported_by VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (process_card_id) REFERENCES process_cards(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS process_card_retro_verifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    process_card_id INT NOT NULL,
    event_no INT DEFAULT 1,
    press_reading VARCHAR(50),
    temp_reading VARCHAR(50),
    volt_reading VARCHAR(50),
    sample_no INT NOT NULL,
    fl VARCHAR(50),
    od_id VARCHAR(50),
    nc VARCHAR(50),
    ends VARCHAR(50),
    helix VARCHAR(50),
    visual VARCHAR(50),
    sample_time TIME,
    sign VARCHAR(50),
    supervisor_name VARCHAR(100),
    supervisor_status ENUM('pending', 'verified_ok', 'requires_rework') DEFAULT 'pending',
    supervisor_time TIME,
    supervisor_remarks TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (process_card_id) REFERENCES process_cards(id) ON DELETE CASCADE
);

-- Seed some initial data
INSERT IGNORE INTO users (name, role, password_hash) VALUES 
('Raj Kumar', 'operator', 'hashed_pass_here'),
('Mohan Lal', 'supervisor', 'hashed_pass_here'),
('Mr. A.K. Sharma', 'section_head', 'hashed_pass_here');

INSERT IGNORE INTO machines (machine_no) VALUES ('S-01'), ('S-02'), ('S-03');
