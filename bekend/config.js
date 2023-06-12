require('dotenv').config({ path: './.env' });

const { NODE_ENV } = process.env;
const { JWT_SECRET = 'c0af409e08a7ba4e3a3b6dd9237d3c58f758d97bde5546e2bba4b2312f1ee163' } = process.env;
const { DATA_BASE = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
const { PORT = 3000 } = process.env;

module.exports = {
  NODE_ENV,
  JWT_SECRET,
  DATA_BASE,
  PORT,
};
