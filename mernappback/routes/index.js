const express = require('express');
const router = express.Router(); 
const path = require('path'); 
const db = require('../config/db');
const bcrypt = require('bcrypt');
const rateLimit = require('express-rate-limit');
const User = require('../models/user'); 
const Note = require('../models/note'); 

db()
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 5,
    message: 'Too many login attempts. Please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
  });


router.post('/reg_post', async (req, res) => {
    const email = req.body.email;
    const password = req.body.pass;
    const name = req.body.name;
    console.log(req.body);
    const hashedPassword = await bcrypt.hash(password, 10);
    const data = await User.findOne({ email: email });
    if (data) {
        res.json({ status: 'exist' });
    } else {
        var item = {
            name: name,
            email: email,
            password: hashedPassword,
    
        };
    
        const newUser = new User(item);
    
        // Save the user to the database
        const savedUser = await newUser.save();
    
        res.json({ status: 'ok' });
    }



    
});


router.get('/note_view/:uid', async (req, res) => {
    const uid = req.params.uid
    const data = await Note.find({ USER: uid });
    res.json(data);
});
router.get('/note_viewothers/:uid', async (req, res) => {
    const uid = req.params.uid
    const data = await Note.find({ USER: { $ne: uid } });
    res.json(data);
});

router.post('/note_post', async (req, res) => {
    const title = req.body.title
    const content = req.body.content
    const uid = req.body.uid

    var item = {
        title: title,
        content: content,
        USER: uid
    }
    const newnote = new Note(item)
    await newnote.save();

    res.json({status:'ok'})
})
router.post('/note_update', async (req, res) => {
    const title = req.body.title
    const content = req.body.content
    const id = req.body.id

    

    var item = {
        title: title,
        content: content,
    }
    await Note.findOneAndUpdate(
        { _id: id },
        { $set: item },
        { new: true }
    );

    res.json({status:'ok'})
})

router.post('/login_post', loginLimiter,async (req, res) => {
    const email = req.body.name;
    const password = req.body.pass;
    const doc = await User.findOne({ email: email })
    
    
    if (!doc) {
        res.json({"status":"not"});
    }
    else {
        const isPasswordValid = await bcrypt.compare(password, doc.password);
        if (!isPasswordValid) {
            res.json({"status":"not"});
        }
        else {
            res.json({"status":"ok","lid":doc._id});
        }
    }

});

router.get('/profile', async (req, res) => {
    const doc = await User.findOne({ _id: req.query.uid })
    console.log(doc)
    res.json(data);
});


router.get('/edit', async (req, res) => {
    const uid = req.query.uid; 
    const data = await User.findOne({ _id: uid });
    res.json(data); 
   
});
router.post('/edit_post', async (req, res) => {
    const id = req.body.id; 
    const update = {
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        dob: req.body.dob,
        phone: req.body.phone
    };
    if (req.file) {
        update.image = req.file.path;
        console.log(req.file.filename); // Log the uploaded file's filename
    }
    await User.findOneAndUpdate(
        { _id: id },
        { $set: update },
        { new: true }
    );

    res.json({"status":"ok"});
});

router.get('/note_delete/:id', async (req, res) => {
    const id = req.params.id; 
    await Note.findOneAndDelete({ _id: id }); 
    res.json({status: 'ok'});
  
});


module.exports = router;