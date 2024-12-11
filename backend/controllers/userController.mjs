import User from "../models/users.mjs";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { configDotenv } from 'dotenv';

configDotenv();

export default class UserController {
    static async create(req, res) {
        try {
            let { username, date, telephone, email, password, role } = req.body;

            // Валидация
            if (!username || !email || !password || !date || !telephone) {
                return res.status(400).json({ msg: "Поля пустые" });
            }
            if (!/^[а-яёА-ЯЁ\s-]{3,}$/.test(username)) {
                return res.status(400).json({ msg: "Имя пользователя должно содержать только кириллицу и быть не менее 3 символов" });
            }
            if (!/^[\w.-]+@mail\.ru$/.test(email)) {
                return res.status(400).json({ msg: "Email должен заканчиваться на @mail.ru" });
            }
            if (!/^\d{2}\.\d{2}\.\d{4}$/.test(date)) {
                return res.status(400).json({ msg: "Дата должна быть в формате 'дд.мм.гггг'" });
            }
            if (!/^\+\d{11}$/.test(telephone)) {
                return res.status(400).json({ msg: "Телефон должен начинаться на '+' и содержать максимум 11 цифр" });
            }
            if (password.length < 8) {
                return res.status(400).json({ msg: "Пароль должен содержать минимум 8 символов" });
            }

            const hashed = await bcrypt.hash(password, 5);
            const user = new User({
                username: username,
                email: email,
                password: hashed,
                date: date,
                telephone: telephone,
                role: role
            });
            await user.save();
            res.status(201).json({ msg: 'Создан' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Ошибка сервера' });
        }
    }
    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const finded = await User.findOne({ email: email });
            if (!finded) {
                return res.status(404).json({ msg: 'Не найден' });
            }
            const findedByPassword = await bcrypt.compare(password, finded.password);
            if (!findedByPassword) {
                return res.status(404).json({ msg: 'Не найден' });
            }
            const payload = {
                _id: finded._id,
                username: finded.username,
                email: finded.email
            };
            const token = await jwt.sign(payload, process.env.SECRET, { expiresIn: '10h' });
            return res.status(200).json({ ...finded._doc, token });
        } catch (error) {
            return res.status(500).json({ error });
        }
    }
    static async getAll(req, res) {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error });
        }
    }
    static async getByUsername(req, res) {
        try {
            const { username } = req.params;
            const user = await User.findOne({ username });
            if (!user) {
                return res.status(404).json({ msg: 'Пользователь не найден' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error });
        }
    }
    static async update(req, res) {
        try {
            const id = req.params.id;
            const { username, email, password, telephone, date } = req.body;

            const updates = {};
            if (username) updates.username = username;
            if (email) updates.email = email;
            if (password) updates.password = await bcrypt.hash(password, 5);
            if (telephone) updates.telephone = telephone;
            if (date) updates.date = date;

            const user = await User.findOneAndUpdate({ _id: id }, updates, { new: true });

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    static async delete(req, res) {
        try {
            const id = req.params.id;

            await User.findOneAndDelete({ _id: id });
            return res.status(200).json({ msg: 'Пользователь удалён' });

        } catch (error) {
            res.status(500).json({ error });
        }
    }
}