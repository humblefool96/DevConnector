const express = require('express');
const connectDB = require('./config/db');
const path = require('path')

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

//define routes
app.use('/api/users', usersRoute);
app.use('/api/auth', authRoute);
app.use('/api/profile', profileRoute);
app.use('/api/posts', postsRoute);

//serve static assets in production
if(process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    }); 
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server started on ${PORT}`);
})