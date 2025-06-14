const express = require('express');
const port = process.env.PORT || 5000; 
const app = express(); 
var cors = require('cors');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const indexrot = require('./routes/index');

app.use('/uploads', express.static('uploads'));

app.use('/', indexrot); 

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;


