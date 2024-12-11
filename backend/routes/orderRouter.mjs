import {Router} from 'express'

import OrderController from '../controllers/orderController.mjs';
import calculateSumMiddleware from '../middleware/Calculate.mjs';

const OrderRouter = Router();

OrderRouter.post('/create',calculateSumMiddleware, OrderController.create)
OrderRouter.get('/read', OrderController.read)
OrderRouter.patch('/update/:id', OrderController.update)
OrderRouter.delete('/update/:id', OrderController.delete)
                             

export default OrderRouter;