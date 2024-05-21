const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const XLSX = require('xlsx');

const app = express();
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

const upload = multer({ dest: 'uploads/' });

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  const filePath = path.join('uploads', `${file.originalname}`);
  fs.rename(file.path, filePath, (err) => {
    if (err) return res.status(500).send(err);
    const workbook = XLSX.readFile(filePath);
    const sheetNames = workbook.SheetNames;
    res.json({ filePath: `/${filePath}`, sheetNames });
  });
});

app.get('/files', (req, res) => {
  fs.readdir('uploads', (err, files) => {
    if (err) return res.status(500).send(err);
    const filePaths = files.map(file => `/uploads/${file}`);
    res.json(filePaths);
  });
});

app.get('/sheets', (req, res) => {
  const filePath = req.query.filePath;
  const fullPath = path.join(__dirname, filePath);
  const workbook = XLSX.readFile(fullPath);
  res.json({ sheetNames: workbook.SheetNames });
});

app.listen(4000, () => {
  console.log('Server started on http://localhost:4000');
});
