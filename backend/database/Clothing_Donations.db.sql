BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "Role" (
	"role_ID"	INTEGER NOT NULL,
	"role_name"	TEXT NOT NULL,
	"role_description"	TEXT,
	PRIMARY KEY("role_ID" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "Charity" (
	"charity_ID"	INTEGER NOT NULL,
	"charity_name"	TEXT NOT NULL,
	"charity_address"	TEXT NOT NULL,
	"charity_email"	TEXT NOT NULL,
	"contact_person"	TEXT NOT NULL,
	PRIMARY KEY("charity_ID" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "Charity_Staff" (
	"staff_ID"	INTEGER NOT NULL,
	"charity_ID"	INTEGER NOT NULL,
	"user_ID"	INTEGER NOT NULL,
	PRIMARY KEY("staff_ID" AUTOINCREMENT),
	FOREIGN KEY("charity_ID") REFERENCES "Charity"("charity_ID"),
	FOREIGN KEY("user_ID") REFERENCES "User"("user_ID")
);
CREATE TABLE IF NOT EXISTS "Donation" (
	"donation_ID"	INTEGER NOT NULL,
	"donor_ID"	INTEGER NOT NULL,
	"charity_ID"	INTEGER NOT NULL,
	"donation_status"	TEXT NOT NULL,
	"donation_date"	TEXT NOT NULL,
	PRIMARY KEY("donation_ID" AUTOINCREMENT),
	FOREIGN KEY("charity_ID") REFERENCES "Charity"("charity_ID"),
	FOREIGN KEY("donor_ID") REFERENCES "Donor"("donor_ID")
);
CREATE TABLE IF NOT EXISTS "Donation_Item" (
	"item_ID"	INTEGER NOT NULL,
	"donation_ID"	INTEGER NOT NULL,
	"item_name"	TEXT NOT NULL,
	"item_category"	TEXT NOT NULL,
	"item_size"	TEXT NOT NULL,
	"item_condition"	TEXT NOT NULL,
	"item_description"	TEXT NOT NULL,
	PRIMARY KEY("item_ID" AUTOINCREMENT),
	FOREIGN KEY("donation_ID") REFERENCES "Donation"("donation_ID")
);
CREATE TABLE IF NOT EXISTS "Inventory" (
	"inventory_ID"	INTEGER NOT NULL,
	"charity_ID"	INTEGER NOT NULL,
	"item"	TEXT NOT NULL,
	"category"	TEXT NOT NULL,
	"size"	TEXT NOT NULL,
	"quantity"	INTEGER NOT NULL,
	PRIMARY KEY("inventory_ID" AUTOINCREMENT),
	FOREIGN KEY("charity_ID") REFERENCES "Charity"("charity_ID")
);
CREATE TABLE IF NOT EXISTS "User" (
	"user_ID"	INTEGER NOT NULL,
	"user_name"	TEXT NOT NULL,
	"user_email"	TEXT NOT NULL UNIQUE,
	"user_password"	TEXT NOT NULL,
	"role_id"	INTEGER NOT NULL,
	PRIMARY KEY("user_ID" AUTOINCREMENT),
	FOREIGN KEY("role_id") REFERENCES "Role"("role_ID")
);
CREATE TABLE IF NOT EXISTS "Donor" (
	"donor_ID"	INTEGER NOT NULL,
	"donor_address"	TEXT,
	"user_ID"	INTEGER,
	PRIMARY KEY("donor_ID" AUTOINCREMENT)
);
INSERT INTO "Role" VALUES (10,'donor','A person who donates clothing or items.');
INSERT INTO "Role" VALUES (11,'charity','A registered charity receiving donations.');
INSERT INTO "Role" VALUES (12,'admin','System administrator managing users and charities.');
INSERT INTO "Charity" VALUES (2,'Helping Hands','42 Hope Street, London','contact@helpinghands.org','Sarah Brown');
INSERT INTO "Donation" VALUES (1,3,2,'Pending','2025-10-31 14:37:00');
INSERT INTO "Donation" VALUES (2,3,2,'Pending','2025-10-31 14:38:15');
INSERT INTO "Donation" VALUES (3,3,2,'Pending','2025-11-04 20:28:10');
INSERT INTO "Donation" VALUES (4,3,2,'Pending','2025-11-04 20:28:47');
INSERT INTO "Donation" VALUES (5,3,2,'Pending','2025-11-04 20:36:08');
INSERT INTO "Donation_Item" VALUES (1,1,'jacket','mens','trouser','new','ss');
INSERT INTO "Donation_Item" VALUES (2,2,'shirt','girls','trouser','like-new','hh');
INSERT INTO "Donation_Item" VALUES (3,3,'jacket','womens','shirt','like-new','ee');
INSERT INTO "Donation_Item" VALUES (4,4,'jacket','womens','jacket','like-new','mm');
INSERT INTO "Donation_Item" VALUES (5,5,'shirt','girls','shirt','like-new','rr');
INSERT INTO "User" VALUES (1,'th','donor@test.com','$2y$12$YJx7qK2FlpZpjEnyaj9AR.8YOud/.IIART09jOhIGmf4VlZoDOCM2',10);
INSERT INTO "User" VALUES (4,'test','test1@example.com','$2y$12$1w7fqzvFbZV5KjHoXXbGX.NASz2GcCkuGuil/joOAD9ibA882WGPK',10);
INSERT INTO "User" VALUES (5,'test2','tast2@mail.com','$2y$12$kFgQBwW8S/85CDgkNv2Mz.L1kTsZgAGgCxy9jHEI30noUFqG1iggK',10);
INSERT INTO "Donor" VALUES (3,'12345',4);
COMMIT;
