const http = require('http');
const express = require('express');
const path = require('path');
const { get_crop } = require('./result');

const app = express();
const port = process.env.PORT || 4200;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.post('/getcrop', async (req, res) => {
    try {
        const data = req.body.arr.map(Number);
        const crop = "rice";
        console.log(crop);
        res.status(200).send(crop);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/', (req, res) => {
    res.render('index');
});

const server = http.createServer(app);
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
