const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const User = require('../../models/User');

//@route GET api/auth
//@desc get user details
//@access private

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Server error" });
    }
})

//@route post api/auth
//@desc validate user and get token
//@access public

router.post('/', [
    check('email', 'please provide a valid email').isEmail(),
    check('password', 'password is required').exists()
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            //see if user exist
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ errors: [{ message: 'invalid credentials' }] });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            
            if (!isMatch) {
                return res.status(400).json({ errors: [{ message: 'invalid credentials' }] });
            }
            
            //return jsonwebtoken
            const payload = {
                user: {
                    id: user.id
                }
            }
            jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) => {
                if (err) throw err;
                res.json({ token });
            })

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }

    })


module.exports = router;

