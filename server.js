const express = require('express');

        const axios = require('axios');

        const cors = require('cors');

       

        const app = express();

        app.use(cors());

        app.use(express.json());

       

        // ВСТАВЬТЕ СЮДА ВАШИ ДАННЫЕ!

        const TELEGRAM_BOT_TOKEN = '8590127915:AAF1cRxR3KzqhfznmiDG4x29RkYLMdSWWQU';

        const TELEGRAM_CHAT_ID = '@paromBTL'; // Например: '@ferry_requests'

       

        const TELEGRAM_API = `https://api.telegram.org/bot${TEGRAM_BOT_TOKEN}/sendMessage`;

       

        app.post('/send-to-telegram', async (req, res) => {

            try {

                const { sender, recipient, departure_date, owner, phone, brand, model, vehicle_id, color, type, timestamp } = req.body;

               

                const message = `

🆕 *Новая заявка на паром!*

       

Отправитель: ${sender}

Получатель: ${recipient}

Дата отправки: ${departure_date}

Собственник ТС: ${owner}

Телефон: \`${phone}\`

Марка: ${brand}

Модель: ${model}

${type}: ${vehicle_id}

Цвет: ${color}

Время: ${timestamp}

                `.trim();

       

                await axios.post(TELEGRAM_API, {

                    chat_id: TELEGRAM_CHAT_ID,

                    text: message,

                    parse_mode: 'Markdown'

                });

       

                res.status(200).json({ success: true });

            } catch (error) {

                console.error('Ошибка:', error.message);

                res.status(500).json({ success: false, error: error.message });

            }

        });

       

        app.get('/', (req, res) => {

            res.send('Сервер для отправки заявок на паром работает!');

        });

       

        const PORT = process.env.PORT || 3000;

        app.listen(PORT, () => {

            console.log(`Сервер запущен на порту ${PORT}`);

        });

       
