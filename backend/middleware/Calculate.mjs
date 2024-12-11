import Usluga from "../models/usluga.mjs";

const calculateSumMiddleware = async (req, res, next) => {
    try {
        const uslugi = await Usluga.find({}); 
        const { usluga } = req.body; 

        const sum = usluga.reduce((acc, id) => {
            const service = uslugi.find(count => count._id.toString() === id);
            return service ? acc + service.price : acc;
        }, 0);

        req.orderData = sum;
        
        next(); 
    } catch (error) {
        return res.status(500).json({ error: error.message }); 
    }
};

export default calculateSumMiddleware
