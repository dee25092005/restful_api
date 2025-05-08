# Node.js RESTful API

This is a RESTful API built with **Node.js**, **Express**, and **MySQL**. It includes features such as user authentication (JWT), role-based access, and soft-delete with restore functionality.

## 📦 Features ຟີເຈີ້ຕ່າງໆ

- ✅ (CRUD) ສ້າງ, ອ່ານຄ່າ, ອັບເດດ ເເລະ ລົບ user
- 🔒 JWT-based authentication
- 🛡️ Role-based ຈຳກັດການເຂົ້າເຖິງໂດຍສະຖານະ (user , admin)
- 🗑️ Soft delete & restore users 
- 🌱 MySQL database  
- 📁 Project structure with controllers, routes, and config separation


## 🔧 Installation ວິທີຕິດຕັ້ງ

```
# Clone the repository
git clone https://github.com/dee25092005/restful_api.git

# Navigate to the project directory
cd restful_api

# Install dependencies
npm install
⚙️ Environment Variables
Create a .env file in the root directory:

ini

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=flutternotes
DB_PORT=3306
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1h
✅ ຕ້ອງມີໄຟລນີ້ .env 

🚀 Running the Server


node index.js
or if you're using nodemon:
npx nodemon index.js

🔌 API Endpoints
Method	Endpoint	        Description
GET	    /users	            Get all active users
GET	    /users/deleted	    Get all deleted users
GET	    /users/:id	        Get user by ID
POST	/users	            Create a new user
PUT	    /users/:id	        Update user
DELETE	/users/:id	        Soft delete a user
POST	/users/:id/restore	Restore soft-deleted user
POST	/login	            Login user (get token)

🔐 Authentication
Add this header to access protected routes:

http

Authorization: Bearer <your_token_here>

👤 Roles
admin ສາມາດໃຊ້ໄດ້ທຸກສ່ວນຂອງ endpoints

ກວດສອບສະຖານະ ໃນ authenticateRole middleware



🎯 ເຈົ້າຂອງ
Name: ພອນປະເສີດ ພົມມະເທບ

GitHub: @dee25092005