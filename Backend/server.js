const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World from Express!');
});

app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
