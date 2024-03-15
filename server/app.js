require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');
const connectDB = require('./db/connect');

const authRouter = require('./routes/auth');
const jobsRouter = require('./routes/jobs');
const authenticate = require('./middleware/authentication');

app.use(express.json());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticate, jobsRouter);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 4001;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch(error) {
    console.log(error);
  }
};

start();
