-- Seed Data for Retail Inventory Management System
-- Development/Testing Data Only
-- All UUIDs use valid hexadecimal characters (0-9, a-f) only

-- ============================================
-- USERS (Password: Test@123 for all users)
-- ============================================
INSERT INTO users (id, email, password_hash, first_name, last_name, phone, role, is_active) VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'admin@example.com', '$2a$10$Saen/XFgTEwOyGe7eGsivuf8VY.MvhkXZyJbruZyjLVSGx14M2EIe', 'Admin', 'User', '+1-555-0100', 'admin', true),
('b1ffcd99-9c0b-4ef8-bb6d-6bb9bd380a22', 'manager@example.com', '$2a$10$Saen/XFgTEwOyGe7eGsivuf8VY.MvhkXZyJbruZyjLVSGx14M2EIe', 'John', 'Manager', '+1-555-0101', 'manager', true),
('c2a0de99-9c0b-4ef8-bb6d-6bb9bd380a33', 'staff1@example.com', '$2a$10$Saen/XFgTEwOyGe7eGsivuf8VY.MvhkXZyJbruZyjLVSGx14M2EIe', 'Jane', 'Staff', '+1-555-0102', 'staff', true),
('d3b1ef99-9c0b-4ef8-bb6d-6bb9bd380a44', 'staff2@example.com', '$2a$10$Saen/XFgTEwOyGe7eGsivuf8VY.MvhkXZyJbruZyjLVSGx14M2EIe', 'Bob', 'Worker', '+1-555-0103', 'staff', true),
('e4c2fa99-9c0b-4ef8-bb6d-6bb9bd380a55', 'viewer@example.com', '$2a$10$Saen/XFgTEwOyGe7eGsivuf8VY.MvhkXZyJbruZyjLVSGx14M2EIe', 'Alice', 'Viewer', '+1-555-0104', 'viewer', true);

-- ============================================
-- ROLES
-- ============================================
INSERT INTO roles (id, name, description, permissions) VALUES
('f5d3ab99-9c0b-4ef8-bb6d-6bb9bd380a66', 'admin', 'System Administrator', '{"all": true}'),
('a6e4b199-9c0b-4ef8-bb6d-6bb9bd380a77', 'manager', 'Store/Warehouse Manager', '{"products": ["read", "create", "update"], "inventory": ["read", "create", "update"], "orders": ["read", "create", "update", "approve"]}'),
('b7f5c299-9c0b-4ef8-bb6d-6bb9bd380a88', 'staff', 'Regular Staff', '{"products": ["read"], "inventory": ["read", "update"], "orders": ["read", "create"]}'),
('c806d399-9c0b-4ef8-bb6d-6bb9bd380a99', 'viewer', 'Read-only User', '{"products": ["read"], "inventory": ["read"], "orders": ["read"]}');

-- ============================================
-- LOCATIONS
-- ============================================
INSERT INTO locations (id, code, name, type, address, city, state, postal_code, country, phone, manager_id) VALUES
('10aabb99-9c0b-4ef8-bb6d-6bb9bd380b11', 'WH-001', 'Central Warehouse', 'warehouse', '123 Warehouse Blvd', 'New York', 'NY', '10001', 'USA', '+1-555-1001', 'b1ffcd99-9c0b-4ef8-bb6d-6bb9bd380a22'),
('11bbcc99-9c0b-4ef8-bb6d-6bb9bd380b22', 'WH-002', 'West Coast Distribution', 'distribution_center', '456 Distribution Dr', 'Los Angeles', 'CA', '90001', 'USA', '+1-555-1002', 'b1ffcd99-9c0b-4ef8-bb6d-6bb9bd380a22'),
('12ccdd99-9c0b-4ef8-bb6d-6bb9bd380b33', 'ST-001', 'Manhattan Store', 'store', '789 Fifth Avenue', 'New York', 'NY', '10022', 'USA', '+1-555-2001', 'c2a0de99-9c0b-4ef8-bb6d-6bb9bd380a33'),
('13ddee99-9c0b-4ef8-bb6d-6bb9bd380b44', 'ST-002', 'Brooklyn Store', 'store', '321 Brooklyn Ave', 'Brooklyn', 'NY', '11201', 'USA', '+1-555-2002', 'c2a0de99-9c0b-4ef8-bb6d-6bb9bd380a33'),
('14eeff99-9c0b-4ef8-bb6d-6bb9bd380b55', 'ST-003', 'LA Downtown Store', 'store', '654 Main Street', 'Los Angeles', 'CA', '90012', 'USA', '+1-555-2003', 'd3b1ef99-9c0b-4ef8-bb6d-6bb9bd380a44');

-- ============================================
-- CATEGORIES
-- ============================================
INSERT INTO categories (id, name, description, parent_id, sort_order) VALUES
('15ffa099-9c0b-4ef8-bb6d-6bb9bd380c11', 'Electronics', 'Electronic devices and accessories', NULL, 1),
('16a0b199-9c0b-4ef8-bb6d-6bb9bd380c22', 'Apparel', 'Clothing and fashion', NULL, 2),
('17b1c299-9c0b-4ef8-bb6d-6bb9bd380c33', 'Home & Garden', 'Home goods and garden supplies', NULL, 3),
('18c2d399-9c0b-4ef8-bb6d-6bb9bd380c44', 'Smartphones', 'Mobile phones and accessories', '15ffa099-9c0b-4ef8-bb6d-6bb9bd380c11', 1),
('19d3e499-9c0b-4ef8-bb6d-6bb9bd380c55', 'Laptops', 'Laptop computers', '15ffa099-9c0b-4ef8-bb6d-6bb9bd380c11', 2),
('20e4f599-9c0b-4ef8-bb6d-6bb9bd380c66', 'Mens Clothing', 'Clothing for men', '16a0b199-9c0b-4ef8-bb6d-6bb9bd380c22', 1),
('21f50699-9c0b-4ef8-bb6d-6bb9bd380c77', 'Womens Clothing', 'Clothing for women', '16a0b199-9c0b-4ef8-bb6d-6bb9bd380c22', 2);

-- ============================================
-- PRODUCTS
-- ============================================
INSERT INTO products (id, sku, barcode, name, description, category_id, unit_price, cost_price, min_stock_level, reorder_point, reorder_quantity, created_by) VALUES
('22061799-9c0b-4ef8-bb6d-6bb9bd380d11', 'ELEC-SM-001', '123456789012', 'iPhone 15 Pro', 'Latest Apple smartphone with A17 chip', '18c2d399-9c0b-4ef8-bb6d-6bb9bd380c44', 999.99, 750.00, 10, 20, 50, 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'),
('23172899-9c0b-4ef8-bb6d-6bb9bd380d22', 'ELEC-SM-002', '123456789013', 'Samsung Galaxy S24', 'Flagship Android smartphone', '18c2d399-9c0b-4ef8-bb6d-6bb9bd380c44', 899.99, 650.00, 10, 20, 50, 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'),
('24283999-9c0b-4ef8-bb6d-6bb9bd380d33', 'ELEC-LP-001', '123456789014', 'MacBook Pro 16"', 'Professional laptop for creative work', '19d3e499-9c0b-4ef8-bb6d-6bb9bd380c55', 2499.99, 1800.00, 5, 10, 20, 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'),
('25394a99-9c0b-4ef8-bb6d-6bb9bd380d44', 'ELEC-LP-002', '123456789015', 'Dell XPS 15', 'High-performance Windows laptop', '19d3e499-9c0b-4ef8-bb6d-6bb9bd380c55', 1799.99, 1200.00, 5, 10, 20, 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'),
('264a5b99-9c0b-4ef8-bb6d-6bb9bd380d55', 'APP-MC-001', '123456789016', 'Mens T-Shirt Blue', 'Cotton t-shirt - Size M', '20e4f599-9c0b-4ef8-bb6d-6bb9bd380c66', 29.99, 15.00, 50, 100, 200, 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'),
('275b6c99-9c0b-4ef8-bb6d-6bb9bd380d66', 'APP-MC-002', '123456789017', 'Mens Jeans Black', 'Denim jeans - Size 32', '20e4f599-9c0b-4ef8-bb6d-6bb9bd380c66', 79.99, 40.00, 30, 50, 100, 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'),
('286c7d99-9c0b-4ef8-bb6d-6bb9bd380d77', 'APP-WC-001', '123456789018', 'Womens Dress Red', 'Evening dress - Size S', '21f50699-9c0b-4ef8-bb6d-6bb9bd380c77', 149.99, 75.00, 20, 40, 80, 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'),
('297d8e99-9c0b-4ef8-bb6d-6bb9bd380d88', 'HOME-001', '123456789019', 'Coffee Maker Deluxe', '12-cup programmable coffee maker', '17b1c299-9c0b-4ef8-bb6d-6bb9bd380c33', 89.99, 45.00, 15, 30, 60, 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'),
('308e9f99-9c0b-4ef8-bb6d-6bb9bd380d99', 'HOME-002', '123456789020', 'Vacuum Cleaner Pro', 'Bagless upright vacuum', '17b1c299-9c0b-4ef8-bb6d-6bb9bd380c33', 199.99, 120.00, 10, 20, 40, 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11');

-- ============================================
-- INVENTORY (removed invalid created_by column)
-- ============================================
INSERT INTO inventory (product_id, location_id, quantity_available, quantity_reserved) VALUES
-- Central Warehouse
('22061799-9c0b-4ef8-bb6d-6bb9bd380d11', '10aabb99-9c0b-4ef8-bb6d-6bb9bd380b11', 150, 10),
('23172899-9c0b-4ef8-bb6d-6bb9bd380d22', '10aabb99-9c0b-4ef8-bb6d-6bb9bd380b11', 200, 15),
('24283999-9c0b-4ef8-bb6d-6bb9bd380d33', '10aabb99-9c0b-4ef8-bb6d-6bb9bd380b11', 50, 5),
('25394a99-9c0b-4ef8-bb6d-6bb9bd380d44', '10aabb99-9c0b-4ef8-bb6d-6bb9bd380b11', 75, 8),
('264a5b99-9c0b-4ef8-bb6d-6bb9bd380d55', '10aabb99-9c0b-4ef8-bb6d-6bb9bd380b11', 500, 20),
-- Manhattan Store
('22061799-9c0b-4ef8-bb6d-6bb9bd380d11', '12ccdd99-9c0b-4ef8-bb6d-6bb9bd380b33', 25, 3),
('23172899-9c0b-4ef8-bb6d-6bb9bd380d22', '12ccdd99-9c0b-4ef8-bb6d-6bb9bd380b33', 30, 2),
('264a5b99-9c0b-4ef8-bb6d-6bb9bd380d55', '12ccdd99-9c0b-4ef8-bb6d-6bb9bd380b33', 100, 5),
('275b6c99-9c0b-4ef8-bb6d-6bb9bd380d66', '12ccdd99-9c0b-4ef8-bb6d-6bb9bd380b33', 60, 4),
-- Brooklyn Store
('22061799-9c0b-4ef8-bb6d-6bb9bd380d11', '13ddee99-9c0b-4ef8-bb6d-6bb9bd380b44', 18, 2),
('286c7d99-9c0b-4ef8-bb6d-6bb9bd380d77', '13ddee99-9c0b-4ef8-bb6d-6bb9bd380b44', 45, 3),
('297d8e99-9c0b-4ef8-bb6d-6bb9bd380d88', '13ddee99-9c0b-4ef8-bb6d-6bb9bd380b44', 20, 1);

-- ============================================
-- SUPPLIERS
-- ============================================
INSERT INTO suppliers (id, code, name, contact_person, email, phone, address, city, state, postal_code, country, payment_terms, rating) VALUES
('319fa099-9c0b-4ef8-bb6d-6bb9bd380e11', 'SUP-001', 'Apple Inc.', 'Tim Cook', 'supplier@apple.com', '+1-800-275-2273', '1 Apple Park Way', 'Cupertino', 'CA', '95014', 'USA', 'Net 30', 5),
('32a0b199-9c0b-4ef8-bb6d-6bb9bd380e22', 'SUP-002', 'Samsung Electronics', 'Lee Jae-yong', 'supplier@samsung.com', '+82-2-2255-0114', '129 Samsung-ro', 'Seoul', 'Seoul', '06765', 'South Korea', 'Net 45', 5),
('33b1c299-9c0b-4ef8-bb6d-6bb9bd380e33', 'SUP-003', 'Dell Technologies', 'Michael Dell', 'supplier@dell.com', '+1-800-289-3355', '1 Dell Way', 'Round Rock', 'TX', '78682', 'USA', 'Net 30', 4),
('34c2d399-9c0b-4ef8-bb6d-6bb9bd380e44', 'SUP-004', 'Apparel Wholesale Co.', 'John Smith', 'john@apparelwholesale.com', '+1-555-3001', '789 Fashion Blvd', 'New York', 'NY', '10018', 'USA', 'Net 15', 4);

-- ============================================
-- CUSTOMERS
-- ============================================
INSERT INTO customers (id, customer_number, first_name, last_name, email, phone, address, city, state, postal_code, country, customer_type) VALUES
('35d3aa99-9c0b-4ef8-bb6d-6bb9bd380f11', 'CUST-001', 'Emily', 'Johnson', 'emily.johnson@email.com', '+1-555-4001', '123 Main St', 'New York', 'NY', '10001', 'USA', 'retail'),
('36aabb99-9c0b-4ef8-bb6d-6bb9bd380f22', 'CUST-002', 'Michael', 'Brown', 'michael.brown@email.com', '+1-555-4002', '456 Oak Ave', 'Brooklyn', 'NY', '11201', 'USA', 'retail'),
('37bbcc99-9c0b-4ef8-bb6d-6bb9bd380f33', 'CUST-003', 'Sarah', 'Davis', 'sarah.davis@email.com', '+1-555-4003', '789 Pine Rd', 'Queens', 'NY', '11354', 'USA', 'vip'),
('38ccdd99-9c0b-4ef8-bb6d-6bb9bd380f44', 'CUST-004', 'Corporate Wholesale Ltd', 'Purchasing', 'orders@corpwholesale.com', '+1-555-4004', '321 Business Park', 'Manhattan', 'NY', '10005', 'USA', 'wholesale');

-- ============================================
-- SALES ORDERS
-- ============================================
INSERT INTO sales_orders (id, order_number, customer_id, location_id, order_date, status, subtotal, tax_amount, shipping_cost, total_amount, payment_status, created_by) VALUES
('39ddee99-9c0b-4ef8-bb6d-6bb9bd381011', 'SO-2026-0001', '35d3aa99-9c0b-4ef8-bb6d-6bb9bd380f11', '12ccdd99-9c0b-4ef8-bb6d-6bb9bd380b33', '2026-04-05 10:30:00', 'delivered', 1029.98, 92.70, 15.00, 1137.68, 'paid', 'c2a0de99-9c0b-4ef8-bb6d-6bb9bd380a33'),
('40eeff99-9c0b-4ef8-bb6d-6bb9bd381022', 'SO-2026-0002', '36aabb99-9c0b-4ef8-bb6d-6bb9bd380f22', '13ddee99-9c0b-4ef8-bb6d-6bb9bd380b44', '2026-04-06 14:15:00', 'shipped', 109.98, 9.90, 10.00, 129.88, 'paid', 'c2a0de99-9c0b-4ef8-bb6d-6bb9bd380a33'),
('41ffa099-9c0b-4ef8-bb6d-6bb9bd381033', 'SO-2026-0003', '37bbcc99-9c0b-4ef8-bb6d-6bb9bd380f33', '12ccdd99-9c0b-4ef8-bb6d-6bb9bd380b33', '2026-04-07 09:00:00', 'processing', 2499.99, 225.00, 0.00, 2724.99, 'unpaid', 'c2a0de99-9c0b-4ef8-bb6d-6bb9bd380a33');

INSERT INTO sales_order_items (order_id, product_id, quantity, unit_price, total_price) VALUES
-- Order SO-2026-0001
('39ddee99-9c0b-4ef8-bb6d-6bb9bd381011', '22061799-9c0b-4ef8-bb6d-6bb9bd380d11', 1, 999.99, 999.99),
('39ddee99-9c0b-4ef8-bb6d-6bb9bd381011', '264a5b99-9c0b-4ef8-bb6d-6bb9bd380d55', 1, 29.99, 29.99),
-- Order SO-2026-0002
('40eeff99-9c0b-4ef8-bb6d-6bb9bd381022', '275b6c99-9c0b-4ef8-bb6d-6bb9bd380d66', 1, 79.99, 79.99),
('40eeff99-9c0b-4ef8-bb6d-6bb9bd381022', '264a5b99-9c0b-4ef8-bb6d-6bb9bd380d55', 1, 29.99, 29.99),
-- Order SO-2026-0003
('41ffa099-9c0b-4ef8-bb6d-6bb9bd381033', '24283999-9c0b-4ef8-bb6d-6bb9bd380d33', 1, 2499.99, 2499.99);

-- ============================================
-- PURCHASE ORDERS
-- ============================================
INSERT INTO purchase_orders (id, po_number, supplier_id, location_id, order_date, expected_delivery_date, status, subtotal, tax_amount, total_amount, created_by) VALUES
('42a0b199-9c0b-4ef8-bb6d-6bb9bd381144', 'PO-2026-0001', '319fa099-9c0b-4ef8-bb6d-6bb9bd380e11', '10aabb99-9c0b-4ef8-bb6d-6bb9bd380b11', '2026-04-01', '2026-04-15', 'ordered', 75000.00, 6750.00, 81750.00, 'b1ffcd99-9c0b-4ef8-bb6d-6bb9bd380a22'),
('43b1c299-9c0b-4ef8-bb6d-6bb9bd381155', 'PO-2026-0002', '32a0b199-9c0b-4ef8-bb6d-6bb9bd380e22', '10aabb99-9c0b-4ef8-bb6d-6bb9bd380b11', '2026-04-03', '2026-04-20', 'ordered', 65000.00, 5850.00, 70850.00, 'b1ffcd99-9c0b-4ef8-bb6d-6bb9bd380a22');

INSERT INTO purchase_order_items (po_id, product_id, quantity_ordered, unit_cost, total_cost) VALUES
-- PO-2026-0001
('42a0b199-9c0b-4ef8-bb6d-6bb9bd381144', '22061799-9c0b-4ef8-bb6d-6bb9bd380d11', 100, 750.00, 75000.00),
-- PO-2026-0002
('43b1c299-9c0b-4ef8-bb6d-6bb9bd381155', '23172899-9c0b-4ef8-bb6d-6bb9bd380d22', 100, 650.00, 65000.00);

-- End of Seed Data
