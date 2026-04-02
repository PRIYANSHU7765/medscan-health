import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import { Server as SocketIOServer } from 'socket.io';
import { initializeSocket } from './src/socket/index.js';
import medicinesRouter from './src/api/medicines.js';
import usersRouter from './src/api/users.js';
import authRouter from './src/api/auth.js';
import { errorHandler } from './src/middleware/errorHandler.js';

dotenv.config();

const app = express();
const server = http.createServer(app);

const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';
app.use(cors({ origin: corsOrigin }));
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/medicines', medicinesRouter);

app.use(errorHandler);

const io = new SocketIOServer(server, {
  cors: { origin: corsOrigin },
});
initializeSocket(io);

const port = process.env.PORT ? Number(process.env.PORT) : 4000;
server.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
