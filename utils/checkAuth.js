import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')
    if (token) {
        try {
            const decoded = jwt.verify(token, 'fs1sf')
            req.userId = decoded._id 
            next()  
        } catch (error) {
            console.log(messge, error)
            return res.status(403).json({messge: 'Internal server error'})
        }
    } else {
        return res.status(403).json({messge: 'No access'})
    }
}