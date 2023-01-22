const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const authRoutes = require('./routes/auth.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/auth', authRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
