import AuthenticationRoute  from './routes/AuthenticationRoute';
import BingoRoute  from './routes/BingoRoute';
import GroupRoute  from './routes/GroupRoute';
import ProfileRouter  from './routes/ProfileRoute';
import SessionRoute  from './routes/SessionRoute';
import TileRoute  from './routes/TileRoute';
import express from 'express';
import swaggerUi from "swagger-ui-express";
const swaggerjsonFilePath = require("./swagger.json");
const { Client } = require('pg');
require('dotenv').config()

const app = express();

const client = new Client({
	user: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	host: process.env.POSTGRES_HOST,
	port: process.env.POSTGRES_PORT,
	database: process.env.POSTGRES_DB_NAME,
});

client
	.connect()
	.then(() => {
		console.log('Connected to PostgreSQL database');
	})
	.catch((err: any) => {
		console.error('Error connecting to PostgreSQL database', err);
	});

app.use('/authentication', AuthenticationRoute);
app.use('/bingos', BingoRoute);
app.use('/groups', GroupRoute);
app.use('/profile', ProfileRouter);
app.use('/sessions', SessionRoute);
app.use('/tiles', TileRoute);

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerjsonFilePath));

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});