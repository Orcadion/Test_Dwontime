const express = require('express');
const path = require('path');
const app = express();
const port = 3000;  // يمكنك تغيير المنفذ إذا كنت بحاجة لذلك

// قم بتقديم الملفات الثابتة (مثل CSS و JavaScript) من المجلد الحالي
app.use(express.static(__dirname));

// عند الوصول إلى المسار '/'، أرجع ملف index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// يمكنك إضافة المزيد من المسارات إذا لزم الأمر

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
