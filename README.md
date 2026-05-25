# 🌿 Verbiance Group — D2C E-Commerce Platform

A premium, and high-performance D2C e-commerce platform inspired by Verbiance Group India.
Built with modern web technologies focusing on **speed, scalability, and conversion-focused UX**.

🔗 Live Preview: *Coming Soon*
📦 Repo: https://github.com/mini7007/valley-culture-store

---

## ✨ Key Features

* 🛍️ Modern D2C storefront
* ⚡ Blazing fast Next.js App Router
* 📱 Fully responsive (mobile-first)
* 🎬 Premium animations with Framer Motion
* 🧠 Smart cart with Zustand
* 📧 Lead capture checkout (no payment flow)
* 📲 WhatsApp + Email order notifications
* 🎁 Mega menu with gifting flow
* 🎥 Video-rich storytelling sections
* 🌙 Production-ready architecture

---

## 🏗️ Tech Stack

**Frontend**

* Next.js 14 (App Router)
* TypeScript
* Tailwind CSS
* Framer Motion
* Lucide Icons

**State & Data**

* Zustand (cart state)
* MongoDB (planned)
* Server Actions / API Routes

**Integrations**

* Email Notifications (planned)
* WhatsApp API (planned)

---

## 📂 Project Structure

```
app/
components/
  ├── ui/
  ├── navbar.tsx
  ├── hero-section.tsx
  ├── featured-products.tsx
  ├── cart-drawer.tsx
  └── site-footer.tsx
lib/
hooks/
public/
styles/
```

---

## 🚀 Getting Started

### 1️⃣ Clone the repo

```bash
git clone https://github.com/mini7007/valley-culture-store.git
cd valley-culture-store
```

### 2️⃣ Install dependencies

```bash
npm install
# or
pnpm install
```

### 3️⃣ Run development server

```bash
npm run dev
```

App will run on:

```
http://localhost:3000
```

---

## 🎯 Current Status

✅ UI Foundation
✅ Responsive Layout
✅ Cart State Management
✅ Mega Menu
🚧 Backend Integration
🚧 Email Automation
🚧 WhatsApp Automation
🚧 Admin Panel

---

## 🧠 Future Enhancements

* 🔐 Admin dashboard
* 📦 Order management
* 💳 Payment gateway (optional)
* 🔍 Advanced search & filters
* ⭐ Reviews & ratings
* 📈 Analytics integration
* 🚀 Edge optimization

---

## 👨‍💻 Author

**Mohan Sharma**
Full Stack Developer (React | Next.js | Node)

* 💼 Portfolio: *Coming Soon*
* 🔗 GitHub: https://github.com/mini7007
* 📧 Email: *your-email-here*

---

## ⭐ If you like this project

Give it a ⭐ on GitHub — it helps a lot!

---

## Sanity Studio CMS Setup (Non-Technical Friendly)

A complete Sanity Studio has been added in `/studio` so content editors can manage products and homepage content without touching code.

### Included content types

- `product`
- `homepage` (singleton)
- `siteSettings` (singleton)

### Create/init Sanity project (first-time only)

If your Sanity project is not created yet, run:

```bash
npm create sanity@latest
```

You can use your existing project ID/dataset from that step in this repository.

### Connect Studio + Next.js app

1. Copy environment file:

```bash
cp .env.example .env.local
```

2. Fill in:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=...
NEXT_PUBLIC_SANITY_DATASET=production
```

(Studio also supports `SANITY_STUDIO_PROJECT_ID` and `SANITY_STUDIO_DATASET`, but defaults to the values above.)

### Run Studio locally

```bash
npm install
npm --prefix studio install
npm run studio:dev
```

Studio starts at:

```text
http://localhost:3333
```

### Editor workflow (for non-technical users)

- Open **Homepage** to edit hero copy/image and featured products.
- Open **Site Settings** to edit global site details (announcement bar, logo, support email, social links).
- Use **Product** to add/edit products with image uploads.

Image upload is enabled on product images, hero image, and logo fields with hotspot/crop support.
