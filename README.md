# 💻 LaptopShop – E-Commerce Website  

A full-stack e-commerce platform for selling laptops.  
Built with **Node.js, Express, TypeScript, Prisma (MySQL)** for the backend and **EJS + CSS + Bootstrap 5** for the frontend.  

---

## 🚀 Features  

### 👤 User Side (Client)  
- User authentication (Sign up, Login, Logout) with JWT + bcrypt  
- Browse products with search, filters (brand, price range, discount)  
- Product details with images and rich text description (Quill editor)  
- Add to Cart, Update Cart, Checkout with order confirmation  
- COD payment simulation & order tracking  

### 🛠️ Admin Side (Dashboard)  
- Manage Users (CRUD with avatar upload – Multer)  
- Manage Products (CRUD with multiple images, discount, description)  
- Manage Orders (view, update status: Pending → Shipping → Completed)  
- Manage Cart & Cart Details  
- Analytics (total products, orders, users, revenue overview)  

---

## 🏗️ Tech Stack  

- **Backend:** Node.js, Express.js, TypeScript  
- **Database:** MySQL with Prisma ORM  
- **Frontend:** EJS, Bootstrap 5, Custom CSS  
- **Authentication:** JWT, bcrypt, express-session, @quixo3/prisma-session-store  
- **File Uploads:** Multer (avatars, product images)  
- **Deployment:** Railway / Firebase Hosting / Ngrok (for local testing)  

---

## 📂 Project Structure  

LaptopShop/
│── src/
│ ├── controllers/ # Business logic (User, Product, Order, Cart)
│ ├── routers/ # Routes (admin + client)
│ ├── services/ # Database services (Prisma)
│ ├── middlewares/ # Auth & error handling
│ ├── views/ # EJS templates
│ ├── public/ # CSS, JS, images
│ └── server.ts # App entry
│
├── prisma/
│ ├── schema.prisma # Database schema
│ └── migrations/ # Prisma migrations
│
├── package.json
├── tsconfig.json
└── README.md

---

## ⚡ Getting Started  

### 1️⃣ Clone repo  
```bash
git clone https://github.com/yourusername/laptopshop.git
cd laptopshop
```

### 2️⃣ Install dependencies
```npm install```

### 3️⃣ Setup database
Create a MySQL database
Update .env with your credentials:

```DATABASE_URL="mysql://user:password@localhost:3306/laptopshop"```

### 4️⃣ Run migrations
```npx prisma migrate dev --name init_project```

### 5️⃣ Start server
```
npm run dev   # Development mode
npm run build && npm start   # Production mode
```
## 📸 Screenshots  
### 🏠 Home Page  
![Home Page](./screenshots/home-page.png)  
### 📦 Product Management  
![Product Management](./screenshots/product-management.png)  

## 📌 Roadmap
 Add online payment integration (VNPay, PayPal)
 Add product reviews & ratings
 Improve admin dashboard with charts (Recharts / Chart.js)
 Deploy frontend separately with React (future plan)

 ##👨‍💻 Author

Nguyễn Văn Đạt
Backend Developer Intern
🌍 Vietnam
📫 vandat0709.se@gmail.com
