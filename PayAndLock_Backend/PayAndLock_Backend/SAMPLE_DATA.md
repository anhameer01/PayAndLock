# Sample Test Data for PayAndLock Backend APIs

## API Base URL
```
http://localhost:5014
```

---

## 1. AUTH ENDPOINTS

### 1.1 Register Admin
**Endpoint:** `POST /api/auth/register-admin`
**Authorization:** Not required

**Request Body:**
```json
{
  "loginId": "admin@payandlock",
  "password": "Admin@123"
}
```

**cURL:**
```bash
curl -X POST http://localhost:5014/api/auth/register-admin \
  -H "Content-Type: application/json" \
  -d '{
    "loginId": "admin@payandlock",
    "password": "Admin@123"
  }'
```

**Expected Response:** 
```json
{
  "message": "Admin created successfully"
}
```

---

### 1.2 Login
**Endpoint:** `POST /api/auth/login`
**Authorization:** Not required

**Request Body:**
```json
{
  "loginId": "admin@payandlock",
  "password": "Admin@123"
}
```

**cURL:**
```bash
curl -X POST http://localhost:5014/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "loginId": "admin@payandlock",
    "password": "Admin@123"
  }'
```

**Expected Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "role": "SuperAdmin",
  "fullName": "Super Admin",
  "userId": "550e8400-e29b-41d4-a716-446655440000"
}
```

---

## 2. EMPLOYEE ENDPOINTS

### Sample User IDs (For Reference)
- Admin ID: `550e8400-e29b-41d4-a716-446655440000` (Generated from register-admin)
- State Head ID: `550e8400-e29b-41d4-a716-446655440001`
- BDM/Employee ID: `550e8400-e29b-41d4-a716-446655440002`

### 2.1 Create Employee
**Endpoint:** `POST /api/employee`
**Authorization:** Required (SuperAdmin, StateHead, or ASM role)
**Token:** Use token from login response

**Request Body:**
```json
{
  "fullName": "Rajesh Kumar",
  "loginId": "rajesh.kumar",
  "mobile": "9876543210",
  "password": "Employee@123",
  "role": "BDM",
  "address": "123 Main Street",
  "state": "Maharashtra",
  "city": "Mumbai",
  "monthlyTarget": 50,
  "managerId": "550e8400-e29b-41d4-a716-446655440000"
}
```

**cURL:**
```bash
curl -X POST http://localhost:5014/api/employee \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "fullName": "Rajesh Kumar",
    "loginId": "rajesh.kumar",
    "mobile": "9876543210",
    "password": "Employee@123",
    "role": "BDM",
    "address": "123 Main Street",
    "state": "Maharashtra",
    "city": "Mumbai",
    "monthlyTarget": 50,
    "managerId": "550e8400-e29b-41d4-a716-446655440000"
  }'
```

**Expected Response:**
```json
{
  "message": "Employee created",
  "id": "550e8400-e29b-41d4-a716-446655440002"
}
```

### 2.2 Create Additional Employees (Sample Data)

**Employee 2:**
```json
{
  "fullName": "Priya Singh",
  "loginId": "priya.singh",
  "mobile": "8765432109",
  "password": "Employee@123",
  "role": "StateHead",
  "address": "456 Oak Avenue",
  "state": "Karnataka",
  "city": "Bangalore",
  "monthlyTarget": 100,
  "managerId": null
}
```

**Employee 3:**
```json
{
  "fullName": "Amit Patel",
  "loginId": "amit.patel",
  "mobile": "7654321098",
  "password": "Employee@123",
  "role": "ASM",
  "address": "789 Pine Road",
  "state": "Gujarat",
  "city": "Ahmedabad",
  "monthlyTarget": 75,
  "managerId": "550e8400-e29b-41d4-a716-446655440001"
}
```

**Employee 4 (BDM):**
```json
{
  "fullName": "Isha Verma",
  "loginId": "isha.verma",
  "mobile": "6543210987",
  "password": "Employee@123",
  "role": "BDM",
  "address": "321 Elm Street",
  "state": "Delhi",
  "city": "New Delhi",
  "monthlyTarget": 40,
  "managerId": "550e8400-e29b-41d4-a716-446655440001"
}
```

---

### 2.3 Get All Employees
**Endpoint:** `GET /api/employee`
**Authorization:** Required

**cURL:**
```bash
curl -X GET http://localhost:5014/api/employee \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Expected Response:**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440002",
    "fullName": "Rajesh Kumar",
    "role": "BDM",
    "mobile": "9876543210",
    "state": "Maharashtra",
    "city": "Mumbai",
    "monthlyTarget": 50,
    "managerName": "Super Admin",
    "profilePictureUrl": null,
    "isActive": true
  }
]
```

---

### 2.4 Get Employee by ID
**Endpoint:** `GET /api/employee/{id}`
**Authorization:** Required

**cURL:**
```bash
curl -X GET http://localhost:5014/api/employee/550e8400-e29b-41d4-a716-446655440002 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

### 2.5 Update Employee
**Endpoint:** `PUT /api/employee/{id}`
**Authorization:** Required (SuperAdmin, StateHead, or ASM role)

**Request Body:**
```json
{
  "fullName": "Rajesh Kumar Singh",
  "loginId": "rajesh.kumar",
  "mobile": "9876543210",
  "password": "Employee@123",
  "role": "BDM",
  "address": "123 Main Street, Apt 4B",
  "state": "Maharashtra",
  "city": "Mumbai",
  "monthlyTarget": 60,
  "managerId": "550e8400-e29b-41d4-a716-446655440000"
}
```

**cURL:**
```bash
curl -X PUT http://localhost:5014/api/employee/550e8400-e29b-41d4-a716-446655440002 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "fullName": "Rajesh Kumar Singh",
    "loginId": "rajesh.kumar",
    "mobile": "9876543210",
    "password": "Employee@123",
    "role": "BDM",
    "address": "123 Main Street, Apt 4B",
    "state": "Maharashtra",
    "city": "Mumbai",
    "monthlyTarget": 60,
    "managerId": "550e8400-e29b-41d4-a716-446655440000"
  }'
```

---

## 3. RETAILER ENDPOINTS

### 3.1 Create Retailer
**Endpoint:** `POST /api/retailer`
**Authorization:** Required

**Request Body:**
```json
{
  "shopName": "Electronics Plus",
  "ownerName": "Vikram Sethi",
  "mobile": "9988776655",
  "alternateMobile": "9988776654",
  "address": "Shop No. 5, City mall",
  "city": "Mumbai",
  "state": "Maharashtra",
  "assignedBdmId": "550e8400-e29b-41d4-a716-446655440002",
  "installDate": "2025-01-15",
  "status": "Active"
}
```

**cURL:**
```bash
curl -X POST http://localhost:5014/api/retailer \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "shopName": "Electronics Plus",
    "ownerName": "Vikram Sethi",
    "mobile": "9988776655",
    "alternateMobile": "9988776654",
    "address": "Shop No. 5, City mall",
    "city": "Mumbai",
    "state": "Maharashtra",
    "assignedBdmId": "550e8400-e29b-41d4-a716-446655440002",
    "installDate": "2025-01-15",
    "status": "Active"
  }'
```

**Expected Response:**
```json
{
  "message": "Retailer created",
  "id": "550e8400-e29b-41d4-a716-446655441000"
}
```

### 3.2 Create Additional Retailers (Sample Data)

**Retailer 2:**
```json
{
  "shopName": "Fashion Hub",
  "ownerName": "Neha Kapoor",
  "mobile": "9877665544",
  "alternateMobile": "9877665543",
  "address": "A-Block, Market Street",
  "city": "Bangalore",
  "state": "Karnataka",
  "assignedBdmId": "550e8400-e29b-41d4-a716-446655440002",
  "installDate": "2025-02-01",
  "status": "Active"
}
```

**Retailer 3:**
```json
{
  "shopName": "Home Furnishing Co",
  "ownerName": "Rohan Desai",
  "mobile": "9966554433",
  "alternateMobile": "9966554432",
  "address": "Ground Floor, Rajiv Complex",
  "city": "Delhi",
  "state": "Delhi",
  "assignedBdmId": "550e8400-e29b-41d4-a716-446655440002",
  "installDate": "2025-01-20",
  "status": "Active"
}
```

**Retailer 4:**
```json
{
  "shopName": "Tech World",
  "ownerName": "Sanjay Mehta",
  "mobile": "9955443322",
  "alternateMobile": "9955443321",
  "address": "Plot 12, Industrial Area",
  "city": "Ahmedabad",
  "state": "Gujarat",
  "assignedBdmId": "550e8400-e29b-41d4-a716-446655440001",
  "installDate": "2025-02-10",
  "status": "Active"
}
```

---

### 3.3 Get All Retailers
**Endpoint:** `GET /api/retailer`
**Authorization:** Required

**Query Parameters (Optional):**
- `city`: Filter by city
- `state`: Filter by state
- `search`: Search by shop name, owner name, or mobile
- `page`: Page number (default: 1)
- `pageSize`: Records per page (default: 20)

**cURL (Basic):**
```bash
curl -X GET http://localhost:5014/api/retailer \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**cURL (With Filters):**
```bash
curl -X GET "http://localhost:5014/api/retailer?city=Mumbai&state=Maharashtra&page=1&pageSize=10" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**cURL (Search):**
```bash
curl -X GET "http://localhost:5014/api/retailer?search=Electronics" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

### 3.4 Get Retailer by ID
**Endpoint:** `GET /api/retailer/{id}`
**Authorization:** Required

**cURL:**
```bash
curl -X GET http://localhost:5014/api/retailer/550e8400-e29b-41d4-a716-446655441000 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

### 3.5 Update Retailer
**Endpoint:** `PUT /api/retailer/{id}`
**Authorization:** Required

**Request Body:**
```json
{
  "shopName": "Electronics Plus Premium",
  "ownerName": "Vikram Sethi",
  "mobile": "9988776655",
  "alternateMobile": "9988776654",
  "address": "Shop No. 5, City mall, Level 2",
  "city": "Mumbai",
  "state": "Maharashtra",
  "status": "Active",
  "assignedBdmId": "550e8400-e29b-41d4-a716-446655440002"
}
```

**cURL:**
```bash
curl -X PUT http://localhost:5014/api/retailer/550e8400-e29b-41d4-a716-446655441000 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "shopName": "Electronics Plus Premium",
    "ownerName": "Vikram Sethi",
    "mobile": "9988776655",
    "alternateMobile": "9988776654",
    "address": "Shop No. 5, City mall, Level 2",
    "city": "Mumbai",
    "state": "Maharashtra",
    "status": "Active",
    "assignedBdmId": "550e8400-e29b-41d4-a716-446655440002"
  }'
```

---

## 4. VISIT ENDPOINTS

### 4.1 Create Visit
**Endpoint:** `POST /api/visit`
**Authorization:** Required
**Note:** EmployeeId is automatically taken from the authenticated user's token

**Request Body:**
```json
{
  "shopName": "Electronics Plus",
  "ownerName": "Vikram Sethi",
  "mobile": "9988776655",
  "alternateMobile": "9988776654",
  "address": "Shop No. 5, City mall",
  "city": "Mumbai",
  "state": "Maharashtra",
  "remarks": "Customer interested in payment solution",
  "soldKey": true,
  "latitude": 19.0760,
  "longitude": 72.8777
}
```

**cURL:**
```bash
curl -X POST http://localhost:5014/api/visit \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "shopName": "Electronics Plus",
    "ownerName": "Vikram Sethi",
    "mobile": "9988776655",
    "alternateMobile": "9988776654",
    "address": "Shop No. 5, City mall",
    "city": "Mumbai",
    "state": "Maharashtra",
    "remarks": "Customer interested in payment solution",
    "soldKey": true,
    "latitude": 19.0760,
    "longitude": 72.8777
  }'
```

**Expected Response:**
```json
{
  "message": "Visit recorded",
  "id": "550e8400-e29b-41d4-a716-446655442000"
}
```

### 4.2 Create Additional Visits (Sample Data)

**Visit 2 (No Key Sold):**
```json
{
  "shopName": "Fashion Hub",
  "ownerName": "Neha Kapoor",
  "mobile": "9877665544",
  "alternateMobile": "9877665543",
  "address": "A-Block, Market Street",
  "city": "Bangalore",
  "state": "Karnataka",
  "remarks": "Owner was not available, will follow up next week",
  "soldKey": false,
  "latitude": 12.9716,
  "longitude": 77.5946
}
```

**Visit 3 (Key Sold):**
```json
{
  "shopName": "Home Furnishing Co",
  "ownerName": "Rohan Desai",
  "mobile": "9966554433",
  "alternateMobile": "9966554432",
  "address": "Ground Floor, Rajiv Complex",
  "city": "Delhi",
  "state": "Delhi",
  "remarks": "Installation scheduled for next week",
  "soldKey": true,
  "latitude": 28.7041,
  "longitude": 77.1025
}
```

**Visit 4 (No Key Sold):**
```json
{
  "shopName": "Tech World",
  "ownerName": "Sanjay Mehta",
  "mobile": "9955443322",
  "alternateMobile": "9955443321",
  "address": "Plot 12, Industrial Area",
  "city": "Ahmedabad",
  "state": "Gujarat",
  "remarks": "Needs more time to make decision",
  "soldKey": false,
  "latitude": 23.0225,
  "longitude": 72.5714
}
```

---

### 4.3 Get All Visits
**Endpoint:** `GET /api/visit`
**Authorization:** Required

**Query Parameters (Optional):**
- `fromDate`: Filter visits from this date (ISO format: YYYY-MM-DD)
- `toDate`: Filter visits until this date (ISO format: YYYY-MM-DD)
- `employeeId`: Filter by employee ID
- `city`: Filter by city
- `state`: Filter by state
- `page`: Page number (default: 1)
- `pageSize`: Records per page (default: 20)

**cURL (Basic):**
```bash
curl -X GET http://localhost:5014/api/visit \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**cURL (With Date Range):**
```bash
curl -X GET "http://localhost:5014/api/visit?fromDate=2025-01-01&toDate=2025-03-24" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**cURL (By City):**
```bash
curl -X GET "http://localhost:5014/api/visit?city=Mumbai&page=1&pageSize=10" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 5. BILLING ENDPOINTS

### 5.1 Create Billing
**Endpoint:** `POST /api/billing`
**Authorization:** Required
**Note:** CreatedBy is automatically taken from the authenticated user's token

**Request Body:**
```json
{
  "retailerId": "550e8400-e29b-41d4-a716-446655441000",
  "shopName": "Electronics Plus",
  "ownerName": "Vikram Sethi",
  "mobile": "9988776655",
  "city": "Mumbai",
  "state": "Maharashtra",
  "deviceDetails": "POS Terminal - Model XYZ-2024",
  "billingAmount": 15999.50,
  "paymentMode": "Cash",
  "isRebilling": false
}
```

**cURL:**
```bash
curl -X POST http://localhost:5014/api/billing \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "retailerId": "550e8400-e29b-41d4-a716-446655441000",
    "shopName": "Electronics Plus",
    "ownerName": "Vikram Sethi",
    "mobile": "9988776655",
    "city": "Mumbai",
    "state": "Maharashtra",
    "deviceDetails": "POS Terminal - Model XYZ-2024",
    "billingAmount": 15999.50,
    "paymentMode": "Cash",
    "isRebilling": false
  }'
```

**Expected Response:**
```json
{
  "message": "Billing created",
  "id": "550e8400-e29b-41d4-a716-446655443000"
}
```

### 5.2 Create Additional Billings (Sample Data)

**Billing 2:**
```json
{
  "retailerId": "550e8400-e29b-41d4-a716-446655441001",
  "shopName": "Fashion Hub",
  "ownerName": "Neha Kapoor",
  "mobile": "9877665544",
  "city": "Bangalore",
  "state": "Karnataka",
  "deviceDetails": "Payment Gateway Setup",
  "billingAmount": 8999.00,
  "paymentMode": "Online",
  "isRebilling": false
}
```

**Billing 3 (Rebilling):**
```json
{
  "retailerId": "550e8400-e29b-41d4-a716-446655441002",
  "shopName": "Home Furnishing Co",
  "ownerName": "Rohan Desai",
  "mobile": "9966554433",
  "city": "Delhi",
  "state": "Delhi",
  "deviceDetails": "Annual Maintenance & Support",
  "billingAmount": 2999.99,
  "paymentMode": "Check",
  "isRebilling": true
}
```

**Billing 4:**
```json
{
  "retailerId": "550e8400-e29b-41d4-a716-446655441003",
  "shopName": "Tech World",
  "ownerName": "Sanjay Mehta",
  "mobile": "9955443322",
  "city": "Ahmedabad",
  "state": "Gujarat",
  "deviceDetails": "Integration & Training Services",
  "billingAmount": 25000.00,
  "paymentMode": "NEFT",
  "isRebilling": false
}
```

---

### 5.3 Get All Billings
**Endpoint:** `GET /api/billing`
**Authorization:** Required

**cURL:**
```bash
curl -X GET http://localhost:5014/api/billing \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

### 5.4 Get Billing by ID
**Endpoint:** `GET /api/billing/{id}`
**Authorization:** Required

**cURL:**
```bash
curl -X GET http://localhost:5014/api/billing/550e8400-e29b-41d4-a716-446655443000 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 6. DASHBOARD ENDPOINTS

### 6.1 Get Dashboard
**Endpoint:** `GET /api/dashboard`
**Authorization:** Required
**Note:** Respects user role. BDM sees only their data; Admin sees all data

**cURL:**
```bash
curl -X GET http://localhost:5014/api/dashboard \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Expected Response:**
```json
{
  "totalVisits": 45,
  "totalRetailers": 12,
  "monthlyTarget": 250,
  "targetAchieved": 180,
  "remainingTarget": 70,
  "salesByEmployee": [
    {
      "employeeName": "Rajesh Kumar",
      "target": 50,
      "achieved": 42
    },
    {
      "employeeName": "Isha Verma",
      "target": 40,
      "achieved": 38
    }
  ],
  "monthlySalesTrend": [
    {
      "month": "1",
      "sales": 60
    },
    {
      "month": "2",
      "sales": 80
    },
    {
      "month": "3",
      "sales": 40
    }
  ]
}
```

---

## Testing Workflow

### Step 1: Register Admin
```bash
curl -X POST http://localhost:5014/api/auth/register-admin \
  -H "Content-Type: application/json" \
  -d '{"loginId": "admin@payandlock", "password": "Admin@123"}'
```

### Step 2: Login as Admin
```bash
curl -X POST http://localhost:5014/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"loginId": "admin@payandlock", "password": "Admin@123"}'
```
Save the token from response

### Step 3: Create Employees
Use the token in Authorization header to create employees

### Step 4: Create Retailers
Use the token and employee IDs to create retailers

### Step 5: Login as Employee (BDM)
Create separate credentials and login to get employee token

### Step 6: Create Visits
Use employee token to create visits

### Step 7: Create Billings
Use employee token to create billings

### Step 8: View Dashboard
Use any token to view dashboard based on role

---

## Notes
- Replace `YOUR_TOKEN_HERE` with the actual JWT token from login response
- All timestamps use UTC timezone
- GUIDs are sample IDs; actual IDs will be generated by the system
- Monthly targets are compared against achieved sales from current month/year
- BDM can only see their own visits and targets
- Admin/Manager roles can see all data
