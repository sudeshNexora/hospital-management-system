Hospital Management System (Prescripto)
A fullstack Hospital Management System built on the MERN stack, with three
separate apps: a patient-facing frontend, a backend API, and an
admin/doctor portal.
User features — register/login, browse doctors by specialization, book
appointments, pay online via Razorpay, view upcoming/past appointments,
edit profile.
Doctor features — log in, manage appointments, complete/cancel bookings,
track earnings and appointment counts, update profile.
Admin features — dashboard with doctor/patient/appointment counts,
manage doctor profiles and schedules, view recent appointments.
Project structure
```
├── backend/    Express + MongoDB API (port 4000 by default)
├── frontend/   Patient-facing React app (Vite)
└── admin/      Admin + Doctor portal (React, Vite)
```
Prerequisites
Node.js 18+ and npm
MongoDB running locally (`mongodb://localhost:27017`) or an Atlas cluster
A Cloudinary account (image storage)
A Razorpay account (payments)
An SMTP-capable email account (e.g. Gmail with an app password), if using
email notifications
1. Backend setup
```bash
cd backend
npm install
cp .env.example .env
```
Fill in `backend/.env`:
Variable	Notes
`PORT`	e.g. `4000`
`MONGODB_URI`	No trailing slash, no db name — e.g. `mongodb://localhost:27017`. The code appends `/prescripto` itself.
`CLOUDINARY_NAME` / `CLOUDINARY_API_KEY` / `CLOUDINARY_SECRET_KEY`	From your Cloudinary dashboard
`ADMIN_EMAIL` / `ADMIN_PASSWORD`	Credentials for the admin login
`JWT_SECRET`	Any long random string
`RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET`	From your Razorpay dashboard
`CURRENCY`	e.g. `INR`
`SMTP_HOST` / `SMTP_PORT` / `SMTP_EMAIL` / `SMTP_PASSWORD`	Your SMTP provider details
Run it:
```bash
npm run server
```
You should see:
```
Cloudinary Connected
Server Started  4000
Database Connected
```
> **Common pitfall:** if `MONGODB_URI` already ends in `/` or `/prescripto`,
> you'll get `MongoServerError: Invalid namespace specified` because the code
> appends `/prescripto` on top of it. Keep `MONGODB_URI` bare, as shown above.
2. Frontend setup (patient-facing app)
```bash
cd frontend
npm install
cp .env.example .env
```
Fill in `frontend/.env`:
Variable	Notes
`VITE_BACKEND_URL`	e.g. `http://localhost:4000`
`VITE_RAZORPAY_KEY_ID`	Same Razorpay key ID as backend
Run it:
```bash
npm run dev
```
3. Admin/Doctor portal setup
```bash
cd admin
npm install
cp .env.example .env
```
Fill in `admin/.env`:
Variable	Notes
`VITE_BACKEND_URL`	e.g. `http://localhost:4000`
Run it:
```bash
npm run dev
```
Running all three together
Open three terminals and run `npm run server` in `backend/`, `npm run dev`
in `frontend/`, and `npm run dev` in `admin/`. By default Vite serves each
app on its own port (check the terminal output for the exact URL).
Tech stack
Backend: Express, Mongoose, JWT auth, bcrypt, Multer + Cloudinary
(image uploads), Nodemailer, Razorpay, Validator
Frontend / Admin: React, Vite, React Router, Axios, React Toastify
Live demo (original project)
Frontend: https://hms-frontend-kappa.vercel.app/
Admin/Doctor portal: https://hms-admin-nine.vercel.app/