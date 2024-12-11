import Usluga from "../models/usluga.mjs";

export default class UslugiController {
    // Создание
    static async create(req, res) {
        try {
            const { name, price, description } = req.body;
            if (!req.file) {
                return res.status(400).json({ msg: 'Файл не найден' });
            }
            const usluga = new Usluga({
                name: name,
                price: price,
                description: description,
                picture: req.file.filename
            });
            await usluga.save();
            return res.status(201).json({ msg: "Услуга успешно создана", usluga });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    // Получение всех услуг
    static async getAll(req, res) {
        try {
            const uslugi = await Usluga.find();
            return res.status(200).json(uslugi);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    // Получение услуги по ID
    static async getById(req, res) {
        try {
            const { id } = req.params;
            const usluga = await Usluga.findById(id);
            if (!usluga) {
                return res.status(404).json({ msg: 'Услуга не найдена' });
            }
            return res.status(200).json(usluga);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    // Обновление услуги по ID
    static async update(req, res) {
        try {
            const { id } = req.params;
            const { name, price, description } = req.body;
            const updatedData = { name, price, description };

            if (req.file) {
                updatedData.picture = req.file.filename;
            }

            const usluga = await Usluga.findByIdAndUpdate(id, updatedData, { new: true });
            if (!usluga) {
                return res.status(404).json({ msg: 'Услуга не найдена' });
            }
            return res.status(200).json({ msg: "Услуга успешно обновлена", usluga });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    // Удаление услуги по ID
    static async delete(req, res) {
        try {
            const { id } = req.params;
            const usluga = await Usluga.findByIdAndDelete(id);
            if (!usluga) {
                return res.status(404).json({ msg: 'Услуга не найдена' });
            }
            return res.status(200).json({ msg: "Услуга успешно удалена" });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}
