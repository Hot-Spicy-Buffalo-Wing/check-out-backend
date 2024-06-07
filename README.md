# Check-out-backend

## Backend Tech stack

1. **NestJS**
2. **Prisma**
3. **PostgreSQL**

### Directory Description (src dir)

📂 ai

- API for LookBook

📂 auth

- API for sign-up and sign-in (JWT)

📂 file

- API for file upload using minIO

📂 post

- API for posts (CRUD)

📂 prisma

- to use prisma

📂 user

- API for user info (etc..)

### Directory Tree

```bash
┣ 📂 .github/workflows
┃ ┗ 📜 staging.yaml // confing github action
┣ 📂 ERD
┃ ┗ 📜 database.dbml // Database structure
┃ ┣ 📂 prisma
┃ ┣ 📂 migrations // migration files
┃ ┃ ┣ 📜 20240521051320_init
┃ ┃ ┣ 📜 20240530154723_fix_content_column
┃ ┃ ┣ 📜 ...
┃ ┃ ┗ 📜 migration_lock.toml
┃ ┗ 📜 schema.prisma // prisma schema file
┣ 📂 src
┃ ┣ 📂 ai // api about generating lookbook
┃ ┃ ┣ 📂 dto
┃ ┃ ┃ ┣ 📂 req
┃ ┃ ┃ ┃ ┗ 📜 AiReqBody.dto.ts
┃ ┃ ┃ ┗ 📂 res
┃ ┃ ┃ ┃ ┣ 📜 CreateLookBook.dto.ts
┃ ┃ ┃ ┃ ┣ 📜 DeleteLookBook.dto.ts
┃ ┃ ┃ ┃ ┣ 📜 GetLookBookById.dto.ts
┃ ┃ ┃ ┃ ┗ 📜 GetLookBookByUserUuid.dto.ts
┃ ┃ ┣ 📜 ai.controller.ts
┃ ┃ ┣ 📜 ai.module.ts
┃ ┃ ┣ 📜 ai.repository.ts
┃ ┃ ┗ 📜 ai.service.ts
┃ ┣ 📂 auth // api about sign-up and sign-in
┃ ┃ ┣ 📂 dto
┃ ┃ ┃ ┣ 📂 req
┃ ┃ ┃ ┃ ┣ 📜 Login.dto.ts
┃ ┃ ┃ ┃ ┣ 📜 RefreshToken.dto.ts
┃ ┃ ┃ ┃ ┗ 📜 Register.dto.ts
┃ ┃ ┃ ┗ 📂 res
┃ ┃ ┃ ┃ ┣ 📜 LoginRes.dto.ts
┃ ┃ ┃ ┃ ┣ 📜 RefreshTokenRes.dto.ts
┃ ┃ ┃ ┃ ┗ 📜 RegisterRes.dto.ts
┃ ┃ ┣ 📂 guard
┃ ┃ ┃ ┣ 📜 jwt-auth.guard.ts
┃ ┃ ┃ ┗ 📜 jwt.strategy.ts
┃ ┃ ┣ 📜 auth.controller.ts
┃ ┃ ┣ 📜 auth.module.ts
┃ ┃ ┣ 📜 auth.repository.ts
┃ ┃ ┗ 📜 auth.service.ts
┃ ┣ 📂 file // api about upload image file
┃ ┃ ┣ 📜 file.module.ts
┃ ┃ ┗ 📜 file.service.ts
┃ ┣ 📂 post // api about posts
┃ ┃ ┣ 📂 dto
┃ ┃ ┃ ┣ 📂 req
┃ ┃ ┃ ┃ ┣ 📜 CreatePost.dto.ts
┃ ┃ ┃ ┃ ┣ 📜 GetPostListQuery.dto.ts
┃ ┃ ┃ ┃ ┗ 📜 UpdatePost.dto.ts
┃ ┃ ┃ ┗ 📂 res
┃ ┃ ┃ ┃ ┣ 📜 deletePostRes.dto.ts
┃ ┃ ┃ ┃ ┗ 📜 postRes.dto.ts
┃ ┃ ┣ 📂 types
┃ ┃ ┃ ┗ 📜 PostFullContent.ts
┃ ┃ ┣ 📜 post.controller.ts
┃ ┃ ┣ 📜 post.mapper.ts
┃ ┃ ┣ 📜 post.module.ts
┃ ┃ ┣ 📜 post.repository.ts
┃ ┃ ┗ 📜 post.service.ts
┃ ┣ 📂 prisma // to use prisma service
┃ ┃ ┣ 📜 prisma.module.ts
┃ ┃ ┗ 📜 prisma.service.ts
┃ ┣ 📂 user // api about user
┃ ┃ ┣ 📂 decorator
┃ ┃ ┃ ┗ 📜 get-user.decorator.ts
┃ ┃ ┣ 📂 dto
┃ ┃ ┃ ┣ 📂 req
┃ ┃ ┃ ┃ ┗ 📜 UpdateUserInfo.dto.ts
┃ ┃ ┃ ┗ 📂 res
┃ ┃ ┃ ┃ ┗ 📜 GetUserInfo.dto.ts
┃ ┃ ┣ 📜 user.controller.ts
┃ ┃ ┣ 📜 user.module.ts
┃ ┃ ┣ 📜 user.repository.ts
┃ ┃ ┗ 📜 user.service.ts
┃ ┣ 📜 app.controller.spec.ts
┃ ┣ 📜 app.controller.ts
┃ ┣ 📜 app.module.ts
┃ ┣ 📜 app.service.ts
┃ ┗ 📜 main.ts
┣ 📂 test
┣ 📜 .eslintrc.js
┣ 📜 .gitignore
┣ 📜 .prettierrc
┣ 📜 Dockerfile
┣ 📜 README.md
┣ 📜 nest-cli.json
┣ 📜 package-lock.json
┣ 📜 package.json
┣ 📜 tsconfig.build.json
┗ 📜 tsconfig.json

```

## Database

You can see dbdocs in [here](https://dbdocs.io/GanghyeonSeo/check-out-backend?view=relationships).

### Database Relation Diagram

![Relation Diagram](./ERD/Relation%20Diagram.png)
