const express = require('express');
const connectDB = require('./config/db');
const app = express();

//connect database
connectDB();

//route handler
usersRoute = require('./routes/api/users');
authRoute = require('./routes/api/auth');
profileRoute = require('./routes/api/profile');
postsRoute = require('./routes/api/posts');

//init middleware(body parser)
app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
    res.send('api running');
})

app.use('/api/users', usersRoute);
app.use('/api/auth', authRoute);
app.use('/api/profile', profileRoute);
app.use('/api/posts', postsRoute);

const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => {
    console.log(`server started on ${PORT}`);
})