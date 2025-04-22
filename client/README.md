Here's the `README.md` file specifically for the **frontend** folder of your full-stack intern assignment:

---

```md
# 🧩 Frontend – Full-Stack Intern Assignment

This is the **frontend** of the Full-Stack Intern Assignment, built with **React 19**, **TypeScript**, and **Vite**. It converts the provided Figma design into a fully functional, responsive UI. It includes form validation, type-safe API communication, and modern state/data management.

---

## ⚙️ Tech Stack

- ⚛️ **React 19** with Vite
- 🔠 **TypeScript**
- ✅ **Zod** – schema validation
- 📝 **React Hook Form** – form management
- 🔁 **React Query** – data fetching & caching
- 🎨 **Tailwind CSS** (if applicable)

---

## 🗂️ Project Structure

```plaintext
src/
├── components/      # Reusable, modular UI components
├── hooks/           # Custom hooks for business logic
├── api/             # API interaction logic (React Query)
├── schemas/         # Zod validation schemas
├── types/           # TypeScript types and interfaces
├── pages/           # Main page components
└── main.tsx         # App entry point
```

---

## 💡 Features

- ✅ Fully implemented **Figma UI design**
- 🔐 Form validation using **Zod + React Hook Form**
- 🔄 Data management via **React Query**
- 🧠 Clean separation of **UI**, **logic**, and **API**
- 🧾 **Type-safe** code throughout using interfaces and types
- ❌ Friendly **error messages** for validation and API failures

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
cd client
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

App will be available on [http://localhost:5173](http://localhost:5173) by default.

---

## 🔍 Testing Features

- Register and login using the UI
- Try submitting invalid inputs to test form validation
- Inspect React Query devtools (if installed) and browser console for API communication
- Check how the UI handles different error cases

---

## 📁 Environment Variables

If needed, create a `.env` file in the root of `client/` with:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

Make sure it matches the backend port.

---

## 📌 Requirements Covered

✅ Figma design converted to components  
✅ Validation with Zod + React Hook Form  
✅ React Query for API communication  
✅ Type-safe data handling  
✅ Full error handling  

---

## 👤 Author

**Vala Divyarajsinh**  
