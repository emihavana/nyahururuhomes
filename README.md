# Nyahururu Homes

A responsive React/Vite rental website with a PHP 8.3 and MySQL backend served by Laragon.

## Project layout

```text
frontend/                              React, Vite, Tailwind and npm app
  src/                                 Pages, components, hooks and API client
  .env.example                         Frontend API URL
C:\laragon\www\nyahururu-homes-api\   Local Laragon backend
  index.php                            API, authentication, property CRUD and CLI commands
  db.php                               MySQLi database connection
  schema.sql                           Database and table definitions
```

## Requirements

- Node.js 18 or later and npm
- Laragon with Apache, PHP 8.3 (`mysqli`, `mysqlnd`, and `mbstring`) and MySQL 8

## Set up the database

Run this from the project root in PowerShell:

```powershell
Get-Content C:\laragon\www\nyahururu-homes-api\schema.sql | mysql -u root -p
```

The backend defaults in `db.php` use Laragon's common local MySQL settings (`127.0.0.1`, `root`, no password, database `nyahururu_homes`). If your MySQL credentials differ, set `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, and `DB_PASSWORD` in Laragon's Apache environment before restarting Apache. The API allows both `http://127.0.0.1:5173` and `http://localhost:5173` for local development. To configure one or more different frontend origins, set `APP_FRONTEND_ORIGINS` in Apache's environment as a comma-separated list, then restart Apache.

## Start the backend in Laragon

The backend is at `C:\laragon\www\nyahururu-homes-api`. Start or reload Apache in Laragon. Its API base URL is:

```text
http://127.0.0.1/nyahururu-homes-api/index.php/api
```

There is no separate `php -S` server to start. By default, the frontend uses the same hostname for the API as the page (`localhost` or `127.0.0.1`) so admin session cookies work correctly. Copy `frontend/.env.example` to `frontend/.env` only if you need to set a custom `VITE_API_BASE_URL`; its hostname should match the hostname used to open the frontend.

Seed the initial nine demo properties if the table is empty:

```powershell
$env:DB_HOST = "127.0.0.1"
$env:DB_PORT = "3306"
$env:DB_NAME = "nyahururu_homes"
$env:DB_USER = "root"
$env:DB_PASSWORD = ""
php C:\laragon\www\nyahururu-homes-api\index.php seed
```

Create an administrator account:

```powershell
$env:DB_HOST = "127.0.0.1"
$env:DB_PORT = "3306"
$env:DB_NAME = "nyahururu_homes"
$env:DB_USER = "root"
$env:DB_PASSWORD = ""
$env:ADMIN_EMAIL = Read-Host "Admin email"
$env:ADMIN_PASSWORD = Read-Host "Admin password (12+ characters)"
php C:\laragon\www\nyahururu-homes-api\index.php create-admin
Remove-Item Env:ADMIN_EMAIL, Env:ADMIN_PASSWORD
```

The command-line setup commands use the same PHP 8.3 MySQLi backend and prepared statements.

## Start the frontend

From a separate PowerShell window:

```powershell
Set-Location .\frontend
npm install
npm run dev -- --host 127.0.0.1
```

Open `http://127.0.0.1:5173/` for the website or `http://127.0.0.1:5173/manage` to sign in and manage listings. Run `npm run build` or `npm run preview` from `frontend/`.

## Security and editing

- Admin sign-in and property writes use PHP sessions, password hashes, prepared MySQLi statements, and CSRF tokens. Public property reads do not require sign-in.
- Admins can upload JPG, PNG, or WebP listing images up to 5 MB; files are stored in `C:\laragon\www\nyahururu-homes-api\uploads\`. External HTTP/HTTPS image URLs remain supported.
- This is a local development setup. Before public deployment, use HTTPS, a dedicated restricted MySQL account, a production web server configuration, and an exact allowed frontend origin.
- Edit agency details, estate names, and property types in `frontend/src/config.js`; manage listings at `/manage`.
- Page content and UI are in `frontend/src/pages/` and `frontend/src/components/`. Theme colors and fonts are in `frontend/tailwind.config.js`, `frontend/index.html`, and `frontend/src/index.css`.
- Add and update property photos from the admin page at `/manage`; uploaded images are stored by the Laragon backend, while external image URLs are also supported.

Favorites are stored in the visitor's browser. Contact and newsletter forms are frontend demos and need a trusted form service or backend before production use.
