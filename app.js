// app.mjs
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import 'express-async-errors';
import postsRouter from './router/posts.js';
import addressRouter from './router/address.js';

const app = express();
const port = 8080;

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));
app.use('/posts', postsRouter);
app.use('/address', addressRouter);

app.use((req, res, next) => {
    res.sendStatus(404);
})

app.use((req, res, next, error) => {
    console.error(error);
    res.sendStatus(500);
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
