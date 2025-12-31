import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET;

const generateToken = (user) =>{
    return jwt.sign({id: user._id, email: user.email },SECRET_KEY,{expiresIn:'2h'})
}
export default generateToken;