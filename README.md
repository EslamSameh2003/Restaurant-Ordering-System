# 🍽️ Restaurant Ordering System – Backend

A RESTful API for an online restaurant ordering system, built with **Node.js, Express.js, MySQL, and Sequelize ORM**.

The system provides user authentication, food and category management, shopping cart operations, order processing, and discount management, with role-based access control and request validation.

## 🚀 Features

### 🔐 Authentication & Authorization
- User registration and login.
- Password hashing using bcrypt.
- JWT-based authentication.
- Role-based access control (User / Admin).

### 📂 Category Management
- Create, retrieve, update, and delete categories.
- Admin-only category management.
- Retrieve all categories or a specific category.

### 🍔 Food Management
- Create, retrieve, update, and delete food items.
- Associate food items with categories.
- Admin-only food management.
- Retrieve all food items or a specific item.

### 🛒 Shopping Cart
- Add food items to the cart.
- Update item quantities.
- Remove individual items.
- Clear the entire cart.
- Automatically increase quantity when adding an existing item.

### 📦 Order Management
- Create orders from the user's cart.
- Retrieve personal orders.
- Admin access to all orders.
- Retrieve order details.
- Cancel pending orders.
- Admin order status management.
- Database transactions to maintain data consistency.

### 🎟️ Discount Management
- Create, retrieve, update, and delete discounts.
- Support for fixed and percentage discounts.
- Minimum order amount validation.
- Maximum discount limits.
- Expiration dates.
- Active/inactive discount status.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| Node.js | JavaScript Runtime |
| Express.js | Backend Framework |
| MySQL | Relational Database |
| Sequelize ORM | Database Management |
| JWT | Authentication |
| bcrypt | Password Hashing |
| Joi | Request Validation |
| Postman | API Testing |

## 🏗️ Project Structure

```text
src/
├── DB/
│   ├── Connection.js
│   └── Models/
│       ├── associations.js
│       ├── user.js
│       ├── category.js
│       ├── food.js
│       ├── cart.js
│       ├── cartitem.js
│       ├── order.js
│       ├── orderitem.js
│       └── discount.js
│
├── Middleware/
│   ├── auth.middleware.js
│   ├── error.middleware.js
│   └── validation.middleware.js
│
├── Modules/
│   ├── auth/
│   ├── category/
│   ├── food/
│   ├── cart/
│   ├── order/
│   └── discount/
│
├── utils/
│   └── AppError.js
│
├── app.js
└── server.js
```

## 🔗 API Endpoints

Base URL:

```text
http://localhost:PORT/api
```

### Authentication – `/auth`

| Method | Endpoint | Access |
|---|---|---|
| POST | `/auth/register` | Public |
| POST | `/auth/login` | Public |

### Categories – `/categories`

| Method | Endpoint | Access |
|---|---|---|
| GET | `/categories` | Authenticated |
| GET | `/categories/:id` | Authenticated |
| POST | `/categories` | Admin |
| PATCH | `/categories/:id` | Admin |
| DELETE | `/categories/:id` | Admin |

### Food – `/food`

| Method | Endpoint | Access |
|---|---|---|
| GET | `/food` | Authenticated |
| GET | `/food/:id` | Authenticated |
| POST | `/food` | Admin |
| PATCH | `/food/:id` | Admin |
| DELETE | `/food/:id` | Admin |

### Cart – `/cart`

| Method | Endpoint | Access |
|---|---|---|
| GET | `/cart` | Authenticated |
| POST | `/cart/items` | Authenticated |
| PATCH | `/cart/items/:foodID` | Authenticated |
| DELETE | `/cart/items/:foodID` | Authenticated |
| DELETE | `/cart` | Authenticated |

### Orders – `/orders`

| Method | Endpoint | Access |
|---|---|---|
| POST | `/orders` | Authenticated |
| GET | `/orders` | Authenticated |
| GET | `/orders/all` | Admin |
| GET | `/orders/:id` | Authenticated |
| PATCH | `/orders/:id/cancel` | Authenticated |
| PATCH | `/orders/:id/status` | Admin |

### Discounts – `/discounts`

| Method | Endpoint | Access |
|---|---|---|
| POST | `/discounts` | Admin |
| GET | `/discounts` | Admin |
| GET | `/discounts/:id` | Admin |
| PATCH | `/discounts/:id` | Admin |
| DELETE | `/discounts/:id` | Admin |

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/EslamSameh2003/Restaurant-Ordering-System.git
```

### 2. Navigate to the project directory

```bash
cd Restaurant-Ordering-System
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the project root and configure your database credentials, JWT secret, and server settings according to the application's configuration.

**Important:** Never commit your `.env` file or expose your database credentials and secrets.

### 5. Configure the database

- Create a MySQL database.
- Configure the database connection.
- Ensure the Sequelize models and associations are properly initialized.

### 6. Run the application

Use the start script configured in `package.json`.

## 📋 Order Statuses

Orders support the following statuses:

- `Pending`
- `Confirmed`
- `Preparing`
- `Ready`
- `Delivered`
- `Cancelled`

The default payment method is **Cash**. Online payment integration is not currently implemented.

## 🔒 Security & Validation

- JWT authentication.
- Role-based authorization.
- Password hashing.
- Joi request validation.
- Centralized error handling.
- Protected admin operations.
- Database transactions for order creation.

## 🗺️ Database Design

The database is structured around the following entities:

- User
- Category
- Food
- Cart
- CartItem
- Order
- OrderItem
- Discount

Entity relationships are managed through Sequelize associations.

## 👨‍💻 Author

**Eslam Sameh**

Computer Science Graduate | Backend Developer | Cybersecurity Enthusiast

[GitHub Profile](https://github.com/EslamSameh2003)

---

⭐ If you find this project useful, feel free to explore the repository and provide feedback.