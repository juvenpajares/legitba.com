# Fact Check Website with Svelte & Express

This project is a **Fact Check Website** that allows users to search and verify claims using **Google's Fact Check API**. It is built with a **SvelteKit frontend** and an **Express.js backend**, providing a seamless experience for users to check the credibility of news and information.

## 📌 Features
- **Search & Verify**: Users can enter keywords to fetch fact-checked claims.
- **Google Fact Check API**: Integrates with Google's API for reliable results.
- **Interactive UI**: A responsive and user-friendly interface built with Svelte.
- **Express Backend**: Manages API requests and serves data securely.
- **CORS Enabled**: Ensures smooth frontend-backend communication.
- **Proxy Setup**: Facilitates local development without CORS issues.

---

## 🚀 Installation
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/fact-check-website.git
cd fact-check-website
```

### 2️⃣ Setup Backend (Express.js)
```sh
cd backend
npm install
```
#### Configure API Key:
Create a **`.env`** file in `backend` and add:
```sh
GOOGLE_FACTCHECK_API_KEY=your_google_api_key
```

Run the server:
```sh
node server.js
```

> The backend should run on `http://localhost:8080`

---

### 3️⃣ Setup Frontend (SvelteKit)
```sh
cd frontend
npm install
```
#### Configure Vite Proxy:
Update `vite.config.js` to forward requests to the backend:
```js
server: {
    proxy: {
        '/api': 'http://localhost:8080'
    }
}
```
Run the frontend:
```sh
npm run dev
```
> The website should be available at `http://localhost:5173`

---

## 📡 How It Works
### 1️⃣ User Searches for a Claim
Users enter a keyword or phrase in the search bar.

### 2️⃣ Backend Fetches Data
The Express backend queries **Google's Fact Check API** with the search term.

### 3️⃣ Results Are Displayed
The frontend shows fact-check results, including claim reviews, publishers, and ratings.

---

## 🏗 Deployment
### **Backend (Express) on Render/Vercel**
1. Deploy the `backend` folder to [Render](https://render.com) or [Vercel](https://vercel.com).
2. Set the environment variable `GOOGLE_FACTCHECK_API_KEY` in deployment settings.

### **Frontend (SvelteKit) on Vercel/Netlify**
1. Deploy the `frontend` folder to [Vercel](https://vercel.com) or [Netlify](https://www.netlify.com).
2. Update the API URL in your `.env` file or SvelteKit store.

---

## 🛠 Troubleshooting
- **CORS issues?** Use `cors` middleware in `server.js`.
- **Port conflicts?** Run `lsof -i :8080` to check running services.
- **API key error?** Ensure your Google Fact Check API key is valid.

---

## 🤝 Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit changes (`git commit -m "Added feature X"`)
4. Push to GitHub and create a pull request

---

## 📜 License
This project is licensed under the MIT License.

