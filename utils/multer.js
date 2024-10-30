import fs from 'fs';
import multer from 'multer';

const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, uploadDir);
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname.split(' ').join('_'));
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 105 * 1024 * 1024 },
    fileFilter: (_, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'));
        }
        cb(null, true);
    }
});

export default upload;
