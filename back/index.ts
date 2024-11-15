import UserRouter  from './routes/UserRoute';
import express from 'express';
const app = express();

app.use('/users', UserRouter);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});