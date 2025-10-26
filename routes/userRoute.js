import { handleLogIn , handleSignUp} from '../controllers/user.js';
import express from 'express'

const userRouter = express.Router();

userRouter.post('/' , handleSignUp)

userRouter.post('/login' ,handleLogIn );



export default userRouter