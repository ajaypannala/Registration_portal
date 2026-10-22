# Registration Portal

A React application for account registration, email-based login, and a simple
dashboard.

## Requirements

- Node.js and npm

## Getting started

Install the project dependencies and start the Vite development server:

```powershell
npm install
npm run dev
```

Open the local URL printed by Vite in your browser. The app redirects `/` to
the login page.

## Available commands

```powershell
npm run dev      # Start the development server
npm run build    # Create a production build in dist/
npm run preview  # Preview the production build locally
npm run lint     # Run ESLint
```

## Using the app

1. Open **Register** and create an account.
2. Return to **Login** and sign in using the same email address and password.
3. After login, the app opens the dashboard. Use **Logout** to return to login.

Registered accounts are saved in the current browser's `localStorage`, so they
are available only in that browser and on that device. Passwords are stored as
salted PBKDF2 hashes, not as plain text. Clearing the browser's site data removes
these accounts.

The login service also supports demo accounts provided by
[DummyJSON](https://dummyjson.com). The registration form does not create
accounts on that service.

## Routes

- `/login` — sign in
- `/register` — create an account
- `/dashboard` — account dashboard

## Production note

This project is a frontend demo, not a production authentication system.
Browser storage and client-side password verification do not replace a secure
backend. For production use, add a server-side account database, password
hashing, and authenticated sessions or tokens managed with appropriate
security controls.
