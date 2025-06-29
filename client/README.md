# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.




# Book Inventory Builder

An AI-powered web app that lets educators, librarians, and book collectors upload or capture book covers and automatically extract key details using **Google Gemini Vision AI**. Easily review, edit, and save your book collection into a database — all through a simple, responsive interface.

---

## Features

- Drag & drop or use camera to upload book cover
- Gemini Vision AI extracts:
  - Title
  - Author
  - Grade Level
  - Subject
  - Series
  - Price
  - Editable AI-suggested fields
  -Save books to MongoDB Atlas
  - Browse inventory in a clean grid view
  - Uses Gemini Pro to fill in missing info using the book title

---

## Real-World Use Cases

- **Teachers**: Digitize classroom libraries quickly
- **Librarians**: Convert physical book records into a digital system
- **Bookstores**: Rapidly catalog new stock using AI
- **Book Drives**: Maintain organized, searchable digital inventory

---

## Tech Stack

| Layer       | Technology                 |
|-------------|----------------------------|
| Frontend    | React, Tailwind CSS        |
| Backend     | Node.js, Express.js        |
| AI          | Google Gemini Vision + Pro |
| Database    | MongoDB Atlas              |
| Tools       | Multer, Axios, Vite        |

---

##  Setup Instructions 

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/book-inventory-builder.git
cd book-inventory-builder

```
## setup backend 
```bash
cd backend
npm install
node server.js
```

## setup frontend 
```bash
cd frontend
npm install
npm run dev
```

## env file 
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_google_gemini_api_key
```

