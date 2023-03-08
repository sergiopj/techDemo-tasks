'use strict';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import taskRoute from './routes/task.route';
import swaggerUi from 'swagger-ui-express';
import swaggerSetup from './docs/swagger';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSetup));
app.use('/', taskRoute);
app.get('/health', (req, res) => {
    res.status(200).send('Ok');
});

export default app;
