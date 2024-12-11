import {Router} from 'express'
import { upload } from "../config/uploader.mjs";
import UslugiController from '../controllers/UslugiController.mjs';

const  UslugiRouter = Router();

UslugiRouter.post('/create',upload.single('picture'),UslugiController.create)
UslugiRouter.get('/read',UslugiController.getAll)
UslugiRouter.get('/getById/:id',UslugiController.getById)
UslugiRouter.patch('/update/:id', upload.single('picture'),UslugiController.update)
UslugiRouter.delete('/delete/:id',UslugiController.delete)

export default UslugiRouter;