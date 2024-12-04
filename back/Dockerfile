FROM node:22

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
RUN npx prisma generate
RUN npm run swagger-autogen

CMD [ "./start.sh" ]