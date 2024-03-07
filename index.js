
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const port = 3000;

app.use(express.json());
app.use(bodyParser.json());



app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
