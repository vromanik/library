use `library`;

INSERT INTO `user_status` (userStatus) VALUES 
('well_being'),
('debtor'),
('expelled');

INSERT INTO `service_types` (serviceTypeName) VALUES 
('read in place'),
('order book'),
('reserve'),
('take to home');

INSERT INTO `process_statuses` (processStatus) VALUES 
('request'),
('searching'),
('found'),
('not found'),
('delivering'),
('holding');