# Database Schema Details


## Table: users

**Query:**
`sql
SELECT column_name, data_type, character_maximum_length AS max_len, is_nullable, column_default FROM information_schema.columns WHERE table_name = 'users' ORDER BY ordinal_position;
``n
**Output:**
`	ext

  column_name  |          data_type          | max_len | is_nullable |   column_default   
---------------+-----------------------------+---------+-------------+--------------------
 id            | uuid                        |         | NO          | uuid_generate_v4()
 email         | character varying           |     255 | NO          | 
 password_hash | character varying           |     255 | NO          | 
 first_name    | character varying           |     100 | NO          | 
 last_name     | character varying           |     100 | NO          | 
 phone         | character varying           |      20 | YES         | 
 role          | character varying           |      50 | NO          | 
 is_active     | boolean                     |         | YES         | true
 last_login    | timestamp without time zone |         | YES         | 
 created_at    | timestamp without time zone |         | YES         | CURRENT_TIMESTAMP
 updated_at    | timestamp without time zone |         | YES         | CURRENT_TIMESTAMP
 created_by    | uuid                        |         | YES         | 
 updated_by    | uuid                        |         | YES         | 
(13 rows)

``n

## Table: roles

**Query:**
`sql
SELECT column_name, data_type, character_maximum_length AS max_len, is_nullable, column_default FROM information_schema.columns WHERE table_name = 'roles' ORDER BY ordinal_position;
``n
**Output:**
`	ext

 column_name |          data_type          | max_len | is_nullable |   column_default   
-------------+-----------------------------+---------+-------------+--------------------
 id          | uuid                        |         | NO          | uuid_generate_v4()
 name        | character varying           |      50 | NO          | 
 description | text                        |         | YES         | 
 permissions | jsonb                       |         | YES         | 
 created_at  | timestamp without time zone |         | YES         | CURRENT_TIMESTAMP
 updated_at  | timestamp without time zone |         | YES         | CURRENT_TIMESTAMP
(6 rows)

``n

## Table: user_sessions

**Query:**
`sql
SELECT column_name, data_type, character_maximum_length AS max_len, is_nullable, column_default FROM information_schema.columns WHERE table_name = 'user_sessions' ORDER BY ordinal_position;
``n
**Output:**
`	ext

 column_name |          data_type          | max_len | is_nullable |   column_default   
-------------+-----------------------------+---------+-------------+--------------------
 id          | uuid                        |         | NO          | uuid_generate_v4()
 user_id     | uuid                        |         | NO          | 
 token       | character varying           |     500 | NO          | 
 ip_address  | character varying           |      45 | YES         | 
 user_agent  | text                        |         | YES         | 
 expires_at  | timestamp without time zone |         | NO          | 
 created_at  | timestamp without time zone |         | YES         | CURRENT_TIMESTAMP
(7 rows)

``n

## Table: locations

**Query:**
`sql
SELECT column_name, data_type, character_maximum_length AS max_len, is_nullable, column_default FROM information_schema.columns WHERE table_name = 'locations' ORDER BY ordinal_position;
``n
**Output:**
`	ext

 column_name |          data_type          | max_len | is_nullable |   column_default   
-------------+-----------------------------+---------+-------------+--------------------
 id          | uuid                        |         | NO          | uuid_generate_v4()
 code        | character varying           |      50 | NO          | 
 name        | character varying           |     255 | NO          | 
 type        | character varying           |      50 | NO          | 
 address     | text                        |         | YES         | 
 city        | character varying           |     100 | YES         | 
 state       | character varying           |     100 | YES         | 
 postal_code | character varying           |      20 | YES         | 
 country     | character varying           |     100 | YES         | 
 phone       | character varying           |      20 | YES         | 
 email       | character varying           |     255 | YES         | 
 manager_id  | uuid                        |         | YES         | 
 is_active   | boolean                     |         | YES         | true
 created_at  | timestamp without time zone |         | YES         | CURRENT_TIMESTAMP
 updated_at  | timestamp without time zone |         | YES         | CURRENT_TIMESTAMP
(15 rows)

``n

## Table: categories

**Query:**
`sql
SELECT column_name, data_type, character_maximum_length AS max_len, is_nullable, column_default FROM information_schema.columns WHERE table_name = 'categories' ORDER BY ordinal_position;
``n
**Output:**
`	ext

 column_name |          data_type          | max_len | is_nullable |   column_default   
-------------+-----------------------------+---------+-------------+--------------------
 id          | uuid                        |         | NO          | uuid_generate_v4()
 name        | character varying           |     255 | NO          | 
 description | text                        |         | YES         | 
 parent_id   | uuid                        |         | YES         | 
 sort_order  | integer                     |         | YES         | 0
 is_active   | boolean                     |         | YES         | true
 created_at  | timestamp without time zone |         | YES         | CURRENT_TIMESTAMP
 updated_at  | timestamp without time zone |         | YES         | CURRENT_TIMESTAMP
(8 rows)

``n

## Table: products

**Query:**
`sql
SELECT column_name, data_type, character_maximum_length AS max_len, is_nullable, column_default FROM information_schema.columns WHERE table_name = 'products' ORDER BY ordinal_position;
``n
**Output:**
`	ext

   column_name    |          data_type          | max_len | is_nullable |       column_default       
------------------+-----------------------------+---------+-------------+----------------------------
 id               | uuid                        |         | NO          | uuid_generate_v4()
 sku              | character varying           |     100 | NO          | 
 barcode          | character varying           |     100 | YES         | 
 rfid_tag         | character varying           |     100 | YES         | 
 name             | character varying           |     255 | NO          | 
 description      | text                        |         | YES         | 
 category_id      | uuid                        |         | YES         | 
 unit_of_measure  | character varying           |      20 | YES         | 'piece'::character varying
 unit_price       | numeric                     |         | NO          | 
 cost_price       | numeric                     |         | YES         | 
 weight           | numeric                     |         | YES         | 
 dimensions       | jsonb                       |         | YES         | 
 min_stock_level  | integer                     |         | YES         | 0
 max_stock_level  | integer                     |         | YES         | 
 reorder_point    | integer                     |         | YES         | 
 reorder_quantity | integer                     |         | YES         | 
 is_active        | boolean                     |         | YES         | true
 created_at       | timestamp without time zone |         | YES         | CURRENT_TIMESTAMP
 updated_at       | timestamp without time zone |         | YES         | CURRENT_TIMESTAMP
 created_by       | uuid                        |         | YES         | 
 updated_by       | uuid                        |         | YES         | 
(21 rows)

``n

## Table: product_images

**Query:**
`sql
SELECT column_name, data_type, character_maximum_length AS max_len, is_nullable, column_default FROM information_schema.columns WHERE table_name = 'product_images' ORDER BY ordinal_position;
``n
**Output:**
`	ext

 column_name |          data_type          | max_len | is_nullable |   column_default   
-------------+-----------------------------+---------+-------------+--------------------
 id          | uuid                        |         | NO          | uuid_generate_v4()
 product_id  | uuid                        |         | NO          | 
 image_url   | character varying           |     500 | NO          | 
 is_primary  | boolean                     |         | YES         | false
 sort_order  | integer                     |         | YES         | 0
 created_at  | timestamp without time zone |         | YES         | CURRENT_TIMESTAMP
(6 rows)

``n

## Table: inventory

**Query:**
`sql
SELECT column_name, data_type, character_maximum_length AS max_len, is_nullable, column_default FROM information_schema.columns WHERE table_name = 'inventory' ORDER BY ordinal_position;
``n
**Output:**
`	ext

      column_name       |          data_type          | max_len | is_nullable |   column_default   
------------------------+-----------------------------+---------+-------------+--------------------
 id                     | uuid                        |         | NO          | uuid_generate_v4()
 product_id             | uuid                        |         | NO          | 
 location_id            | uuid                        |         | NO          | 
 quantity_available     | integer                     |         | YES         | 0
 quantity_reserved      | integer                     |         | YES         | 0
 quantity_in_transit    | integer                     |         | YES         | 0
 last_counted_at        | timestamp without time zone |         | YES         | 
 last_counted_by        | uuid                        |         | YES         | 
 last_adjustment_reason | character varying           |     255 | YES         | 
 updated_by             | uuid                        |         | YES         | 
 created_at             | timestamp without time zone |         | YES         | CURRENT_TIMESTAMP
 updated_at             | timestamp without time zone |         | YES         | CURRENT_TIMESTAMP
(12 rows)

``n

## Table: inventory_transactions

**Query:**
`sql
SELECT column_name, data_type, character_maximum_length AS max_len, is_nullable, column_default FROM information_schema.columns WHERE table_name = 'inventory_transactions' ORDER BY ordinal_position;
``n
**Output:**
`	ext

   column_name    |          data_type          | max_len | is_nullable |   column_default   
------------------+-----------------------------+---------+-------------+--------------------
 id               | uuid                        |         | NO          | uuid_generate_v4()
 product_id       | uuid                        |         | NO          | 
 location_id      | uuid                        |         | NO          | 
 transaction_type | character varying           |      50 | NO          | 
 quantity         | integer                     |         | NO          | 
 unit_cost        | numeric                     |         | YES         | 
 reference_type   | character varying           |      50 | YES         | 
 reference_id     | uuid                        |         | YES         | 
 notes            | text                        |         | YES         | 
 created_at       | timestamp without time zone |         | YES         | CURRENT_TIMESTAMP
 created_by       | uuid                        |         | YES         | 
(11 rows)

``n

## Table: stock_adjustments

**Query:**
`sql
SELECT column_name, data_type, character_maximum_length AS max_len, is_nullable, column_default FROM information_schema.columns WHERE table_name = 'stock_adjustments' ORDER BY ordinal_position;
``n
**Output:**
`	ext

     column_name     |          data_type          | max_len | is_nullable |        column_default        
---------------------+-----------------------------+---------+-------------+------------------------------
 id                  | uuid                        |         | NO          | uuid_generate_v4()
 product_id          | uuid                        |         | NO          | 
 location_id         | uuid                        |         | NO          | 
 adjustment_quantity | integer                     |         | NO          | 
 reason              | character varying           |     100 | NO          | 
 notes               | text                        |         | YES         | 
 approved_by         | uuid                        |         | YES         | 
 approved_at         | timestamp without time zone |         | YES         | 
 status              | character varying           |      50 | YES         | 'pending'::character varying
 created_at          | timestamp without time zone |         | YES         | CURRENT_TIMESTAMP
 created_by          | uuid                        |         | YES         | 
(11 rows)

``n

## Table: stock_transfers

**Query:**
`sql
SELECT column_name, data_type, character_maximum_length AS max_len, is_nullable, column_default FROM information_schema.columns WHERE table_name = 'stock_transfers' ORDER BY ordinal_position;
``n
**Output:**
`	ext

   column_name    |          data_type          | max_len | is_nullable |        column_default        
------------------+-----------------------------+---------+-------------+------------------------------
 id               | uuid                        |         | NO          | uuid_generate_v4()
 transfer_number  | character varying           |      50 | NO          | 
 from_location_id | uuid                        |         | NO          | 
 to_location_id   | uuid                        |         | NO          | 
 status           | character varying           |      50 | YES         | 'pending'::character varying
 notes            | text                        |         | YES         | 
 sent_at          | timestamp without time zone |         | YES         | 
 sent_by          | uuid                        |         | YES         | 
 received_at      | timestamp without time zone |         | YES         | 
 received_by      | uuid                        |         | YES         | 
 created_at       | timestamp without time zone |         | YES         | CURRENT_TIMESTAMP
 created_by       | uuid                        |         | YES         | 
(12 rows)

``n

## Table: stock_transfer_items

**Query:**
`sql
SELECT column_name, data_type, character_maximum_length AS max_len, is_nullable, column_default FROM information_schema.columns WHERE table_name = 'stock_transfer_items' ORDER BY ordinal_position;
``n
**Output:**
`	ext

    column_name    |          data_type          | max_len | is_nullable |   column_default   
-------------------+-----------------------------+---------+-------------+--------------------
 id                | uuid                        |         | NO          | uuid_generate_v4()
 transfer_id       | uuid                        |         | NO          | 
 product_id        | uuid                        |         | NO          | 
 quantity_sent     | integer                     |         | NO          | 
 quantity_received | integer                     |         | YES         | 
 notes             | text                        |         | YES         | 
 created_at        | timestamp without time zone |         | YES         | CURRENT_TIMESTAMP
(7 rows)

``n

## Table: suppliers

**Query:**
`sql
SELECT column_name, data_type, character_maximum_length AS max_len, is_nullable, column_default FROM information_schema.columns WHERE table_name = 'suppliers' ORDER BY ordinal_position;
``n
**Output:**
`	ext

  column_name   |          data_type          | max_len | is_nullable |   column_default   
----------------+-----------------------------+---------+-------------+--------------------
 id             | uuid                        |         | NO          | uuid_generate_v4()
 code           | character varying           |      50 | NO          | 
 name           | character varying           |     255 | NO          | 
 contact_person | character varying           |     255 | YES         | 
 email          | character varying           |     255 | YES         | 
 phone          | character varying           |      20 | YES         | 
 address        | text                        |         | YES         | 
 city           | character varying           |     100 | YES         | 
 state          | character varying           |     100 | YES         | 
 postal_code    | character varying           |      20 | YES         | 
 country        | character varying           |     100 | YES         | 
 payment_terms  | character varying           |     100 | YES         | 
 credit_limit   | numeric                     |         | YES         | 
 rating         | integer                     |         | YES         | 
 is_active      | boolean                     |         | YES         | true
 created_at     | timestamp without time zone |         | YES         | CURRENT_TIMESTAMP
 updated_at     | timestamp without time zone |         | YES         | CURRENT_TIMESTAMP
(17 rows)

``n

## Table: supplier_products

**Query:**
`sql
SELECT column_name, data_type, character_maximum_length AS max_len, is_nullable, column_default FROM information_schema.columns WHERE table_name = 'supplier_products' ORDER BY ordinal_position;
``n
**Output:**
`	ext

      column_name       |          data_type          | max_len | is_nullable |   column_default   
------------------------+-----------------------------+---------+-------------+--------------------
 id                     | uuid                        |         | NO          | uuid_generate_v4()
 supplier_id            | uuid                        |         | NO          | 
 product_id             | uuid                        |         | NO          | 
 supplier_sku           | character varying           |     100 | YES         | 
 unit_cost              | numeric                     |         | YES         | 
 lead_time_days         | integer                     |         | YES         | 
 minimum_order_quantity | integer                     |         | YES         | 
 is_preferred           | boolean                     |         | YES         | false
 created_at             | timestamp without time zone |         | YES         | CURRENT_TIMESTAMP
 updated_at             | timestamp without time zone |         | YES         | CURRENT_TIMESTAMP
(10 rows)

``n

## Table: purchase_orders

**Query:**
`sql
SELECT column_name, data_type, character_maximum_length AS max_len, is_nullable, column_default FROM information_schema.columns WHERE table_name = 'purchase_orders' ORDER BY ordinal_position;
``n
**Output:**
`	ext

      column_name       |          data_type          | max_len | is_nullable |       column_default       
------------------------+-----------------------------+---------+-------------+----------------------------
 id                     | uuid                        |         | NO          | uuid_generate_v4()
 po_number              | character varying           |      50 | NO          | 
 supplier_id            | uuid                        |         | NO          | 
 location_id            | uuid                        |         | NO          | 
 order_date             | date                        |         | NO          | 
 expected_delivery_date | date                        |         | YES         | 
 actual_delivery_date   | date                        |         | YES         | 
 status                 | character varying           |      50 | YES         | 'draft'::character varying
 subtotal               | numeric                     |         | NO          | 
 tax_amount             | numeric                     |         | YES         | 0
 shipping_cost          | numeric                     |         | YES         | 0
 total_amount           | numeric                     |         | NO          | 
 notes                  | text                        |         | YES         | 
 approved_by            | uuid                        |         | YES         | 
 approved_at            | timestamp without time zone |         | YES         | 
 created_at             | timestamp without time zone |         | YES         | CURRENT_TIMESTAMP
 created_by             | uuid                        |         | YES         | 
 updated_at             | timestamp without time zone |         | YES         | CURRENT_TIMESTAMP
 updated_by             | uuid                        |         | YES         | 
(19 rows)

``n

## Table: purchase_order_items

**Query:**
`sql
SELECT column_name, data_type, character_maximum_length AS max_len, is_nullable, column_default FROM information_schema.columns WHERE table_name = 'purchase_order_items' ORDER BY ordinal_position;
``n
**Output:**
`	ext

    column_name    |          data_type          | max_len | is_nullable |   column_default   
-------------------+-----------------------------+---------+-------------+--------------------
 id                | uuid                        |         | NO          | uuid_generate_v4()
 po_id             | uuid                        |         | NO          | 
 product_id        | uuid                        |         | NO          | 
 quantity_ordered  | integer                     |         | NO          | 
 quantity_received | integer                     |         | YES         | 0
 unit_cost         | numeric                     |         | NO          | 
 total_cost        | numeric                     |         | NO          | 
 notes             | text                        |         | YES         | 
 created_at        | timestamp without time zone |         | YES         | CURRENT_TIMESTAMP
(9 rows)

``n

## Table: customers

**Query:**
`sql
SELECT column_name, data_type, character_maximum_length AS max_len, is_nullable, column_default FROM information_schema.columns WHERE table_name = 'customers' ORDER BY ordinal_position;
``n
**Output:**
`	ext

   column_name   |          data_type          | max_len | is_nullable |   column_default   
-----------------+-----------------------------+---------+-------------+--------------------
 id              | uuid                        |         | NO          | uuid_generate_v4()
 customer_number | character varying           |      50 | NO          | 
 first_name      | character varying           |     100 | NO          | 
 last_name       | character varying           |     100 | NO          | 
 email           | character varying           |     255 | YES         | 
 phone           | character varying           |      20 | YES         | 
 address         | text                        |         | YES         | 
 city            | character varying           |     100 | YES         | 
 state           | character varying           |     100 | YES         | 
 postal_code     | character varying           |      20 | YES         | 
 country         | character varying           |     100 | YES         | 
 customer_type   | character varying           |      50 | YES         | 
 credit_limit    | numeric                     |         | YES         | 
 is_active       | boolean                     |         | YES         | true
 created_at      | timestamp without time zone |         | YES         | CURRENT_TIMESTAMP
 updated_at      | timestamp without time zone |         | YES         | CURRENT_TIMESTAMP
(16 rows)

``n

## Table: sales_orders

**Query:**
`sql
SELECT column_name, data_type, character_maximum_length AS max_len, is_nullable, column_default FROM information_schema.columns WHERE table_name = 'sales_orders' ORDER BY ordinal_position;
``n
**Output:**
`	ext

   column_name    |          data_type          | max_len | is_nullable |        column_default        
------------------+-----------------------------+---------+-------------+------------------------------
 id               | uuid                        |         | NO          | uuid_generate_v4()
 order_number     | character varying           |      50 | NO          | 
 customer_id      | uuid                        |         | YES         | 
 location_id      | uuid                        |         | NO          | 
 order_date       | timestamp without time zone |         | YES         | CURRENT_TIMESTAMP
 required_date    | date                        |         | YES         | 
 shipped_date     | timestamp without time zone |         | YES         | 
 status           | character varying           |      50 | YES         | 'pending'::character varying
 subtotal         | numeric                     |         | NO          | 
 tax_amount       | numeric                     |         | YES         | 0
 discount_amount  | numeric                     |         | YES         | 0
 shipping_cost    | numeric                     |         | YES         | 0
 total_amount     | numeric                     |         | NO          | 
 payment_status   | character varying           |      50 | YES         | 'unpaid'::character varying
 shipping_address | text                        |         | YES         | 
 notes            | text                        |         | YES         | 
 created_at       | timestamp without time zone |         | YES         | CURRENT_TIMESTAMP
 created_by       | uuid                        |         | YES         | 
 updated_at       | timestamp without time zone |         | YES         | CURRENT_TIMESTAMP
 updated_by       | uuid                        |         | YES         | 
(20 rows)

``n

## Table: sales_order_items

**Query:**
`sql
SELECT column_name, data_type, character_maximum_length AS max_len, is_nullable, column_default FROM information_schema.columns WHERE table_name = 'sales_order_items' ORDER BY ordinal_position;
``n
**Output:**
`	ext

   column_name    |          data_type          | max_len | is_nullable |   column_default   
------------------+-----------------------------+---------+-------------+--------------------
 id               | uuid                        |         | NO          | uuid_generate_v4()
 order_id         | uuid                        |         | NO          | 
 product_id       | uuid                        |         | NO          | 
 quantity         | integer                     |         | NO          | 
 unit_price       | numeric                     |         | NO          | 
 discount_percent | numeric                     |         | YES         | 0
 tax_percent      | numeric                     |         | YES         | 0
 total_price      | numeric                     |         | NO          | 
 quantity_picked  | integer                     |         | YES         | 0
 quantity_shipped | integer                     |         | YES         | 0
 notes            | text                        |         | YES         | 
 created_at       | timestamp without time zone |         | YES         | CURRENT_TIMESTAMP
(12 rows)

``n

## Table: audit_log

**Query:**
`sql
SELECT column_name, data_type, character_maximum_length AS max_len, is_nullable, column_default FROM information_schema.columns WHERE table_name = 'audit_log' ORDER BY ordinal_position;
``n
**Output:**
`	ext

 column_name |          data_type          | max_len | is_nullable |   column_default   
-------------+-----------------------------+---------+-------------+--------------------
 id          | uuid                        |         | NO          | uuid_generate_v4()
 table_name  | character varying           |     100 | NO          | 
 record_id   | uuid                        |         | NO          | 
 action      | character varying           |      20 | NO          | 
 old_values  | jsonb                       |         | YES         | 
 new_values  | jsonb                       |         | YES         | 
 user_id     | uuid                        |         | YES         | 
 ip_address  | character varying           |      45 | YES         | 
 created_at  | timestamp without time zone |         | YES         | CURRENT_TIMESTAMP
(9 rows)

``n

