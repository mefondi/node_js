import postModel from '../models/post.js';
import { validationResult } from 'express-validator';

export const getAll = async (req, res) =>{
    try {
        const posts = await postModel.find().populate('user', ['fullName', 'avatarUrl'] ).exec()
        res.json(posts)
    } catch (error) {
        console.log(message, error)
        res.status(500).json({message: 'Internal server error'})
    }
}

export const remove = async (req, res) =>{
    try {
        const posts = await postModel.findOneAndDelete(
            {_id: req.params.id}
        ).then((doc) => {
            if (!doc) {
                return res.status(404).json({ message: 'Post not found' });
            } 
            res.json({'success': true})
        })
    } catch (error) {
        console.log(message, error)
        res.status(500).json({message: 'Internal server error'})
    }
}

export const getOne = async (req, res) =>{
    try {

        const posts = await postModel.findOneAndUpdate(
            {_id: req.params.id},
            {$inc: {viewsCount: 1}},
            {returnDocument: 'after'
        }).populate('user', ['fullName', 'avatarUrl'] ).exec(  
        ).then((doc) => { 
            if (!doc) {
                return res.status(404).json({ message: 'Post not found' });
            } 
            res.json(doc)
        })
    } catch (error) {
        console.log('message', error)
        res.status(500).json({message: 'Internal server error'})
    }
}

export const create = async (req, res) =>{
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const newPost = new postModel({
            title:req.body.title,
            text:req.body.text,
            tags:req.body.tags,
            user:req.userId,
            imageUrl:req.body.imageUrl
        })

        const post = await newPost.save()
        res.json(post)
    } catch (error) {
        console.log('message', error)
        res.status(500).json({message: 'Internal server error'})
    }
}

export const update = async (req, res) =>{
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const posts = await postModel.findOneAndUpdate(
            {_id: req.params.id},{
            title:req.body.title,
            text:req.body.text,
            tags:req.body.tags,
            user:req.userId,
            imageUrl:req.body.imageUrl
        },{
        returnDocument: 'after'})
        .then((doc) => { 
            if (!doc) {
                return res.status(404).json({ message: 'Post not found' });
            } 
            res.json({'success': true})
        })
    } catch (error) {
        console.log('message', error)
        res.status(500).json({message: 'Internal server error'})
    }
}