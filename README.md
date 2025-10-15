# EcoFinds – Sustainable Second-Hand Marketplace  


## 🌍 Overview  
**EcoFinds** is a sustainable second-hand marketplace built during an 8-hour hackathon.  
It empowers users to:  
- Register and create profiles  
- List pre-owned products  
- Browse with search and filters  
- Manage a shopping cart  
- View past purchases  

All built with **React, Firebase, and TailwindCSS** to promote conscious consumption and a circular economy.  

---

## ❓ Problem Statement  
Consumerism speeds up waste as products are discarded too early.  
There’s a pressing need for a simple, accessible platform that makes exchanging pre-owned goods smooth and trustworthy.  

**EcoFinds** solves this by making sustainable exchange **fast, intuitive, and community-driven.**  

---

## ⚡ Core Features (MVP)  

1. **User Authentication**  
   - Email/password sign up and login via Firebase Authentication.  

2. **User Profile**  
   - Set and edit username, email, and basic profile data.  

3. **Product Listings (CRUD)**  
   - Create, read, update, delete listings.  
   - Each listing includes: Title, Description, Category, Price, Image placeholder (no upload).  

4. **Product Feed & Discovery**  
   - Browse items with title, price, and image.  
   - Category filtering and keyword search.  
   - Click into a product detail page for full info.  

5. **Cart**  
   - Add items to cart.  
   - View and manage cart items.  

6. **Purchase History**  
   - See list of purchased items per user.  

7. **Responsive UI**  
   - Clean, mobile- and desktop-friendly interface styled with TailwindCSS.  

---

## 🛠 Tech Stack  
- **Frontend:** React (Vite or CRA)  
- **Styling:** TailwindCSS  
- **Auth & Database:** Firebase (Firestore + Authentication)  
- **Hosting:** Firebase Hosting  

---

## 🔄 User Flow  
1. **Authenticate** — user signs up or logs in.  
2. **Profile** — set username; access profile area.  
3. **Browse** — view and filter items.  
4. **Detail View** — inspect individual products.  
5. **Engagement** — create listing, add to cart.  
6. **Purchase** — mark purchased (simulate checkout).  
7. **History** — view past purchases.  

---

## ✅ Success Criteria  
- Fully functional MVP within 8-hour hackathon window.  
- Smooth flows: Auth → Browse → Create Listing → Cart → Purchase History.  
- Responsive, clean UI across devices.  
- Live demo hosted on Firebase Hosting.  
- Demo-ready for judges (5–7 min walkthrough).  

---

## 🚀 Run Locally  
- git clone https://github.com/VTG56/ecofinds-marketplace.git
- cd ecofinds-marketplace
- npm install
- npm run dev

The app should now be live at `http://localhost:5173` (if using Vite).  

---

## 🌟 Future Enhancements  
- Favorites / Wishlist  
- Carbon savings counter for reused items  
- Trust/rating system for sellers  
- Image uploads with compression  
- Real-time chat or messaging  
