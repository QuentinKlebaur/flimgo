import AuthenticationRoute  from './routes/AuthenticationRoute';
import BingoRoute  from './routes/BingoRoute';
import GroupRoute  from './routes/GroupRoute';
import ProfileRouter  from './routes/ProfileRoute';
import SessionRoute  from './routes/SessionRoute';
import TileRoute  from './routes/TileRoute';
import express from 'express';
import swaggerUi from "swagger-ui-express";
const swaggerjsonFilePath = require("./swagger.json");
require('dotenv').config()

const app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

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