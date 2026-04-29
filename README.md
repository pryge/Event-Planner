# Event Planner 📅

Потужний веб-додаток для планування подій з інтерактивним календарем, системою авторизації та гнучкою фільтрацією. Побудований з використанням сучасних технологій та архітектурних підходів (FSD).

## ✨ Основні функції

- **🔐 Авторизація та безпека**: 
  - Реєстрація та вхід через Email/Пароль.
  - Швидкий вхід через **Google OAuth**.
  - Захист маршрутів за допомогою JWT (JSON Web Tokens).
- **📅 Керування подіями (CRUD)**:
  - Додавання подій через інтерактивну форму.
  - Редагування існуючих записів.
  - Видалення з підтвердженням.
- **🔍 Пошук та фільтрація**:
  - Відображення подій списком на вибрану дату.
  - Фільтрація за рівнем важливості (Low, Medium, High).
  - Пошук за ключовими словами (з оптимізацією debounce).
- **🎨 Сучасний UI**:
  - Інтерактивний календар.
  - Адаптивний дизайн (Tailwind CSS + Shadcn UI).
  - Стан завантаження (Skeletons).

## 🛠 Технологічний стек

### Frontend (Client)
- **Next.js 15 (App Router)**
- **Tailwind CSS** + **Shadcn UI**
- **Zustand** (Керування станом)
- **TanStack Query (React Query)** (Серверний стан)
- **React Hook Form** + **Zod** (Валідація форм)
- **FSD (Feature-Sliced Design)** (Архітектура)

### Backend (Server)
- **NestJS**
- **Prisma ORM** (Робота з БД)
- **PostgreSQL**
- **Passport.js** (JWT & Google Strategy)
- **Docker** (Для бази даних)

## ⚙️ Початок роботи

### 1. Клонування репозиторію
```bash
git clone https://github.com/pryge/Event-Planner.git
cd Event-Planner
```

### 2. Налаштування бази даних
Переконайтеся, що у вас встановлено Docker. Запустіть контейнер з PostgreSQL:
```bash
docker-compose up -d
```

### 3. Налаштування Server (Backend)
```bash
cd server
npm install
```
Створіть файл `.env` у папці `server` за прикладом:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/event_planner?schema=public"
JWT_SECRET="your_secret_key"
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
```
Виконайте міграції Prisma:
```bash
npx prisma migrate dev
```
Запустіть сервер:
```bash
npm run start:dev
```

### 4. Налаштування Client (Frontend)
```bash
cd ../client
npm install
```
Створіть файл `.env.local` у папці `client`:
```env
NEXT_PUBLIC_API_URL="http://localhost:3000/api"
```
Запустіть клієнтську частину:
```bash
npm run dev
```

## 📂 Архітектура (FSD)
Проєкт на фронтенді розбито за методологією **Feature-Sliced Design**:
- `shared`: Спільні компоненти UI, API клієнт, утиліти.
- `entities`: Бізнес-сутності (User, Event) — моделі та UI картки.
- `features`: Функціональні дії (AuthForm, CreateEvent, EditEvent).
- `widgets`: Композиційні блоки (Header).
- `app`: Налаштування Next.js, провайдери та роутинг.

---
## Примітка

Цей README файл було створено з використанням інструментів штучного інтелекту (зокрема ChatGPT) для покращення структури та оформлення документації.
