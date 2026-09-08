-- ==========================================================
-- Solar ERP + CRM Hostinger MySQL Schema (Optional)
-- Import this via Hostinger cPanel / hPanel -> phpMyAdmin
-- ==========================================================

CREATE TABLE IF NOT EXISTS `solar_customers` (
  `id` VARCHAR(64) PRIMARY KEY,
  `customer_code` VARCHAR(32) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `company_name` VARCHAR(255),
  `phone` VARCHAR(32) NOT NULL,
  `email` VARCHAR(128),
  `address` TEXT,
  `city` VARCHAR(128),
  `state` VARCHAR(128),
  `pincode` VARCHAR(16),
  `customer_type` VARCHAR(32),
  `active_project_id` VARCHAR(64),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `solar_projects` (
  `id` VARCHAR(64) PRIMARY KEY,
  `project_code` VARCHAR(32) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `customer_id` VARCHAR(64) NOT NULL,
  `customer_name` VARCHAR(255) NOT NULL,
  `system_capacity_kw` DECIMAL(10,2) NOT NULL,
  `system_type` VARCHAR(64),
  `total_project_cost` DECIMAL(14,2),
  `status` VARCHAR(64),
  `current_stage_key` VARCHAR(64),
  `completion_percentage` INT DEFAULT 0,
  `site_address` TEXT,
  `city` VARCHAR(128),
  `start_date` DATE,
  `expected_completion_date` DATE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `solar_leads` (
  `id` VARCHAR(64) PRIMARY KEY,
  `customer_name` VARCHAR(255) NOT NULL,
  `company_name` VARCHAR(255),
  `phone` VARCHAR(32) NOT NULL,
  `email` VARCHAR(128),
  `address` TEXT,
  `city` VARCHAR(128),
  `solar_capacity_kw` DECIMAL(10,2),
  `estimated_value` DECIMAL(14,2),
  `source` VARCHAR(64),
  `status` VARCHAR(64),
  `next_follow_up_date` DATE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `solar_quotations` (
  `id` VARCHAR(64) PRIMARY KEY,
  `quotation_number` VARCHAR(64) NOT NULL,
  `customer_id` VARCHAR(64),
  `customer_name` VARCHAR(255) NOT NULL,
  `capacity_kw` DECIMAL(10,2),
  `total_amount` DECIMAL(14,2),
  `status` VARCHAR(32),
  `valid_until` DATE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `solar_payments` (
  `id` VARCHAR(64) PRIMARY KEY,
  `project_id` VARCHAR(64) NOT NULL,
  `customer_name` VARCHAR(255) NOT NULL,
  `milestone` VARCHAR(128),
  `amount` DECIMAL(14,2) NOT NULL,
  `status` VARCHAR(32),
  `due_date` DATE,
  `paid_date` DATE,
  `receipt_number` VARCHAR(64),
  `payment_mode` VARCHAR(64),
  `transaction_reference` VARCHAR(128),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
