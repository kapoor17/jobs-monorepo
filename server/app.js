require('dotenv').config();
require('express-async-errors');

const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit');
const express = require('express');
const app = express();

const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');
const connectDB = require('./db/connect');

const authRouter = require('./routes/auth');
const jobsRouter = require('./routes/jobs');
const authenticate = require('./middleware/authentication');

app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(express.json());
app.use(cors())
app.use(helmet());
app.use(xss())

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
