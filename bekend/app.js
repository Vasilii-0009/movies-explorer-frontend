const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const helmet = require('helmet');
const router = require('./routes/index');
const error = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { DATA_BASE, PORT } = require('./config');

const app = express();
app.use('*', cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(DATA_BASE, {});

app.use(requestLogger);
app.use(router);
app.use(errorLogger);

app.use(errors());
app.use(error);
app.listen(PORT, () => { });
