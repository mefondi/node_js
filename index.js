import express from 'express';
import mongoose from 'mongoose';

import handelValError from './utils/handelValError.js';
import upload from './utils/multer.js';
import { registerVal, loginVal } from './validation/auth.js';
import { postVal } from './validation/post.js';
import checkAuth from './utils/checkAuth.js';
import * as userController from './controllers/userController.js'
import * as postController from './controllers/postController.js'

mongoose.connect('mongodb+srv://sad01072005:wwwqqq@cluster0.eh8r2.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('DB connected successfully'))
    .catch((error) => console.log('Database connection error:', error));

const app = express();
app.use(express.json());
app.use('/uploads', express.static('uploads'))

app.get('/', (req, res) => {
    res.send('Welcome to the API');
});
app.post('/upload',checkAuth, upload.single('image'), (req, res) => {
    res.json({ message: 'File uploaded successfully', file: `/uploads/${req.file.originalname.split(' ').join('_')}` });
});

app.get('/auth/me', checkAuth, userController.getMe)
app.post('/auth/login', loginVal, handelValError, userController.login)
app.post('/auth/register', registerVal, handelValError, userController.register);

app.post('/posts', checkAuth, handelValError, postVal, postController.create)
app.get('/posts', postController.getAll)
app.get('/posts/:id', postController.getOne)
app.delete('/posts/:id', checkAuth, postController.remove)
app.patch('/posts/:id', checkAuth, handelValError, postVal, postController.update)

app.listen(3500, (err) => {
    if (err) {
        console.error('Error starting server:', err);
    } else {
        console.log('Server running on http://localhost:3500');
    }
});
