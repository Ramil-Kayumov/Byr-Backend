import express from 'express';
import cors from 'cors';
import connectDB from './config/connect_db.mjs';
import router from './routes/index.mjs';

connectDB();
const app = express();

app.use(cors({origin:"*"}))
app.use(express.json());
app.use(router);


app.listen(process.env.PORT,(err)=> err ? console.log(err) : console.log('The server started localhost:3013'));