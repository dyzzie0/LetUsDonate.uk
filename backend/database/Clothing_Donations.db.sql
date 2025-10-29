BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS "Role" (
    "role_ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "role_name" TEXT NOT NULL,
    "role_description" TEXT
);

CREATE TABLE IF NOT EXISTS "User" (
    "user_ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_Fname" TEXT NOT NULL,
    "user_Lname" TEXT NOT NULL,
    "user_email" TEXT NOT NULL UNIQUE,
    "user_password" TEXT NOT NULL,
    "role_id" INTEGER NOT NULL,
    FOREIGN KEY("role_id") REFERENCES "Role"("role_ID")
);

CREATE TABLE IF NOT EXISTS "Donor" (
    "donor_ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "donor_address" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "Charity" (
    "charity_ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "charity_name" TEXT NOT NULL,
    "charity_address" TEXT NOT NULL,
    "charity_email" TEXT NOT NULL,
    "contact_person" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "Charity_Staff" (
    "staff_ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "charity_ID" INTEGER NOT NULL,
    "user_ID" INTEGER NOT NULL,
    FOREIGN KEY("user_ID") REFERENCES "User"("user_ID"),
    FOREIGN KEY("charity_ID") REFERENCES "Charity"("charity_ID")
);

CREATE TABLE IF NOT EXISTS "Donation" (
    "donation_ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "donor_ID" INTEGER NOT NULL,
    "charity_ID" INTEGER NOT NULL,
    "donation_status" TEXT NOT NULL,
    "donation_date" TEXT NOT NULL,
    FOREIGN KEY("donor_ID") REFERENCES "Donor"("donor_ID"),
    FOREIGN KEY("charity_ID") REFERENCES "Charity"("charity_ID")
);

CREATE TABLE IF NOT EXISTS "Donation_Item" (
    "item_ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "donation_ID" INTEGER NOT NULL,
    "item_name" TEXT NOT NULL,
    "item_category" TEXT NOT NULL,
    "item_size" TEXT NOT NULL,
    "item_condition" TEXT NOT NULL,
    FOREIGN KEY("donation_ID") REFERENCES "Donation"("donation_ID")
);

CREATE TABLE IF NOT EXISTS "Inventory" (
    "inventory_ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "charity_ID" INTEGER NOT NULL,
    "item" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    FOREIGN KEY("charity_ID") REFERENCES "Charity"("charity_ID")
);

COMMIT;
