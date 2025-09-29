# React-C9

A collection of **React coding challenges and mini-projects**, demonstrating different features and skills in React, state management, routing, API integration, and UI development. Each feature is implemented as a separate application in this repository.

## 🧩 Projects 

1. **Simple User Authentication**

   * Signup page storing users in localStorage
   * Login page with email/password and optional third-party auth
   * Dashboard page displaying user info
   * Persistent login state using localStorage

2. **News Feed Application**

   * Paginated list of posts fetched from Strapi API
   * Search/filter posts by title or category
   * Single Post page showing full content
   * Loading indicators and error handling

3. **Weather Card Component**

   * Reusable WeatherCard component
   * Displays city, temperature, and weather condition
   * Multiple cards for different cities

4. **Random Qoute Generator**

   * Random qoute generation
   * API Intergration

## 🛠 Tech Stack

| Feature                 | Technology                   |
| ----------------------- | ---------------------------- |
| Frontend                | React, React Router          |
| UI                      | Mantine (UI library)         |
| State                   | useState, useEffect, useForm |
| Data                    | LocalStorage, API calls      |
| Backend (for News Feed) | Strapi                       |

## 📂 Folder Structure

```
src/
  auth/               # Authentication mini-app
    Login.jsx
    Signup.jsx
    Dashboard.jsx
  news-feed/          # News Feed mini-app
    NewsFeed.jsx
    SinglePost.jsx
    NewsCard.jsx
    api.js
  weather/            # WeatherCard mini-app
    WeatherCard.jsx
    WeatherPage.jsx
  random-qoute generator/     # Random Qoute generation
    ThemeToggle.jsx
```

## 📥 Setup & Running Each App

For each app:

1. **Install dependencies**

```bash
npm install
# or
yarn install
```

2. **Start the app**

```bash
npm start
# or
yarn start
```

3. **Open in Browser**
   Visit `http://localhost:3000` (or respective port for the app you want to run).

> ⚠️ For News Feed: make sure your Strapi backend is running locally (`http://localhost:1337`) with some posts data.

## 📄 Usage

* Navigate to each mini-app using their routes (or separate directories if deployed separately).
* Each app demonstrates its respective feature.
* Use the UI components and forms as intended for each challenge.

## 📌 Notes & Improvements

* Implement secure password storage for Auth apps
* Enhance News Feed with infinite scroll, categories, or sorting
* Integrate real third-party login for Auth app (Auth0/Clerk)
* Improve UI design consistency across all mini-apps
* Add tests for components and API calls

## ✅ Contribution & License

Contributions are welcome! Fork the repo to explore, improve, or add new exercises.
