# Node.js RESTful API

ນີ້ເເມ່ນໂປຣເຈັກ ເພື່ອສຶກສາ RESTful API ສ້າງໂດຍ **Node.js**, **Express**, and **MySQL**. ລວມເຖິງເຟີເຈີ້ເສີມ ເຊັ່ນ authentication (JWT), role-based access, and soft-delete with restore.

## 📦 Features ຟີເຈີ້ຕ່າງໆ

- ✅ (CRUD) ສ້າງ, ອ່ານຄ່າ, ອັບເດດ ເເລະ ລົບ user
- 🔒 JWT-based authentication
- 🛡️ Role-based ຈຳກັດການເຂົ້າເຖິງໂດຍສະຖານະ (user , admin)
- 🗑️ Soft delete & restore users 
- 🌱 MySQL database  
- 📁 Project structure with controllers, routes, and config separation

## 🚀 ເປີດ ເຊີບເວີ
 

```
node index.js

```
ຫລືໃຊ້ nodemon:

```
 nodemon index.js
```

## 🔧 Installation ວິທີຕິດຕັ້ງ

```
# Clone the repository
git clone https://github.com/dee25092005/restful_api.git

# ເຂົ້າໄປຫາໂຟເດີ
cd restful_api

# ຕິດຕັ້ງ env
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


```

## 🔌 API Endpoints
```
Method	Endpoint	        Description
GET	    /users	            Get all active users
GET	    /users/deleted	    Get all deleted users
GET	    /users/:id	        Get user by ID
POST	/users	            Create a new user
PUT	    /users/:id	        Update user
DELETE	/users/:id	        Soft delete a user
POST	/users/:id/restore	Restore soft-deleted user
POST	/login	            Login user (get token)

```

## 🔐 Authentication
ເພີ່ມນີ້ເຂົ້າໄປສ່ວນທີ່ມີ protected routes:

http

Authorization: Bearer <your_token_here>

👤 Roles
admin ສາມາດໃຊ້ໄດ້ທຸກສ່ວນຂອງ endpoints

ກວດສອບສະຖານະ ໃນ authenticateRole middleware



🎯 ເຈົ້າຂອງ
Name: ພອນປະເສີດ ພົມມະເທບ

GitHub: @dee25092005