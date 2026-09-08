# Hostinger Shared Hosting Deployment Guide for SolarPulse ERP

This guide provides step-by-step instructions to deploy the Solar ERP application on **Hostinger Shared Hosting** (cPanel / hPanel) with zero Node.js server dependency.

---

## 1. Architecture Overview

- **Frontend:** React 19 + TypeScript + Vite + Tailwind CSS (compiled into high-performance static HTML, JS, and CSS chunks in `dist/`).
- **Web Server Routing:** Apache via `.htaccess` with SPA rewrite rules (`index.html` fallback), Gzip/Deflate compression, browser caching, and security headers.
- **Backend / AI Proxy:** Server-side PHP (`public/api/gemini.php`) proxying Gemini AI queries securely without exposing API keys to the browser.
- **Health Check:** `public/api/status.php` for validating PHP version, environment variable configuration, and write permissions.
- **Data Persistence:** Client-side local storage with full JSON backup, export, and import tools built-in. Optional MySQL integration (`public/api/db.php` & `schema.sql`) for custom database backends.

---

## 2. Quick Deployment Steps (hPanel File Manager or FTP)

### Step 1: Run the Production Build
If you are building locally or exporting the project:
```bash
npm run build
```
This generates the optimized `dist/` folder containing:
```
dist/
├── index.html
├── .htaccess
├── assets/
│   ├── index-*.js
│   ├── index-*.css
│   └── vendor-*.js
└── api/
    ├── gemini.php
    ├── status.php
    ├── db.php
    └── schema.sql
```

### Step 2: Upload Files to Hostinger `public_html`
1. Log in to **Hostinger hPanel**.
2. Navigate to **Websites** → select your domain → **File Manager** (or connect via FileZilla SFTP/FTP).
3. Open the **`public_html`** directory (or your target subdomain directory).
4. Upload all files and folders **from inside the `dist/` directory** directly into `public_html/`.
   - Ensure the hidden file **`.htaccess`** is uploaded (enable "Show hidden files" in File Manager settings if you don't see it).

### Step 3: Configure Environment Variables on Hostinger
You have two easy ways to set your `GEMINI_API_KEY`:

#### Option A: In `.env` inside `public_html` (Recommended)
1. In `public_html/`, create a file named `.env` (or copy `.env.example`).
2. Add your key:
   ```ini
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   ```
3. Save the file. The `.htaccess` file automatically blocks public access to `.env` files.

#### Option B: In Hostinger hPanel PHP Configuration
1. In hPanel, go to **Advanced** → **PHP Configuration** → **PHP Options**.
2. Or define an Apache environment directive in `.htaccess`:
   ```apache
   SetEnv GEMINI_API_KEY "your_actual_gemini_api_key_here"
   ```

### Step 4: Verify Deployment
1. Visit `https://your-domain.com/` in your browser. The Solar ERP dashboard should render immediately.
2. Check the API health endpoint: `https://your-domain.com/api/status.php`.
   - It will return a JSON status indicating PHP version and whether `GEMINI_API_KEY` is loaded.
3. Test deep navigation: Click on **Projects**, **Customers**, or **HRMS**, and refresh the page. The `.htaccess` rewrite rules will seamlessly route the request to `index.html` without 404 errors.

---

## 3. Subdirectory / Subdomain Hosting (Optional)

If hosting inside a subfolder (e.g., `https://your-domain.com/erp/`):
1. In `.htaccess`, adjust the `RewriteBase`:
   ```apache
   RewriteBase /erp/
   RewriteRule ^index\.html$ - [L]
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule . /erp/index.html [L]
   ```
2. In `vite.config.ts` (or via environment variable `VITE_BASE_PATH=/erp/`), rebuild with `npm run build`.

---

## 4. Troubleshooting Checklist

| Issue | Cause | Solution |
| :--- | :--- | :--- |
| **404 on page refresh** | `.htaccess` is missing or `mod_rewrite` is disabled | Ensure `.htaccess` is in `public_html/`. Hostinger enables `mod_rewrite` by default on all PHP shared plans. |
| **500 Internal Server Error** | Syntax error in `.htaccess` or old PHP version | Verify PHP version is 7.4, 8.1, 8.2, or 8.3 in hPanel. |
| **AI Assistant Error** | Missing `GEMINI_API_KEY` | Add `GEMINI_API_KEY` to `public_html/.env` or check `https://your-domain.com/api/status.php`. |
| **Stale Cache / Old Version** | Browser cache holding previous JS bundle | Clear browser cache or use Hard Reload (`Ctrl+F5` / `Cmd+Shift+R`). Chunks are cache-busted with unique hashes. |
