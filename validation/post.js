import { body } from "express-validator";

export const postVal = [
    body('title', 'Введите заголовок статьи').isLength({min:3}).isString(),
    body('text', 'Введите текст статьи').isLength({min:10}).isString(),
    body('tags', 'Введите тэги статьи (массив)').optional().isArray(),
    body('imageUrl', 'Неверный формат ссылки').optional().isURL(),
]