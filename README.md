# Setup
```
npm i
```
# Create .env file and folowing in .env file
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/acrowale_saas?schema=public"
NEXTAUTH_URL=http://localhost:3000/
```
# Docker commands
```
docker run --acrowale_saas -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres
```

# Prisma commands
```
npx prisma migrate dev
npx prisma generate
```

# Start server
```
npm run dev
```