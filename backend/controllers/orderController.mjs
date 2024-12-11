import Order from "../models/order.mjs";
import Usluga from "../models/usluga.mjs";

export default class OrderController {
    static async create(req, res) {
        try {
            const { usluga, user } = req.body;

            const order = new Order({
                usluga: usluga,
                user: user,
                price:req.orderData
            });
            await order.save();
            return res.status(201).json({ msg: "Заказ был успешно создан", order });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    static async read(req,res){
        try {
            const orders = await Order.find();
            res.status(200).json(orders)
        } catch (error) {
            res.status(500).json({ error });
        }
    }
    static async update(req,res){
        try {
            const id = req.params.id
            const {usluga} = req.body;
            const uslugi = await Usluga.find();

            const sum = usluga.reduce((acc, id) => {
                const service = uslugi.find(count => count._id.toString() === id);
                return service ? acc + service.price : acc;
            }, 0);

            await Order.findOneAndUpdate({_id:id}, {usluga: usluga, price: sum})

            res.status(200).json({msg:"Список услуг обновлён"})
        } catch (error) {
            res.status(500).json({ error });
        }
    }
    static async delete(req, res) {
        try {
            const id = req.params.id; 
           
            await Order.findOneAndDelete({_id: id});
            return res.status(200).json({msg: 'Заказ отменён'});

        } catch (error) {
            res.status(500).json({ error });
        }
    }
}