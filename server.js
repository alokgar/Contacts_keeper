const express = require('express');
const connectDB = require('./config/db');
const mongoose = require('mongoose');
const app = express();

// Connect Database
//connectDB(); 
mongoose.connect("mongodb://localhost:27017/test2",{useUnifiedTopology: true,useNewUrlParser: true});


// Init Middleware
app.use(express.json({extended : false}));


app.get('/', (req,res) => 
 res.json({ msg : "welcome to ContactKeeper API.... "}) 
);

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));






const PORT = process.env.PORT || 5000 ;

app.listen(PORT, () => console.log(`server started at port ${PORT}`));