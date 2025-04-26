require ('dotenv') .config();
const express = require ('express');
const cors = require('cors');
const { createClient } = require( '@supabase/supabase-js');

const app = express();

app.use(express.json());
app.use (cors());

const supabaseUrl = process.env.SUPABASE_URL;
const supabasekey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.post( '/api/register', async (req, res) => {
    console.log('Полученные данные:', req.body);

    try {
        const { name, phone, email, password } = req.body;
        
        if (!name || !phone || !email || !password){
            return res.status(400).json({ error: 'Все поля обязательны.'});
        }

        const { data, error } = await supabase
            .from('users')
            .insert( [{ name, phone, email, password }]);

        if (error) {
            throw new Error(error.message);
        }

        res.status(201).json({message: 'Пользоваткль успешно зарегистрирован!', data});
    } catch (err) {
        console.error('Ошибка при регистрации:', err.message);
        res.status(500).json({ error: err.message});
    }
});