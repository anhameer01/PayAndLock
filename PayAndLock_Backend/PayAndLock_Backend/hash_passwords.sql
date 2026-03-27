-- SQL Script to Hash Existing Plain Text Passwords
-- This script updates existing users with properly hashed passwords
-- Run this ONLY if you want to preserve existing user data

-- Example: Hash password "Admin@123" for user with LoginId "admin"
-- First, we need to update the passwords to their BCrypt hashes

-- WARNING: This requires knowing the actual passwords!
-- BCrypt hash examples:
-- Password: "Admin@123" -> Hash: "$2a$11$YOUR_BCRYPT_HASH_HERE"
-- Password: "string@123" -> Hash: "$2a$11$YOUR_BCRYPT_HASH_HERE"

-- You CANNOT reverse engineer plain text from a hash
-- So the best approach is to:
-- 1. Delete the database and start fresh, OR
-- 2. Reset all user passwords to a temporary value and ask users to change them

-- Option: Reset all passwords (users will need to change on first login)
-- UPDATE [PayAndLockDB].[dbo].[Users]
-- SET PasswordHash = '$2a$11$YOUR_TEMPORARY_HASH'
-- WHERE 1=1

-- For development/testing, to hash password "password123":
-- BCrypt.HashPassword("password123") generates a new hash each time
-- Example hash: $2a$11$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86AGR0IvhyE

-- The recommended approach is to start fresh with a clean database
-- This ensures all passwords are properly hashed from the start
