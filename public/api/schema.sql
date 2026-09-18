-- ==========================================================
-- SolarPulse EPC ERP & CRM - Hostinger Production MySQL Schema
-- Import via Hostinger cPanel / hPanel -> phpMyAdmin / MySQL CLI
-- Character Set: utf8mb4 / utf8mb4_unicode_ci
-- ==========================================================

SET FOREIGN_KEY_CHECKS = 0;

-- 1. Users and Profiles
CREATE TABLE IF NOT EXISTS `solar_users` (
  `id` VARCHAR(64) PRIMARY KEY,
  `firebase_uid` VARCHAR(128) UNIQUE,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(191) NOT NULL UNIQUE,
  `role` VARCHAR(64) NOT NULL DEFAULT 'Super Admin',
  `phone` VARCHAR(32) DEFAULT '',
  `avatar` TEXT,
  `department` VARCHAR(64) DEFAULT 'Operations',
  `designation` VARCHAR(128) DEFAULT '',
  `customer_id` VARCHAR(64) DEFAULT NULL,
  `status` VARCHAR(32) DEFAULT 'ACTIVE',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_users_role` (`role`),
  INDEX `idx_users_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Customers
CREATE TABLE IF NOT EXISTS `solar_customers` (
  `id` VARCHAR(64) PRIMARY KEY,
  `customer_code` VARCHAR(32) NOT NULL UNIQUE,
  `name` VARCHAR(255) NOT NULL,
  `company_name` VARCHAR(255) DEFAULT '',
  `customer_type` VARCHAR(32) DEFAULT 'Residential',
  `phone` VARCHAR(32) NOT NULL,
  `email` VARCHAR(191) DEFAULT '',
  `site_address` TEXT NOT NULL,
  `city` VARCHAR(128) NOT NULL,
  `state` VARCHAR(128) DEFAULT 'Gujarat',
  `pincode` VARCHAR(16) DEFAULT '',
  `gst_number` VARCHAR(32) DEFAULT '',
  `electricity_consumer_no` VARCHAR(64) DEFAULT '',
  `sanctioned_load_kw` DECIMAL(10,2) DEFAULT 0.00,
  `status` VARCHAR(32) DEFAULT 'ACTIVE',
  `active_project_id` VARCHAR(64) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_customers_status` (`status`),
  INDEX `idx_customers_phone` (`phone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Leads (CRM Pipeline)
CREATE TABLE IF NOT EXISTS `solar_leads` (
  `id` VARCHAR(64) PRIMARY KEY,
  `customer_name` VARCHAR(255) NOT NULL,
  `company_name` VARCHAR(255) DEFAULT '',
  `phone` VARCHAR(32) NOT NULL,
  `email` VARCHAR(191) DEFAULT '',
  `address` TEXT,
  `city` VARCHAR(128) DEFAULT '',
  `solar_capacity_kw` DECIMAL(10,2) DEFAULT 0.00,
  `estimated_value` DECIMAL(14,2) DEFAULT 0.00,
  `source` VARCHAR(64) DEFAULT 'Website',
  `assigned_salesperson_id` VARCHAR(64) DEFAULT '',
  `assigned_salesperson_name` VARCHAR(255) DEFAULT '',
  `status` VARCHAR(64) DEFAULT 'NEW',
  `notes` TEXT,
  `next_follow_up_date` DATE DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_leads_status` (`status`),
  INDEX `idx_leads_followup` (`next_follow_up_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Projects (Solar EPC Projects)
CREATE TABLE IF NOT EXISTS `solar_projects` (
  `id` VARCHAR(64) PRIMARY KEY,
  `project_code` VARCHAR(32) NOT NULL UNIQUE,
  `customer_id` VARCHAR(64) NOT NULL,
  `customer_name` VARCHAR(255) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `capacity_kw` DECIMAL(10,2) NOT NULL,
  `total_value` DECIMAL(14,2) NOT NULL DEFAULT 0.00,
  `status` VARCHAR(64) DEFAULT 'PLANNING',
  `current_stage_key` VARCHAR(64) DEFAULT 'site_survey',
  `completion_percentage` INT DEFAULT 0,
  `project_manager_id` VARCHAR(64) DEFAULT '',
  `project_manager_name` VARCHAR(255) DEFAULT '',
  `site_address` TEXT NOT NULL,
  `city` VARCHAR(128) NOT NULL,
  `inverter_model` VARCHAR(128) DEFAULT '',
  `panel_model` VARCHAR(128) DEFAULT '',
  `structure_type` VARCHAR(128) DEFAULT 'Elevated GI Structure',
  `start_date` DATE DEFAULT NULL,
  `expected_completion_date` DATE DEFAULT NULL,
  `actual_completion_date` DATE DEFAULT NULL,
  `notes` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_projects_customer` (`customer_id`),
  INDEX `idx_projects_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Project Workflow Stages
CREATE TABLE IF NOT EXISTS `solar_project_stages` (
  `id` VARCHAR(64) PRIMARY KEY,
  `project_id` VARCHAR(64) NOT NULL,
  `stage_key` VARCHAR(64) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `stage_order` INT NOT NULL DEFAULT 1,
  `department` VARCHAR(64) NOT NULL,
  `assigned_role` VARCHAR(64) NOT NULL,
  `assigned_employee_id` VARCHAR(64) DEFAULT '',
  `assigned_employee_name` VARCHAR(255) DEFAULT '',
  `status` VARCHAR(64) DEFAULT 'NOT STARTED',
  `priority` VARCHAR(32) DEFAULT 'MEDIUM',
  `start_date` DATE DEFAULT NULL,
  `due_date` DATE DEFAULT NULL,
  `completed_date` DATE DEFAULT NULL,
  `checklist_json` LONGTEXT,
  `photos_json` LONGTEXT,
  `documents_json` LONGTEXT,
  `gps_location_json` LONGTEXT,
  `notes` TEXT,
  `approved_by` VARCHAR(255) DEFAULT '',
  `approved_at` DATETIME DEFAULT NULL,
  `rejection_reason` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_stages_project` (`project_id`),
  INDEX `idx_stages_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Site Surveys
CREATE TABLE IF NOT EXISTS `solar_site_surveys` (
  `id` VARCHAR(64) PRIMARY KEY,
  `project_id` VARCHAR(64) DEFAULT '',
  `customer_id` VARCHAR(64) DEFAULT '',
  `engineer_id` VARCHAR(64) DEFAULT '',
  `engineer_name` VARCHAR(255) NOT NULL,
  `survey_date` DATE NOT NULL,
  `status` VARCHAR(32) DEFAULT 'DRAFT',
  `site_address` TEXT NOT NULL,
  `latitude` DECIMAL(10,7) DEFAULT NULL,
  `longitude` DECIMAL(10,7) DEFAULT NULL,
  `location_name` VARCHAR(255) DEFAULT '',
  `roof_type` VARCHAR(64) DEFAULT 'RCC Flat',
  `roof_area_sqft` DECIMAL(12,2) DEFAULT 0.00,
  `shadow_free_area_sqft` DECIMAL(12,2) DEFAULT 0.00,
  `shadow_obstacles` TEXT,
  `electricity_bill_number` VARCHAR(64) DEFAULT '',
  `monthly_avg_consumption` DECIMAL(10,2) DEFAULT 0.00,
  `sanctioned_load_kw` DECIMAL(10,2) DEFAULT 0.00,
  `tariff_rate` DECIMAL(8,2) DEFAULT 0.00,
  `existing_structure_condition` TEXT,
  `recommended_capacity_kw` DECIMAL(10,2) DEFAULT 0.00,
  `feasibility_score` VARCHAR(32) DEFAULT 'GOOD',
  `photos_json` LONGTEXT,
  `notes` TEXT,
  `reviewed_by` VARCHAR(255) DEFAULT '',
  `reviewed_at` DATETIME DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_surveys_project` (`project_id`),
  INDEX `idx_surveys_engineer` (`engineer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. Quotations & Sales Proposals
CREATE TABLE IF NOT EXISTS `solar_quotations` (
  `id` VARCHAR(64) PRIMARY KEY,
  `quotation_number` VARCHAR(64) NOT NULL UNIQUE,
  `customer_id` VARCHAR(64) DEFAULT '',
  `customer_name` VARCHAR(255) NOT NULL,
  `project_id` VARCHAR(64) DEFAULT '',
  `capacity_kw` DECIMAL(10,2) NOT NULL,
  `rate_per_wp` DECIMAL(10,2) DEFAULT 0.00,
  `base_amount` DECIMAL(14,2) DEFAULT 0.00,
  `tax_amount` DECIMAL(14,2) DEFAULT 0.00,
  `panel_brand` VARCHAR(128) DEFAULT '',
  `inverter_brand` VARCHAR(128) DEFAULT '',
  `structure_type` VARCHAR(128) DEFAULT '',
  `items_json` LONGTEXT,
  `subtotal` DECIMAL(14,2) DEFAULT 0.00,
  `discount_amount` DECIMAL(14,2) DEFAULT 0.00,
  `gst_percent` DECIMAL(5,2) DEFAULT 13.80,
  `gst_amount` DECIMAL(14,2) DEFAULT 0.00,
  `total_amount` DECIMAL(14,2) NOT NULL,
  `payment_terms` TEXT,
  `warranty_details` TEXT,
  `terms_and_conditions` TEXT,
  `status` VARCHAR(32) DEFAULT 'DRAFT',
  `valid_until` DATE DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `accepted_at` DATETIME DEFAULT NULL,
  INDEX `idx_quotations_customer` (`customer_id`),
  INDEX `idx_quotations_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. Customer Payments & Milestone Billing
CREATE TABLE IF NOT EXISTS `solar_payments` (
  `id` VARCHAR(64) PRIMARY KEY,
  `receipt_number` VARCHAR(64) NOT NULL UNIQUE,
  `project_id` VARCHAR(64) NOT NULL,
  `customer_id` VARCHAR(64) NOT NULL,
  `customer_name` VARCHAR(255) NOT NULL,
  `milestone` VARCHAR(128) NOT NULL,
  `amount` DECIMAL(14,2) NOT NULL,
  `status` VARCHAR(32) DEFAULT 'PENDING',
  `due_date` DATE DEFAULT NULL,
  `paid_date` DATE DEFAULT NULL,
  `payment_mode` VARCHAR(64) DEFAULT 'Bank NEFT/RTGS',
  `transaction_reference` VARCHAR(128) DEFAULT '',
  `notes` TEXT,
  `tally_sync_status` VARCHAR(32) DEFAULT 'NOT SYNCED',
  `tally_reference` VARCHAR(128) DEFAULT '',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_payments_project` (`project_id`),
  INDEX `idx_payments_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. Expenses & Project Procurement
CREATE TABLE IF NOT EXISTS `solar_expenses` (
  `id` VARCHAR(64) PRIMARY KEY,
  `expense_number` VARCHAR(64) NOT NULL UNIQUE,
  `project_id` VARCHAR(64) DEFAULT '',
  `project_code` VARCHAR(64) DEFAULT '',
  `vendor_name` VARCHAR(255) NOT NULL,
  `category` VARCHAR(128) NOT NULL,
  `amount` DECIMAL(14,2) NOT NULL,
  `expense_date` DATE NOT NULL,
  `payment_mode` VARCHAR(64) DEFAULT 'Bank Payment',
  `reference_no` VARCHAR(128) DEFAULT '',
  `notes` TEXT,
  `receipt_url` TEXT,
  `approved_by` VARCHAR(255) DEFAULT '',
  `tally_sync_status` VARCHAR(32) DEFAULT 'NOT SYNCED',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_expenses_project` (`project_id`),
  INDEX `idx_expenses_category` (`category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 10. HRMS - Employees & Technicians
CREATE TABLE IF NOT EXISTS `solar_employees` (
  `id` VARCHAR(64) PRIMARY KEY,
  `employee_code` VARCHAR(32) NOT NULL UNIQUE,
  `name` VARCHAR(255) NOT NULL,
  `photo_url` TEXT,
  `department` VARCHAR(64) NOT NULL,
  `designation` VARCHAR(128) NOT NULL,
  `phone` VARCHAR(32) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `joining_date` DATE NOT NULL,
  `salary_monthly` DECIMAL(12,2) DEFAULT 0.00,
  `status` VARCHAR(32) DEFAULT 'ACTIVE',
  `current_site_location` VARCHAR(255) DEFAULT '',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_employees_dept` (`department`),
  INDEX `idx_employees_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 11. HRMS - Attendance & Field Check-ins
CREATE TABLE IF NOT EXISTS `solar_attendance` (
  `id` VARCHAR(64) PRIMARY KEY,
  `employee_id` VARCHAR(64) NOT NULL,
  `employee_name` VARCHAR(255) NOT NULL,
  `attendance_date` DATE NOT NULL,
  `check_in_time` VARCHAR(16) NOT NULL,
  `check_out_time` VARCHAR(16) DEFAULT NULL,
  `check_in_gps_json` LONGTEXT,
  `check_out_gps_json` LONGTEXT,
  `site_project_id` VARCHAR(64) DEFAULT '',
  `site_project_title` VARCHAR(255) DEFAULT '',
  `status` VARCHAR(32) DEFAULT 'PRESENT',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_attendance_emp_date` (`employee_id`, `attendance_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 12. Service & Maintenance Tickets
CREATE TABLE IF NOT EXISTS `solar_service_tickets` (
  `id` VARCHAR(64) PRIMARY KEY,
  `ticket_id` VARCHAR(64) NOT NULL UNIQUE,
  `customer_id` VARCHAR(64) NOT NULL,
  `customer_name` VARCHAR(255) NOT NULL,
  `project_id` VARCHAR(64) NOT NULL,
  `project_title` VARCHAR(255) DEFAULT '',
  `issue` TEXT NOT NULL,
  `category` VARCHAR(64) DEFAULT 'Inverter Warning',
  `priority` VARCHAR(32) DEFAULT 'MEDIUM',
  `assigned_technician_id` VARCHAR(64) DEFAULT '',
  `assigned_technician_name` VARCHAR(255) DEFAULT '',
  `status` VARCHAR(32) DEFAULT 'OPEN',
  `scheduled_date` DATE DEFAULT NULL,
  `resolved_date` DATE DEFAULT NULL,
  `notes` TEXT,
  `photos_json` LONGTEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_tickets_customer` (`customer_id`),
  INDEX `idx_tickets_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 13. AMC Contracts (Annual Maintenance)
CREATE TABLE IF NOT EXISTS `solar_amc_contracts` (
  `id` VARCHAR(64) PRIMARY KEY,
  `amc_code` VARCHAR(64) NOT NULL UNIQUE,
  `customer_id` VARCHAR(64) NOT NULL,
  `customer_name` VARCHAR(255) NOT NULL,
  `project_id` VARCHAR(64) NOT NULL,
  `project_title` VARCHAR(255) NOT NULL,
  `plan_name` VARCHAR(128) NOT NULL,
  `start_date` DATE NOT NULL,
  `end_date` DATE NOT NULL,
  `renewal_date` DATE DEFAULT NULL,
  `annual_amount` DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  `visits_completed` INT DEFAULT 0,
  `total_visits` INT DEFAULT 4,
  `status` VARCHAR(32) DEFAULT 'ACTIVE',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_amc_customer` (`customer_id`),
  INDEX `idx_amc_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 14. Notifications
CREATE TABLE IF NOT EXISTS `solar_notifications` (
  `id` VARCHAR(64) PRIMARY KEY,
  `user_id` VARCHAR(64) DEFAULT '',
  `title` VARCHAR(255) NOT NULL,
  `message` TEXT NOT NULL,
  `type` VARCHAR(32) DEFAULT 'INFO',
  `is_read` TINYINT(1) DEFAULT 0,
  `link_type` VARCHAR(32) DEFAULT NULL,
  `link_id` VARCHAR(64) DEFAULT NULL,
  `customer_id` VARCHAR(64) DEFAULT NULL,
  `project_id` VARCHAR(64) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_notif_read` (`is_read`),
  INDEX `idx_notif_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 15. System & Integration Settings
CREATE TABLE IF NOT EXISTS `solar_system_settings` (
  `setting_key` VARCHAR(64) PRIMARY KEY,
  `setting_value` LONGTEXT NOT NULL,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
