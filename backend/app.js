import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import userRoute from './routes/users.js';
import authRoute from './routes/auth.js';
import postRoute from './routes/posts.js';
import conversationRoute from './routes/conversations.js';
import messageRoute from './routes/messages.js';
import multer from 'multer';
import path from 'path';

const __dirname = path.resolve();

const app = express();
dotenv.config();

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true },
  () => {
    console.log("Connected to mongo");
  }
);
app.use("/images",express.static(path.join(__dirname,"public/images")));

//middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req,res,cb) => {
    cb(null,"public/images");
  },
  filename: (req,file,cb) => {
    cb(null,req.body.name);
  },
});

const upload = multer({storage});
app.post("/api/upload", upload.single("file"),(req,res)=>{
  try {
    return res.status(200).json("File uploaded successfully");
  } catch(err) {
    console.log(err);
  }
})

app.use('/api/users',userRoute);
app.use('/api/auth',authRoute);
app.use('/api/posts',postRoute);
app.use('/api/conversations',conversationRoute);
app.use('/api/messages',messageRoute);

//app listening on the port 8080
app.listen(8080, () => {
  console.log("Backend running");
});
