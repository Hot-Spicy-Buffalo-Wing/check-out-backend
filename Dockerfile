#Step 1: Build the app in image 'builder'
FROM node:21-alpine3.18 AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

#Step 2: Copy the build from 'builder' to 'runner'
FROM node:21-alpine3.18

WORKDIR /app

ENV TZ=Asia/Seoul
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
COPY --from=builder /app ./

RUN npm install -D prisma

EXPOSE 3000

CMD ["npm", "run", "start:deploy"]