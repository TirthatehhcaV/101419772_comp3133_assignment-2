# 🧑‍💼 Employee Management System

A full-stack Employee Management System with login/signup, CRUD operations, real-time UI updates, image previews, role-based access control, and deployment to Vercel + Render.

---

## 🚀 Tech Stack

- **Frontend**: Angular (Standalone Components, Angular Material, Apollo Angular)
- **Backend**: Node.js + Express + GraphQL + Mongoose
- **Authentication**: JWT (stored in `localStorage`)
- **Database**: MongoDB Atlas
- **Deployments**:
  - **Frontend**: [Vercel](https://frontend-seven-psi-27.vercel.app/login)
  - **Backend**: [Render](https://tirth-ij4o.onrender.com)

---

## 🌐 Live Links

- **Frontend**: https://frontend-seven-psi-27.vercel.app/login
- **Backend**: https://tirth-ij4o.onrender.com

---

## 📁 Project Structure

```
employee-mgmt-project/
├── backend/
│   ├── models/
│   ├── resolvers/
│   ├── schema/
│   ├── types/
│   ├── validations/
│   ├── utils/
│   ├── index.js
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── auth/
│   │   │   ├── employees/
│   │   │   ├── services/
│   │   │   ├── app.routes.ts
│   │   │   └── app.config.ts
│   ├── angular.json
│   ├── package.json
│   └── tsconfig.json
```

---

## ✨ Features

- Signup/Login with validation
- JWT-based role-protected GraphQL API
- Add/Edit/Delete Employee
- Upload image via URL with preview
- Department + Designation search
- Stylish UI with Angular Material
- Live reload after add/edit/delete
- Fully deployed and CI-ready

---

## 🛠️ Setup Instructions

### 🔧 1. Backend

```bash
cd backend
npm install
npm run dev
```

- Create `.env`:

```
MONGO_URI=your_mongo_db_uri
JWT_SECRET=your_secret
```

- Endpoint: `http://localhost:4000/graphql`

---

### 🌐 2. Frontend

```bash
cd frontend
npm install
ng serve
```

- Update `app.config.ts` Apollo URI:

```ts
link: authLink.concat(httpLink.create({ uri: 'https://tirth-ij4o.onrender.com/graphql' }))
```

---

## 🧪 Example GraphQL Mutations

### 🔐 Login

```graphql
query {
  Login(email: "admin@mail.com", password: "123456") {
    token
    username
  }
}
```

### ➕ Add Employee

```graphql
mutation {
  AddEmployee(
    first_name: "John",
    last_name: "Doe",
    email: "john@example.com",
    gender: "Male",
    designation: "Manager",
    salary: 60000,
    date_of_joining: "2023-01-01",
    department: "HR",
    employee_photo: "https://via.placeholder.com/150"
  ) {
    id
    first_name
  }
}
```

---

## 📦 Deployment

### 🔥 Frontend on Vercel

```bash
cd frontend
npm run build
vercel --prod
```

### 🔥 Backend on Render

1. Push `backend/` folder to GitHub
2. Go to Render → New Web Service
3. Root Directory: `employee-mgmt-project/backend`
4. Start Command: `node index.js`
5. Add `.env` vars in Render dashboard

---

## 📸 Screenshots

> _Insert screenshots here for signup, list, detail view, and form_

---

## ✅ .gitignore Sample

```
# Node
node_modules/
.env
dist/
build/
coverage/
.vercel/
logs/
*.log

# Angular
.angular/
.angular-cache/
*.ngfactory.ts
*.ngstyle.ts

# OS
.DS_Store
Thumbs.db
.idea/
```

---

## 👨‍💻 Author

- **-----------------**
- GitHub: [@TirthatehhcaV](https://github.com/TirthatehhcaV)

---

## 📃 License

This project is licensed under the MIT License.# 101419772_comp3133_assignment-2
