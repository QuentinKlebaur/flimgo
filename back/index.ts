import UserRouter  from './routes/UserRoute';
import express from 'express';
import swaggerUi from "swagger-ui-express";
const swaggerjsonFilePath = require("./swagger.json");

const app = express();

app.use('/users', UserRouter);

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerjsonFilePath));

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});