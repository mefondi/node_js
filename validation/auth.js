import {body} from 'express-validator'

export const registerVal = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Неверный формат пароля минимум 5 символов').isLength({min:5}),
    body('fullName', 'Неверный формат имени минимум 2 мимвола').isLength({min:2}),
    body('avatarUrl', 'Неверный формат ссылки на аватарку').optional().isURL(),
]

export const loginVal = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Неверный формат пароля минимум 5 символов').isLength({min:5}),
]