// استيراد الحزم
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

// إنشاء التطبيق
const app = express();

// تمكين CORS
app.use(cors());

// تمكين معالجة البيانات بصيغة JSON
app.use(express.json());

// رابط Google Apps Script
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwXBdNiVqtpqNGUuyR07mMCa9ahCJSSOvQK5pKR8tKF0mOXg7Wirw_0fJYGAAstP9acug/exec';

// التعامل مع الطلبات POST
app.post('/submit', async (req, res) => {
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    const text = await response.text();
    if (response.ok) {
      res.status(200).send({ message: 'تم الإرسال بنجاح!', text });
    } else {
      res.status(500).send({ message: 'خطأ في Google Apps Script', text });
    }
  } catch (error) {
    res.status(500).send({ message: 'حدث خطأ في الخادم', error: error.message });
  }
});

// تحديد المنفذ
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`الخادم يعمل على المنفذ ${PORT}`));
