import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

import userModel from '../models/user.js';

export const register =  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(req.body.password, salt);

        const newUser = new userModel({
            email: req.body.email,
            password: passwordHash,
            avatarUrl: req.body.avatarUrl,
            fullName: req.body.fullName
        });

        const savedUser = await newUser.save();

        const token = jwt.sign({
            _id: savedUser._id
        }, 
        'fs1sf',
        {
            expiresIn: '30d'
        });
        
        res.status(201).json({ user: savedUser, token: token});
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const login = async (req, res) => {
    try {
        const user = await userModel.findOne({email: req.body.email})

        if (!user) {
            return res.status(400).json({massage: 'User not found'})
        }

        const isValPassword = await bcrypt.compare(req.body.password, user.password)

        if (!isValPassword) {
            return res.status(400).json({massage: 'User not found'})
        }

        const token = jwt.sign({
            _id: user._id
        }, 
        'fs1sf',
        {
            expiresIn: '30d'
        });
        res.status(201).json({ user: user, token: token});
    } catch (error) {
        console.error('Error login user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getMe = async (req, res) => {
    try {
        const user = await userModel.findOne({_id: req.userId})
        if(!user){
            return res.status(404).json({message: 'User not found'})
        }
        res.json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Internal server error'})
    }
}